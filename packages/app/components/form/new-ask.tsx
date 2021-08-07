import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider, TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { formatEther, parseUnits } from '@ethersproject/units'
import contractsInfo from '../../contracts/contractsInfo.json';
import { useContract } from '../../hooks/useContracts'
import { stringToDataHexString, dataHexStringToString } from '../../utils/bytes';

const NewAsk = () => {
    const context = useWeb3React<Web3Provider>()
    // const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const { chainId } = context
    
    // check for the right chain ID and don't load contract from the whonf chain

    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);
    
    useEffect(()=>{
        // listening for an Ask event
        contract?.on('AskSet', (handle,cid,token)=> console.log('ask event', dataHexStringToString(handle),cid,token));
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
                    <input type="text" id="token" name="token" defaultValue="0xd0a1e359811322d97991e03f863a0c30c2cf029c" />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" defaultValue="0.00001" />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default NewAsk;