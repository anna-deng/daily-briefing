import React, { useEffect, useState } from "react";
import "./primary-view.css";
import getNews from '../../data/news'

import gmail from '../../data/gmail';
import { gapi, loadAuth2 } from 'gapi-script'

const PrimaryView = ({
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
    console.log(meetingAttendees)
    if(!meetingAttendees) {
      document.getElementById(meetingTitle).innerHTML = "";
      return (<p>
        You are the only attendee on this event, no emails to pull!
      </p>)
    }
    else if(meetingAttendees) {
      const meeting = meetingAttendees.split(" ")
      if(meeting.length == 2) {
        document.getElementById(meetingTitle).innerHTML = "";
        return(<p>
          You are the only attendee on this event, no emails to pull!
        </p>)
      }
      else {
        gmail.listLabels(gapi.client.getToken(), meetingAttendees, function(results){
          console.log('going to return');
          console.log(results);
          document.getElementById(meetingTitle).innerHTML = results;
           return(
           <p>
             {results}
           </p>)
          // alert(results)
          if(meetingAttendees){
            return(<p>{results}</p>);
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
      // console.log(response);
      alert(response.articles[0].title + '\n' + response.articles[1].title + '\n' + response.articles[2].title)
      return(<p>{response.articles[0].title}</p>)
    })
  }

  useEffect(() => {
    console.log('toggle')
  }, [isExpanded]);

    return (
      <div>
          <div className="preview-view-container" >
            <div className="preview-view-header">
              <p>
                {startTime} - {endTime}
              </p>
            </div>
            <div className="preview-view-body">
              <h1>{meetingTitle}</h1>
              <hr />
              <p className="preview-view-name-email">
                <span className="preview-view-name">
                  <a href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`} target="_blank">{name}</a>
                  {/* <i class="material-icons preview-view-name-icon">
                    info
                  </i> */}
                </span>
                <br />
                {title}
              </p>
              {/* <a href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`} target="_blank">linkedin</a> */}
              <p className="preview-view-description" dangerouslySetInnerHTML={{ __html: description}}></p>
              {/* <p>{meetingAttendees}</p> */}
              <div>{makeEmailsLinks()}</div>
              <p id={meetingAttendees}></p>
              <div>{pullEmails()}</div>
              <div id={meetingTitle}></div>
              <div>{getNewsArticles(workplace)}</div>
              {/* <button className={"preview-view-email-button preview-view-button" + (selectedButton == 'email' ? ' selected-button' : '')}
                      onClick={()=> {
                        if (selectedButton == 'email') {
                          setSelectedButton(null)
                        } else {
                          pullEmails()
                          setSelectedButton('email')
                        }
                        }}>
                        <i class="material-icons">forum</i>
              </button> */}
              {/* <button className={"preview-view-news-button preview-view-button" + (selectedButton == 'news' ? ' selected-button' : '')}
                      onClick={()=>{
                        if (selectedButton == 'news') {
                          setSelectedButton(null)
                        } else {
                          getNewsArticles(workplace)
                          setSelectedButton('news')
                        }
                        }}>
                      <i class="material-icons">rss_feed</i>
              </button> */}
              {/* <button className={"preview-view-contact-button preview-view-button" + (selectedButton == 'contact' ? ' selected-button' : '')} */}
              <button className={"preview-view-contact-button preview-view-button"}
                      onClick={()=>{
                        if (selectedButton == 'contact') {
                          setSelectedButton(null)
                        } else {
                          setSelectedButton('contact')
                          window.open(`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`)
                        }
                      }}>
                        <i class="material-icons">perm_contact_calendar</i>
              </button>
            </div>
          </div>
        </div>
    );
};
export default PrimaryView;
