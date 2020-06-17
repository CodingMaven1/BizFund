import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    //On Browser with metamask
    web3 = new Web3(window.web3.currentProvider)
    window.ethereum.enable()
}
else{
    //No metamask
    const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_KEY);
    web3 = new Web3(provider) 
}

export default web3;