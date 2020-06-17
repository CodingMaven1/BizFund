import React from "react";

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/build/Campaign.json';

import './CreateRequests.scss';

class CreateRequests extends React.Component{

    state={
        title: '',
        description: '',
        req: '',
        address: '',
        errormsg: '',
        msg: '',
        id: '', 
        manager: ''
    }

    async componentDidMount(){
        const id = this.props.match.params.id
        const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), id)
        const data = await campaign.methods.getFullData().call();
        const title = data[0]
        const manager = data[7]
        this.setState({title, id, manager})
    }

    onChangeHandler = (event, type) => {
        event.preventDefault()
        let copystate = this.state;
        copystate[type] = event.target.value;
        this.setState({copystate})
    }

    onFormSubmit = async (event) => {
        event.preventDefault();
        let {id, description, req, address, manager} = this.state;
        if(isNaN(parseInt(req))){
            this.setState({errormsg: 'Please enter numerical values!'})
            return;
        }
        if(req <= 0){
            this.setState({errormsg: 'Please enter positive values!'})
            return;
        }

        const accounts = await web3.eth.getAccounts();
        if(accounts[0] !== manager){
            this.setState({errormsg: "You can't create a request as you are not the manager of the account!"})
            return;
        }
        req = web3.utils.toWei(req, 'ether');

        try{
            this.setState({errormsg: '', msg: 'Creating your request...'})
            const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), id)
            const hash = await campaign.methods.createRequest(description, req, address).send({from: accounts[0]})
            console.log(hash)
            this.setState({msg: 'Your request was created!'})
            setTimeout(() => this.props.history.push({pathname: '/'}), 3500)
        } catch(e){
            this.setState({msg: '', errormsg: e.message})
        }
    }

    render(){
        let copystate = this.state;
        return(
            <div className="CreateReq">
                <form className="CreateReq--Form" onSubmit={event => this.onFormSubmit(event)}>
                    <h1 className="CreateReq--Heading">Create Request for {copystate.title}</h1>
                    <div className="CreateReq--FormMain">
                        <textarea rows="5" required cols="20" className="CreateReq--TextArea" placeholder="Description" value={copystate.description} onChange={e => this.onChangeHandler(e,"description")} />
                        <input type="text" required className="CreateReq--Input" placeholder="Required Amount in ether" value={copystate.req} onChange={e => this.onChangeHandler(e,"req")} />
                        <input type="text" required className="CreateReq--Input" placeholder="Reciepient Address" value={copystate.address} onChange={e => this.onChangeHandler(e,"address")} />
                    </div>
                    <div className="CreateReq--Msgs">
                        <h1 className="CreateReq--ErrorMsg">{copystate.errormsg}</h1>
                        <h1 className="CreateReq--Msg">{copystate.msg}</h1>
                    </div>
                    <input type="submit" value="Create" className="CreateReq--Submit" />
                </form>
            </div>
        )
    }
}

export default CreateRequests;