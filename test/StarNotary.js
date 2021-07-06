const StarNotary = artifacts.require("./StarNotary.sol")


contract("StarNotary", async (accounts) => {
    it("When the contract is first deployed, then the initial star name should be Genesis Star", async () => {
        const instance = await StarNotary.deployed()
        assert.equal(await instance.name.call(), "Genesis Star")
    })

    it("A star can be claimed", async () => {
        const instance = await StarNotary.deployed()
        const owner = accounts[0]
        await instance.claimStar({ from: owner})

        const newOwner = await instance.starOwner.call()

        assert.equal(newOwner, owner)
    })

    it("Given a particular star, when a user wants the change the owner of the star, then the owner should change", async () => {
        const instance = await StarNotary.deployed()
        const secondAccount = accounts[1]
        const firstAccount = accounts[0]

        let owner

        await instance.claimStar({ from: firstAccount })

        owner = await instance.starOwner.call()

        assert.equal(owner, firstAccount)

        await instance.claimStar({ from: secondAccount })

        owner = await instance.starOwner.call()

        assert.equal(owner, secondAccount)
    })
})
