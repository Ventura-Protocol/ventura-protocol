import DEFAULT_TOKEN_LIST from '@uniswap/default-token-list'

const tokenForAddress = (address: string, chainId: number) => {
    const filteredTokens = DEFAULT_TOKEN_LIST.tokens.filter(each => {
        const addressMatch = address === each.address;
        const chainIdMatch = chainId === each.chainId;

        return(addressMatch && chainIdMatch);
    });

    const token = filteredTokens.pop();
    
    // if chain id is 42 replace an image from the same token from mainnet (fix as images are missing)
    if (token && chainId === 42) {
        const mainnetToken = tokenForSymbol(token.symbol, 1);
        token.logoURI = mainnetToken ? mainnetToken.logoURI : token.logoURI
    }

    return token;
    
}

const tokenForSymbol = (symbol: string, chainId: number) => {
    const filteredTokens = DEFAULT_TOKEN_LIST.tokens.filter(each => {
        const symbolMatch = symbol === each.symbol;
        const chainIdMatch = chainId === each.chainId;

        return(symbolMatch && chainIdMatch);
    });
    return filteredTokens.pop();
}

export {
    tokenForAddress,
    tokenForSymbol
}