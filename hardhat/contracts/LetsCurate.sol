// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract LetsCurate {
    uint256 public curationPolicyCounter;
    uint256 public itemCounter;
    mapping(address => bool) isJuryCandidate;

    event NewCurationPolicy(uint256 indexed curationPolicyCode, string policy);
    event NewItem(string indexed itemCID, uint256 indexed curationPolicyCode);
    event NewJuryCandidate(address indexed juryCandidate);
    event ResignJuryCandidate(address indexed juryCandidate);

    constructor() {
        console.log('Deploying a LetsCurate contract');
    }

    /// @notice Create a new curation policy.
    /// @param curationPolicyCID IPFS content identifier of the curation policy.
    function createCurationPolicy(string memory curationPolicyCID) public {
        require(curationPolicyCounter + 1 != 0, 'No storage space left for a new curation policy.');

        emit NewCurationPolicy(curationPolicyCounter++, curationPolicyCID);
    }

    /// @notice Create a new item.
    /// @param itemCID Unique identifier of an item in IPFS content identifier format.
    /// @param curationPolicyCode The curation policy of this new item.
    function createNewItem(string calldata itemCID, uint8 curationPolicyCode) external payable {
        require(curationPolicyCode < curationPolicyCounter, 'This curation polic does not exist.');

        emit NewItem(itemCID, curationPolicyCode);
    }

    /// @notice Become a jury candidate.
    function becomeJuryCandidate() external payable {
        if (!isJuryCandidate[msg.sender]) {
            isJuryCandidate[msg.sender] = true;
            emit NewJuryCandidate(msg.sender);
        }
    }

    /// @notice Resign as a jury candidate.
    function resignJuryCandidate() external payable {
        if (isJuryCandidate[msg.sender]) {
            isJuryCandidate[msg.sender] = false;
            emit ResignJuryCandidate(msg.sender);
        }
    }
}
