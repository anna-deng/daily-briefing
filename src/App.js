import React, {useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Card from './components/Card/Card.js';
import PreviewCard from './components/PreviewCard/PreviewCard'
import './data/getCalendarEvents'
import { getEvents } from "./data/getCalendarEvents";

export default function App() {

  useEffect (() => {
    getEvents()
  })

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
  return (
    <div>
      {/* <h1 className="App-title"> NEXT MEETING:</h1> */}
      <Card
        startTime={"10:30"}
        endTime={"11:00"}
        meetingTitle={"Anna <> Tommy Weekly 1:1"}
        name={"Anna Deng"}
        title={"Student at Northwestern University"}
        description={"let's find a time to work on 338 together..."}
      />
      <PreviewCard
        startTime={"11:00"}
        meetingTitle={"Anna <> Tommy Weekly 1:1"}
      />
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
