import React from "react";
import {Link} from "react-router-dom";

import './Navbar.scss';

const Navbar = () => {
    return(
        <div className="Navbar">
            <Link style={{textDecoration: 'none'}} to="/"><h1 className="Navbar--Logo">BizFund</h1></Link>
            <Link to="/campaign"><button className="Navbar--Campaign">Campaign</button></Link>
        </div>
    )
}

export default Navbar;