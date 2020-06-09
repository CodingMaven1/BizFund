import React from "react";
import factory from '../ethereum/factory';
import ProjectCard from '../components/ProjectCard/ProjectCard';

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
            <ProjectCard title="Smart Helmet" description="Smart Helmet is a next generation mototrcycle helmet with 360 visibility and sound control that will transform your biking experience" 
            creator={campaigns[0]} />
        )
    }
}

export default CampaignLanding;