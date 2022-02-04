const ConvertLib =  artifacts.require("ConvertLib");
const RussBuck = artifacts.require("RussBuck");

module.exports = function(deployer){
    deployer.deploy(ConvertLib)
    deployer.link(ConvertLib, RussBuck)
    deployer.deploy(RussBuck, 100000)
    
}