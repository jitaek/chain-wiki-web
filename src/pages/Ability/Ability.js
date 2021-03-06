import React, { Component } from 'react';
import {ref} from '../../helpers/constants'
import { getParams } from '../../helpers/QueryParameter'
import AbilityTabs from '../../components/AbilityTabs/AbilityTabs'

import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { forceCheck } from 'react-lazyload';

var _ = require('lodash');

var ability
var warriorArray = []
var knightArray = []
var archerArray = []
var magicianArray = []
var healerArray = []

class Ability extends Component {

  constructor(props) {
    super(props);

    this.state = {
      abilityType: "Ability",
      abilityRef: null,
      selectedIndex: 0,
      arcanaArray: [],
      warriorArray: [],
      knightArray: [],
      archerArray: [],
      magicianArray: [],
      healerArray: [],
      viewType: "list",
      
    }

    this.selectedClass = this.selectedClass.bind(this);
    this.showArcanaForAbility = this.showArcanaForAbility.bind(this)
    this.selectAbility = this.selectAbility.bind(this)
    this.setAbilityType = this.setAbilityType.bind(this)
    this.observeArcanaWithAbility = this.observeArcanaWithAbility.bind(this)
    this.mergeArcanaArrayWith = _.debounce(this.mergeArcanaArrayWith.bind(this), 200)
    this.sortArcanaArray = this.sortArcanaArray.bind(this)
    this.pushArcana = this.pushArcana.bind(this)
    
  }

  componentWillReceiveProps() {

    /*

    console.log(`search text is ${nextSearchText}`)
    if (searchText !== "" && nextSearchText !== searchText) {
      searchText = nextSearchText
      this.observeNames()
    }
    else {
      // const nameArray = JSON.parse(sessionStorage.getItem('nameArray'))
      arcanaArray = []
      this.searchArcana()
    }
*/
    const search = this.props.history.location.search
    let params = getParams(search)
    const nextAbility = params['query'];

    console.log(`ability query text is ${nextAbility}`)
    if (ability !== "" && nextAbility !== ability) {
      ability = nextAbility
      this.observeArcanaWithAbility(ability)
    }


  }
  
  componentWillMount() {

  }

  componentDidMount() {
    
    const search = this.props.history.location.search
    let params = getParams(search)
    const nextAbility = params['query']
    const index = params['index']
    const selectedIndex = parseInt(index)

    if (ability !== "" && nextAbility !== ability) {
      warriorArray = []
      knightArray = []
      archerArray = []
      magicianArray = []
      healerArray = []
      
      ability = nextAbility
      this.observeArcanaWithAbility(ability)
    }
    else if (nextAbility === ability) {
      this.setState({
        warriorArray: warriorArray,
        knightArray: knightArray,
        archerArray: archerArray,
        magicianArray: magicianArray,
        healerArray: healerArray,
        abilityRef: nextAbility,
      })
    }

    if (selectedIndex || selectedIndex === 0) {
      this.setState({
        selectedIndex:selectedIndex
      })
    }
  }

  componentWillUnmount() {

  }
  
  selectedClass(index) {

    const search = this.props.history.location.search
    let params = getParams(search)
    const nextAbility = params['query'];

    setTimeout(forceCheck, 300)    
    
    this.props.history.replace({
      search: `?query=${nextAbility}&index=${index}`
    })
      
    console.log(`index is ${index}`)

  }

  observeArcanaWithAbility(abilityRef) {

    if (abilityRef !== undefined && abilityRef !== null) {

      ref.child('ability').child(abilityRef).on('child_added', snapshot => {

        let arcanaID = snapshot.key

        ref.child('arcana').child(arcanaID).once('value', snapshot => {

          let arcana = snapshot.val()

          // might be null because of stale IDs remaining in abilityRef
          if (arcana !== null) {
            this.setState({
              abilityRef: abilityRef
            })
            this.pushArcana(arcana)            
          }

        })
      })
    }
  }

  pushArcana(arcana) {

    const arcanaClass = arcana.class

    switch (arcanaClass) {
      case "전사":
        warriorArray.push(arcana)
        this.sortArcanaArray(warriorArray, "전사")
        break
      case "기사":
        knightArray.push(arcana)
        this.sortArcanaArray(knightArray, "기사")
        break
      case "궁수":
        archerArray.push(arcana)
        this.sortArcanaArray(archerArray, "궁수")
        break
      case "법사":      
        magicianArray.push(arcana)
        this.sortArcanaArray(magicianArray, "법사")
        break
      case "승려":
        healerArray.push(arcana)
        this.sortArcanaArray(healerArray, "승려")
        break
      default:
        break;
    }

  }

  sortArcanaArray(array, arcanaClass) {

    array.sort(function (a,b) {
      return a.rarity > b.rarity ? -1 : 1
    })
    
    switch (arcanaClass) {
      case "전사":
        this.setState({
          warriorArray: array
        })
        break
      case "기사":
        this.setState({
          knightArray: array
        })
        break
      case "궁수":
        this.setState({
          archerArray: array
        })
        break
      case "법사":
        this.setState({
          magicianArray: array
        })
        break
      case "승려":
        this.setState({
          healerArray: array
        })
        break
      default:
        break
    }

  }

  mergeArcanaArrayWith(abilityRef, fetchedArcanaArray) {
    this.setState({
      abilityRef: abilityRef,
      arcanaArray: fetchedArcanaArray.concat(this.state.arcanaArray)
    })
  }

  setAbilityType(event, value) {

    console.log(`setting ability type to ${value}`)

    if (value !== undefined) {
      this.setState({
        abilityType: value
      })
    }

  }

  selectAbility(ability) {

    console.log(ability)
    let abilityType = this.state.abilityType;

    if (ability !== null) {
      let abilityRef = ability + abilityType

      this.showArcanaForAbility(abilityRef)
    }
  }

  showArcanaForAbility(abilityRef) {
    this.props.history.push({
      search: '?query=' + abilityRef,
      state: {
        abilityRef: abilityRef,
      }
    });
  }

  render() {

    if (this.state.abilityRef !== null) {
      
      // TODO: 5 lists for each class. Also depending on width, show several at once.
      return (
        <AbilityTabs
          warriorArray={this.state.warriorArray}
          knightArray={this.state.knightArray}
          archerArray={this.state.archerArray}
          magicianArray={this.state.magicianArray}
          healerArray={this.state.healerArray}
          onChange={this.selectedClass}
          initialSelectedIndex={this.state.selectedIndex}
        />
      )
      
    }
    else {

      return <LoadingIndicator/>
    }
  }

}

export default Ability;
