import React, { Component } from 'react';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import App from './App'

import gmail from './data/gmail';


var firebaseConfig = {
  apiKey: "AIzaSyBR-cZfMpmV2MQk-dK7llqHDpGA619BQnY",
  authDomain: "dailybriefingbot.firebaseapp.com",
  databaseURL: "https://dailybriefingbot.firebaseio.com",
  projectId: "dailybriefingbot",
  storageBucket: "dailybriefingbot.appspot.com",
  messagingSenderId: "796106548237",
  appId: "1:796106548237:web:fe3ca2fa78df1e1c12e144",
  measurementId: "G-TB9P1CNPM3",
  clientId: '796106548237-s46f0s4ev157vms90ao65bl7irotlir4.apps.googleusercontent.com',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log(gmail);
gmail.listLabels();

export default class Auth extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <App></App>
    );
  }
}
