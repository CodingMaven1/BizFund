import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),'0xd39aBC7A8d01859Ab538763dae877BFB670029F9');

export default instance;