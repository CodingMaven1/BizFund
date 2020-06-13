import React from "react";

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/build/Campaign.json';
import factory from '../../ethereum/factory';
import Card from '../../components/Card/Card';

import './Landing.scss';

class CampaignLanding extends React.Component {

    state = {
        campaignsArr: [],
    }

    async componentDidMount(){
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        let campaignsArr = []
        campaigns.map(async (obj,idx) => {
            const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), obj);
            const arr = await campaign.methods.getBriefData().call()
            arr[2] = obj
            campaignsArr.push(arr)
            this.setState({campaignsArr: campaignsArr})
        })
    }

    onDetailsHandler = (event, loc) => {
        event.preventDefault();

        this.props.history.push({
            pathname: `/details/${loc}`
        })
    }

    render(){
        let {campaignsArr} = this.state;

        let content;
        if(campaignsArr.length === 0){
            content = <div className="Landing"><h1 className="Landing--Text">Loading All The Campaigns...</h1></div>
        }
        else{
            content =  <div className="Landing">
                    <div className="Landing--CardContainer">
                    {
                        campaignsArr.map((obj, idx) => {
                            return(
                                <Card key={idx} title={obj[0]} description={obj[1]} clicked={e => this.onDetailsHandler(e,obj[2])} />
                            )
                        })
                    }
                    </div>

                </div>

        }
        return(
                content
        )
    }
}

export default CampaignLanding;