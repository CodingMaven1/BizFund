import React from "react";

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/build/Campaign.json';

import './Details.scss';

class Details extends React.Component{

    state={
        data: null
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), id)
        const data = await campaign.methods.getFullData().call();
        data[2] =  web3.utils.fromWei(data[2], 'ether') + ' ether'
        data[3] =  web3.utils.fromWei(data[3], 'ether') + ' ether'
        data[5] =  web3.utils.fromWei(data[5], 'ether') + ' ether'
        this.setState({data})
    }

    render(){
        let content;
        let {data} = this.state;
        if(data === null){
            content = <h1 className="Details--Heading">Loading the campaign data...</h1>
        }
        else{
            content = <div className="Details--Container">
                
            </div>
        }
        return(
            <div className="Details">
                {content}
            </div>
        )
    }
}

export default Details;