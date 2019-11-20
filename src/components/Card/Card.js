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
}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const pullEmails = () => {
    console.log('meetingAttendees', meetingAttendees);
    gmail.listLabels(gapi.client.getToken(), meetingAttendees, function(results){
      console.log(results);
      //emailBody = results;
      alert(results);
      console.log('alskdfjsld', startTime + meetingTitle)
      if(meetingAttendees){
        document.getElementById(meetingAttendees).innerHTML = results;
      }
    });
  }

  const getNewsArticles = (query) => {
    // var data = null
    getNews(query).then(response => console.log(response))
  }



  useEffect(() => {
    console.log('toggle')
  }, [isExpanded]);

    return (
      <div onClick={() => isExpanded ? {} : setIsExpanded(!isExpanded)}>
        {isExpanded || isFirst ?
          (<div className="card-container" >
            <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
              <p>
                {startTime} - {endTime}
              </p>
            </div>
            <div className="card-body">
              <h1>{meetingTitle}</h1>
              <hr />
              <p className="card-name-email">
                <span className="card-name">
                  <a href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`} target="_blank">{name}</a>
                  {/* <i class="material-icons card-name-icon">
                    info
                  </i> */}
                </span> 
                <br />
                {title}
              </p>
              {/* <a href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`} target="_blank">linkedin</a> */}
              <p className="card-description" dangerouslySetInnerHTML={{ __html: description}}></p>
              <p>{meetingAttendees}</p>
              <p id={meetingAttendees}></p>
              <button className={"card-email-button card-button" + (selectedButton == 'email' ? ' selected-button' : '')}
                      onClick={()=> {
                        if (selectedButton == 'email') {
                          setSelectedButton(null)
                        } else {
                          pullEmails()
                          setSelectedButton('email')
                        }
                        }}>
                        <i class="material-icons">forum</i>
              </button>
              <button className={"card-news-button card-button" + (selectedButton == 'news' ? ' selected-button' : '')}
                      onClick={()=>{
                        if (selectedButton == 'news') {
                          setSelectedButton(null)
                        } else {
                          getNewsArticles(workplace)
                          setSelectedButton('news')
                        }
                        }}>
                      <i class="material-icons">rss_feed</i>
              </button>
              <button className={"card-contact-button card-button" + (selectedButton == 'contact' ? ' selected-button' : '')}
                      onClick={()=>{
                        if (selectedButton == 'contact') {
                          setSelectedButton(null)
                        } else {
                          setSelectedButton('contact')
                        }
                      }}>
                        <i class="material-icons">perm_contact_calendar</i>
              </button> 
            </div>
          </div>)
        :
        (<div className="preview-card-container">
          <div className="preview-card-header">
            <p>{startTime}</p>
          </div>
          <div className="preview-card-body">
            <p className="preview-card-body--text">{meetingTitle}</p>
          </div>
        </div>)
        }
      </div>
    );
};
export default Card;
