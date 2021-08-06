import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import contractsInfo from '../../contracts/contractsInfo.json';
import { useContract } from '../../hooks/useContracts'

const NewAsk = () => {
    const context = useWeb3React<Web3Provider>()
    // const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const { chainId } = context
    
    // check for the right chain ID and don't load contract from the whonf chain

    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);

    const handleSubmit = (e) => {
        e.preventDefault();

        const handle = '0x6161613030303030303030303030303030303030303030303030303030303035'; //bytes32
        const cid = '0x2400000000000000000000000000000000000000000000000000000000000000'; //bytes32
        const tokenAddr = '0x4444aD20879051B696A1C14cCF6e3B0459466666' // address, USDC or WETH for example

        // some example transactions
        Promise.resolve()
        .then(
            ()=>contract?.addAsk(
                handle,
                cid,
                tokenAddr,
                '100'
            )
        )
        .then(
            ()=>contract?.addPledge(
                handle,
                1,
                '110'
            )
        )
        .then(
            ()=>contract?.handles(handle)
        )
        .then(console.log)
        .then(
            ()=>contract?.getAsk(
                handle,
                1,
            )
        )
        .then(console.log)
        .then(
            ()=>contract?.getPledge(
                handle,
                1,
                1
            )
        )
        .then(console.log);
    }

    return(
        <div>
            <pre>Asking _________ for</pre>
            <form>
                <div>
                    <label htmlFor="handle">Handle</label>
                    <input type="text" id="handle" name="handle" />
                </div>
                <textarea defaultValue="An NFT of ..."></textarea>
                <div>
                    <label htmlFor="token">Token</label>
                    <input type="text" id="token" name="token" />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" />
                </div>
                <button onClick={handleSubmit} type="submit">Save</button>
            </form>
        </div>
    )
}

export default NewAsk;