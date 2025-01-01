// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {FundMe} from "../src/FundMe.sol";

contract DeployFundMe is Script {
    // Deploy here:
    function run() external returns (FundMe) {
        vm.startBroadcast();
        FundMe fundme = new FundMe();
        vm.stopBroadcast();
        return fundme;
    }
}
