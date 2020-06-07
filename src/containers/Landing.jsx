import React from "react";
import factory from '../ethereum/factory';
import ProjectCard from '../components/ProjectCard/ProjectCard';

class CampaignLanding extends React.Component {

    async componentDidMount(){
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        console.log(campaigns)
    }

    render(){
        console.log(this.props.campaigns)
        return(
            <ProjectCard />
        )
    }
}

export default CampaignLanding;