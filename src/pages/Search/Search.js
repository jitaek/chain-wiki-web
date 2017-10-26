import React, { Component } from 'react';
import logo from '../../logo.png';
import firebase from 'firebase';
import {ref} from '../../helpers/constants'
import ArcanaList from '../../components/ArcanaList/ArcanaList'
import { history } from '../../App'
import { HashRouter, Link, withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import { getParams } from '../../helpers/QueryParameter'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var _ = require('lodash');

let arcanaRef = ref.child('arcana')
const nameRef = ref.child('name')

var arcanaArray = []
var nameArray = []
var searchText

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      searchText: "",
      arcanaArray: [],
      loadedImages: [],
      viewType: "list",
      user: null,
    };

    this.searchArcana = this.searchArcana.bind(this);
    this.observeNames = this.observeNames.bind(this);
    this.mergeArcanaArrayWith = _.debounce(this.mergeArcanaArrayWith.bind(this), 200)
    this.observeArcanaWithID = this.observeArcanaWithID.bind(this);
    this.showArcana = this.showArcana.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    const search = this.props.history.location.search
    let params = getParams(search)
    const nextSearchText = params['search'];

    console.log(`search text is ${nextSearchText}`)
    if (searchText !== "" && nextSearchText !== searchText) {
      searchText = nextSearchText
      this.observeNames()
    }

  }

  componentWillMount() {
    
    
  }

  componentDidMount() {

    const search = this.props.history.location.search
    let params = getParams(search)
    const nextSearchText = params['search'];

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
    window.addEventListener("scroll", this.handleScroll);

  }


  componentWillUnmount() {

    window.removeEventListener("scroll", this.handleScroll);    
    
  }

  observeNames() {

    arcanaArray = []
    
    nameRef.once('value', snapshot => {

      var array = [];
      
      snapshot.forEach(child => {

        let arcanaID = child.key
        let nameKR = child.val()

        let arcana = {
          text: nameKR,          
          value: arcanaID,          
        }
        array.push(arcana)

      })

      sessionStorage.setItem('nameArray', JSON.stringify(array))

      nameArray = []
      nameArray = array
      this.searchArcana()

    })
  }

  searchArcana() {

    if (nameArray === null || nameArray === undefined) {
      return
    }

    if (searchText === "" || searchText === null || searchText === undefined) {
      return
    }

    for (var i = 0; i < nameArray.length; i++) {
      if (_.includes(nameArray[i].text, searchText)) {
        this.observeArcanaWithID(nameArray[i].value)
      }
    }
    
  }

  observeArcanaWithID(arcanaID) {

    let arcanaRef = ref.child('arcana').child(arcanaID)
    arcanaRef.once('value', snapshot => {

      let arcana = snapshot.val()
      arcanaArray.push(arcana)
      this.mergeArcanaArrayWith(arcanaArray)
    })

  }

  mergeArcanaArrayWith(arcanaArray) {

    this.setState({
      arcanaArray: arcanaArray
    }, () => {
      // const offset = sessionStorage.getItem('scroll')
      // console.log(`offset after merge is ${offset}`)
      // window.scrollTo(0, offset)
    })
  }

  showArcana(arcanaID) {

    this.props.history.push({
      pathname: '../Arcana',
      search: '?arcana=' + arcanaID,
    });
  }

  handleScroll() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    const offsetY = window.pageYOffset    
    sessionStorage.setItem('scrollSearch', offsetY)
  }

  render() {

    return (
      <MuiThemeProvider>
        <div key={this.state.searchText}>        
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

export default Search
