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

let ARCANA_REF = ref.child('arcana')
let festivalRef = ref.child('festival')
let rewardRef = ref.child('reward')
let legendRef = ref.child('legend')
let abyssalRef = ref.child('abyssal')


var lastArcanaIDKey
var fetchedArcanaCount

const festivalArcanaDict = {}
const festivalOrder = {}

const rewardArcanaDict = {}
const rewardOrder = {}

const recentArcanaDict = {}

const legendArcanaDict = {}
const legendOrder = {}

const abyssalArcanaDict = {}

var placeArray = []

// create a set that stores observed arcana refs. we will remove observers when unneeded.
let observedRefs = new Set()

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      rewardArray: [],
      festivalArray: [],
      recentArray: [],      
      legendArray: [],
      abyssalArray: [],
      viewType: "grid",
      user: null,
    };

    this.observeArcana = this.observeArcana.bind(this);
    this.observeRewardArcana = this.observeRewardArcana.bind(this);
    this.observeFestivalArcana = this.observeFestivalArcana.bind(this);
    this.observeLegendArcana = this.observeLegendArcana.bind(this);
    this.observeAbyssalArcana = this.observeAbyssalArcana.bind(this);
    this.fetchArcana = this.fetchArcana.bind(this)

    this.handleScroll = this.handleScroll.bind(this);

    this.setViewType = this.setViewType.bind(this)
    this.reloadArcanaList = this.reloadArcanaList.bind(this)
    this.setArcanaArray = _.debounce(this.setArcanaArray.bind(this), 200)
    
  }

  componentWillMount() {

    fetchedArcanaCount = sessionStorage.getItem('fetchedArcanaCount')

    // if (placeArray.length > 0) {
    //   this.setState({
    //     arcanaArray: placeArray,
    //   }, () => {
    //     const offset = sessionStorage.getItem('scroll')
    //     window.scrollTo(0, offset)
    //     console.log(`didMount. offset is ${offset}`)
    //   })
    // }
    // else {
    //   this.observeArcana()      
    // }
  }

  componentDidMount() {

    // this.observeFestivalArcana()
    // this.observeLegendArcana()
    this.observeArcana()
    // if (placeArray.length > 0) {
      // const offset = sessionStorage.getItem('scroll')
      // window.scrollTo(0, offset)
      // console.log(`didMount. offset is ${offset}`)
    // }

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
    let fetchedArcanaCount = this.state.recentArray.length
    sessionStorage.setItem('fetchedArcanaCount', fetchedArcanaCount)
    window.removeEventListener("scroll", this.handleScroll)
    ARCANA_REF.off()
    rewardRef.off()
    festivalRef.off()
    legendRef.off()
    abyssalRef.off()
    
  }

  observeArcana() {

    var initialKey = true;
    var count = Number(Math.max(fetchedArcanaCount, 30))
    console.log(`fetching ${count} arcana`)

    ARCANA_REF.orderByKey().limitToLast(count).on('child_added', snapshot => {

      let arcanaID = snapshot.key
      let arcana = snapshot.val();

      if (initialKey) {
        lastArcanaIDKey = arcanaID
        initialKey = false
      }
      
      if (arcana.nameKR) {
        recentArcanaDict[arcanaID] = arcana
      }
      else {
        recentArcanaDict[arcanaID] = null
      }            
      // debounce sort array?
      this.reloadArcanaList('recentArray')
    })
  }

  observeRewardArcana() {
    
    rewardRef.orderByValue().on('child_added', snapshot => {

      const arcanaID = snapshot.key
      const index = snapshot.val()
      rewardOrder[arcanaID] = index

      const arcanaRef = ARCANA_REF.child(arcanaID)
      observedRefs.add(arcanaRef)

      arcanaRef.on('value', snapshot => {

        const arcana = snapshot.val()

        if (arcana.nameKR) {
          rewardArcanaDict[arcanaID] = arcana
        }
        else {
          rewardArcanaDict[arcanaID] = null
        }            
        // debounce sort array?
        this.reloadArcanaList('rewardArray')
      })
      
    })
  }
  
  observeFestivalArcana() {

    festivalRef.on('child_added', snapshot => {

      const arcanaID = snapshot.key

      const arcanaRef = ARCANA_REF.child(arcanaID)
      observedRefs.add(arcanaRef)

      arcanaRef.child(arcanaID).on('value', snapshot => {

        const arcana = snapshot.val()

        if (arcana.nameKR) {
          festivalArcanaDict[arcanaID] = arcana
        }
        else {
          festivalArcanaDict[arcanaID] = null
        }            
        // debounce sort array?
        this.reloadArcanaList('festivalArray')
      })
      
    })
  }

  observeLegendArcana() {
    
    legendRef.orderByValue().on('child_added', snapshot => {

      const arcanaID = snapshot.key

      const arcanaRef = ARCANA_REF.child(arcanaID)
      observedRefs.add(arcanaRef)

      arcanaRef.on('value', snapshot => {

        const arcana = snapshot.val()

        if (arcana.nameKR) {
          legendArcanaDict[arcanaID] = arcana
        }
        else {
          legendArcanaDict[arcanaID] = null
        }            
        // debounce sort array?
        this.reloadArcanaList('legendArray')
      })
      
    })
  }

  observeAbyssalArcana() {
    
    abyssalRef.orderByValue().on('child_added', snapshot => {

      const arcanaID = snapshot.key

      const arcanaRef = ARCANA_REF.child(arcanaID)
      observedRefs.add(arcanaRef)

      arcanaRef.on('value', snapshot => {

        const arcana = snapshot.val()

        if (arcana.nameKR) {
          abyssalArcanaDict[arcanaID] = arcana
        }
        else {
          abyssalArcanaDict[arcanaID] = null
        }            
        // debounce sort array?
        this.reloadArcanaList('abyssalArray')
      })
      
    })
  }

  // TODO: add a property that keeps track of the current list. only fetchArcana for /arcana

  fetchArcana() {

    console.log('fetching arcana')
    var count = 0
    var fetchedArcanaArray = []

    ARCANA_REF.orderByKey().endAt(lastArcanaIDKey).limitToLast(11).on('child_added', snapshot => {

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

  reloadArcanaList(arrayType) {
    let array = []

    switch (arrayType) {
      case 'rewardArray':
        const rewardArray = _.values(rewardArcanaDict)
        rewardArray.sort(function (a,b) {
          return rewardOrder[a.uid] > rewardOrder[b.uid]
        })
        array = rewardArray
        break
      case 'festivalArray':
        const festivalArray = _.values(festivalArcanaDict)
        festivalArray.sort(function (a,b) {
          return festivalOrder[a.uid] > festivalOrder[b.uid]
        })
        array = festivalArray
        break
      case 'recentArray':
        const recentArray = _.values(recentArcanaDict)
        recentArray.sort(function (a,b) {
          return a.uid > b.uid ? -1 : 1
        })
        array = recentArray
        break
      case 'legendArray':
        const legendArray = _.values(legendArcanaDict)
        legendArray.sort(function (a,b) {
          return a.uid > b.uid ? -1 : 1
        })
        array = legendArray
        break
      case 'abyssArray':
        const abyssalArray = _.values(abyssalArcanaDict)
        abyssalArray.sort(function (a,b) {
          return a.uid < b.uid ? -1 : 1
        })
        array = abyssalArray
        break
      default:
        break
    }
    // debounce function to set state
    this.setArcanaArray(array, arrayType)
  }

  setArcanaArray(array, arrayType) {
    var arrayState = {}
    arrayState[arrayType] = array
    this.setState(arrayState)
  }

  // mergeArcanaArrayWith(fetchedArcanaArray) {

  //   placeArray = []
  //   placeArray = this.state.arcanaArray.concat(fetchedArcanaArray)

  //   this.setState({
  //     arcanaArray: placeArray
  //   }, () => {
  //     // const offset = sessionStorage.getItem('scroll')
  //     // console.log(`offset after merge is ${offset}`)
  //     // window.scrollTo(0, offset)
  //   })
  // }

  handleScroll() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    const offsetY = window.pageYOffset    
    sessionStorage.setItem('scroll', offsetY)
    if (offset === height) {
      this.fetchArcana()
    }
  }

  render() {

    return (
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
            arcanaArray={this.state.recentArray}
            viewType={this.state.viewType}
          />

        </div>

    );
  }

}

export default Home;
