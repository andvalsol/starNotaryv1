import {default as Web3} from "web3";
import {default as contract} from "truffle-contract"

import StarNotaryArtifact from "../../build/contracts/StarNotary.json"


const StarNotary = contract(StarNotaryArtifact)

let accounts
let account

const starName = async () => {
    const instance = await StarNotary.deployed()
    const response = await instance.name.call()
    const owner = document.getElementById("name")
    owner.innerHTML = response
}

const starOwner = async () => {
    const instance = await StarNotary.deployed()
    const response = await instance.starOwner.call()
    const owner = document.getElementById("owner")
    owner.innerHTML = response
}

const claimStar = async () => {
    const instance = await StarNotary.deployed()
    await instance.claimStar({from: account})
    await instance.starOwner.call()
    App.setStatus("New star owner is: " + account)
}

const App = {
    start: async function () {
        const {web3} = this;

        StarNotary.setProvider(web3.currentProvider) // Provider is how the web 3 talks to the Blockchain

        await web3.eth.getAccounts((error, accs) => {
            if (error != null) {
                alert("There was an error fetching the accounts")
                return
            }

            if (accs.length === 0) {
                alert("Couldn't get any accounts")
                return
            }

            accounts = accs
        })
    },

    setStatus: function (message) {
        const status = document.getElementById("status");
        status.innerHTML = message;
    },

    starName: function () {
        starName()
    },

    starOwner: function () {
        starOwner()
    },

    claimStar: function () {
        claimStar()
    }
};

window.App = App;

window.addEventListener("load", function () {
    if (window.ethereum) {
        // use MetaMask's provider
        App.web3 = new Web3(window.ethereum);
        window.ethereum.enable(); // get permission to access accounts
    } else {
        console.warn(
            "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
        );
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        App.web3 = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
    }

    App.start();
});
