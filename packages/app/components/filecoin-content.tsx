import { useEffect, useState } from 'react';
import { Web3Storage } from 'web3.storage'
import { hexStringToCid } from '../utils/bytes'

function makeStorageClient() {
    return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN})
}

const client = makeStorageClient();

const FilecoinContent = (props) => {
    const { cid } = props;

    const [fileContent, setFileContent] = useState(null);

    useEffect(()=>{
        const unpackedCid = hexStringToCid(cid);

        client.get(unpackedCid).then(res=> {
            console.log(`Got a response! [${res.status}] ${res.statusText}`)
            if (!res.ok) {
                throw new Error(`failed to get ${unpackedCid} - [${res.status}] ${res.statusText}`)
            }
            return res.files();
        })
        .then(files=> {
            if (files.length > 0) {
                return(files[0].text())
            }
            throw new Error(`failed to get content of ${unpackedCid}`)
        })
        .then(untrustedFile => {
            const fileObject = JSON.parse(untrustedFile)
            setFileContent(fileObject['untrusted-content'])
        })
        .catch(err => {
            console.error(err);
            setFileContent('=== Error getting content from IPFS ===')
        });

    }, [cid]);

    return(
        <div>{fileContent}</div>
    )
}

export default FilecoinContent;