import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Card from "./components/Card/Card";
import PrimaryView from "./components/PrimaryView/PrimaryView";
import "./data/getCalendarEvents";
import { getEvents } from "./data/getCalendarEvents";
import * as firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import getNews from './data/news'

export default function App(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home calendar_events={props.calendar_events}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  const [meetingsList, setMeetingsList] = useState(null);
  const [updateCalendar, setupdateCalendar] = useState(false);
  const [attendees, updateAttendees] = useState([]);
  const [hasPulledEmails, updateHasPulledEmails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setMeetingsList(props.calendar_events)
}, [props.calendar_events]);

  const setAttendees = (event) => {
    let email_string = ""
    if(event.attendees) {
      event.attendees.map((usr, i)=>{
        email_string += usr.email + " "
      })
      return email_string
    }
  }

  const sortMeetingsList = () => {
    if (meetingsList) {
      meetingsList.items.sort(function(a, b) {
        return new Date(a.start.dateTime) - new Date(b.start.dateTime);
      });
      meetingsList.items = meetingsList.items.filter(function(event) {
        return new Date(event.start.dateTime) >= new Date(Date.now());
      })
      if (selectedEvent == null) {
        setSelectedEvent(meetingsList.items[0]);
      }
    }
  }

  const getDomain = (email) => {
    var domain = email.replace(/^[^@]*@/, '')
    if(domain.includes('u.')) {
      domain = domain.split('u.')[1].split('.')[0]
    }
    else {
      domain = domain.split('.')[0]
    }
    return domain
  }
  
  // meetingsList: sorted [] of event objects 
  // transformed to: {date1: [event1, event2], date2:[event3]}
  const mappifyMeetingsList = () => {
    sortMeetingsList() 
    const meetingsMap = new Map();
    if(meetingsList) {
    meetingsList.items.map((event, i) => {
      const date = new Date(event.start.dateTime).toLocaleDateString([], {month: 'short', day: 'numeric', year: 'numeric'})
      if(meetingsMap.has(date)) {
        meetingsMap.get(date).push(event)
      }
      else {
        meetingsMap.set(date, [event])
      }
    })
  }
    return meetingsMap
  }

  const renderCardsDateMap = () => {
    const meetingsMap = mappifyMeetingsList()
    var meetingDates = Array.from(meetingsMap.keys());
    return (
      <div className='cards-container'>
        {meetingsMap && 
       meetingDates.map((date, d)=>{
          return meetingsMap.get(date).map((event, e)=>{
            if(d == 0 && e == 0) {
              // first calendar event for first day
              return(
                <div>
                <p className='event-date'>Happening Soon</p>
                <Card
                startTime={new Date(
                  meetingsList.items[0].start.dateTime
                ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                endTime={new Date(
                  meetingsList.items[0].end.dateTime
                ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                meetingTitle={meetingsList.items[0].summary}
                name={event.creator.displayName ? event.creator.displayName : event.creator.email} // from LinkedIn
                title={event.creator.email}
                description={event.description!=="" ? event.description : "No Event Description"}
                email={event.creator.email}
                meetingAttendees={setAttendees(event)}
                isFirst
                setEvent={() => {
                  setSelectedEvent(event);
                  console.log('selectedEvent', selectedEvent);
                }}
                workplace={getDomain(event.creator.email)}
                />
          </div>
              )
            }
            else {
              return( e == 0 ? 
                <div>
                  <p className='event-date'>{date}</p>
                  <Card
                    startTime={new Date(
                      event.start.dateTime
                    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    endTime={new Date(
                      event.end.dateTime
                    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    meetingTitle={event.summary}
                    name={event.creator.displayName ? event.creator.displayName : event.creator.email} // from LinkedIn
                    title={event.creator.email}
                    description={event.description!=="" ? event.description : "No Event Description"}
                    email={event.creator.email}
                    meetingAttendees={setAttendees(event)}
                    workplace={event.creator.email.replace(/^[^@]*@/, '').split('.')[0]}
                    setEvent={() => {
                      setSelectedEvent(event);
                      console.log('selectedEvent', selectedEvent);
                    }}
                  />
            </div> :
                <div>
                  <Card
                    startTime={new Date(
                      event.start.dateTime
                    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    endTime={new Date(
                      event.end.dateTime
                    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    meetingTitle={event.summary}
                    name={event.creator.displayName ? event.creator.displayName : event.creator.email} // from LinkedIn
                    title={event.creator.email}
                    description={event.description!=="" ? event.description : "No Event Description"}
                    email={event.creator.email}
                    meetingAttendees={setAttendees(event)}
                    setEvent={() => {
                      setSelectedEvent(event);
                      console.log('selectedEvent', selectedEvent);
                    }}
                    workplace={event.creator.email.replace(/^[^@]*@/, '').split('.')[0]}
                  />
            </div>
              )
            }
          })
        })
        }
      </div>
    )
  }

  
  const renderPrimaryView = () => {
    return (
      <div class='primary-view-container'>
        {selectedEvent &&
                <PrimaryView
                startTime={new Date(
                  selectedEvent.start.dateTime
                  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  endTime={new Date(
                    selectedEvent.end.dateTime
                    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    meetingTitle={selectedEvent.summary}
                    name={selectedEvent.creator.displayName ? selectedEvent.creator.displayName : selectedEvent.creator.email} // from LinkedIn
                    title={selectedEvent.creator.email}
                description={selectedEvent.description!=="" ? selectedEvent.description : "No event Description"}
                email={selectedEvent.creator.email}
                meetingAttendees={setAttendees(selectedEvent)}
                isFirst
                workplace={selectedEvent.creator.email.replace(/^[^@]*@/, '').split('.')[0]}
                />
            }
      </div>
    )
  }
  
  return (
    <div>
      {/* <h1 className="App-title"> NEXT MEETING:</h1> */}
      {/* <button onClick={() => getNewsArticles("Google")}>
        Refresh Calendar
      </button> */}
      {renderCardsDateMap()}
      {renderPrimaryView()}
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
