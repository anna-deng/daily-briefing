import React from "react";
import "./preview-card.css";

const PreviewCard = ({ startTime, meetingTitle }) => {
  return (
    <div className="preview-card-container">
      <div className="preview-card-header">
        <p>{startTime}</p>
      </div>
      <div className="preview-card-body">
        <p>{meetingTitle}</p>
      </div>
    </div>
  );
};
export default PreviewCard;
