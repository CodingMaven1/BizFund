import React from "react";

import Top from './Top/Top';
import Bottom from './Bottom/Bottom';

const ProjectCard = (props) => {
    return(
        <div>
            <Top title={props.title} description={props.description} creator={props.creator} />
            <Bottom />
        </div>
    )
}

export default ProjectCard;