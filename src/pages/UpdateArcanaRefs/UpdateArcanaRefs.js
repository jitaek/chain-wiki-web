import React, { Component } from 'react';
import logo from '../../logo.png';
import firebase from 'firebase';
import { ref } from '../../helpers/constants'
import { HashRouter, Link, withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Checkbox from 'material-ui/Checkbox';

class UpdateArcanaRefs extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      nameArray: [],
      festivalIDs: {}
    };
    
    this.updateCheck = this.updateCheck.bind(this)
  }

  componentWillMount() {

    // Get arcana IDs and names for filtering.
    ref.child('festival').once('value', snapshot => {

      var festivalList = {};

      snapshot.forEach(child => {
        festivalList[child.key] = true
      });

      this.setState({
        festivalIDs: festivalList
      })


      ref.child('name').limitToLast(10).once('value', snapshot => {
        
        var array = [];
        snapshot.forEach(child => {
  
          let arcana = {
            arcanaID: child.key,          
            name: child.val(),
          }
          array.push(arcana)
  
        });
  
        array = array.reverse()
        this.setState({nameArray: array});
      });
    });
    
    
  }

  updateCheck(arcanaID) {

    var newFestivalIDs = this.state.festivalIDs
    newFestivalIDs[arcanaID] = !newFestivalIDs[arcanaID]
    
    this.setState({
      festivalIDS: newFestivalIDs,
    });
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>
          {this.state.nameArray.map( arcana =>
            <Checkbox
              key={arcana.arcanaID}
              name={arcana.arcanaiD}
              label={arcana.name}
              checked={this.state.festivalIDs[arcana.arcanaID]}
              onCheck={() => this.updateCheck(arcana.arcanaID)}
            />
          )}
        </MuiThemeProvider>
      </div>
    );
  }

}

export default UpdateArcanaRefs;
