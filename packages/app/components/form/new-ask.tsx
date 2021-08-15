import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components';
import { Web3Provider, TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { formatEther, parseUnits, commify } from '@ethersproject/units'
import contractsInfo from '../../contracts/contractsInfo.json';
import { useContract } from '../../hooks/usecontracts'
import { useModals } from '../../hooks/usemodals';
import { stringToDataHexString, dataHexStringToString } from '../../utils/bytes';
import { useAppState } from "../../hooks/useappstate";
import Button from '../button';

const Title = styled.h2`
    font-family: 'Permanent Marker', monospace;
    font-size: 30px;
    color: #444444;
    margin-bottom: 10px;
`;


const NewAsk = ({currentHandle}: {currentHandle: string}) => {
    const { pushModal, popModal, popAllModals } = useModals();
    const context = useWeb3React<Web3Provider>()
    const { Asks } = useAppState();
    // const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const { chainId } = context
    const [ rewardsTable, setRewardsTable ] = useState([]);
    // check for the right chain ID and don't load contract from the wrong chain

    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);
    
    useEffect(()=>{
        // listening for an Ask event
        // console.log('hook rerun', contract);
        if (contract) {  
            contract?.on('AskSet', (handle,cid,token, ...rest)=> console.log('ask event', dataHexStringToString(handle),cid,token, rest));
        }
        return function cleanup() {
            contract?.removeAllListeners();
        }
    }, [contract]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const askFormValues = {
            description: form.querySelector("textarea[name='description']").value,
            token: form.querySelector("input[name='token']").value,
            amount: parseUnits(form.querySelector("input[name='amount']").value),
        }

        const handle = stringToDataHexString(currentHandle) //bytes32
        const cid = '0x2400000000000000000000000000000000000000000000000000000000000000'; //bytes32

        contract?.addAsk(
                handle,
                cid,
                askFormValues.token,
                askFormValues.amount,
            )
        .then((transactionResponse: TransactionResponse)=> transactionResponse.wait())
        .then((res: TransactionReceipt) => alert('Transaction was mined'))
        .catch(console.error);
    }

    const handleAmountChange = e => {
        // update the rewards table
        const ETH_PRICE_USD = 3000;
        const amountValue = Number(e.target.value);
        const amountUSD = ETH_PRICE_USD * amountValue;
        
        const limitToPc = (sale, reward, limit) => {
            return (reward / sale) > limit ? sale * limit : reward;
        }

        const rewards = Array(4).fill(true).map((_, i) => {
            const multiplier = i === 0 ? 0.5 : Math.pow(2, i);
            return {
                at_1k: limitToPc(1e3, 1e3 / (Math.sqrt(1e3 / amountUSD) * multiplier), 0.125 / Math.pow(2, i)),
                at_10k: limitToPc(1e4, 1e4 / (Math.sqrt(1e4 / amountUSD) * multiplier), 0.125 / Math.pow(2, i)),
                at_1m: limitToPc(1e6, 1e6 / (Math.sqrt(1e6 / amountUSD) * multiplier), 0.125 / Math.pow(2, i)),
            };
        });

        setRewardsTable(rewards);
    }

    return(
        <div style={{maxWidth: '500px'}}>
            <form onSubmit={handleSubmit}>
                <textarea className="textarea" name="description" defaultValue="Your personal early drafts of Filecoin investor pitches and decks (Encrypted PDF)"></textarea>
                <div>
                    <label className="label" htmlFor="token">Token <br />(Default WETH)<br /></label>
                    <input className="input" type="text" id="token" name="token" defaultValue="0xd0A1E359811322d97991E03f863a0C30C2cF029C" />
                </div>
                <div>
                    <label className="label" htmlFor="amount">Amount</label>
                    <input className="input" type="number" id="amount" name="amount" defaultValue="0.3" onChange={handleAmountChange} />
                </div>
                <Button style={{float:'right', marginTop:'10px'}} type="submit">Send Transaction</Button>
            </form>
            <Title style={{marginTop: '10px', clear:'both'}}>Rewards</Title>
            <table style={{width:'100%', marginTop: '10px', marginBottom: '10px'}}>
                <thead style={{borderBottom: '2px solid black'}}>
                    <tr>
                        <th>Pledge</th>
                        <th colSpan="3">Sale Outcome / Reward</th>
                    </tr>
                    <tr>
                        <th>Position</th>
                        <th>$1,000</th>
                        <th>$10,000</th>
                        <th>$1,000,000</th>
                    </tr>
                </thead>
                <tbody>
                    {rewardsTable.map((row, i)=>(
                        <tr>
                            <td>{i + 1}</td>
                            <td>${commify(row.at_1k.toFixed(0))}</td>
                            <td>${commify(row.at_10k.toFixed(0))}</td>
                            <td>${commify(row.at_1m.toFixed(0))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default NewAsk;