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

  const getWebsite = (s) => {
    var https = 'https://'
    var domain = s.replace(/^[^@]*@/, '')
    if(domain.includes('u.')) {
      domain = domain.split('u.')[1]
    }
    else {
      domain = domain
    }
    console.log(domain);
    return https.concat(domain)
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const pullEmails = () => {
    console.log(meetingAttendees)
    if(!meetingAttendees) {
      //document.getElementById(meetingTitle).innerHTML = "";
      return (<p>
        You are the only attendee on this event.
      </p>)
    }
    else if(meetingAttendees) {
      const meeting = meetingAttendees.split(" ")
      if(meeting.length == 2) {
        //document.getElementById(meetingTitle).innerHTML = "";
        return(<p>
          You are the only attendee on this event.
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
        })
        return(<p id={meetingTitle}></p>);
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
      {arrayOfEmails.map((e, i) => {
        if(e !== email){
          return (
            <div>
              <a href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${e}`}  target="_blank">{e}</a>
            </div>)
        }
      })}
      </div>
      )
  }}

  const renderEmailLinks = () => {
    return (makeEmailsLinks()) ?
    (<p className="preview-view-name-email">
    <span className="preview-view-name">
      {makeEmailsLinks()}
    </span>
  </p>) : null
  }


  const getNewsArticles = (query) => {
    getNews(query).then(response => {
       console.log(response);
       console.log((<a href={response.articles[0].url}>{response.articles[0].title}</a>));
      document.getElementById(query).innerHTML = "<a target='_blank' href="+ response.articles[0].url + ">" + response.articles[0].title + "</a><br>" +
      "<a target='_blank' href="+ response.articles[1].url + ">" + response.articles[1].title + "</a><br>" +
      "<a target='_blank' href="+ response.articles[2].url + ">" + response.articles[2].title + "</a>";


      // + '\n' + response.articles[1].title + '\n' + response.articles[2].title;
      //alert(response.articles[0].title + '\n' + response.articles[1].title + '\n' + response.articles[2].title)
      return(<p>{response.articles[0].title}</p>)
    })
    return(<p id={query}></p>);
  }

  const renderDescription = () => {
    return (description) ? (<p className="preview-view-description" dangerouslySetInnerHTML={{ __html: description}}></p>) :null
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
             {renderEmailLinks()}
              {/* <a href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${email}`} target="_blank">linkedin</a> */}
              {/* <p className="preview-view-description" dangerouslySetInnerHTML={{ __html: description}}></p> */}
              {renderDescription()}
              {/* <p>{meetingAttendees}</p> */}
              {/* <div>{makeEmailsLinks()}</div> */}
              <p id={meetingAttendees}></p>
              <div>{pullEmails()}</div>
              <div id={meetingTitle}></div>
              <div className='news-subheader'>News About: </div><a href={getWebsite(email)} className='news-subheader' target="_blank">{capitalize(workplace)}</a>
              <div>{getNewsArticles(workplace)}</div>
            </div>
          </div>
        </div>
    );
};
export default PrimaryView;
