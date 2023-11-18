// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract LetsCurate {
    uint public constant STAKE_SIZE = 0.001 ether;
    uint public constant JURY_SIZE = 3;

    uint256 public curationPolicyCounter;
    uint256 public itemCounter;
    mapping(address => bool) isJuryCandidate;
    mapping(string => Item) itemCIDs_itemStructs;

    event NewCurationPolicy(uint256 indexed curationPolicyCode, string policy);
    event NewItem(string indexed itemCID, uint256 indexed curationPolicyCode);
    event NewJuryCandidate(address indexed juryCandidate);
    event ResignJuryCandidate(address indexed juryCandidate);
    event NewJuryDraw(string indexed itemCID, uint luckyNumber);
    event NewJuryMember(string indexed itemCID, address indexed juryMember);
    event StateChange(string indexed itemCID, ItemState newState);

    enum ItemState {
        New,
        DrawingJury,
        AwaitingVotes,
        Curated
    }

    struct Item {
        ItemState state;
        uint lastStateChangeBlockNumber;
        uint lastLuckyNumber;
        address[] lastJuryMembers;
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
        require(itemCIDs_itemStructs[itemCID].state == ItemState.DrawingJury);

        emit NewJuryDraw(itemCID, block.prevrandao);

        itemCIDs_itemStructs[itemCID].lastLuckyNumber = block.prevrandao;
        transitionToNextState(itemCID);
    }

    function announceJuryParticipation(string calldata itemCID) external {
        Item storage item = itemCIDs_itemStructs[itemCID];

        require(itemCIDs_itemStructs[itemCID].state == ItemState.DrawingJury);
        uint ticketNumber = uint(keccak256(abi.encodePacked(msg.sender, item.lastLuckyNumber))); // TODO: check for vulnerabilities
        uint tolerance = 1 << (block.number - item.lastStateChangeBlockNumber); // Tolerance starts at 1 and doubles every block
        require(
            ticketNumber > item.lastLuckyNumber - tolerance || ticketNumber < item.lastLuckyNumber + tolerance,
            'This jury candidate is not eligible yet. Try again later.'
        );

        payable(address(this)).transfer(STAKE_SIZE);
        item.lastJuryMembers.push(msg.sender);

        if (item.lastJuryMembers.length == JURY_SIZE) {
            transitionToNextState(itemCID);
        }

        emit NewJuryMember(itemCID, msg.sender);
    }

    function transitionToNextState(string calldata itemCID) internal {
        Item storage item = itemCIDs_itemStructs[itemCID];

        item.state = ItemState(uint(item.state) + 1);
        item.lastStateChangeBlockNumber = block.number;
        emit StateChange(itemCID, item.state);
    }
}
