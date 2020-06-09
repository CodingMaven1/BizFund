import React from "react";
import factory from '../ethereum/factory';
import Card from '../components/Card/Card';

class CampaignLanding extends React.Component {

    state = {
        campaigns: []
    }

    async componentDidMount(){
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        this.setState({campaigns})
    }

    render(){
        let {campaigns} = this.state;
        console.log(this.props.campaigns)
        return(
            <Card title="Smart Helmet" description="Smart Helmet is a next generation mototrcycle helmet with 360 visibility and sound control that will transform your biking experience" 
            creator={campaigns[0]} backers="97" goal="$ 5000" recieved="$ 2100" />
        )
    }
}

export default CampaignLanding;