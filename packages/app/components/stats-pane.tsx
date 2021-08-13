import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useModals } from '../hooks/usemodals';
import WalletComponents from './wallet-controls';
import { useWeb3React } from '@web3-react/core'

import { Web3Provider } from '@ethersproject/providers'

import { useEagerConnect, useInactiveListener } from '../hooks'
import {
    injected,
    network,
    walletconnect,
    walletlink,
  } from '../connectors'

  enum ConnectorNames {
    Injected = 'Injected',
    Network = 'Network',
    WalletConnect = 'WalletConnect',
    WalletLink = 'WalletLink',
  }
  
  const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.Network]: network,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.WalletLink]: walletlink,
  }

const StyledStatsPane = styled.div`
  width: 100%;
`;

const Modal = () => {
    const { popModal } = useModals();
    return(
        <div>
            <div onClick={popModal}>Close X</div>
            <WalletComponents />
        </div>
    )
}

const WalletConnection = () => {
    const context = useWeb3React<Web3Provider>()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
  
    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState<any>()
    useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
      }

      if (!active && !error) {
        setActivatingConnector(connectorsByName[ConnectorNames.Network])
        activate(connectorsByName[ConnectorNames.Network])
      }

    }, [activatingConnector, connector])
  
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()
  
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    return null;
}

const StatsPane = () => {
    const { pushModal } = useModals()
    // const [loadedOnClient, setLoadedOnClient] = useState(false);
    // // this is to fix strange bug with next.js and web3-react modal where styles would just stop working
    // useEffect(()=>{
    //     setLoadedOnClient(true)
    // }, [])
    return(

        <StyledStatsPane>
            Logo here
            <WalletConnection />
            <button onClick={()=>pushModal(<Modal />)}>Connect Wallet</button>
        </StyledStatsPane>
    )
}

export default StatsPane;