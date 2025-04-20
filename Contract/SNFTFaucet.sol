// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SNFTFaucet {
    address public owner;
    uint256 public amountPerRequest = 0.05 ether; // 0.05 SNFT per request
    uint256 public cooldownTime = 1 days; // 1 day cooldown between requests
    mapping(address => uint256) public lastAccessTime;

    event TokensDispensed(address indexed recipient, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Function to receive SNFT
    receive() external payable {}

    // Function to request tokens
    function requestTokens(address payable _recipient) external {
        require(
            block.timestamp - lastAccessTime[_recipient] >= cooldownTime,
            "You need to wait before requesting again"
        );
        require(
            address(this).balance >= amountPerRequest,
            "Faucet is empty"
        );

        lastAccessTime[_recipient] = block.timestamp;
        
        (bool sent, ) = _recipient.call{value: amountPerRequest}("");
        require(sent, "Failed to send SNFT");
        
        emit TokensDispensed(_recipient, amountPerRequest);
    }

    // Function to withdraw all tokens (only owner)
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool sent, ) = payable(owner).call{value: balance}("");
        require(sent, "Failed to withdraw SNFT");
    }

    // Function to update amount per request (only owner)
    function setAmountPerRequest(uint256 _amount) external onlyOwner {
        amountPerRequest = _amount;
    }

    // Function to update cooldown time (only owner)
    function setCooldownTime(uint256 _cooldown) external onlyOwner {
        cooldownTime = _cooldown;
    }
}