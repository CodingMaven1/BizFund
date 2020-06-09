import React from "react";

import './Navbar.scss';

const Navbar = () => {
    return(
        <div className="Navbar">
            <h1 className="Navbar--Logo">BizFund</h1>
            <button className="Navbar--Campaign">Create Campaign</button>
        </div>
    )
}

export default Navbar;