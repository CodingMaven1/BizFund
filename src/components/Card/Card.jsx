import React from "react";
import randomcolor from "randomcolor"

import './Card.scss';

const Card = (props) => {
    return(

        <div className="Card" style={{borderColor: randomcolor()}}>
            <div className="Card--Details" >
                <h1 className="Card--Title">{props.title}</h1>
                <p className="Card--Description">{props.description}</p>
                <button onClick={props.clicked} className="Card--Button">back this project</button>
            </div>
        </div>
    )
}

export default Card;