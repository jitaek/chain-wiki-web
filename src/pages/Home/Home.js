import React, { Component } from 'react';
import logo from '../../logo.png';
import firebase from 'firebase';
import {ref} from '../../helpers/constants'
import ArcanaList from '../../components/ArcanaList/ArcanaList'

import { HashRouter, Link, withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import List from 'material-ui/svg-icons/action/list'

import { getViewType, setViewType } from '../../helpers/ArcanaViewType'

var _ = require('lodash');

let arcanaRef = ref.child('arcana')
var lastArcanaIDKey
var fetchedArcanaCount

const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

const deleteCookie = (name, path) => {
  setCookie(name, '', -1, path)
}

const arcanaArray = [
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
  {
    uid: '1',
    nameKR: '무지카',
  },
]

var placeArray = []

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      arcanaArray: [],
      loadedImages: [],
      viewType: "grid",
      user: null,
    };

    this.observeArcana = this.observeArcana.bind(this);
    this.fetchArcana = this.fetchArcana.bind(this)
    this.showArcana = this.showArcana.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.mergeArcanaArrayWith = _.debounce(this.mergeArcanaArrayWith.bind(this), 100)
    this.setViewType = this.setViewType.bind(this)
  }

  componentWillMount() {

    fetchedArcanaCount = getCookie('fetchedArcanaCount')
    
    if (placeArray.length > 0) {
      this.setState({
        arcanaArray: placeArray,
      })
    }
    else {
      this.observeArcana()      
    }
  }

  componentDidMount() {

    const offset = localStorage.getItem('scroll')
    window.scrollTo(0, offset)

    window.addEventListener("scroll", this.handleScroll);
    
    let viewType = getViewType()
    if (viewType !== undefined) {
      this.setState({
        viewType: viewType,
      })
    }
  }


  componentWillUnmount() {

    console.log('unmounting')
    let fetchedArcanaCount = this.state.arcanaArray.length
    document.cookie = (`fetchedArcanaCount=${fetchedArcanaCount}`)
    window.removeEventListener("scroll", this.handleScroll);    
    arcanaRef.off();

    // console.log(this.refs['homeRoot'].offsetTop);
    // var el = this.refs['homeRoot'];
    // var minPixel = el.offsetTop;
    // var maxPixel = minPixel + el.scrollHeight;
    // var value = el.scrollTop;
    // console.log(value);
    // // respect bounds of element
    // var percent = (value - minPixel)/(maxPixel - minPixel);
    // percent = Math.min(1,Math.max(percent, 0))*100;
    // console.log(percent);
    // console.log(this.refs.homeRoot.scrollTop);
    
  }

  observeArcana() {

    var initialKey = true;
    // var count = Number(Math.max(fetchedArcanaCount, 10))
    // console.log(`fetching ${count} arcana`)

    var fetchedArcanaArray = []
    arcanaRef.orderByKey().limitToLast(10).on('child_added', snapshot => {

      let arcanaID = snapshot.key
      let arcana = snapshot.val();

      if (initialKey) {
        lastArcanaIDKey = arcanaID
        initialKey = false
      }
      
      fetchedArcanaArray.unshift(arcana)
      this.mergeArcanaArrayWith(fetchedArcanaArray)
      // this.setState({ arcanaArray: [arcana].concat(this.state.arcanaArray) });
    })
  }

  fetchArcana() {

    console.log('fetching arcana')

    var count = 0
    var fetchedArcanaArray = []

    arcanaRef.orderByKey().endAt(lastArcanaIDKey).limitToLast(11).on('child_added', snapshot => {

      let arcanaID = snapshot.key
      let arcana = snapshot.val()

      if (count == 0) {
        lastArcanaIDKey = arcanaID
      }
      if (count < 10) {
        fetchedArcanaArray.unshift(arcana)
        this.mergeArcanaArrayWith(fetchedArcanaArray)

      }
      count++;

    });   

    // pages = arcanaArray.length;
  }

  setViewType(event, child) {
    
    setViewType(event, child)
    
    let viewType = child.props.value
    if (viewType !== undefined) {
      this.setState({
        viewType: viewType
      })
    }
  }

  mergeArcanaArrayWith(fetchedArcanaArray) {
    console.log('merging arrays')
    placeArray = []
    placeArray = this.state.arcanaArray.concat(fetchedArcanaArray)
    placeArray.splice(0, placeArray.length, ...this.state.arcanaArray.concat(fetchedArcanaArray))
    console.log(`placearray length is ${placeArray.length}`)
    this.setState({
      arcanaArray: placeArray
    })
  }

  onLoad(arcana) {
    console.log(arcana.uid)
    this.setState(({ loadedImages }) => {
      return { loadedImages: loadedImages.concat(arcana) }
    })
  }

  showArcana(event, arcanaID) {

    const offset = window.pageYOffset
    console.log(offset)
    localStorage.setItem('scroll', offset)

    this.props.history.push({
      pathname: '../Arcana',
      search: '?arcana=' + arcanaID,
    });
  }

  handleScroll() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    if (offset === height) {
      console.log('At the bottom');
      this.fetchArcana()
    }
  }

  render() {

    return (
      <MuiThemeProvider>
        <div>
          <IconMenu
          style={{float:'right'}}
            iconButtonElement={<IconButton>
              <Dashboard color={'d3d3d3'}/>
            </IconButton>}
            onItemTouchTap={this.setViewType}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="카드 뷰" value="grid"/>
            <MenuItem primaryText="리스트 뷰" value="list"/>
          </IconMenu>
          <br style={{clear:'both'}}/>
        
          <ArcanaList
            arcanaArray={this.state.arcanaArray}
            viewType={this.state.viewType}
            onClick={this.showArcana}
          />

        </div>
      </MuiThemeProvider>

    );
  }

}

export default Home;
