import React, { Component } from 'react';
import styles from './App.css';

import {
  hashHistory,
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { firebaseAuth } from './helpers/constants'

import NavBar from './components/NavBar/NavBar'
// import Nav from "./components/Nav/Nav"

import Home from "./pages/Home/Home"
import Arcana from "./pages/Arcana/Arcana"
import ArcanaComposer from "./pages/ArcanaComposer/ArcanaComposer"
import Login from './pages/Login/Login'
import UpdateArcanaRefs from "./pages/UpdateArcanaRefs/UpdateArcanaRefs"

function PrivateRoute ({component: Component, authed, ...rest}) {
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
    authed: false,
    loading: true,
  }

  componentDidMount () {

    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user successfully logged in.")
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
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
        <Router>
            <div>
              <NavBar/>
              <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/arcana" exact component={Arcana} />
              <Route path="/login" exact component={Login} />
              <Route path="/arcanaComposer" exact component={ArcanaComposer} />
              <Route path="/updateArcanaRefs" exact component={UpdateArcanaRefs} />
              {/* <PrivateRoute authed={this.state.authed} path="/arcanaComposer" exact component={ArcanaComposer} /> */}
              </Switch>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
