const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    process.env.REACT_APP_PV_KEY, process.env.REACT_APP_INFURA_KEY
);

const web3 = new Web3(provider);

const deploy = async () =>{
    try{
        const accounts = await web3.eth.getAccounts();

        const results = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).deploy({data: compiledFactory.bytecode}).send({gas: '2000000',from: accounts[0]});
    
        console.log('Contract deployed to', results.options.address)
    } catch(e){
        console.log(e)
    }

};

deploy();