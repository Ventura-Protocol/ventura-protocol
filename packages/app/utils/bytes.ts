import { hexlify, arrayify, zeroPad } from '@ethersproject/bytes';
import CID from 'cids';
const stringToDataHexString = (str: string) => {
    const codes = str.split('').map(l=>{ 
        const c = l.charCodeAt(0);
        return c > 255 ? 255 : c;  
    });
    return(hexlify(zeroPad(codes, 32)));
}

const dataHexStringToString = (dataHexString: string, strictSanitize: boolean = true) => {
    const chars = Array.from(arrayify(dataHexString));
    const str = String.fromCharCode(...chars);
    if (strictSanitize) {
        return str.replace(/[^A-Za-z0-9\:]/g, '');
    }
    return str;
}

const cidToHexString = (cid: string) => 
    hexlify(new CID(cid).multihash.slice(2))

const hexStringToCid = (hex: string) => 
    new CID(Uint8Array.from([18, 32, ...arrayify(hex)])).toV1().toString('base32')

export {
    stringToDataHexString,
    dataHexStringToString,
    cidToHexString,
    hexStringToCid,
}