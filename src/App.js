import React, {useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Card from './components/Card/Card';
import PreviewCard from './components/PreviewCard/PreviewCard'
import './data/getCalendarEvents'
import { getEvents } from "./data/getCalendarEvents";

export default function App() {
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
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {

  const [meetingsList, setMeetingsList] = useState(null)
  const [updateCalendar, setupdateCalendar] = useState(false)

  useEffect (() => {
    var data
    getEvents().then(response => {
      data = response
      setMeetingsList(data)
    })
  }, [updateCalendar, meetingsList])

  const sortMeetingsList = () => {
    if (meetingsList) {
      meetingsList.items.sort(function(a,b) {
        return new Date(a.start.dateTime) - new Date(b.start.dateTime);
      })
      meetingsList.items = meetingsList.items.filter(function(event) {
        return new Date(event.start.dateTime) >= new Date(Date.now());
      });
    }
  }

  const renderCards = () => { 
      sortMeetingsList()
      return(
        (meetingsList) &&
        <Card
          startTime={new Date(meetingsList.items[0].start.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
          endTime={new Date(meetingsList.items[0].end.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          meetingTitle={meetingsList.items[0].summary}
          name={"Anna Deng"} // from LinkedIn
          title={"Student at Northwestern University"} 
          description={"let's find a time to work on 338 together..."}
        />
      )
  }

  const renderPreviewCards = () => {
    sortMeetingsList()
    return (meetingsList) && meetingsList.items.map((event, i) => {
        return(
          (i !== 0) ? <PreviewCard
          startTime={new Date(event.start.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          meetingTitle={event.summary}
          /> :
          null
        )
    })
  }

  return (
    <div>
      {/* <h1 className="App-title"> NEXT MEETING:</h1> */}
      <button onClick={() => setupdateCalendar(!updateCalendar)}>Refresh Calendar</button> 
      {renderCards()}
      {renderPreviewCards()}
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
