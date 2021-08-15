import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components';
import Button from './button';
import { tokenForAddress } from '../utils/tokens';
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther, commify } from '@ethersproject/units';

const Title = styled.h2`
    font-family: 'Permanent Marker', monospace;
    font-size: 30px;
    color: #444444;
    margin-bottom: 10px;
`;

const CovalentCreditCheck = (props: any) => {
    const { account: currentAccount, chainId: currentChainId } = useWeb3React();
    let chainId;
    let account;
    if (currentChainId === 31337) {
        chainId = 137;
        account = '0x4444aD20879051B696A1C14cCF6e3B0459466666';
    } else {
        chainId = currentChainId;
        account = currentAccount;
    }

    const [covalentData, setCovalentData] = useState();
    console.log(account)

    useEffect(()=>{
        let onComplete = setCovalentData;
        const covalentUrl = `https://api.covalenthq.com/v1/${chainId}/address/${account}/balances_v2/?&key=ckey_a0a1d1dfb5f84e83af5e8dcd4fb`
        
        fetch(covalentUrl).then(response => response.json())
        .then(({data}) => onComplete(data.items))
        .catch(console.error);

        return () => { onComplete = (noop)=>noop; }
    }, [account]);

    const supportedTickers = ['ETH','WETH', 'DAI', 'USDC']
    const supportedTokens = covalentData && covalentData.filter(token => supportedTickers.includes(token.contract_ticker_symbol));
    console.log(supportedTokens)
    return(
        <div style={{maxWidth: '400px'}}>
            <Title>Covalent Credit Check</Title>
            <p>Credit check on the current account - Powered by Covalent</p>
            <table style={{width:'100%', marginTop: '10px', marginBottom: '10px'}}>
                <thead>
                    <th>Asset</th>
                    <th>Balance</th>
                    <th>Balance 24h</th>
                </thead>
                <tbody>
                    {supportedTokens && supportedTokens.map(each=>{
                        if (each.quote && each.quote_24h) {
                            return(
                                <tr>
                                    <td>{each.contract_ticker_symbol}</td>
                                    <td>{commify(each.quote)}</td>
                                    <td>{commify(each.quote_24h)}</td>
                                </tr>
                                );
                        }
                    })}
                </tbody>
            </table>
            <p>NOTE: 24h balance is the the maximum pledge you are able to add.</p>
            <Button onClick={props.continueCallback}>Continue</Button>
        </div>
    )

}

export default CovalentCreditCheck;