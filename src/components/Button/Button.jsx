import React from "react";

import './Button.scss';

const Button = (props) => {
    return(
        <button onClick={props.clicked} className={`${props.green ? 'Button--Green' : '' } ${props.red ? 'Button--Red' : ''} Button`} style={{fontSize: props.size, padding: props.padding, textTransform: props.transform}}>{props.title}</button>
    )
}

export default Button;