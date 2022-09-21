// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    // Define a new event to emit when a memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received from friends
    Memo[] memos;

    // State variable - address of contract deployer
    address payable owner;

    // Deploy logic - only runs once, on deployment
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev buy a coffee for the contract owner
     * @param _name name of the coffee buyer
     * @param _message a nice message from the coffee buyer
     */
    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "Can't buy coffee with 0 eth");

        // Add the memo to storage
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        // Emit a log event when a new memo is created
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev send the entire balance stored in this contract to the owner
     */
    function withdrawTips() public {
        // funds are stored in this contract
        // address(this).balance
        require(owner.send(address(this).balance));
    }

    /**
     * @dev retrieve all the memos received and stored on the blockchain
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
