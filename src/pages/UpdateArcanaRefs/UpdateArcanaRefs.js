import React, { Component } from 'react';
import logo from '../../logo.png';
import firebase from 'firebase';
import { ref } from '../../helpers/constants'
import { HashRouter, Link, withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import ReactDragList from 'react-drag-list';
// import { DragDropContext } from 'react-beautiful-dnd';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton'

const CheckBoxStyle = {
  margin: '20px',
}

class UpdateArcanaRefs extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      nameArray: [],  // list of names, on the left.
      festivalArray: [],  // list of current festival arcana. In future, will contain whole arcana data.
      arcanaDictionary: {}, // For check/uncheck
    };
    
    this.updateCheck = this.updateCheck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {

    // Get arcana IDs and names for filtering.
    ref.child('festivalTest').orderByChild('order').once('value', snapshot => {

      var festivalList = []
      var festivalDict = {}
      snapshot.forEach(child => {

        let arcanaID = child.key
        let nameKR = child.val().nameKR

        let arcana = {
          arcanaID: arcanaID,
          name: nameKR
        }

        festivalList.push(arcana)
        festivalDict[arcanaID] = true
      });

      this.setState({
        festivalArray: festivalList,
        arcanaDictionary: festivalDict
      })


      ref.child('name').limitToLast(5).once('value', snapshot => {
        
        var array = [];
        
        snapshot.forEach(child => {
  
          let arcanaID = child.key
          let nameKR = child.val()

          let arcana = {
            arcanaID: arcanaID,          
            name: nameKR,
          }
          array.push(arcana)

        });

        array = array.reverse()
        this.setState({nameArray: array});
      });
    });
    
    
  }

  updateCheck(arcana) {

    let arcanaID = arcana.arcanaID

    var currentArcanaDict = this.state.arcanaDictionary

    if (currentArcanaDict[arcanaID] === undefined) {
      var newFestivalArray = this.state.festivalArray.slice()
      newFestivalArray.push(arcana)

      currentArcanaDict[arcanaID] = true

      this.setState({
        festivalArray: newFestivalArray,
        arcanaDictionary: currentArcanaDict
      })
    }
    else {

      var newFestivalArray = this.state.festivalArray.slice()
      
      var index = -1
      for(var i = 0, len = newFestivalArray.length; i < len; i++) {
        if (newFestivalArray[i].arcanaID === arcanaID) {
            index = i;
            break;
        }
      }

      if (index > -1) {
        newFestivalArray.splice(index, 1)
      }

      currentArcanaDict[arcanaID] = undefined
      this.setState({
        festivalArray: newFestivalArray,
        arcanaDictionary: currentArcanaDict
      })

    }

    // update firebase on each check/uncheck????
  }

  handleSubmit() {
    // ref.child('festival').set(this.state.festivalIDs)
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>

          <ReactDragList
          style={{float:'left'}}
          dataSource={this.state.nameArray}
          handles={false}
          row={(arcana, index) => (
            <Checkbox
              key={arcana.arcanaID}
              label={arcana.name}
              style={CheckBoxStyle}
              checked={this.state.arcanaDictionary[arcana.arcanaID]}
              onCheck={() => this.updateCheck(arcana)}
            />
          )}/>

        <ReactDragList
        style={{float:'left'}}
          dataSource={this.state.festivalArray}
          handles={false}
          row={(arcana, index) => (
            <Checkbox
              key={arcana.arcanaID}
              label={arcana.name}
              style={CheckBoxStyle}
              checked={this.state.arcanaDictionary[arcana.arcanaID]}
              onCheck={() => this.updateCheck(arcana)}
            />
          )}/>
          {/*this.state.nameArray.map( arcana =>
            
          )*/}
          <RaisedButton label="완료" onClick={this.handleSubmit}/>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default UpdateArcanaRefs;
