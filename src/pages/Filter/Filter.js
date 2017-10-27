import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './Filter.css';
import firebase from 'firebase';
import {ref} from '../../helpers/constants'
import ArcanaList from '../../components/ArcanaList/ArcanaList'

import { HashRouter, Link, withRouter } from "react-router-dom";
import LazyLoad, { forceCheck } from 'react-lazyload';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import FilterButton from '../../components/FilterButton/FilterButton'
import { getViewType, setViewType } from '../../helpers/ArcanaViewType'

var _ = require('lodash');

let arcanaRef = ref.child('arcana')
const gridStyle = {
  marginTop: '40px',
}

var originalArray = []

class Filter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showFilter: true,
      viewType: 'list',
      rarityTypes: {},
      groupTypes: {},
      weaponTypes: {},
      affiliationTypes: {},
      arcanaArray: [],
      rarity: {},
    }

    this.updateFilter = this.updateFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);    
    this.filterArcana = this.filterArcana.bind(this)
    this.toggleFilterView = this.toggleFilterView.bind(this);
    this.observeArcana = this.observeArcana.bind(this)
    this.setViewType = this.setViewType.bind(this)
    this.getFilterQueries = this.getFilterQueries.bind(this)
    
  }

  componentWillMount() {
  
    let viewType = getViewType()
    if (viewType !== undefined) {
      this.setState({
        viewType: viewType
      })
    }
  }

  componentDidMount() {
    this.observeArcana()
  }


  componentWillUnmount() {
    arcanaRef.off()
  }

  getFilterQueries() {

    // const search = this.props.history.location.search
    // let params = getParams(search)

    // const rarity = params['rarity']
    // const group = params['group']
    // const weapon = params['weapon']
    // const affiliation = params['affiliation']

    // if (searchText !== "" && nextSearchText !== searchText) {
    //   searchText = nextSearchText
    //   this.observeNames()
    // }
    // else {
    //   // const nameArray = JSON.parse(sessionStorage.getItem('nameArray'))
    //   arcanaArray = []
    //   this.searchArcana()
    // }
  }

  observeArcana() {
    
    // arcanaRef.limitToLast(100).once('value', snapshot => {
    arcanaRef.once('value', snapshot => {
      var array = [];
      
      snapshot.forEach(child => {

        let arcanaID = child.key
        let arcana = child.val()

        array.push(arcana)
      })

      array.reverse()

      originalArray = array

      this.setState({
        arcanaArray: array,
      })

    })
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

  toggleFilterView() {
    console.log('filter')
    this.setState({
      showFilter: !this.state.showFilter,
    })
  }

  updateFilter(key, value) {

    console.log(`${key}: ${value}`)
    if (key === 'rarity') {
      var raritySet = Object.assign({}, this.state.rarityTypes)
      raritySet[value] === undefined ? raritySet[value] = true : delete raritySet[value]

      this.setState({
        rarityTypes: raritySet,
      }, () => {
        this.filterArcana()        
      })
    }
    else if (key === 'class') {
      var groupSet = this.state.groupTypes;
      groupSet[value] === undefined ? groupSet[value] = true : delete groupSet[value]

      this.setState({
        groupTypes: groupSet,
      }, () => {
        this.filterArcana()        
      })
    }
    else if (key === 'weapon') {
      var weaponSet = this.state.weaponTypes;
      weaponSet[value] === undefined ? weaponSet[value] = true : delete weaponSet[value]

      this.setState({
        weaponTypes: weaponSet,
      }, () => {
        this.filterArcana()        
      })
    }
    else if (key === 'affiliation') {
      var affiliationSet = this.state.affiliationTypes;
      affiliationSet[value] === undefined ? affiliationSet[value] = true : delete affiliationSet[value]

      this.setState({
        affiliationTypes: affiliationSet,
      }, () => {
        this.filterArcana()        
      })
    }
  }

  clearFilter() {
    this.setState({
      arcanaArray: originalArray,
      rarityTypes: {},
      groupTypes: {},
      weaponTypes: {},
      affiliationTypes: {},
    })
  }

  filterArcana() {
    console.log("filtering arcana")

    var arcanaArray = []  // the final array with combined filters

    var rarityArray = []
    var groupArray = [] // class. Ex: '전사'
    var weaponArray = []
    var affiliationArray = []
    
    let rarityTypes = this.state.rarityTypes
    let groupTypes = this.state.groupTypes
    let weaponTypes = this.state.weaponTypes
    let affiliationTypes = this.state.affiliationTypes

    
    if (_.isEmpty(rarityTypes) && _.isEmpty(groupTypes) && _.isEmpty(weaponTypes) && _.isEmpty(affiliationTypes)) {
      this.clearFilter()
      return
    }

    for (var rarity in rarityTypes) {
      console.log(`finding arcana with rarity ${rarity}`)
      for (var j = 0; j < originalArray.length; j++) {
        
        if (originalArray[j].rarity === rarity) {
          rarityArray.push(originalArray[j])
        }

      }
    }

    for (var group in groupTypes) {
      for (var j = 0; j < originalArray.length; j++) {
        
        if (originalArray[j].class === group) {
          groupArray.push(originalArray[j])
        }

      }
    }

    for (var weapon in weaponTypes) {
      console.log(`finding arcana with weapon ${weapon}`)
      for (var j = 0; j < originalArray.length; j++) {
        
        if (originalArray[j].weapon === weapon) {
          weaponArray.push(originalArray[j])
        }

      }
    }

    for (var affiliation in affiliationTypes) {
      console.log(`finding arcana with affiliation ${affiliation}`)
      for (var j = 0; j < originalArray.length; j++) {
        
        if (affiliation === "현탑" && originalArray[j].affiliation === "현자의탑") {
          affiliationArray.push(originalArray[j])          
        }
        else if (originalArray[j].affiliation.includes(affiliation)) {
          affiliationArray.push(originalArray[j])
        }

      }
    }
    const combinedSets = [rarityArray, groupArray, weaponArray, affiliationArray]

    for (var i = 0; i < combinedSets.length; i++) {
      
        if (arcanaArray.length == 0) {
          // set up the first array
          if (combinedSets[i].length > 0) {
            arcanaArray = combinedSets[i];
          }
        }
        else {
          // already initialized, so combine
          if (combinedSets[i].length > 0) {
            arcanaArray = _.intersection(arcanaArray,combinedSets[i]);
          }
          
        }
    }

    this.setState({
      arcanaArray: arcanaArray
    }, () => {
      forceCheck()
    })
  }

  render() {

    var arcanaGridClass;
    if (this.state.showFilter) {
      arcanaGridClass = styles.arcanaGrid
    }
    else {
      arcanaGridClass = styles.arcanaGridFull
    }
    return (
        <div style={{position:'relative'}}>
            <IconButton
              style={{float:'right'}}
              onClick={this.toggleFilterView}
            >
              <FilterIcon color={'d3d3d3'}/>
            </IconButton>
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
            <div style={{display:'flex'}}>
            <div className={arcanaGridClass}>
              <ArcanaList
                arcanaArray={this.state.arcanaArray}
                viewType={this.state.viewType}
              />
            </div>
            {this.state.showFilter &&
            <div className={styles.filterContainer}>

            <div className={styles.filterGrid}>
              <FilterButton label='5' selected={this.state.rarityTypes['5']} filter='rarity' onClick={this.updateFilter}/>
              <FilterButton label='4' selected={this.state.rarityTypes['4']} filter='rarity' onClick={this.updateFilter}/>
              <FilterButton label='3' selected={this.state.rarityTypes['3']} filter='rarity' onClick={this.updateFilter}/>
              <FilterButton label='2' selected={this.state.rarityTypes['2']} filter='rarity' onClick={this.updateFilter}/>
              <FilterButton label='1' selected={this.state.rarityTypes['1']} filter='rarity' onClick={this.updateFilter}/>
            </div>
            <div className={styles.filterGrid} style={gridStyle}>
              <FilterButton label='전사' selected={this.state.groupTypes['전사']} filter='class' onClick={this.updateFilter}/>
              <FilterButton label='기사' selected={this.state.groupTypes['기사']} filter='class' onClick={this.updateFilter}/>
              <FilterButton label='궁수' selected={this.state.groupTypes['궁수']} filter='class' onClick={this.updateFilter}/>
              <FilterButton label='법사' selected={this.state.groupTypes['법사']} filter='class' onClick={this.updateFilter}/>
              <FilterButton label='승려' selected={this.state.groupTypes['승려']} filter='class' onClick={this.updateFilter}/>
            </div>
            <div className={styles.filterGrid} style={gridStyle}>
              <FilterButton label='검' selected={this.state.weaponTypes['검']} filter='weapon' onClick={this.updateFilter}/>
              <FilterButton label='봉' selected={this.state.weaponTypes['봉']} filter='weapon' onClick={this.updateFilter}/>
              <FilterButton label='창' selected={this.state.weaponTypes['창']} filter='weapon' onClick={this.updateFilter}/>
              <FilterButton label='마' selected={this.state.weaponTypes['마']} filter='weapon' onClick={this.updateFilter}/>
              <FilterButton label='궁' selected={this.state.weaponTypes['궁']} filter='weapon' onClick={this.updateFilter}/>
              <FilterButton label='성' selected={this.state.weaponTypes['성']} filter='weapon' onClick={this.updateFilter}/>
              <FilterButton label='권' selected={this.state.weaponTypes['권']} filter='weapon' onClick={this.updateFilter}/>
              <FilterButton label='총' selected={this.state.weaponTypes['총']} filter='weapon' onClick={this.updateFilter}/>
              <FilterButton label='저' selected={this.state.weaponTypes['저']} filter='weapon' onClick={this.updateFilter}/>
            </div>
            <div className={styles.filterGrid} style={gridStyle}>
              <FilterButton label='여행자' selected={this.state.affiliationTypes['여행자']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='마신' selected={this.state.affiliationTypes['마신']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='부도' selected={this.state.affiliationTypes['부도']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='성도' selected={this.state.affiliationTypes['성도']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='현탑' selected={this.state.affiliationTypes['현탑']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='미궁' selected={this.state.affiliationTypes['미궁']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='호도' selected={this.state.affiliationTypes['호도']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='정령섬' selected={this.state.affiliationTypes['정령섬']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='구령' selected={this.state.affiliationTypes['구령']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='대해' selected={this.state.affiliationTypes['대해']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='수인' selected={this.state.affiliationTypes['수인']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='죄' selected={this.state.affiliationTypes['죄']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='박명' selected={this.state.affiliationTypes['박명']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='철연' selected={this.state.affiliationTypes['철연']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='연대기' selected={this.state.affiliationTypes['연대기']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='레무' selected={this.state.affiliationTypes['레무']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='의용군' selected={this.state.affiliationTypes['의용군']} filter='affiliation' onClick={this.updateFilter}/>
              <FilterButton label='화격단' selected={this.state.affiliationTypes['화격단']} filter='affiliation' onClick={this.updateFilter}/>
            </div>

            <div style={{margin:'10px', marginTop:'20px'}}>
              <FilterButton label="모두 지우기" onClick={this.clearFilter}/>
            </div>

        </div>
        }
        {/* <Toolbar className={styles.toolbar}>
          <ToolbarGroup lastChild={true}>
            <ToolbarTitle text="필터" />
            <IconButton onClick={this.toggleFilterView}>
              <FilterIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar> */}
        </div>
        </div>
    );
  }

}

export default Filter;
