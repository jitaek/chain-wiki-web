import React, { Component } from 'react';
import { ref, ARCANA_REF } from '../../helpers/constants'
import { getParams } from '../../helpers/QueryParameter'

import { forceCheck } from 'react-lazyload'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import HomeTabs from '../../components/HomeTabs/HomeTabs'

import { getViewType, setViewType } from '../../helpers/ArcanaViewType'

var _ = require('lodash');

const festivalRef = ref.child('festival')
const rewardRef = ref.child('reward')
const legendRef = ref.child('legend')
const abyssalRef = ref.child('abyssal')

var listRef

var lastArcanaIDKey
var fetchedArcanaCount

const festivalArcanaDict = {}
const festivalOrder = {}

const rewardArcanaDict = {}
const rewardOrder = {}

const recentArcanaDict = {}

const legendArcanaDict = {}

const abyssalArcanaDict = {}

// create a set that stores observed arcana refs. we will remove observers when unneeded.
let observedRefs = new Set()

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      loadedLists: false,
      rewardArray: [],
      festivalArray: [],
      recentArray: [],      
      legendArray: [],
      abyssalArray: [],
      viewType: "grid",
      list: "recent",
      index: 0,
      user: null,
    }

    this.observeArcana = this.observeArcana.bind(this)
    this.observeRewardArcana = this.observeRewardArcana.bind(this)
    this.observeFestivalArcana = this.observeFestivalArcana.bind(this)
    this.observeLegendArcana = this.observeLegendArcana.bind(this)
    this.observeAbyssalArcana = this.observeAbyssalArcana.bind(this)
    this.fetchArcana = this.fetchArcana.bind(this)

    this.handleScroll = this.handleScroll.bind(this)

    this.setViewType = this.setViewType.bind(this)
    this.selectedArcanaList = this.selectedArcanaList.bind(this)
    this.reloadArcanaList = this.reloadArcanaList.bind(this)
    this.loadedLists = _.debounce(this.loadedLists.bind(this), 200)
    
    this.setRewardArray = _.debounce(this.setRewardArray.bind(this), 200)
    this.setFestivalArray = _.debounce(this.setFestivalArray.bind(this), 200)
    this.setRecentArray = _.debounce(this.setRecentArray.bind(this), 200)
    this.setLegendArray = _.debounce(this.setLegendArray.bind(this), 200)
    this.setAbyssalArray = _.debounce(this.setAbyssalArray.bind(this), 200)
    
  }

  componentWillMount() {

    fetchedArcanaCount = sessionStorage.getItem('fetchedArcanaCount')

  }

  componentDidMount() {

    this.observeRewardArcana()
    this.observeFestivalArcana()
    this.observeArcana()
    this.observeLegendArcana()
    this.observeAbyssalArcana()

    window.addEventListener("scroll", this.handleScroll);
    
    let viewType = getViewType()
    if (viewType !== undefined) {
      this.setState({
        viewType: viewType,
      })
    }

    const search = this.props.history.location.search
    let params = getParams(search)
    const index = params['index']
    this.setState({
      index: index
    })
    
  }

  componentWillUnmount() {

    let fetchedArcanaCount = this.state.recentArray.length
    sessionStorage.setItem('fetchedArcanaCount', fetchedArcanaCount)

    window.removeEventListener("scroll", this.handleScroll)

    ARCANA_REF.off()
    rewardRef.off()
    festivalRef.off()
    legendRef.off()
    abyssalRef.off()

    for (let ref of observedRefs) {
      ref.off()
    }
    
  }

  observeArcana() {

    let initialKey = true;
    const count = Number(Math.max(fetchedArcanaCount, 30))
    console.log(`fetching ${count} arcana`)

    ARCANA_REF.orderByKey().limitToLast(count).on('child_added', snapshot => {

      const arcanaID = snapshot.key
      const arcana = snapshot.val();

      if (initialKey) {
        lastArcanaIDKey = arcanaID
        initialKey = false
      }
      
      if (arcana.nameKR) {
        recentArcanaDict[arcanaID] = arcana
      }
      else {
        delete recentArcanaDict[arcanaID]
      }            

      this.reloadArcanaList('recentArray')
    })

    ARCANA_REF.orderByKey().limitToLast(count).on('child_changed', snapshot => {
      
      const arcanaID = snapshot.key
      const arcana = snapshot.val();
      
      if (arcana.nameKR) {
        recentArcanaDict[arcanaID] = arcana
      }
      else {
        delete recentArcanaDict[arcanaID]
      }            

      this.reloadArcanaList('recentArray')

    })

    ARCANA_REF.orderByKey().limitToLast(count).on('child_removed', snapshot => {
      
      const arcanaID = snapshot.key

      delete recentArcanaDict[arcanaID]

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
          delete rewardArcanaDict[arcanaID]
        }            
        // debounce sort array?
        this.reloadArcanaList('rewardArray')
      })
      
    })

    rewardRef.on('child_removed', snapshot => {

      const arcanaID = snapshot.key

      delete rewardArcanaDict[arcanaID]

      this.reloadArcanaList('rewardArray')
    })
  }
  
  observeFestivalArcana() {

    festivalRef.orderByValue().on('child_added', snapshot => {

      const arcanaID = snapshot.key
      const index = snapshot.val()
      festivalOrder[arcanaID] = index

      const arcanaRef = ARCANA_REF.child(arcanaID)
      observedRefs.add(arcanaRef)

      arcanaRef.on('value', snapshot => {

        const arcana = snapshot.val()

        if (arcana && arcana.nameKR) {
          festivalArcanaDict[arcanaID] = arcana
        }
        else {
          delete festivalArcanaDict[arcanaID]
        }            
        // debounce sort array?
        this.reloadArcanaList('festivalArray')
      })
      
    })

    festivalRef.on('child_removed', snapshot => {
      
      const arcanaID = snapshot.key

      delete festivalArcanaDict[arcanaID]

      this.reloadArcanaList('festivalArray')
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
          delete legendArcanaDict[arcanaID]
        }            
        // debounce sort array?
        this.reloadArcanaList('legendArray')
      })
      
    })
    
    legendRef.on('child_removed', snapshot => {
      
      const arcanaID = snapshot.key

      delete legendArcanaDict[arcanaID]

      this.reloadArcanaList('legendArray')
    })
  }

  observeAbyssalArcana() {
    
    abyssalRef.on('child_added', snapshot => {

      const arcanaID = snapshot.key

      const arcanaRef = ARCANA_REF.child(arcanaID)
      observedRefs.add(arcanaRef)

      arcanaRef.on('value', snapshot => {

        const arcana = snapshot.val()

        if (arcana.nameKR) {
          abyssalArcanaDict[arcanaID] = arcana
        }
        else {
          delete abyssalArcanaDict[arcanaID]
        }            
        this.reloadArcanaList('abyssalArray')
      })
      
    })

    abyssalRef.on('child_removed', snapshot => {
      
      const arcanaID = snapshot.key

      delete abyssalArcanaDict[arcanaID]

      this.reloadArcanaList('abyssalArray')
    })
  }

  // TODO: add a property that keeps track of the current list. only fetchArcana for /arcana

  fetchArcana() {

    console.log('fetching arcana')

    let initialKey = true

    if (lastArcanaIDKey) {

      ARCANA_REF.orderByKey().endAt(lastArcanaIDKey).limitToLast(11).on('child_added', snapshot => {
        
        const arcanaID = snapshot.key
        const arcana = snapshot.val()
        
        if (initialKey) {
          lastArcanaIDKey = arcanaID
          initialKey = false
        }

        if (arcana.nameKR) {
          recentArcanaDict[arcanaID] = arcana
        }
        else {
          delete recentArcanaDict[arcanaID]
        }            
        this.reloadArcanaList('recentArray')

      });   

      ARCANA_REF.orderByKey().endAt(lastArcanaIDKey).limitToLast(11).on('child_changed', snapshot => {

        const arcanaID = snapshot.key
        const arcana = snapshot.val()

        if (arcana.nameKR) {
          recentArcanaDict[arcanaID] = arcana
        }
        else {
          delete recentArcanaDict[arcanaID]
        }           
        
        this.reloadArcanaList('recentArray')
      })

      ARCANA_REF.orderByKey().endAt(lastArcanaIDKey).limitToLast(11).on('child_removed', snapshot => {

        const arcanaID = snapshot.key

        delete recentArcanaDict[arcanaID]

        this.reloadArcanaList('recentArray')
      })

    }

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

  selectedArcanaList(index) {
    
    setTimeout(forceCheck, 300)

    this.props.history.replace({
      search: `index=${index}`
    })
      
    console.log(`index is ${index}`)

  }

  reloadArcanaList(arrayType) {

    switch (arrayType) {
      case 'rewardArray':
        const rewardArray = _.values(rewardArcanaDict)
        rewardArray.sort(function (a,b) {
          return rewardOrder[a.uid] > rewardOrder[b.uid]
        })
        this.setRewardArray(rewardArray)
        break
      case 'festivalArray':
        const festivalArray = _.values(festivalArcanaDict)
        festivalArray.sort(function (a,b) {
          return festivalOrder[a.uid] > festivalOrder[b.uid]
        })
        this.setFestivalArray(festivalArray)
        break
      case 'recentArray':
        const recentArray = _.values(recentArcanaDict)
        recentArray.sort(function (a,b) {
          return a.uid > b.uid ? -1 : 1
        })
        this.setRecentArray(recentArray)
        break
      case 'legendArray':
        const legendArray = _.values(legendArcanaDict)
        legendArray.sort(function (a,b) {
          return a.uid > b.uid ? -1 : 1
        })
        this.setLegendArray(legendArray)
        break
      case 'abyssalArray':
        const abyssalArray = _.values(abyssalArcanaDict)
        abyssalArray.sort(function (a,b) {
          return a.uid < b.uid ? -1 : 1
        })
        this.setAbyssalArray(abyssalArray)
        break
      default:
        break
    }

    this.loadedLists()
    
  }

  loadedLists() {
    this.setState({
      loadedLists: true
    })
  }

  setRewardArray(array) {
    this.setState({
      rewardArray: array
    })
  }

  setFestivalArray(array) {
    this.setState({
      festivalArray: array
    })
  }

  setRecentArray(array) {
    this.setState({
      recentArray: array
    })
  }

  setLegendArray(array) {
    this.setState({
      legendArray: array
    })
  }

  setAbyssalArray(array) {
    this.setState({
      abyssalArray: array
    })
  }

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
          {this.state.loadedLists &&
          <HomeTabs
            rewardArray={this.state.rewardArray}
            festivalArray={this.state.festivalArray}
            recentArray={this.state.recentArray}
            legendArray={this.state.legendArray}
            abyssalArray={this.state.abyssalArray}

            viewType={this.state.viewType}
            index={this.state.index}

            onChange={this.selectedArcanaList}
          />
          }

        </div>

    );
  }

}

export default Home;
