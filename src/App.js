import React, { Component } from 'react';
import firebase from 'firebase'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  routes
} from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
// import Nav from "./components/Nav/Nav"

import Home from "./pages/Home/Home"
import Arcana from "./pages/Arcana/Arcana"
import Search from "./pages/Search/Search"
import Filter from "./pages/Filter/Filter"
import AbilityList from './pages/AbilityList/AbilityList'
import Ability from './pages/Ability/Ability'
import ArcanaComposer from "./pages/ArcanaComposer/ArcanaComposer"
import Login from './pages/Login/Login'
import UpdateArcanaRefs from "./pages/UpdateArcanaRefs/UpdateArcanaRefs"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var apple = require("./apple-app-site-association");

// var routes = require('./routes')
var ReactGA = require('react-ga')
ReactGA.initialize('UA-73091430-2')

var previousPath

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function PrivateRoute ({component: Component, authed, path, ...rest}) {
  previousPath = path
  console.log(previousPath)
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class App extends Component {

  state = {
    user: null,
    authed: false,
    loading: true,
  }

  componentDidMount () {

    console.log(apple)
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('auth listener. user logged in')
        this.setState({
          user: user.uid,
          authed: true,
          loading: false,
        })
      } else {
        console.log('auth listener. user unauthenticated')
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <Router routes={routes} onUpdate={logPageView}>

              <div>
                <NavBar location={this.props.location}/>
                <Switch>
                <Route exact path='/' render={(props) => (
                  <Home {...props}/>
                )}/>
                <Route path="/arcana" exact component={Arcana} />
                <Route path="/search" exact component={Search} />
                <Route path="/filter" exact component={Filter} />
                <Route path="/abilityList" exact component={AbilityList} />
                <Route path="/ability" exact component={Ability} />
                <Route path="/login" exact component={Login} />
                {/* <Route path="/arcanaComposer" exact component={ArcanaComposer} /> */}
                <Route path="/updateArcanaRefs" exact component={UpdateArcanaRefs} />
                
                <PrivateRoute authed={this.state.authed} path="/arcanaComposer" exact component={ArcanaComposer} />
                </Switch>
              </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
