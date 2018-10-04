import React, { Component } from 'react'
import firebase from 'firebase'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  routes
} from 'react-router-dom'
import { storageKey, isAuthenticated } from './helpers/auth'
import NavBar from './components/NavBar/NavBar'
// import Nav from "./components/Nav/Nav"

import Home from "./pages/Home/Home"
import Arcana from "./pages/Arcana/Arcana"
import Search from "./pages/Search/Search"
import Filter from "./pages/Filter/Filter"
import AbilityList from './pages/AbilityList/AbilityList'
import Ability from './pages/Ability/Ability'
import Tavern from './pages/Tavern/Tavern'
import TavernList from './pages/TavernList/TavernList'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import ArcanaComposer from "./pages/ArcanaComposer/ArcanaComposer"
import UpdateArcanaRefs from "./pages/UpdateArcanaRefs/UpdateArcanaRefs"
import Account from "./pages/Account/Account"
import About from "./pages/About/About"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// var routes = require('./routes')
import { initializeAnalytics, logPageView } from './helpers/Analytics';
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
history.listen((location, action) => {
  logPageView();
});

var previousPath;

function PrivateRoute ({component: Component, authed, path, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated()
        ? <Component {...props} user={user}/>
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class App extends Component {

  state = {
    user: null,
    authed: false,
    loading: true,
    pathname: '',
    search: '',
  }

  componentDidMount () {

    initializeAnalytics();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('auth listener. user logged in')
        localStorage.setItem(storageKey, user.uid)
        
        this.setState({
          user: user,
          authed: true,
          loading: false,
        })
      } else {
        console.log('auth listener. user unauthenticated')
        localStorage.removeItem(storageKey)
        this.setState({
          user: null,
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }


  redirect() {
    
      const pathname = this.state.pathname
      const search = this.state.search

      if (pathname) {
          this.props.history.push({
              pathname: pathname,
          })
      }
  }
    
  render() {

    return (
      <div>
        <MuiThemeProvider>
          <Router routes={routes}>

              <div>
                <NavBar auth={this.state.authed} location={this.props.location}/>
                <Switch>
                <Route exact path='/' render={(props) => (
                  <Home {...props}/>
                )}/>
                <Route path="/arcana" exact component={Arcana} />
                <Route path="/search" exact component={Search} />
                <Route path="/filter" exact component={Filter} />
                <Route path="/abilityList" exact component={AbilityList} />
                <Route path="/ability" exact component={Ability} />
                <Route path="/tavernList" exact component={TavernList} />
                <Route path="/tavern" exact component={Tavern} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/about" exact component={About} />
                {/* <Route path='/account' render={routeProps => <Account {...routeProps} user="WEFEWF"/>} /> */}

                <PrivateRoute path="/updateArcanaRefs" exact component={UpdateArcanaRefs} />
                <PrivateRoute path="/arcanaComposer" exact component={ArcanaComposer} />
                <PrivateRoute path="/account" user={this.state.user} exact component={Account} />
                </Switch>
              </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
