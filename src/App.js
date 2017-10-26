import React, { Component } from 'react';
import styles from './App.css';

import {
  hashHistory,
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { createHashHistory } from 'history'

import { firebaseAuth } from './helpers/constants'

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

export const history = createHashHistory()

class App extends Component {

  state = {
    user: null,
    authed: false,
    loading: true,
  }

  componentDidMount () {

    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user.uid,
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
        <MuiThemeProvider>
          <Router>
              <div>
                <NavBar location={this.props.location}/>
                <Switch>
                <Route exact path='/' render={(props) => (
                  <Home {...props} user={this.state.user} />
                )}/>
                <Route path="/arcana" exact component={Arcana} />
                <Route path="/search" exact component={Search} />
                <Route path="/filter" exact component={Filter} />
                <Route path="/abilityList" exact component={AbilityList} />
                <Route path="/ability" exact component={Ability} />
                <Route path="/login" exact component={Login} />
                <Route path="/arcanaComposer" exact component={ArcanaComposer} />
                <Route path="/updateArcanaRefs" exact component={UpdateArcanaRefs} />
                {/* <PrivateRoute authed={this.state.authed} path="/arcanaComposer" exact component={ArcanaComposer} /> */}
                </Switch>
              </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
