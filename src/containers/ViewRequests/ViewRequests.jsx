import React from "react";

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/build/Campaign.json';
import Button from '../../components/Button/Button';

import './ViewRequests.scss';

class ViewRequests extends React.Component{
    state={
        data: '',
        count: '',
        id: '',
        appCount: '',
        errormsg: '',
        msg: ''
    }

    async componentDidMount(){
        const id = this.props.match.params.id
        const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), id)
        const count = await campaign.methods.getRequestsCount().call();
        const appCount = await campaign.methods.approversCount().call();
        let data = []
        for(let i=0; i< count; i++){
            let obj = await campaign.methods.requests(i).call();
            obj[1] =  web3.utils.fromWei(obj[1], 'ether') + ' ether'
            data.push(obj)
        }
        this.setState({data, count, id, appCount}, () => console.log(this.state))
    }

    onApproveHandler = async (event, sn) => {
        event.preventDefault()
        const id = this.props.match.params.id
        const campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface), id)
        const accounts = await web3.eth.getAccounts();
        const boolval = await campaign.methods.approvers(accounts[0]).call()
        const boolval2 = await campaign.methods.checkApprover(sn, accounts[0]).call()
        console.log(boolval, boolval2)
        if(!boolval){
            this.setState({msg:'', errormsg:'You have to be one of the contributors to apporve a request!'})
            return;
        }
        if(boolval2){
            this.setState({msg: '', errormsg: 'You have already raised your approval for this request!'})
            return;
        }

        try{
            this.setState({errormsg: '', msg: 'Raising your approval...'})
            const hash = await campaign.methods.approveRequest(sn).send({from: accounts[0]})
            console.log(hash)
            this.setState({msg: 'Your approval was raised!'})
            setTimeout(() => window.location.reload(), 1500)
        } catch(e){
            this.setState({msg: '', errormsg: e.message})
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.state.data[0])
        let data = header.slice(5,10)
        data.splice(0, 0, "S.N.")
        data.push("Approve Request", "Finalize Request")
        console.log(data)
        return data.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }

     onClickHandler = () => {
        const {id} = this.state;
        this.props.history.push({pathname: `/createrequest/${id}`})
    }

    renderTableData() {
        let {appCount} = this.state;
        return this.state.data.map((data, idx) => {
            let val;
            if(data[3]){
                val = "Approved"
            }
            else{
                val = "Yet to be approved"
            }

           return (
              <tr key={idx}>
                 <td>{idx + 1}</td>
                 <td>{data[0]}</td>
                 <td>{data[1]}</td>
                 <td>{data[2]}</td>
                 <td>{val}</td>
                 <td>{data[4]}/{appCount}</td>
                 <td><Button green clicked={e => this.onApproveHandler(e,idx)} title="Approve" size="1.7rem" padding="0.7rem 1.2rem" transform="capitalize"/></td>
                 <td><Button red clicked={this.onFinalizeHandler} title="Finalize" size="1.7rem" padding="0.7rem 1.2rem" transform="capitalize"/></td>
              </tr>
           )
        })
     }

    render(){
        let {data, errormsg, msg} = this.state;
        let content;
        if(data === ''){
            content = <h1 className="ViewReq--Title">Fetching All The Requests...</h1>
        }
        else if(data.length === 0){
            content = <h1 className="ViewReq--Title">No Requests Have Been Made By The Manager!</h1>
        }
        else{
            content = <table className='ViewReq--Table'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
        }
        return(
            <div className="ViewReq">
                {content}
                <div className="ViewReq--Msgs">
                    <h1 className="ViewReq--ErrorMsg">{errormsg}</h1>
                    <h1 className="ViewReq--Msg">{msg}</h1>
                </div>
                <Button clicked={this.onClickHandler} title="Create New Reqest" size="1.7rem" padding="1.25rem 1.8rem" transform="capitalize"/>
            </div>
        )
    }
}

export default ViewRequests;