import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const keys = require('../config/keys');

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),keys.address);

export default instance;