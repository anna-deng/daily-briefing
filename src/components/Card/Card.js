import React from "react";
import './card.css';

const Card = ({
    time,
    meetingTitle,
    name,
    title,
    description
}) => {
    return (
        <div className='card-container'>
            <div className='card-header'>
                <p>{time}</p>
            </div>
            <div className='card-body'>
                <h1>{meetingTitle}</h1>
                <p>{name}</p>
                <p>{title}</p>
                <p className="card-description">{description}</p>
            </div>
        </div>
    )
}
 export default Card;