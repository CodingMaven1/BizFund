pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum, string namecamp, string descriptioncamp, uint requiredcamp ) public {
        address newCampaign = new Campaign(minimum, msg.sender, namecamp, descriptioncamp, requiredcamp);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    string public details;
    string public name;
    uint public required;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum, address creator, string namecamp, string descriptioncamp, uint requiredcamp) public{
        manager = creator;
        minimumContribution = minimum;
        name = namecamp;
        details = descriptioncamp;
        required = requiredcamp;
    }
    function contribute() public payable {
        require(msg.value > minimumContribution);
        if(!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount : 0
        });
        requests.push(newRequest);
    }
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getBriefData() public view returns (string, string) {
        return(
            name,
            details
        );
    }
    
    function getFullData() public view returns (string, string, uint, uint, uint, uint, uint, address) {
        return(
            name,
            details,
            minimumContribution,
            required,
            approversCount,
            this.balance,
            requests.length,
            manager
        );
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }

    function checkApprover(uint index, address sender) public view returns (bool){
        Request storage request = requests[index];
        return request.approvals[sender];
    }
}
 
