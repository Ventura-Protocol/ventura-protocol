import { hexlify, arrayify, zeroPad } from '@ethersproject/bytes'
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

export {
    stringToDataHexString,
    dataHexStringToString,
}