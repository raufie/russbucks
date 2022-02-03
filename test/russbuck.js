const RussBuck = artifacts.require('RussBuck')
contract('RussBuck', (accounts)=>{
    // contexts
        // russbuck creation (buying)
        // russbuck withdrawl
        // russbuck transfer

    // It should buy russbucks using eth
    // It should 
    // It should transfer russbucks from one account to another
    let [creator,alice, bob] = accounts;
    let instance;
    let gasPrice = 20000000000
    beforeEach(async ()=>{
        instance = await RussBuck.deployed();
    });
    context("with the russbuck creation scenario", async ()=>{
        it("should buy russbucks from eth", async ()=>{
            let tx1 =await instance.buyRb({from:alice, value:1});
            let aliceBalance = await instance.balanceOf(alice)
            assert.equal(aliceBalance.toString(),'100')
            
            let tx2 = await  instance.buyRb({from:alice, value:100});
            aliceBalance = await instance.balanceOf(alice)
            assert.equal(aliceBalance.toString(),'10100')
            
            let tx3 = await instance.buyRb({from:alice, value:web3.utils.toWei("5", 'ether')});
            aliceBalance = await instance.balanceOf(alice)

            assert.equal(aliceBalance.toString(),"500000000000000010100")

            assert.equal(tx1.receipt.status, true)
            assert.equal(tx2.receipt.status, true)
            assert.equal(tx3.receipt.status, true)            
        })
    })
    context("with the russbuck withdrawl context", async ()=>{
        it("it should be able to return money in eth given some rb", async ()=>{
            // await instance.buyRb({from:alice, value:100})
            // // get account bal before doing tx
            // let balBefore = new web3.utils.BN(web3.eth.getBalance(alice))
            // perform withdrawl
            let tx = await instance.withdrawInEth(10000, {from:alice});
            // let gasUsed = new web3.utils.BN(tx.receipt.gasUsed)
            // let expectedPrice = balBefore.subtract(gasUsed).mul(new web3.utils.BN(gasPrice)).add( new web3.utils.BN(10000))
            // // get account bal after tx
            // let balAfter = await web3.eth.getBalance(alice)
            // balAfter = new web3.utils.BN(balAfter)
            // // 
            // console.log("BROOO")
            // console.log(tx.receipt.status)
            // assert.equal(balAfter.toString(), expectedPrice.toString())
            assert.equal(tx.receipt.status, true)
        })
        it("should not allow the withdrawl when russbucks are not enough", async ()=>{
            await instance.buyRb({from:alice, value:100})
            try {
            let tx = await instance.withdrawInEth(web3.utils.toWei("1000", "ether"), {from:alice});
            assert(false)
            }catch (error){
                assert.equal(error.message,"Returned error: VM Exception while processing transaction: revert not enough funds -- Reason given: not enough funds.")
            }
            
        })
        it("should give an error when enough eth is not available for withdrawl", async()=>{
            try {
            let tx = await instance.withdrawInEth(web3.utils.toWei("1000", "ether"), {from:creator});
            }catch (error){
                assert(error.message,'Returned error: VM Exception while processing transaction: revert not enough funds -- Reason given: not enough funds.')
            }
            
        })
    })
    context('with transfer context', async ()=>[
        it("should transfer russbucks from one account to another", async ()=>{
            // add russbucks to alice
            await instance.buyRb({from:alice, value:1})
            // add russbucks to bob
            await instance.buyRb({from:bob, value:1})
            // act :transfer russbucks from alice to bob
            let tx = await instance.transfer(bob, 100, {from:alice})
            // assert: check whether bob has given russbucks
            assert.equal(tx.receipt.status, true)
            let newBobBalance = await instance.balanceOf(bob)
            assert.equal(newBobBalance.toNumber(), 200)
        })
        
    ])
    
})