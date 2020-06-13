import React from "react";
import randomcolor from "randomcolor"

import Button from '../Button/Button';

import './Card.scss';

const Card = (props) => {
    return(

        <div className="Card" style={{borderColor: randomcolor()}}>
            <div className="Card--Details" >
                <h1 className="Card--Title">{props.title}</h1>
                <p className="Card--Description">{props.description}</p>
                <Button clicked={props.clicked} title="back this project" />
            </div>
        </div>
    )
}

export default Card;