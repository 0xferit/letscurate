// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract LetsCurate {
    uint256 public curationPolicyCounter;

    struct Item {
        address payable publisher;
        uint16 curationPolicyCode;
    }

    event CurationPolicy(uint256 indexed curationPolicyCode, string policy);

    /// @notice Create a new curation policy.
    /// @param curationPolicy IPFS content identifier of the curation policy.
    function newCurationPolicy(string memory curationPolicy) public {
        require(
            curationPolicyCounter + 1 != 0,
            "No space left for a new curation policy"
        );

        emit CurationPolicy(curationPolicyCounter, curationPolicy);

        curationPolicyCounter++;
    }

    constructor() {
        console.log("Deploying a LetsCurate contract");
    }
}
