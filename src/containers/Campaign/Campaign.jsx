import React from "react";

import factory from '../../ethereum/factory';

import './Campaign.scss';
import web3 from "../../ethereum/web3";

class Campaign extends React.Component{

    state = {
        title: '',
        description: '',
        req: '',
        min: '',
        errormsg: '',
        msg: ''
    }

    onChangeHandler = (event, type) => {
        event.preventDefault()
        let copystate = this.state;
        copystate[type] = event.target.value;
        this.setState({copystate})
    }

    onFormSubmit = async (e) => {
        e.preventDefault()
        let {title, description, req, min} = this.state;
        if(isNaN(parseInt(req)) || isNaN(parseInt(min))){
            this.setState({errormsg: 'Please enter numerical values!'})
            return;
        }
        if(req < 0 || min < 0){
            this.setState({errormsg: 'Please enter positive values!'})
            return;
        }
        req = web3.utils.toWei(req, 'ether');
        min = web3.utils.toWei(min, 'ether');

        const accounts = await web3.eth.getAccounts();

        try{
            this.setState({msg: 'Just a moment! Trying to deploy your campaign.', errormsg: ''})
            const campaign = await factory.methods.createCampaign(min, title, description, req).send({from: accounts[0]})
            console.log(campaign)
            this.setState({errormsg: '', msg: 'Successful! Your campaign was deployed'})
            setTimeout(() => {this.props.history.push({pathname: '/'})}, 4000)
        } catch(e){
            console.log(e)
            this.setState({errormsg: e.message, msg: ''})
        }
    }

    render(){
        let copystate = this.state;
        return(
            <div className="Campaign">
                <form className="Campaign--Form" onSubmit={event => this.onFormSubmit(event)}>
                    <h1 className="Campaign--Heading">Create a Campaign</h1>
                    <div className="Campaign--FormMain">
                        <input type="text" required className="Campaign--Input" placeholder="Title" value={copystate.title} onChange={e => this.onChangeHandler(e,"title")} />
                        <textarea rows="5" required cols="20" className="Campaign--TextArea" placeholder="Description" value={copystate.description} onChange={e => this.onChangeHandler(e,"description")} />
                        <input type="text" required className="Campaign--Input" placeholder="Required Amount" value={copystate.req} onChange={e => this.onChangeHandler(e,"req")} />
                        <input type="text" required className="Campaign--Input" placeholder="Minimum Contribution" value={copystate.min} onChange={e => this.onChangeHandler(e,"min")} />
                    </div>
                    <div className="Campaign--Msgs">
                        <h1 className="Campaign--ErrorMsg">{copystate.errormsg}</h1>
                        <h1 className="Campaign--Msg">{copystate.msg}</h1>
                    </div>
                    <input type="submit" value="Create" className="Campaign--Submit" />
                </form>
            </div>
        )
    }
}

export default Campaign;