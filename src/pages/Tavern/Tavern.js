import React, { Component } from 'react';
import {ref} from '../../helpers/constants'
import { getParams } from '../../helpers/QueryParameter'
import AbilityTabs from '../../components/AbilityTabs/AbilityTabs'
import ArcanaList from '../../components/ArcanaList/ArcanaList'

import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { forceCheck } from 'react-lazyload'
import { getTavernKR } from '../../helpers/TavernRef'
var _ = require('lodash');

var tavern
var arcanaArray = []

class Tavern extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tavernRef: null,
      selectedIndex: 0,
      arcanaArray: [],
      viewType: "list",
      
    }

    this.observeArcanaWithTavern = this.observeArcanaWithTavern.bind(this)
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
    const nextTavern = params['query'];

    console.log(`tavern query text is ${nextTavern}`)
    if (tavern !== "" && nextTavern !== tavern) {
      tavern = nextTavern
      this.observeArcanaWithTavern(tavern)
    }


  }
  
  componentWillMount() {

  }

  componentDidMount() {
    
    const search = this.props.history.location.search
    let params = getParams(search)
    const nextTavern = params['query']
    const index = params['index']
    const selectedIndex = parseInt(index)

    if (tavern !== "" && nextTavern !== tavern) {
      arcanaArray = []
      
      tavern = nextTavern
      this.observeArcanaWithTavern(tavern)
    }
    else if (nextTavern === tavern) {
      this.setState({
        arcanaArray: arcanaArray,
        tavernRef: nextTavern,
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
  
  observeArcanaWithTavern(tavernRef) {

    if (tavernRef !== undefined && tavernRef !== null) {
      console.log(tavernRef)
      ref.child('tavern').child(tavernRef).on('child_added', snapshot => {

        let arcanaID = snapshot.key

        ref.child('arcana').child(arcanaID).once('value', snapshot => {

          let arcana = snapshot.val()

          // might be null because of stale IDs remaining in abilityRef
          if (arcana !== null) {
            this.setState({
              tavernRef: tavernRef
            })
            this.pushArcana(arcana)            
          }

        })
      })
    }
  }

  pushArcana(arcana) {

    arcanaArray.push(arcana)
    this.sortArcanaArray(arcanaArray)
  }

  sortArcanaArray(array) {

    array.sort(function (a,b) {
      return a.rarity > b.rarity ? -1 : 1
    })

    this.setState({
      arcanaArray: array
    })

  }

  mergeArcanaArrayWith(tavernRef, fetchedArcanaArray) {
    this.setState({
      tavernRef: tavernRef,
      arcanaArray: fetchedArcanaArray.concat(this.state.arcanaArray)
    })
  }

  render() {

    if (this.state.tavernRef !== null) {
      
      return (
        <div>
          <h2 style={{marginLeft: '20px'}}>{getTavernKR(this.state.tavernRef)}</h2>
          <ArcanaList
            arcanaArray={this.state.arcanaArray}
            viewType="list"
          />
        </div>
      )
      
    }
    else {

      return <LoadingIndicator/>
    }
  }

}

export default Tavern
