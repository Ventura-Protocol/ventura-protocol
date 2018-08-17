import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';

// Ensure that we have all the environment variables we need.
const MAINNET_RPC_URL: string | undefined = process.env.MAINNET_RPC_URL;
if (!MAINNET_RPC_URL) {
  throw new Error("Please set your MAINNET_RPC_URL in a .env file");
}

const MAINNET_ACCOUNT_KEY: string | undefined = process.env.MAINNET_ACCOUNT_KEY;
if (!MAINNET_ACCOUNT_KEY) {
  throw new Error("Please set your MAINNET_ACCOUNT_KEY in a .env file");
}


const config: HardhatUserConfig = {
  solidity: "0.7.6",
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: 'src',
  },
  networks: {
    polygon: {
      url: MAINNET_RPC_URL,
      accounts: [MAINNET_ACCOUNT_KEY]
    }
  }
};
export default config;