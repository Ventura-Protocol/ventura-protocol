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
  font-family: Courier, monospace;  
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

// Minimal Form Generic: Resets
input, select, textarea {
	display: block;
	box-sizing: border-box;
	width: 100%;
	outline: none;
	border: none;
	border-radius: 0;
	-webkit-appearance: none;
	   -moz-appearance: none;
	        appearance: none;
}

input, select, textarea {
	display: block;
	box-sizing: border-box;
	width: 100%;
	outline: none;
	border: none;
	border-radius: 0;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}

.label, .checkbox-label, .radio-label {
	display: block;
	margin-bottom: 0.25em;
}

.input, .checkbox-label:before, .radio-label:before, .checkbox-label:after, .radio-label:after, .select, .textarea {
	padding: 10px;
	border-width: 1px;
	border-style: solid;
	border-color: lightgray;
	background-color: white;
}

.input:focus, .checkbox-label:focus:before, .radio-label:focus:before, .checkbox-label:focus:after, .radio-label:focus:after, .select:focus, .textarea:focus {
	border-color: gray;
}

.input::placeholder, .select::placeholder, .textarea::placeholder {
	color: gray;
}

.checkbox, .radio {
	position: absolute;
	width: auto;
	opacity: 0;
}

.checkbox:focus + .checkbox-label:before, .radio:focus + .checkbox-label:before, .checkbox:focus + .radio-label:before, .radio:focus + .radio-label:before, .checkbox:focus + .checkbox-label:after, .radio:focus + .checkbox-label:after, .checkbox:focus + .radio-label:after, .radio:focus + .radio-label:after {
	border-color: gray;
}

.checkbox:checked + .checkbox-label:after, .radio:checked + .checkbox-label:after, .checkbox:checked + .radio-label:after, .radio:checked + .radio-label:after {
	opacity: 1;
}

.checkbox-label, .radio-label {
	position: relative;
	display: inline-block;
	margin-right: 0.5em;
	padding-left: 28px;
}

.checkbox-label:before, .radio-label:before, .checkbox-label:after, .radio-label:after {
	position: absolute;
	top: 50%;
	left: 0;
	display: inline-block;
	margin-top: -9px;
	padding: 0;
	width: 18px;
	height: 18px;
	content: "";
}

.checkbox-label:after, .radio-label:after {
	border-color: transparent;
	background-color: transparent;
	background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2213%22%20height%3D%2210.5%22%20viewBox%3D%220%200%2013%2010.5%22%20enable-background%3D%22new%200%200%2013%2010.5%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%23424242%22%20d%3D%22M4.8%205.8L2.4%203.3%200%205.7l4.8%204.8L13%202.4c0%200-2.4-2.4-2.4-2.4L4.8%205.8z%22%2F%3E%3C%2Fsvg%3E");
	background-position: center;
	background-size: 13px;
	background-repeat: no-repeat;
	opacity: 0;
}

.radio-label:before, .radio-label:after {
	border-radius: 50%;
}

.radio-label:after {
	background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20enable-background%3D%22new%200%200%2013%2013%22%20xml%3Aspace%3D%22preserve%22%3E%3Ccircle%20fill%3D%22%23424242%22%20cx%3D%226.5%22%20cy%3D%226.5%22%20r%3D%226.5%22%2F%3E%3C%2Fsvg%3E");
	background-size: 8px;
}

.select {
	position: relative;
	z-index: 1;
	padding-right: 40px;
}

.select::-ms-expand {
	display: none;
}

.select-wrap {
	position: relative;
}

.select-wrap:after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 2;
	padding: 0 15px;
	width: 10px;
	height: 100%;
	background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2213%22%20height%3D%2211.3%22%20viewBox%3D%220%200%2013%2011.3%22%20enable-background%3D%22new%200%200%2013%2011.3%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpolygon%20fill%3D%22%23424242%22%20points%3D%226.5%2011.3%203.3%205.6%200%200%206.5%200%2013%200%209.8%205.6%20%22%2F%3E%3C%2Fsvg%3E");
	background-position: center;
	background-size: 10px;
	background-repeat: no-repeat;
	content: "";
	pointer-events: none;
}

.textarea {
	min-height: 100px;
	resize: vertical;
}

// animation
.loading-animation {
  animation-name: loading-expo;
  animation-duration: 0.75s;
  animation-timing-function: ease-in;
}
@keyframes loading-expo {
  0% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%, 0% 2%, 0% 2%);
  }
  12.5% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 2%, 0% 2%);
  }
  12.51% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 2%, 0% 2%, 0% 4%, 0% 4%);
  }
  25% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 2%, 100% 2%, 100% 4%, 0% 4%);
  }
  25.01% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 4%, 0% 4%, 0% 8%, 0% 8%);
  }
  37.5% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 4%, 100% 4%, 100% 8%, 0% 8%);
  }
  37.51% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 8%, 0% 8%, 0% 16%, 0% 16%);
  }
  50% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 8%, 100% 8%, 100% 16%, 0% 16%);
  }
  50.01% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 16%, 0% 16%, 0% 32%, 0% 32%);
  }
  62.5% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 16%, 100% 16%, 100% 32%, 0% 32%);
  }
  62.51% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 32%, 0% 32%, 0% 64%, 0% 64%);
  }
  75% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 32%, 100% 32%, 100% 64%, 0% 64%);
  }
  75.01% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 64%, 0% 64%, 0% 100%, 0% 100%);
  }
  87.5% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 64%, 100% 64%, 100% 100%, 0% 100%);
  }
  87.51% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%,
      0% 100%
    );
  }
}

table, th, td {
  border: 1px solid black;
  padding:3px;
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
