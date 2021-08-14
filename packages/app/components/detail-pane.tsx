import { useEffect, useState } from 'react'
import styled from 'styled-components';
import DefaultErrorPage from 'next/error';
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useRouter } from 'next/router'
import contractsInfo from '../contracts/contractsInfo.json';
import { useContract } from '../hooks/usecontracts'
import { stringToDataHexString, dataHexStringToString } from '../utils/bytes';

const StyledDetailPane = styled.div`
    width: 100%;
    overflow-y: auto;
    background-color: rgb(200 200 200 / 30%);
    display: flex;
    padding: 10px;
`;

const EmptyState = () => (
    <div>Select an Ask on the left to see more details</div>
)

const DetailPane = () => {
    const [ask, setAsk] = useState(undefined);
    const router = useRouter();
    const { path } = router.query; 

    const contract = useContract(contractsInfo.contracts.Pledges.address, contractsInfo.contracts.Pledges.abi);
    
    useEffect(()=>{
        if (contract && path) {
            contract?.getAsk(
                stringToDataHexString(path[0]),
                path[1],
            )
            .then(res => res.totalPledges === 0 ? undefined : res)
            .then(setAsk)
            .catch(err=> {
                console.error(err, stringToDataHexString(path[0]), path[1])
            })
        }
    }, [contract, path]);

    if (ask) {
        return(
            <StyledDetailPane>
                    <p>Ask: {ask.totalPledges}</p>
            </StyledDetailPane>
        )
    }

    if (!path) {
        return(
            <StyledDetailPane>
                <EmptyState />
            </StyledDetailPane>
        )
    }

    return(
        <StyledDetailPane>
            <DefaultErrorPage statusCode={404} />
        </StyledDetailPane>
    )
}

export default DetailPane;