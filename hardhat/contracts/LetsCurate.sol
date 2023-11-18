// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract LetsCurate {
    uint public constant STAKE_SIZE = 0.001 ether;
    uint public constant JURY_SIZE = 3;
    uint public constant VOTING_PERIOD = 30;

    uint256 public curationPolicyCounter;
    mapping(string => Item) public itemCIDs_itemStructs;

    event NewCurationPolicy(uint256 indexed curationPolicyCode, string policy);
    event NewItem(string indexed itemCID, uint256 indexed curationPolicyCode);
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
        uint[] lastVotes;
        uint curationScore;
        uint numberOfCurationRounds;
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
        require(curationPolicyCode < curationPolicyCounter, 'This curation policy does not exist.');

        emit NewItem(itemCID, curationPolicyCode);
    }

    function conductJuryDraw(string calldata itemCID) external {
        require(itemCIDs_itemStructs[itemCID].state == ItemState.New);

        emit NewJuryDraw(itemCID, block.prevrandao);

        itemCIDs_itemStructs[itemCID].lastLuckyNumber = block.prevrandao;
        transitionToNextState(itemCID);
    }

    function announceJuryParticipation(string calldata itemCID) public payable {
        Item storage item = itemCIDs_itemStructs[itemCID];

        require(itemCIDs_itemStructs[itemCID].state == ItemState.DrawingJury);
        require(msg.value >= STAKE_SIZE, 'You must stake $STAKE_SIZE ether to participate in the jury.');
        payable(msg.sender).transfer(msg.value - STAKE_SIZE);

        uint ticketNumber = uint(keccak256(abi.encodePacked(msg.sender, item.lastLuckyNumber))); // TODO: check for vulnerabilities
        uint tolerance = (type(uint).max / 128) * (block.number - item.lastStateChangeBlockNumber); // Tolerance starts at max/128 and grows linearly with every block.
        require(
            abs(int(ticketNumber) - int(item.lastLuckyNumber)) <= tolerance,
            'This jury candidate is not eligible yet. Try again later.'
        );

        item.lastJuryMembers.push(msg.sender);

        if (item.lastJuryMembers.length == JURY_SIZE) {
            transitionToNextState(itemCID);
            item.numberOfCurationRounds++;
        }

        emit NewJuryMember(itemCID, msg.sender);
    }

    function transitionToNextState(string calldata itemCID) internal {
        Item storage item = itemCIDs_itemStructs[itemCID];

        item.state = ItemState(uint(item.state) + 1);
        item.lastStateChangeBlockNumber = block.number;
        emit StateChange(itemCID, item.state);
    }

    function endVotingPeriod(string calldata itemCID) public {
        Item storage item = itemCIDs_itemStructs[itemCID];

        require(item.state == ItemState.AwaitingVotes);
        bool isAllVotesCast = true;
        // if all votes have been cast, then the voting period is over
        for (uint i = 0; i < JURY_SIZE; i++) {
            if (item.lastVotes[i] == 0) {
                isAllVotesCast = false;
                break;
            }
        }
        require(
            block.number - itemCIDs_itemStructs[itemCID].lastStateChangeBlockNumber >= VOTING_PERIOD || isAllVotesCast
        );

        transitionToNextState(itemCID);
        executeRewardsAndPenalties(itemCID);
    }

    function castVote(string calldata itemCID, uint position, uint vote) external {
        require(itemCIDs_itemStructs[itemCID].state == ItemState.AwaitingVotes, 'Not awaiting votes.');
        require(msg.sender == itemCIDs_itemStructs[itemCID].lastJuryMembers[position], 'You are not a jury member.');
        require(
            VOTING_PERIOD > block.number - itemCIDs_itemStructs[itemCID].lastStateChangeBlockNumber,
            'Voting period has ended.'
        );

        itemCIDs_itemStructs[itemCID].lastVotes[position] = vote;
    }

    function executeRewardsAndPenalties(string calldata itemCID) internal {
        Item storage item = itemCIDs_itemStructs[itemCID];
        uint sum = 0;
        for (uint i = 0; i < item.lastVotes.length; i++) {
            sum += item.lastVotes[i];
        }
        uint average = sum / item.lastVotes.length;
        item.curationScore = average;

        uint sumOfSquaredDifferences = 0;
        for (uint i = 0; i < item.lastVotes.length; i++) {
            sumOfSquaredDifferences += (item.lastVotes[i] - average) ** 2;
        }
        uint standardDeviation = sqrt(sumOfSquaredDifferences / item.lastVotes.length);

        uint numberOfRewardableJuryMembers = 0;
        for (uint i = 0; i < item.lastVotes.length; i++) {
            if (abs(int(item.lastVotes[i]) - int(average)) <= standardDeviation) {
                numberOfRewardableJuryMembers++;
            }
        }
        uint rewardPool = (item.lastJuryMembers.length - numberOfRewardableJuryMembers) * STAKE_SIZE;

        uint reward = rewardPool / numberOfRewardableJuryMembers;
        for (uint i = 0; i < item.lastVotes.length; i++) {
            if (abs(int(item.lastVotes[i]) - int(average)) <= standardDeviation) {
                payable(item.lastJuryMembers[i]).transfer(reward);
            }
        }
    }

    function sqrt(uint x) internal pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function abs(int x) internal pure returns (uint) {
        return uint(x >= 0 ? x : -x);
    }
}
