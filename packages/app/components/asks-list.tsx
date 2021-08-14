
import { useEffect } from 'react';
import styled from 'styled-components';
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
import Avatar from './avatar';

const StyledAsksList = styled.div`
    width: 100%;
    overflow-y: scroll;
    padding: 10px;
`;

const StyledAsk = styled.div`
    border: 2px dotted black;
    cursor: pointer;
    padding: 10px;
    
    &:hover {
        background-color: #ff6300;
    }
`;

const Flex = styled.div`
    display: flex;
`;

const AsksList = () => {
    const context = useWeb3React<Web3Provider>()
    const { chainId: currentChainId } = context
    const chainId = currentChainId !== 31337 ? currentChainId : 42;
    const { Asks, TxHashes } = useAppState();
    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);
    useEffect(()=>{
        contract?.on('AskSet', (handle,cid,token,id,fullEvent)=> {
            const decodedHandle = dataHexStringToString(handle);
            const newAsk = {
                txHash: fullEvent.transactionHash,
                handle: decodedHandle,
                cid,
                token,
                id,
                chainId
            };
            // required to avoid strange bug with 2 events being detected instead of one.
            const includesTx = TxHashes.itself.has(fullEvent.transactionHash);
            if (!includesTx) {
                Asks.set(current => {
                    TxHashes.itself.add(fullEvent.transactionHash);
                    return ([newAsk,...current]);
                });
            }
        }); 
        return function cleanup() {
            contract?.removeAllListeners();
        }
    }, [contract]);

    return(
      <StyledAsksList>
        <AskFlowStart />
        {Asks.itself.map(each => {
            const token = tokenForAddress(each.token, each.chainId)
            return(
            <Link href={`/${each.handle}/${each.id}`}>
                <a>
                <StyledAsk key={each.txHash}>  
                    <div>Content: {each.handle.split(':')[1]}</div>
                    <Flex>
                        {token && <Image src={token.logoURI} alt="token" width={50} height={50} />}
                        <Avatar multiHandle={each.handle} />
                    </Flex>
                </StyledAsk>
                </a>
            </Link>
            )
        })}
      </StyledAsksList>
    )
}

export default AsksList;