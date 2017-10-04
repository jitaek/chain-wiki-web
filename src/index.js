import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    HashRouter as Router,
    Route,
    Link,
    hashHistory
  } from 'react-router-dom'

import Home from "./pages/Home/Home";
import Arcana from "./pages/Arcana";

import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBD9eX7ABB0Xu1N6CnSdKL-bnsNF5WgLtc",
    authDomain: "chainchronicle-ea233.firebaseapp.com",
    databaseURL: "https://chainchronicle-ea233.firebaseio.com",
    projectId: "chainchronicle-ea233",
    storageBucket: "chainchronicle-ea233.appspot.com",
    messagingSenderId: "1008757887866"
  };
var database = firebase.initializeApp(config);

ReactDOM.render(
    <Router>
        <div>
        <Route path="/" exact component={Home} />
        <Route path="/arcana" exact component={Arcana} />
        </div>
    </Router>,
document.getElementById('root')
);

registerServiceWorker();