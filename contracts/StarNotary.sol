pragma solidity ^0.5.16;

contract StarNotary {
    string public name;
    address public starOwner;

    event startClaimed(address owner);

    constructor() public {
        name = "Genesis Star";
    }

    function claimStar() public {
        starOwner = msg.sender;
        emit startClaimed(msg.sender);
    }
}
