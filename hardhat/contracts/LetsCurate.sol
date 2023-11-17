// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract LetsCurate {
    uint256 public curationPolicyCounter;
    uint256 public itemCounter;
    uint public constant STAKE_SIZE = 0.001 ether;
    mapping(address => bool) isJuryCandidate;
    mapping(string => ItemState) itemCIDs_itemStates;

    event NewCurationPolicy(uint256 indexed curationPolicyCode, string policy);
    event NewItem(string indexed itemCID, uint256 indexed curationPolicyCode);
    event NewJuryCandidate(address indexed juryCandidate);
    event ResignJuryCandidate(address indexed juryCandidate);
    event NewJuryDraw(string indexed itemCID, uint luckyNumber);
    event NewJuryMember(string indexed itemCID, address indexed juryMember);

    enum ItemState {
        New,
        DrawingJury,
        Curated
    }

    struct Item {
        ItemState state;
    }

    constructor() {
        console.log('Deploying a LetsCurate contract');
    }

    /// @notice Create a new curation policy.
    /// @param curationPolicyCID IPFS content identifier of the curation policy.
    function createCurationPolicy(string memory curationPolicyCID) external {
        require(curationPolicyCounter + 1 != 0, 'No storage space left for a new curation policy.');

        emit NewCurationPolicy(curationPolicyCounter++, curationPolicyCID);
    }

    /// @notice Create a new item.
    /// @param itemCID Unique identifier of an item in IPFS content identifier format.
    /// @param curationPolicyCode The curation policy of this new item.
    function createNewItem(string calldata itemCID, uint8 curationPolicyCode) external {
        require(curationPolicyCode < curationPolicyCounter, 'This curation polic does not exist.');

        emit NewItem(itemCID, curationPolicyCode);
    }

    /// @notice Become a jury candidate.
    function becomeJuryCandidate() external {
        if (!isJuryCandidate[msg.sender]) {
            isJuryCandidate[msg.sender] = true;
            emit NewJuryCandidate(msg.sender);
        }
    }

    /// @notice Resign as a jury candidate.
    function resignJuryCandidate() external {
        if (isJuryCandidate[msg.sender]) {
            isJuryCandidate[msg.sender] = false;
            emit ResignJuryCandidate(msg.sender);
        }
    }

    function conductJuryDraw(string calldata itemCID) external {
        require(itemCIDs_itemStates[itemCID] != ItemState.DrawingJury);
        emit NewJuryDraw(itemCID, block.prevrandao);
        itemCIDs_itemStates[itemCID] = ItemState.DrawingJury;
    }

    function announceJuryParticipation(string calldata itemCID) external {
        require(itemCIDs_itemStates[itemCID] == ItemState.DrawingJury);
        // Check eligiblity
        payable(address(this)).transfer(STAKE_SIZE);

        emit NewJuryMember(itemCID, msg.sender);
    }
}
