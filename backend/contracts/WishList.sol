// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

error NotEnoughFunds();
error AlreadyBought();

contract WishList {

    // VARIABLES
     // @notice Struct of Item
    struct Item {
        uint16 itemId;
        string name;
        uint256 price;
        bool isBought;
        address buyer;
    }

     // @notice Counter of _itemIds
    uint16 public _itemIds;

     // @notice Mapping wishList
    mapping(address => Item[]) private wishList;
   
    // FUNCTIONS
    // Function 1 - addToWishList
    function addToWishList(string calldata _name, uint256 _price) external{
        // 1) Incrementation
        _itemIds++;
        uint16 newItemId = _itemIds;
        Item memory newItem = Item({itemId: newItemId, name: _name, price: _price, isBought: false, buyer: address(0)});
        wishList[msg.sender].push(newItem);
    }

// Function 2 - buyItem
function buyItem(address _for, uint16 _itemId) external payable {
    require(_for != address(0), "Invalid address");
    
    uint16 key = getKeyByAddressAndItemId(_for, _itemId);
   
    Item storage item = wishList[_for][key];
   
    if(msg.value < item.price) {
        revert NotEnoughFunds();
    }
    if(item.isBought) {
        revert AlreadyBought();
    }

    item.isBought = true;
    item.buyer = msg.sender;
    (bool sent,) = _for.call{value: msg.value}('');
    require(sent, "Failed to send Ether");
}

// Function 3 - getWishList
function getWishList(address _of) external view returns(Item[] memory){
    return wishList[_of];
}

// Function 4 (private) - getKeyByAddressAndItemId
function getKeyByAddressAndItemId(address _for, uint16 _itemId) internal view returns(uint16){
    uint16 result = 0;
    for(uint16 i = 0; i < wishList[_for].length; i++){
        if(wishList[_for][i].itemId == _itemId){
            result = i;
        }
        
    }
    return result;
}
}
