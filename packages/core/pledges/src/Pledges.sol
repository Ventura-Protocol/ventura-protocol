// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract Pledges {
    struct Pledge {
        address addr;
        uint amount;
    }
    
    struct Ask {
        bytes32 cid;
        address token;
        uint totalAmount;
        uint32 totalPledges;
        mapping(uint32 => Pledge) pledges;
        mapping(address => uint32) pledgesByAddress;
    }
    
    struct Handle {
        uint32 totalAsks;
        mapping(uint32 => Ask) asks;
        mapping(bytes32 => uint32) asksByAskHash;
    }
    
    mapping(bytes32 => Handle) public handles;
    
    event HandleSet(bytes32 indexed handle);
    event AskSet(bytes32 indexed handle, bytes32 indexed cid, address indexed token);
    event PledgeSet(bytes32 indexed handle, uint32 indexed ask, uint indexed pledgeAmount);
    
    function addAsk(bytes32 _handle, bytes32 _cid, address _token, uint _pledgeAmount) public {
        bytes32 askHash = keccak256(abi.encodePacked(_cid, _token));
        uint32 totalAsks = handles[_handle].totalAsks;
        //checking that this combination of cid and token hasn't existed before (don't want people creating duplicates)
        require(handles[_handle].asksByAskHash[askHash] == 0);
        
        if (totalAsks == 0) {
            emit HandleSet(_handle);
        }
        
        // creating Ask
        handles[_handle].asks[1].cid = _cid;
        handles[_handle].asks[1].token= _token;
        handles[_handle].asks[1].totalAmount = _pledgeAmount;
        handles[_handle].asks[1].pledgesByAddress[msg.sender] = 1;
        handles[_handle].asks[1].totalPledges = 1;
        
        // creating Pledge
        handles[_handle].asks[1].pledges[1].addr = msg.sender;
        handles[_handle].asks[1].pledges[1].amount = _pledgeAmount;
        
        // creating/updating Handle
        handles[_handle].asksByAskHash[askHash] = totalAsks + 1;
        handles[_handle].totalAsks++;
        
        emit AskSet(_handle, _cid, _token);
        emit PledgeSet(_handle, 1, _pledgeAmount);
    }
    
    function addPledge(bytes32 _handle, uint32 _ask, uint _pledgeAmount) public {
        uint32 totalPledges = handles[_handle].asks[_ask].totalPledges;
        // checking that Ask has at least 1 pledge
        require(totalPledges > 0);
        // checking that the next empty mapping is truly empty
        require(handles[_handle].asks[_ask].pledges[totalPledges + 1].addr == address(0));
        
        
        uint totalAmount = handles[_handle].asks[_ask].totalAmount;
        uint32 pledgeIndex;
        
        // if pledge already exist from this address, they can only increase the amount on existing pledge
        if (handles[_handle].asks[_ask].pledgesByAddress[msg.sender] == 0) {
            pledgeIndex = totalPledges + 1;
        } else {
            pledgeIndex = handles[_handle].asks[_ask].pledgesByAddress[msg.sender];
            require(handles[_handle].asks[_ask].pledges[pledgeIndex].amount < _pledgeAmount);
        }
        
        // adding a Pledge
        handles[_handle].asks[_ask].pledges[pledgeIndex].addr = msg.sender;
        handles[_handle].asks[_ask].pledges[pledgeIndex].amount = _pledgeAmount;
        
        // updating Ask
        handles[_handle].asks[_ask].totalAmount = totalAmount + _pledgeAmount;
        handles[_handle].asks[_ask].pledgesByAddress[msg.sender] = totalPledges + 1;
        handles[_handle].asks[_ask].totalPledges++;
        
        // event for EVM logging
        emit PledgeSet(_handle, _ask, _pledgeAmount);
    }
    
    function getAsk(bytes32 _handle, uint32 _ask) public view returns 
        (bytes32 cid, address token, uint totalAmount, uint32 totalPledges) {
        return (
            handles[_handle].asks[_ask].cid, 
            handles[_handle].asks[_ask].token, 
            handles[_handle].asks[_ask].totalAmount,
            handles[_handle].asks[_ask].totalPledges
        );
    }
    
    function getPledge(bytes32 _handle, uint32 _ask, uint32 _pledge) public view returns 
        ( address addr, uint amount) {
        return (
            handles[_handle].asks[_ask].pledges[_pledge].addr, 
            handles[_handle].asks[_ask].pledges[_pledge].amount
        );
    }
}