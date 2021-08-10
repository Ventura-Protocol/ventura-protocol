import { useEffect, useState } from 'react'
import DefaultErrorPage from 'next/error';
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useRouter } from 'next/router'
import contractsInfo from '../contracts/contractsInfo.json';
import { useContract } from '../hooks/usecontracts'
import { stringToDataHexString, dataHexStringToString } from '../utils/bytes';

const DetailPane = () => {
    const [ask, setAsk] = useState(undefined);
    const router = useRouter();
    console.log(router.query);
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
        }
    }, [contract, path]);

    if (ask) {
        return(<div>Ask: {ask.totalPledges}</div>)
    }

    return(
        <DefaultErrorPage statusCode={404} />
    )
}

export default DetailPane;