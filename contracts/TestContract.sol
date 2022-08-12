// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

// use this contract to build something awesome for the hackathon :)
contract TestContract {

    address payable public owner;


    constructor() payable {
        owner = payable(msg.sender);
    }

    function beginLoan() public {
        // require(msg.sender == owner, "You aren't the owner");

    }
}
