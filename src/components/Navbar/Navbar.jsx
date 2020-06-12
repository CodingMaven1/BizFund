import React from "react";
import {Link} from "react-router-dom";

import './Navbar.scss';

const Navbar = () => {
    return(
        <div className="Navbar">
            <h1 className="Navbar--Logo">BizFund</h1>
            <Link to="/campaign"><button className="Navbar--Campaign">Create Campaign</button></Link>
        </div>
    )
}

export default Navbar;