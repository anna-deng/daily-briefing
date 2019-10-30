import React from "react";
import "./preview-card.css";

const PreviewCard = ({ startTime, meetingTitle, isExpanded }) => {
  if (isExpanded) {
    return (
      <div className="preview-card-container">
        <div className="preview-card-header">
          <p>{startTime}</p>
        </div>
        <div className="preview-card-body">
          <p className="preview-card-body--text">{meetingTitle}</p>
        </div>
      </div>
    );
  } else {
    return <div className="card-container">wacka</div>;
  }
};
export default PreviewCard;
