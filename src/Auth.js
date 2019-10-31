import React, { Component } from 'react';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import App from './App'
import './GoogleLogin.css';

import gmail from './data/gmail';

// import { gapi } from 'gapi-script';
import { gapi, loadAuth2 } from 'gapi-script'


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
  scopes: [
    "email",
    "profile",
    "https://www.googleapis.com/auth/calendar"
  ],
  discoveryDocs: [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log(gmail);
gmail.listLabels();

class Auth extends Component {
  constructor(props) {
      super(props);
      this.state = {
          user: null
      }
  }
  async componentDidMount() {
      let auth2 = await loadAuth2(firebaseConfig.clientId, '')
      if (auth2.isSignedIn.get()) {
          this.updateUser(auth2.currentUser.get())
      } else {
          this.attachSignin(document.getElementById('customBtn'), auth2);
      }
  }
  async componentDidUpdate() {
      if(!this.state.user) {
          let auth2 = await loadAuth2(firebaseConfig.clientId, '')
          this.attachSignin(document.getElementById('customBtn'), auth2);
      }
  }
  updateUser(currentUser) {
      let name = currentUser.getBasicProfile().getName()
      console.log(name)
      let profileImg = currentUser.getBasicProfile().getImageUrl()
      this.setState({
          user: {
              name: name,
              profileImg: profileImg
          }
      })
  }
  attachSignin(element, auth2) {
      auth2.attachClickHandler(element, {},
          (googleUser) => {
              this.updateUser(googleUser);
          }, (error) => {
              console.log(JSON.stringify(error))
          });
  }
  signOut = () => {
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
          this.setState({ user: null })
          console.log('User signed out.');
      });
  }
  render() {
      if(this.state.user) {
          return (
            <App></App>
          );
      } else {
          return (
              <div className="container">
                  <div id="customBtn" className="btn login">
                      Login
                  </div>
              </div>
          );
      }
  }
}

export default Auth;

// const calendar_id = 'u.northwestern.edu_s49ei1nj6p02usako7uu4th260@group.calendar.google.com'
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// console.log(gmail);
// gmail.listLabels();

// export default class Auth extends React.Component {

//   // The component's Local state.
//   state = {
//     isSignedIn: false // Local signed-in state.
//   };

//   // Configure FirebaseUI.
//   uiConfig = {
//     // Popup signin flow rather than redirect flow.
//     signInFlow: 'popup',
//     // We will display Google and Facebook as auth providers.
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     ],
//     callbacks: {
//       // Avoid redirects after sign-in.
//       signInSuccessWithAuthResult: () => false
//     }
//   };

//   // Listen to the Firebase Auth state and set the local state.
//   async componentDidMount() {
//     this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
//         (user) => {
//           this.setState({isSignedIn: !!user})
//           gapi.client.init({
//             apiKey: firebaseConfig.apiKey,
//             clientId: firebaseConfig.clientID,
//             discoveryDocs: firebaseConfig.discoveryDocs,
//             scope: firebaseConfig.scopes.join(' '),
//           })
//           .then(function () {
//             // Use Google's "apis-explorer" for research: https://developers.google.com/apis-explorer/#s/calendar/v3/
//             // Events: list API docs: https://developers.google.com/calendar/v3/reference/events/list
//             console.log(gapi.client.calendar.events.list({
//               'calendarId': calendar_id,
//               'timeZone': 'America/Chicago',
//               'singleEvents': true,
//               'timeMin': (new Date()).toISOString(), //gathers only events not happened yet
//               'maxResults': 20,
//               'orderBy': 'startTime'
//             }));
//           })
//         }
//     );
//   }

//   // Make sure we un-register Firebase observers when the component unmounts.
//   // componentWillUnmount() {
//   //   this.unregisterAuthObserver();
//   // }

//   render() {
//     if (!this.state.isSignedIn) {
//       return (
//         <div>
//           <h1>My App</h1>
//           <p>Please sign-in:</p>
//           <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
//         </div>
//       );
//     }
//     return (
//       <App></App>
//     );
//   }
// }
