import React from "react";

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/build/Campaign.json';
import StatBox from '../../components/StatBox/StatBox';
import Button from '../../components/Button/Button';

import './Details.scss';

class Details extends React.Component{

    state={
        data: null,
        contribution: '',
        errormsg: '',
        msg: '',
        id: ''
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), id)
        const data = await campaign.methods.getFullData().call();
        data[2] =  web3.utils.fromWei(data[2], 'ether') + ' ether'
        data[3] =  web3.utils.fromWei(data[3], 'ether') + ' ether'
        data[5] =  web3.utils.fromWei(data[5], 'ether') + ' ether'
        this.setState({data, id})
    }

    onChangeHandler = (event) => {
        event.preventDefault();
        let {contribution} = this.state;
        contribution = event.target.value;
        this.setState({contribution})
    }

    onClickHandler = () => {
        const {id} = this.state;
        this.props.history.push({pathname: `/viewrequests/${id}`})
    }

    onSubmitHandler = async (event) => {
        event.preventDefault()
        let {data, contribution} = this.state
        if(isNaN(parseInt(contribution))){
            this.setState({errormsg: 'Please enter numerical values!'})
            return;
        }
        if(contribution <= data[2]){
            this.setState({errormsg: 'Please enter a value more than minimum contribution!'})
            return;
        }

        const accounts = await web3.eth.getAccounts();
        contribution = web3.utils.toWei(contribution, 'ether');

        try{
            this.setState({errormsg: '', msg: 'Transaction in progress...'})
            const id = this.props.match.params.id
            const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), id)
            const hash = await campaign.methods.contribute().send({from: accounts[0], value: contribution})
            console.log(hash)
            this.setState({msg: 'Your transaction was successfull!'})
            setTimeout(() => window.location.reload(), 3500)
        } catch(e){
            this.setState({msg: '', errormsg: e.message})
        }
    }

    render(){
        let content;
        let {data, errormsg, msg} = this.state;
        if(data === null){
            content = <h1 className="Details--Heading">Loading the campaign data...</h1>
        }
        else{
            content = <div className="Details--Container">
                <div className="Details--Left">
                    <h1 className="Details--LeftTitle">{data[0]}</h1>
                    <p className="Details--LeftPara">{data[1]}</p>
                    <h1 className="Details--LeftSubtitle">Created By:</h1>
                    <h1 className="Details--LeftCreator">{data[7]}</h1>
                    <div className="Details--LeftStats">
                        <StatBox title="Backers" stat={data[4]} />
                        <StatBox title="Required Amount" stat={data[3]} />
                        <StatBox title="Recieved Amount" stat={data[5]} />
                        <StatBox title="Minimum Contribution" stat={data[2]} />
                    </div>
                    <div className="Details--LeftRequests">
                        <StatBox title="Total Requests" stat={data[6]} />
                        <Button clicked={this.onClickHandler} title="See requests" size="1.7rem" padding="0.5rem 1rem" transform="capitalize"/>
                    </div>
                </div>
                <div className="Details--Right">
                    <form className="Details--RightForm" onSubmit={this.onSubmitHandler}>
                        <h1 className="Details--RightTitle">Contribute to this Campaign</h1>
                        <input type="text" required className="Details--Input" placeholder="Amount in ether" value={this.state.contribution} onChange={e => this.onChangeHandler(e)} />
                        <h1 className="Details--ErrorMsg">{errormsg}</h1>
                        <h1 className="Details--Msg">{msg}</h1>
                        <input type="submit" value="Pay" className="Details--Submit" />
                    </form>
                </div>
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