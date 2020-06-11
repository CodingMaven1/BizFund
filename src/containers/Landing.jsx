import React from "react";

import web3 from '../ethereum/web3';
import Campaign from '../ethereum/build/Campaign.json';
import factory from '../ethereum/factory';
import Card from '../components/Card/Card';


class CampaignLanding extends React.Component {

    state = {
        campaignsArr: [],
        pos: 0
    }

    async componentDidMount(){
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        let campaignsArr = []
        campaigns.map(async (obj,idx) => {
            const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), obj);
            const name = await campaign.methods.name().call();
            const details = await campaign.methods.details().call();
            const manager = await campaign.methods.manager().call();
            const min = await campaign.methods.minimumContribution().call();
            const req = await campaign.methods.required().call();
            const backers = await campaign.methods.approversCount().call();
            const arr = [name,details,manager,min,req, backers] 
            campaignsArr.push(arr)
            this.setState({campaignsArr: campaignsArr})
        })
    }

    keyPressHandler = (event) => {
        console.log(event.which)
        let {pos, campaignsArr} = this.state;
        if(event.which === 37){
            if(pos === 0){
                return;
            }
            else{
                pos = pos - 1 
                this.setState({pos})
            }
        }
        else if(event.which === 39){
            if(pos === (campaignsArr.length -1)){
                return;
            }
            else{
                pos = pos + 1
                this.setState({pos})
            }
        }
    }

    render(){
        let {campaignsArr, pos} = this.state;

        let obj = campaignsArr[pos]
        let content;
        if(campaignsArr.length === 0){
            content = <h1 style={{color: '#f9dc5c', fontWeight: 400, fontSize: '2.5rem'}}>Loading All The Campaigns...</h1>
        }
        else{
            content =  <div onKeyPress={e => this.keyPressHandler(e)}>
                    <Card title={obj[0]} description={obj[1]} creator={obj[2]} backers={obj[5]} goal={obj[4]} minimum={obj[3]} />
                </div>
        }
        return(
            content
        )
    }
}

export default CampaignLanding;