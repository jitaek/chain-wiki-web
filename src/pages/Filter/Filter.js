import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './Filter.css';
import firebase from 'firebase';
import {ref} from '../../helpers/constants'
import ArcanaList from '../../components/ArcanaList/ArcanaList'

import { HashRouter, Link, withRouter } from "react-router-dom";
import LazyLoad from 'react-lazyload';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
      originalArray: [],
      arcanaArray: [],
    }

    this.updateFilter = this.updateFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);    
    this.filterArcana = this.filterArcana.bind(this)
    this.toggleFilterView = this.toggleFilterView.bind(this);
    this.observeArcana = this.observeArcana.bind(this)
    this.setViewType = this.setViewType.bind(this)
    
  }

  componentWillMount() {
  
    let viewType = getViewType()
    if (viewType !== undefined) {
      this.setState({
        viewType: viewType
      })
    }
    // let array = [
    //   {
    //     nameKR: '무지카',
    //     rarity: '5',
    //     class: '궁수'
    //   },
    //   {
    //     nameKR: '록사나',
    //     rarity: '4',
    //     class: '법사'
    //   },
    //   {
    //     nameKR: '팔린',
    //     rarity: '5',
    //     class: '궁수'
    //   },
    // ]
    // this.setState({
    //   originalArray: array,
    // })
  }

  componentDidMount() {

    this.observeArcana()

  }


  componentWillUnmount() {
    arcanaRef.off()
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

      this.setState({
        arcanaArray: array,
        originalArray: array,
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

  showArcana(arcanaID) {
    this.props.history.push({
      pathname: '../Arcana',
      search: '?arcana=' + arcanaID
    });
  }

  toggleFilterView() {
    console.log('filter')
    this.setState({
      showFilter: !this.state.showFilter,
    })
  }

  updateFilter(event, key, value) {

    console.log(`${key}: ${value}`)
    if (key === 'rarity') {
      var raritySet = this.state.rarityTypes;
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
      arcanaArray: this.state.originalArray,
    })
  }

  filterArcana() {
    console.log("filtering arcana")

    let originalArray = this.state.originalArray    
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
          console.log(`adding ${originalArray[j].nameKR}`)
          rarityArray.push(originalArray[j])
        }

      }
    }

    for (var group in groupTypes) {
      console.log(`finding arcana with class ${group}`)
      for (var j = 0; j < originalArray.length; j++) {
        
        if (originalArray[j].class === group) {
          console.log(`adding ${originalArray[j].nameKR}`)
          groupArray.push(originalArray[j])
        }

      }
    }

    for (var weapon in weaponTypes) {
      console.log(`finding arcana with weapon ${weapon}`)
      for (var j = 0; j < originalArray.length; j++) {
        
        if (originalArray[j].weapon === weapon) {
          console.log(`adding ${originalArray[j].nameKR}`)
          weaponArray.push(originalArray[j])
        }

      }
    }

    for (var affiliation in affiliationTypes) {
      console.log(`finding arcana with affiliation ${affiliation}`)
      for (var j = 0; j < originalArray.length; j++) {
        
        if (originalArray[j].affiliation === affiliation) {
          console.log(`Affiliation: adding ${originalArray[j].nameKR}`)
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
            console.log(combinedSets[i].length);
          }
        }
        else {
          // already initialized, so combine
          if (combinedSets[i].length > 0) {
            console.log("intersecting")
            console.log(arcanaArray.length)
            console.log(combinedSets[i].length)
            let origina = _.intersection(arcanaArray,combinedSets[i]);
            console.log(origina.length)
            arcanaArray = _.intersection(arcanaArray,combinedSets[i]);
            console.log(arcanaArray.length)
          }
          
        }
    }

    console.log('filtered array is-------------->')
    for (var i = 0; i < arcanaArray.length; i++) {
      console.log(arcanaArray[i].nameKR)
    }

    console.log("until this line")

    this.setState({
      arcanaArray: arcanaArray
    })
  }

  render() {

    return (
      <MuiThemeProvider>
        <div>
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
        <div className={styles.arcanaGrid}>
        <ArcanaList
          arcanaArray={this.state.arcanaArray}
          viewType={this.state.viewType}
          onClick={this.showArcana}
        />
        </div>
        {this.state.showFilter &&
        <div className={styles.filterContainer}>

        <div className={styles.filterGrid}>
          <FilterButton label='5' onClick={() => this.updateFilter(this, 'rarity', '5')}/>
          <FilterButton label="4" onClick={() => this.updateFilter(this, 'rarity', '4')}/>
          <FilterButton label="3" onClick={() => this.updateFilter(this, 'rarity', '3')}/>
          <FilterButton label="2" onClick={() => this.updateFilter(this, 'rarity', '2')}/>
          <FilterButton label="1" onClick={() => this.updateFilter(this, 'rarity', '1')}/>
        </div>
        <div className={styles.filterGrid} style={gridStyle}>
          <FilterButton label="전사" onClick={() => this.updateFilter(this, 'class', '전사')}/>
          <FilterButton label="기사" onClick={() => this.updateFilter(this, 'class', '기사')}/>
          <FilterButton label="궁수" onClick={() => this.updateFilter(this, 'class', '궁수')}/>
          <FilterButton label="법사" onClick={() => this.updateFilter(this, 'class', '법사')}/>
          <FilterButton label="승려" onClick={() => this.updateFilter(this, 'class', '승려')}/>
        </div>
        <div className={styles.filterGrid} style={gridStyle}>
          <FilterButton label="검" onClick={() => this.updateFilter(this, 'weapon', '검')}/>
          <FilterButton label="봉" onClick={() => this.updateFilter(this, 'weapon', '봉')}/>
          <FilterButton label="창" onClick={() => this.updateFilter(this, 'weapon', '창')}/>
          <FilterButton label="마" onClick={() => this.updateFilter(this, 'weapon', '마')}/>
          <FilterButton label="궁" onClick={() => this.updateFilter(this, 'weapon', '궁')}/>
          <FilterButton label="성" onClick={() => this.updateFilter(this, 'weapon', '성')}/>
          <FilterButton label="권" onClick={() => this.updateFilter(this, 'weapon', '권')}/>
          <FilterButton label="총" onClick={() => this.updateFilter(this, 'weapon', '총')}/>
          <FilterButton label="저" onClick={() => this.updateFilter(this, 'weapon', '저')}/>
        </div>
        <div className={styles.filterGrid} style={gridStyle}>
          <FilterButton label="여행자" onClick={() => this.updateFilter(this, 'affiliation', '여행자')}/>
          <FilterButton label="마신" onClick={() => this.updateFilter(this, 'affiliation', '마신')}/>
          <FilterButton label="부도" onClick={() => this.updateFilter(this, 'affiliation', '부도')}/>
          <FilterButton label="성도" onClick={() => this.updateFilter(this, 'affiliation', '성도')}/>
          <FilterButton label="현탑" onClick={() => this.updateFilter(this, 'affiliation', '현탑')}/>
          <FilterButton label="미궁" onClick={() => this.updateFilter(this, 'affiliation', '미궁')}/>
          <FilterButton label="호도" onClick={() => this.updateFilter(this, 'affiliation', '호도')}/>
          <FilterButton label="정령섬" onClick={() => this.updateFilter(this, 'affiliation', '정령섬')}/>
          <FilterButton label="구령" onClick={() => this.updateFilter(this, 'affiliation', '구령')}/>
          <FilterButton label="대해" onClick={() => this.updateFilter(this, 'affiliation', '대해')}/>
          <FilterButton label="수인" onClick={() => this.updateFilter(this, 'affiliation', '수인')}/>
          <FilterButton label="죄" onClick={() => this.updateFilter(this, 'affiliation', '죄')}/>
          <FilterButton label="박명" onClick={() => this.updateFilter(this, 'affiliation', '박명')}/>
          <FilterButton label="철연" onClick={() => this.updateFilter(this, 'affiliation', '철연')}/>
          <FilterButton label="연대기" onClick={() => this.updateFilter(this, 'affiliation', '연대기')}/>
          <FilterButton label="레무" onClick={() => this.updateFilter(this, 'affiliation', '레무')}/>
          <FilterButton label="의용군" onClick={() => this.updateFilter(this, 'affiliation', '의용군')}/>
          <FilterButton label="화격단" onClick={() => this.updateFilter(this, 'affiliation', '화격단')}/>
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
      </MuiThemeProvider>

    );
  }

}

export default Filter;
