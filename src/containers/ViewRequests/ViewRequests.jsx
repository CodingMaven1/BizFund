import React from "react";

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/build/Campaign.json';

import './ViewRequests.scss';

class ViewRequests extends React.Component{
    state={
        data: [],
        count: ''
    }

    async componentDidMount(){
        const id = this.props.match.params.id
        const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), id)
        const count = await campaign.methods.getRequestsCount().call();
        let data = []
        for(let i=0; i< count; i++){
            let obj = await campaign.methods.requests(i).call();
            data.push(obj)
        }
        this.setState({data, count}, () => console.log(this.state))
    }

    render(){
        return(
            <div className="ViewRequests">

            </div>
        )
    }
}

export default ViewRequests;