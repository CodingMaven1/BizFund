import React from "react";

import './Card.scss';

const Card = (props) => {
    return(

        <div className="Card">
            <div className="Card--Details" >
                <h1 className="Card--Title">{props.title}</h1>
                <p className="Card--Description">{props.description}</p>
                <button className="Card--Button">back this project</button>
                <div className="Card--CreatorContainer">
                    <h1 className="Card--Creator">Created By:</h1>
                    <h1 className="Card--Hash">{props.creator}</h1>
                </div>
                <div className="Card--Stats">
                    <div className="Card--Container">
                        <h1 className="Card--Subtitle">Backers:</h1>
                        <h1 className="Card--Value">{props.backers}</h1>
                    </div>
                    <div className="Card--Container">
                        <h1 className="Card--Subtitle">Goal:</h1>
                        <h1 className="Card--Value">{props.goal}</h1>
                    </div>
                    <div className="Card--Container">
                        <h1 className="Card--Subtitle">Recieved:</h1>
                        <h1 className="Card--Value">{props.recieved}</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Card;