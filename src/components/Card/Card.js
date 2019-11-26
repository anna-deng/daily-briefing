import React, { useEffect, useState } from "react";
import "./card.css";
import getNews from '../../data/news'

import gmail from '../../data/gmail';
import { gapi, loadAuth2 } from 'gapi-script'

const Card = ({
  startTime,
  endTime,
  meetingTitle,
  name,
  title,
  description,
  email,
  isFirst,
  meetingAttendees,
  emailBody,
  workplace,
  setEvent
}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  
  const pullEmails = () => {
    console.log(meetingAttendees)
    if(!meetingAttendees) {
      alert("You are the only attendee on this event, no emails to pull!")
    }
    else if(meetingAttendees) {
      const meeting = meetingAttendees.split(" ")
      if(meeting.length == 2) {
        alert("You are the only attendee on this event, no emails to pull!")
      } 
      else {
        gmail.listLabels(gapi.client.getToken(), meetingAttendees, function(results){
          alert(results);
          if(meetingAttendees){
            // document.getElementById(meetingAttendees).innerHTML = results;
          }
        });
      }
    }
  }

  const makeEmailsLinks = () => {
    // var result = ''
    if(meetingAttendees) {
      const arrayOfEmails = meetingAttendees.split(" ")
      // if(meeting.length == 2) {
      //   alert("You are the only attendee on this event, no emails to pull!")
      // } 
      return (
      <div>
      {arrayOfEmails.map((email, i) => {
        return (
          <div>
            <a href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`}>{email}</a>
          </div>)
      })}
      </div>
      )
  }}

  const getNewsArticles = (query) => {
    getNews(query).then(response => {
      console.log(response)
      alert(response.articles[0].title + '\n' + response.articles[1].title + '\n' + response.articles[2].title)
    })
  }

  useEffect(() => {
    console.log('toggle')
  }, [isExpanded]);

    return (
        <div onClick={() => {setEvent()}} className="preview-card-container">
          <div className="preview-card-header">
            <p>{startTime}</p>
          </div>
          <div className="preview-card-body">
            <p className="preview-card-body--text">{meetingTitle}</p>
          </div>
        </div>
    );
};
export default Card;
