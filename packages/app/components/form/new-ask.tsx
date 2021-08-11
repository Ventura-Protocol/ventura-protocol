import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider, TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { formatEther, parseUnits } from '@ethersproject/units'
import contractsInfo from '../../contracts/contractsInfo.json';
import { useContract } from '../../hooks/usecontracts'
import { useModals } from '../../hooks/usemodals';
import { stringToDataHexString, dataHexStringToString } from '../../utils/bytes';
import { useAppState } from "../../hooks/useappstate";

const NewAsk = () => {
    const { pushModal, popModal, popAllModals } = useModals();
    const context = useWeb3React<Web3Provider>()
    const { Asks } = useAppState();
    // const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const { chainId } = context
    
    // check for the right chain ID and don't load contract from the wrong chain

    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);
    
    useEffect(()=>{
        // listening for an Ask event
        // console.log('hook rerun', contract);
        if (contract) {  
            contract?.on('AskSet', (handle,cid,token)=> console.log('ask event', dataHexStringToString(handle),cid,token));
        }
        return function cleanup() {
            contract?.removeAllListeners();
        }
    }, [contract]);

    const [currentHandle, setCurrentHandle] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const askFormValues = {
            handle: form.querySelector("input[name='handle']").value,
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

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="handle">Handle</label>
                    <input type="text" id="handle" name="handle" onChange={e=> { 
                        setCurrentHandle(e.target.value);
                    }} value={currentHandle} />
                </div>
                <textarea name="description" defaultValue="An NFT of ..."></textarea>
                <div>
                    <label htmlFor="token">Token <br />(Default Kovan WETH)<br /></label>
                    <input type="text" id="token" name="token" defaultValue="0xd0A1E359811322d97991E03f863a0C30C2cF029C" />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" defaultValue="0.00001" />
                </div>
                <button type="submit">Send</button>
            </form>
            <button onClick={
                ()=>pushModal(<div onClick={popModal}>test modal content (click to close)</div>, { overlay: true })
            }>Modal open</button>

            
            <button onClick={()=>Asks.set(current=> (['new', ...current]))}>Add</button>

        </div>
    )
}

export default NewAsk;