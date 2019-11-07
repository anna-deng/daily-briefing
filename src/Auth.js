import React, { Component } from 'react';
import * as firebase from 'firebase';
import App from './App'
import './GoogleLogin.css';

import gmail from './data/gmail';

// import { gapi } from 'gapi-script';
import { gapi, loadAuth2 } from 'gapi-script'
const calendar_id = 'u.northwestern.edu_s49ei1nj6p02usako7uu4th260@group.calendar.google.com'

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
      }

    }



    componentDidMount() {

      const successCallback = this.onSuccess.bind(this);
      let scopes = firebaseConfig.scopes;
      let discoveryDocs = firebaseConfig.discoveryDocs;
      let calConf = {
          'calendarId': calendar_id,
          'timeZone': 'America/Chicago',
          'singleEvents': true,
          'timeMin': (new Date()).toISOString(), //gathers only events not happened yet
          'maxResults': 20,
          'orderBy': 'startTime'
      };
      let config =  {
        response_type: 'permission',
        scopes,
        client_id: firebaseConfig.clientId
      };
      /*window.gapi.load('auth2', () => {
        gapi.auth2.init(config, function(response) {
          // No need to `setToken`, it's done for you by auth2.
          let config2 = {discoveryDocs} // only of google calendar
          gapi.client.init(config2).then(function() {
            // then execute a calendar call:
            console.log(gapi.client.calendar.events.list(calConf));
          });
        });
      });*/

//return;

    let config2 = {discoveryDocs};

      window.gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: firebaseConfig.clientId,
          scope: firebaseConfig.scopes,
          discoveryDocs: firebaseConfig.discoveryDocs,
          response_type: 'id_token permission'
        }, function(response) {
          if(response.error){
            console.log(response);
            return;
          }
          console.log(response);
        });

        // this.auth2.attachClickHandler(document.querySelector('#loginButton'), {}, this.onLoginSuccessful.bind(this))

        this.auth2.then(() => {
          console.log('on init');
          console.log(this.auth2.currentUser.get().getBasicProfile().getName())
          console.log(this.auth2);


          this.getCalendar();
          //return;


          /*window.gapi.auth2.authorize({
            client_id: firebaseConfig.clientId,
            scope: 'email profile openid calendar',
            response_type: 'id_token permission'
          }, function(response) {
            if (response.error) {
              // An error happened!
              console.log(response.error);
              return;
            }
            // The user authorized the application for the scopes requested.
            var accessToken = response.access_token;
            var idToken = response.id_token;
            console.log(response);
            // You can also now use gapi.client to perform authenticated requests.
          });*/



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
        window.gapi.load('client:auth2', () => {
            gapi.client.init({
              'client_id': firebaseConfig.clientId,
              'scope': firebaseConfig.scopes,
              'discoveryDocs': firebaseConfig.discoveryDocs
            });
            console.log(gapi.client.getToken());
            gmail.listLabels(gapi.client.getToken());
          });
    }
    render() {
        if (this.state.isSignedIn) {
            this.getCalendar()
            return(
                <App></App>
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
