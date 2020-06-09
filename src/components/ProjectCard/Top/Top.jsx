import React from "react";

import './Top.scss';

const Top = (props) => {
    return(
        <div className="CardTop">
            <div className="CardTop--Details" >
                <h1 className="CardTop--Title">{props.title}</h1>
                <p className="CardTop--Description">{props.description}</p>
                <button className="CardTop--Button">back this project</button>
                <div className="CardTop--Creator">
                    <h1 className="CardTop--Subtitle">Created By:</h1>
                    <h1 className="CardTop--Subtitle">{props.creator}</h1>
                </div>
            </div>
        </div>
    )
}

export default Top;