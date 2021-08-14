// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.6;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/vendor/Ownable.sol";

contract APIConsumer is ChainlinkClient, Ownable {

    uint256 public available_eth;

    uint chain_id; // 1 for ethereum mainnet
    address private caller_address; // address for wallet to lookup

    // find oracles on market.link
    address private oracle; // Chainlink node that a contract makes an API call from
    // need gethttps jobid for specific oracle
    bytes32 private jobId; // specific job for node to run
    uint256 private fee; // fee for job - usually 0.1 LINK!?!

    constructor(uint _chain_id, address _caller_address,
                address _oracle, string memory _jobId, uint256 _fee, address _link) public {
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }

        chain_id = _chain_id;
        caller_address = _caller_address;

        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
        fee = _fee;
    }

    /**
     * Create a Chainlink request to retrieve API response and find the target data
     */
    function requestTokenData() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        string memory url = string(abi.encodePacked(string("https://api.covalenthq.com/v1/"), uintToString(chain_id),
                                            string("/address/"), addrToString(caller_address), 
                                            string("/balances_v2/?key=ckey_fc9526f14768425baeda571c9c7")));
        // Set the URL to perform the GET request on
        request.add("get", url);

        // Set the path to find the desired data in the API response, where the response format is:
        // {"data":
        //   {"items": [
        //    {"contract_ticker_symbol": "ETH",..., "balance": "xxx",...
        //    }]
        //   }
        //  }
        request.add("path", "data.items.0.balance");

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _eth) public recordChainlinkFulfillment(_requestId)
    {
        available_eth = _eth;
    }

    /**
     * Withdraw LINK from this contract
     *
     */
    function withdrawLink() external onlyOwner {
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    /**
     * @dev converts uint to string
     */
    function uintToString(uint v) constant returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        str = string(s);
    }

    /**
     * @dev converts address to string
     */
    function addrToString(address addr) returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++) {
            b[i] = byte(uint8(uint(addr) / (2**(8*(19 - i)))));
        }
        return string(b);
    }

}