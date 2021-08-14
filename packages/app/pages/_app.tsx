import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import ModalProvider from '../components/modal-provider';
import AppStateProvider from '../components/app-state-provider';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider entities={{
      'Asks': [],
      'TxHashes': new Set(),
    }}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </Web3ReactProvider>
    </AppStateProvider>
  );
}
export default MyApp
