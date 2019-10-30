import React from "react";
import "./card.css";

const Card = ({
  startTime,
  endTime,
  meetingTitle,
  name,
  title,
  description,
  email
}) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <p>
          {startTime} - {endTime}
        </p>
      </div>
      <div className="card-body">
        <h1>{meetingTitle}</h1>
        <hr />
        <p>
          <span className="card-name">{name}</span> <br /> {title}
        </p>
        <a href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`} target="_blank">linkedin</a>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};
export default Card;
