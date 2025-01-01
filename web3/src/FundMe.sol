// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

/**
 * @title A Crowdfunding Contract
 * @author Arun Singh Bisht - mr_bob
 * @notice This contract allows users to create and fund campaigns for supporting projects.
 * @dev Implements basic crowdfunding functionality where users can create campaigns, fund them, and track the funds raised.
 */

contract FundMe {
    // Custom Errors:
    error Campaign_TransferFailed();
    error Campaign_DeadLineTooEarly();
    error Campaign_Ended();

    // Campaign - Type Declarations
    struct Campaign {
        address owner;
        string title;
        string description;
        string image;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] funders;
        uint256[] donations;
    }

    // State Variables:
    mapping(uint256 => Campaign) public campaigns;
    uint256 public numOfCampaigns = 0;

    // Events:
    event CampaignCreated(address indexed campaign_owner);

    // Funtions:
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numOfCampaigns];

        campaign.owner = _owner;
        campaign.description = _description;
        campaign.title = _title;
        campaign.image = _image;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;

        if (_deadline <= block.timestamp) {
            revert Campaign_DeadLineTooEarly();
        }

        numOfCampaigns++;

        emit CampaignCreated(campaign.owner);

        return numOfCampaigns - 1;
    }

    function fundToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        if (block.timestamp > campaign.deadline) {
            revert Campaign_Ended();
        }

        campaign.funders.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;

        // Transfer:
        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");
        if (!sent) {
            revert Campaign_TransferFailed();
        }
    }

    function getFunders(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].funders, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory totalCampaigns = new Campaign[](numOfCampaigns);

        for (uint256 i = 0; i < numOfCampaigns; i++) {
            totalCampaigns[i] = campaigns[i];
        }

        return totalCampaigns;
    }
}
