import { useEffect, useState } from 'react'
import styled from 'styled-components';
import DefaultErrorPage from 'next/error';
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useRouter } from 'next/router'
import contractsInfo from '../contracts/contractsInfo.json';
import { useContract } from '../hooks/usecontracts'
import { stringToDataHexString, dataHexStringToString } from '../utils/bytes';
import Button from './button';
import Svg from './svg-patterns';
import { encode } from "universal-base64";
import Image from 'next/image'
import Avatar from './avatar';
import { tokenForAddress } from '../utils/tokens';
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'

const StyledDetailPane = styled.div`
    width: 100%;
    overflow-y: auto;
    background-color: rgb(200 200 200 / 30%);
    display: flex;
    padding: 10px;
`;

const StyledAsk = styled.div`
    margin: -10px -10px 0px -10px;
    padding: 10px;
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

const EmptyState = () => (
    <div>Select an Ask on the left to see more details</div>
)

const AskContent = styled.p`
    margin-top: 20px;
    white-space: break-spaces;
    text-overflow: ellipsis;
    word-break: break-word;
    hyphens: auto;
    overflow-wrap: break-word;
`;


const DetailPane = () => {
    const { chainId } = useWeb3React<Web3Provider>()
    const [ask, setAsk] = useState(undefined);
    const router = useRouter();
    const { path } = router.query;
    const handle = path && path[0];
    const askSequence = path && path[1];
    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);
    
    useEffect(()=>{
        if (contract && path) {
            contract?.getAsk(
                stringToDataHexString(handle),
                    askSequence,
            )
            .then(res => res.totalPledges === 0 ? undefined : res)
            .then(setAsk)
            .catch(err=> {
                console.error(err, stringToDataHexString(path[0]), path[1])
            })
        }
    }, [contract, path]);

    const handleAddPledge = () => {
        
    }

    if (ask) {
        const token = tokenForAddress(ask.token, chainId)
        return(
            <StyledDetailPane>
                <div>
                    <Divider></Divider>
                    {ask && (
                    <StyledAsk key={ask.txHash}>
                            <Flex>
                                <div style={{borderRight: '1px solid black', paddingRight: '5px', marginRight: '5px'}}>
                                    <div style={{position: 'relative', height: '30px', width: '30px'}}>
                                        <Image src="/polygon-matic-logo.svg" layout="fill" alt="polygon" />
                                    </div>
                                    {token && <Image src={token.logoURI} alt="token" width={30} height={30} />}
                                </div>
                                <div>
                                    <p>Asking <strong style={{fontWeight: 'bold'}}>@{handle.split(':')[1]}</strong> for</p>
                                    <AskContent>
                                        {'content:' + ask.cid + ask.cid}
                                    </AskContent>
                                    <p style={{marginTop: '20px'}}>Total Pledges: {ask.totalPledges}</p>
                                    <p>Total Amount: {formatEther(ask.totalAmount.toNumber())}</p>
                                    <Button onClick={handleAddPledge} style={{marginTop: '20px'}}>Add Pledge</Button>
                                </div>
                                <div style={{marginLeft: 'auto'}}>
                                    <Avatar multiHandle={handle} />
                                </div>
                            </Flex>

                        </StyledAsk>
                    )}
                    <Divider></Divider>
                </div>
            </StyledDetailPane>
        )
    }

    if (!path || !ask) {
        return(
            <StyledDetailPane style={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                <EmptyState />
            </StyledDetailPane>
        )
    }
}

export default DetailPane;