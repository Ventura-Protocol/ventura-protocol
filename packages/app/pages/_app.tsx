import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle } from "styled-components"
import reset from 'styled-reset'

import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import ModalProvider from '../components/modal-provider';
import AppStateProvider from '../components/app-state-provider';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const GlobalStyle = createGlobalStyle`
${reset}
body {
  font-family: 'phosphateinline', Courier, monospace;  
}

@property --a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

html {
  background: linear-gradient(var(--a), #d1fff3, #ffca71, #fe9cff);
  background-size: 100% 100%;

  -webkit-animation: AnimationName 2s linear infinite;
  -moz-animation: AnimationName 2s linear infinite;
  animation: AnimationName 2s linear infinite;
}

@-webkit-keyframes AnimationName {
    0%{--a:0deg;}
    100%{--a:360deg;}
}
@-moz-keyframes AnimationName {
  0%{--a:0deg;}
  100%{--a:360deg;}
}
@keyframes AnimationName {
  0%{--a:0deg;}
  100%{--a:360deg;}
}
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider entities={{
      'Asks': [],
      'TxHashes': new Set(),
    }}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ModalProvider>
          <Component {...pageProps} />
          <GlobalStyle />
        </ModalProvider>
      </Web3ReactProvider>
    </AppStateProvider>
  );
}
export default MyApp
