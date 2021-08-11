
import { useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useAppState } from "../hooks/useappstate";
import contractsInfo from '../contracts/contractsInfo.json';
import { useContract } from '../hooks/usecontracts'
import { dataHexStringToString } from '../utils/bytes';
import AskFlowStart from './ask-flow-start';
import { tokenForAddress } from '../utils/tokens';

const AsksList = () => {
    const context = useWeb3React<Web3Provider>()
    const { chainId: currentChainId } = context
    const chainId = currentChainId !== 31337 ? currentChainId : 42;
    const { Asks, TxHashes } = useAppState();
    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);
    useEffect(()=>{
        contract?.on('AskSet', (handle,cid,token,id,fullEvent)=> {
            const newAsk = {
                txHash: fullEvent.transactionHash,
                handle: dataHexStringToString(handle),
                cid,
                token,
                id,
            };
            // required to avoid strange bug with 2 events being detected instead of one.
            const includesTx = TxHashes.itself.has(fullEvent.transactionHash);
            if (!includesTx) {
                Asks.set(current => {
                    TxHashes.itself.add(fullEvent.transactionHash);
                    return ([newAsk, ...current]);
                });
            }
        }); 
        return function cleanup() {
            contract?.removeAllListeners();
        }
    }, [contract]);

    return(
      <div>
        <AskFlowStart />
        {Asks.itself.map(each => {
            const token = tokenForAddress(each.token, chainId)
            return(
            <div key={each.txHash}>   
                <div>Content: {each.handle}</div>
                <div><Link href={`/${each.handle}/${each.id}`}>see details</Link></div>
                <Image src={token.logoURI} alt="token" width={100} height={100} />
            </div>
            )
        })}
      </div>
    )
}

export default AsksList;