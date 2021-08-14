import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { encode } from "universal-base64";
import Image from 'next/image'
import { useModals } from '../hooks/usemodals';
import WalletComponents from './wallet-controls';
import { useWeb3React } from '@web3-react/core'
import Svg from './svg-patterns';
import { Web3Provider } from '@ethersproject/providers'
import Button from './button';
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


const Logo = styled.div`
    position: relative;
    border-radius: 50%;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
`;

const StyledStatsPane = styled.div`
    @media (max-width: 468px) {
        width: 100%;
    }
    padding: 20px;
    width: 60vw;
    background-color: rgb(91 0 255 / 50%);
    background-image: ${
        ()=>`url("data:image/svg+xml;base64,${encode(
            Svg({ color: '#FFFFFF', density: 4 })
        )}")`}

`;

const SubLogo = styled.div`
    font-family: 'Permanent Marker', monospace;
    font-size: 40px;
    color: white;
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
    return(

        <StyledStatsPane>
            <Link href="/">
                <a>
                <Logo>
                    <Image src="/icon.png" layout="fill" />
                    <div style={{ position: 'absolute', top:0, left:0, bottom:0, right:0,backgroundImage: 
            `url("data:image/svg+xml;base64,${encode(
                Svg({ color: '#ff360080', density: 2, opacity: 1 })
            )}")`}}></div>
                </Logo>
                </a>
            </Link>
            <SubLogo>Ventura Protocol</SubLogo>
            <p>Crowdsourced NFT and digital memorabilia wishlist</p>
            <p>
                <WalletConnection />
            </p>
            
            <Button onClick={()=>pushModal(<Modal />)}>Connect Wallet</Button>
        </StyledStatsPane>
    )
}

export default StatsPane;