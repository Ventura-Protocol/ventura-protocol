
import { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import Svg from './svg-patterns';
import { encode } from "universal-base64";
import Image from 'next/image'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useAppState } from "../hooks/useappstate";
import contractsInfo from '../contracts/contractsInfo.json';
import { useContract } from '../hooks/usecontracts'
import { dataHexStringToString } from '../utils/bytes';
import AskFlowStart from './ask-flow-start';
import { tokenForAddress } from '../utils/tokens';
import Avatar from './avatar';
import FilecoinContent from './filecoin-content';

const APIURL = "https://api.studio.thegraph.com/query/6030/venturapledges/v0.0.1";

const asksQuery = `
  query($first: Int) {
    asks(first: $first) {
        handle
        cid
        token
        index
    }
  }
`;

const StyledAsksList = styled.div`
    width: 100%;
    overflow-y: scroll;
    padding: 10px;
`;

const StyledAsk = styled.div`
    cursor: pointer;
    margin: -10px -10px 0px -10px;
    padding: 10px;
    
    &:hover {
        background-color: rgb(91,0,255,0.20);
        background-image: ${
            ()=>`url("data:image/svg+xml;base64,${encode(
                Svg({ color: '#FFFFFF', density: 3, opacity: 0.7 })
            )}")`}
    }
`;

const Divider = styled.div`
height: 20px;
margin: 0px -10px 10px -10px;
background-image: ${
    ()=>`url("data:image/svg+xml;base64,${encode(
        Svg({ color: '#000000', density: 3, opacity: 1 })
    )}")`}
`;

const Flex = styled.div`
    display: flex;
`;

const ContentWrap = styled.p`
    overflow: hidden;
    white-space: break-spaces;
    text-overflow: ellipsis;
    word-break: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
    height: 50px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const AsksList = () => {
    const context = useWeb3React<Web3Provider>()
    const { chainId: currentChainId } = context
    const chainId = currentChainId !== 31337 ? currentChainId : 42;
    const { Asks, TxHashes } = useAppState();
    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);
    useEffect(()=>{

        const client = new ApolloClient({
            uri: APIURL,
            cache: new InMemoryCache()
          });
          
          client.query({
            query: gql(asksQuery),
            variables: {
                first: 10,
              }
          })
          .then(data => {
                const { asks } = data.data;
                if (asks.length > 0) {
                    asks.forEach(ask => {
                        const newAsk = {
                            txHash: ask.handle + ask.index,
                            handle: dataHexStringToString(ask.handle),
                            cid: ask.cid,
                            token: ask.token,
                            id: ask.index,
                            chainId
                        };
                        const includesTx = TxHashes.itself.has(ask.handle + ask.index);
                        if (!includesTx) {
                            Asks.set(current => {
                                TxHashes.itself.add(ask.handle + ask.index);
                                return ([newAsk,...current]);
                            });
                        }
                    })
                }
          })
          .catch(err => { console.log("Error fetching data: ", err) });

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
            <div key={each.txHash}>
                <Link href={`/${each.handle}/${each.id}`}>
                    <a>
                    <StyledAsk>
                        <Flex>
                            <div style={{borderRight: '1px solid black', paddingRight: '5px', marginRight: '5px'}}>
                                <div style={{position: 'relative', height: '30px', width: '30px'}}>
                                    <Image src="/polygon-matic-logo.svg" layout="fill" alt="polygon" />
                                </div>
                                {token && <Image src={token.logoURI} alt="token" width={30} height={30} />}
                            </div>
                            <div>

                            </div>
                            <div>
                                <p>Asking <strong style={{fontWeight: 'bold'}}>@{each.handle.split(':')[1]}</strong> for</p>
                                <ContentWrap>
                                    <FilecoinContent cid={each.cid} />
                                </ContentWrap>
                            </div>
                            <div style={{marginLeft: 'auto'}}>
                                <Avatar multiHandle={each.handle} />
                            </div>
                        </Flex>

                    </StyledAsk>
                    </a>
                </Link>
                <Divider></Divider>
            </div>
            )
        })} 
      </StyledAsksList>
    )
}

export default AsksList;