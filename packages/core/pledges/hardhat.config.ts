/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';

const config: HardhatUserConfig = {
  solidity: "0.7.6",
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: 'src',
  },
};
export default config;