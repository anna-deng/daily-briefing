import React, { Component } from 'react';
import * as firebase from 'firebase';
import App from './App'
import './GoogleLogin.css';

import gmail from './data/gmail';

// import { gapi } from 'gapi-script';
import { gapi, loadAuth2 } from 'gapi-script'
const calendar_id = 'u.northwestern.edu_s49ei1nj6p02usako7uu4th260@group.calendar.google.com'
var apiKey = process.env.REACT_APP_GOOGLE_API
var firebaseConfig = {
  apiKey: "AIzaSyBR-cZfMpmV2MQk-dK7llqHDpGA619BQnY",
  authDomain: "dailybriefingbot.firebaseapp.com",
  databaseURL: "https://dailybriefingbot.firebaseio.com",
  projectId: "dailybriefingbot",
  storageBucket: "dailybriefingbot.appspot.com",
  messagingSenderId: "796106548237",
  appId: "1:796106548237:web:fe3ca2fa78df1e1c12e144",
  measurementId: "G-TB9P1CNPM3",
  clientId: '796106548237-s8q81jovsqd4hj4it5ishgjnonl1hs94.apps.googleusercontent.com',
  scopes:
      "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/gmail.readonly",
  discoveryDocs: [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
// console.log(gmail);
// gmail.listLabels();

class Auth extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isSignedIn: false,
        calendar_events: null
      }

    }



    componentDidMount() {

      const successCallback = this.onSuccess.bind(this);
      const updateCalendar = this.updateCalendar.bind(this);
      
      window.gapi.load('client:auth2', () => {
        this.auth2 = window.gapi.auth2.init({
          clientId: firebaseConfig.clientId,
          scope: firebaseConfig.scopes,
          discoveryDocs: firebaseConfig.discoveryDocs
        })
  
        // this.auth2.attachClickHandler(document.querySelector('#loginButton'), {}, this.onLoginSuccessful.bind(this))
  
        this.auth2.then(() => {
          console.log('on init');
          console.log(this.auth2.currentUser.get().getBasicProfile().getName())
          this.setState({
            isSignedIn: this.auth2.isSignedIn.get(),
          });
        });
      })  

      window.gapi.load('signin2', function() {
        // Method 3: render a sign in button
        // using this method will show Signed In if the user is already signed in
        var opts = {
          width: 200,
          height: 50,
          client_id: firebaseConfig.clientId,
          onSuccess: successCallback
        }
        gapi.signin2.render('loginButton', opts)
      })


    }

    onSuccess() {
      console.log('on success')
      this.setState({
        isSignedIn: true,
        err: null
      })
    }

    updateCalendar(data) {
      this.setState({
        calendar_events: data
      })
    }
  
    onLoginFailed(err) {
      this.setState({
        isSignedIn: false,
        error: err,
      })
    }

    getContent() {
      if (this.state.isSignedIn) {
        return <p>hello user, you're signed in </p>
      } else {
        return (
          <div>
            <p>You are not signed in. Click here to sign in.</p>
            <button id="loginButton">Login with Google</button>
          </div>
        )
      }

    }

    getCalendar() {
      window.gapi.client.init({
          clientId: firebaseConfig.clientId,
          scope: firebaseConfig.scopes,
          discoveryDocs: firebaseConfig.discoveryDocs
        }).then(() => {
          // console.log('hullo')
          return gapi.client.calendar.events.list({
              'calendarId': 'primary',
              'timeZone': 'America/Chicago',
              'singleEvents': true,
              'timeMin': (new Date()).toISOString(), //gathers only events not happened yet
              'maxResults': 20,
              'orderBy': 'startTime'
          })
        })
        .then(res => {
          // console.log(res.result)
          this.updateCalendar(res.result)
          // console.log(this.state.calendar_events)
        });
        gmail.listLabels(gapi.client.getToken());
      }

    render() {
        if (this.state.isSignedIn) {
            this.getCalendar()
            return(
                <App calendar_events={this.state.calendar_events}></App>
            )
        }
        else {
            return (
                <div className="App">
                  <header className="App-header">
                    <h2>Sample App.</h2>
                    {this.getContent()}
                  </header>
                </div>
              );
        }
    }
  }
  export default Auth;
