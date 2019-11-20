import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Card from "./components/Card/Card";
import "./data/getCalendarEvents";
import { getEvents } from "./data/getCalendarEvents";
import * as firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import getNews from './data/news'

// Configure FirebaseUI.
// Configure FirebaseUI.

export default function App(props) {
  // const [isLoggedIn, setIsLooggedIn] = useState(false)
  // useEffect(() => {
  //   this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
  //     (user) => setIsLooggedIn(!!user)
  //   );
  // })
  // useEffect(() => {
  //   this.unregisterAuthObserver();
  // }, [isLoggedIn])

  // var uiConfig = {
  //   // Popup signin flow rather than redirect flow.
  //   signInFlow: 'popup',
  //   // We will display Google and Facebook as auth providers.
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebase.auth.FacebookAuthProvider.PROVIDER_ID
  //   ],
  //   callbacks: {
  //     // Avoid redirects after sign-in.
  //     signInSuccessWithAuthResult: () => false
  //   }
  // };

  // if (!isLoggedIn) {
  //   return (
  //     <div>
  //       <h1>My App</h1>
  //       <p>Please sign-in:</p>
  //       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
  //     </div>
  //   );
  // }
  // else {
  //   return (
  //     <Router>
  //       <div>
  //         <Switch>
  //           <Route path="/about">
  //             <About />
  //           </Route>
  //           <Route path="/users">
  //             <Users />
  //           </Route>
  //           <Route path="/">
  //             <Home />
  //           </Route>
  //         </Switch>
  //       </div>
  //     </Router>
  //   );
  // }
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
  const [hasPulledEmails, updateHasPulledEmails] = useState(false)

  useEffect(() => {
    // var data;
    // getEvents().then(response => {
    //   data = response;
    //   console.log(props.calendar_events)
    //   setMeetingsList(data);
    //   console.log(data);
    // });
    // console.log(props.calendar_events)
    setMeetingsList(props.calendar_events)
}, [props.calendar_events]);


  const setAttendees = (event) => {
    let email_string = ""
    if(event.attendees) {
      event.attendees.map((usr)=>{
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
      });
    }
  };

  const getNewsArticles = (query) => {
    // var data = null
    getNews(query).then(response => console.log(response))
  }

  const renderCards = () => {
    sortMeetingsList();
    return (
      <div>
      {meetingsList &&
        <Card
          startTime={new Date(
            meetingsList.items[0].start.dateTime
          ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          endTime={new Date(
            meetingsList.items[0].end.dateTime
          ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          meetingTitle={meetingsList.items[0].summary}
          name={"Anna Deng"} // from LinkedIn
          title={"Student at Northwestern University"}
          description={"let's find a time to work on 338 together..."}
          email={meetingsList.items[0].creator.email}
          meetingAttendees={attendees}
          isFirst
        />}
      {meetingsList &&
      meetingsList.items.map((event, i) => {
        // console.log(attendees)
        // if(event.attendees && !hasPulledEmails) {
        //   updateHasPulledEmails(true)
        //   event.attendees.forEach(user => {
        //     if(!attendees.includes(user.email)) {
        //       updateAttendees(attendees.push(user.email))
        //     }
        //   });
        // }
        return i !== 0 ? (
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
              workplace={"google"}
            />
          </div>
        ) : null
        })
      }
    </div>
    )
  };

  return (
    <div>
      {/* <h1 className="App-title"> NEXT MEETING:</h1> */}
      <button onClick={() => getNewsArticles("Google")}>
        Refresh Calendar
      </button>
      {renderCards()}
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
