import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Card from "./components/Card/Card";
import "./data/getCalendarEvents";
import { getEvents } from "./data/getCalendarEvents";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import * as firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Configure FirebaseUI.
// Configure FirebaseUI.

export default function App() {
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

  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

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
  const [meetingsList, setMeetingsList] = useState(null);
  const [updateCalendar, setupdateCalendar] = useState(false);

  useEffect(() => {
    var data;
    getEvents().then(response => {
      data = response;
      setMeetingsList(data);
      console.log(data);
    });
}, []);

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
          isFirst
        />}
      {meetingsList &&
      meetingsList.items.map((event, i) => {
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
              name={"Anna Deng"} // from LinkedIn
              title={"Student at Northwestern University"}
              description={"let's find a time to work on 338 together..."}
              email={event.creator.email}
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
      <NavBar />
      {/* <h1 className="App-title"> NEXT MEETING:</h1> */}
      <button onClick={() => setupdateCalendar(!updateCalendar)}>
        Refresh Calendar
      </button>
      {renderCards()}
      <iframe src='https://www.linkedin.com/sales/gmail/profile/viewByEmail/thomasli2020@u.northwestern.edu'></iframe>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
