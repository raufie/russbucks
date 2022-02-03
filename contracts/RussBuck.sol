// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ConvertLib.sol";

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract RussBuck is ERC20 {
    constructor(uint256 initial_supply) public ERC20("RussBuck", "RB") {
        _mint(msg.sender, initial_supply);
    }

    modifier hasEnoughFunds(uint256 amount) {
        require(balanceOf(msg.sender) >= amount, "not enough funds");
        require(
            ConvertLib.convertToEth(amount) <= address(this).balance,
            "we don't have eth to pay you"
        );
        require(amount >= 100, "Value in eth can not be less than 1 Wei");
        _;
    }

    function buyRb() public payable {
        // 1 RussBuck = 0.01 Eth
        // convert eth value into russbucks
        // add russbucks to the sender address
        uint256 convertedRussBucks = ConvertLib.convertToRB(msg.value);
        _mint(msg.sender, convertedRussBucks);
    }

    function withdrawInEth(uint256 amount)
        external
        hasEnoughFunds(amount)
        returns (bool)
    {
        payable(msg.sender).transfer(amount);
        return true;
    }
}
