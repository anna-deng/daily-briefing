import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Card from "./components/Card/Card";
import PreviewCard from "./components/PreviewCard/PreviewCard";
import "./data/getCalendarEvents";
import { getEvents } from "./data/getCalendarEvents";
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
  }, [updateCalendar, meetingsList]);

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
      meetingsList && (
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
        />
      )
    );
  };

  function toggleIsExpanded(isExpanded) {
    return !isExpanded;
  }

  const renderPreviewCards = () => {
    sortMeetingsList();
    return (
      meetingsList &&
      meetingsList.items.map((event, i) => {
        var isExpanded = false;
        console.log("before", isExpanded);
        return i !== 0 ? (
          <div onClick={() => alert("after", toggleIsExpanded(isExpanded))}>
            <PreviewCard
              startTime={new Date(event.start.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
              meetingTitle={event.summary}
              isExpanded={isExpanded}
            />
          </div>
        ) : null;
      })
    );
  };

  return (
    <div>
      {/* <h1 className="App-title"> NEXT MEETING:</h1> */}
      <button onClick={() => setupdateCalendar(!updateCalendar)}>
        Refresh Calendar
      </button>
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
