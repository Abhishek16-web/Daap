// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery{
    address payable[] public participants;
    address public manager;

    constructor(){
        manager = msg.sender;
    }
    receive() external payable{}

    function Transfer() external payable{
        participants.push(payable(msg.sender));
    }
    function random() public view returns(uint){
       return uint( keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants.length)));
    }
    function Withdraw() external{
        require(msg.sender == manager);
        require(participants.length >= 3);
        uint r = random();
        address payable winner;
        uint index = r%participants.length;
        winner = participants[index];
        winner.transfer(getBalance());
        participants = new address payable[](0);
        // payable(msg.sender).transfer(WithdrawAmount);
        
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }
    function Length() external view returns(uint){
        return participants.length;
    }
}