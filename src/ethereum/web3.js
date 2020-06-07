import Web3 from 'web3';
const keys = require('../config/keys');

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    //On Browser with metamask
    web3 = new Web3(window.web3.currentProvider)
    window.ethereum.enable()
}
else{
    //On Server or No metamask
    const provider = new Web3.providers.HttpProvider(keys.infurakey);
    web3 = new Web3(provider) 
}

export default web3;