// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract LetsCurate {
       struct Item {
        address payable publisher;
        uint8 curationPolicyCode;
    }

    constructor() {
        console.log("Deploying a LetsCurate contract");
    }

}
