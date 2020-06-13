import React from "react";

import './StatBox.scss';

const StatBox = (props) => {
    return(
        <div className="StatBox">
            <h1 className="StatBox--Title">{props.title}</h1>
            <h1 className="StatBox--Subtitle">{props.stat}</h1>
        </div>
    )
}

export default StatBox;