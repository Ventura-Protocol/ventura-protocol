# ventura-protocol
Monorepo for Ventura Protocol

- [`app`](./packages/app): web client
- [`core/pledges`](./packages/core/pledges): core smart contracts for pledges
## Local dev
To run the app and contract locally go into each package and run:

 `npm i` followed by `npm run dev`

In pledges project it spins up a local hardhat node and deploys the contract locally saving a .json file to the front-end folder.

In app folder `npm run dev` command start up next.js. 

To make smart contract work with *metamask* you need to go into advanced and click on Reset account, as otherwise you will get an error regarding nonce being not at 0.

Currently only the save button on the bottom of the page works, and produces 2 transactions to save an "Ask" and create an additonal "Pledge", results of which should appear in the Chrome dev console.