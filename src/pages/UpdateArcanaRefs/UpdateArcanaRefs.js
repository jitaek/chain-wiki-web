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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const muiTheme = getMuiTheme({
  tableRow: {
    selectedColor: 'white',
    height: '30px',
  },
  tableRowColumn: {
    height: '30px',
    padding: '0px'
  }
});

const CheckBoxStyle = {
  margin: '20px',
}

const CheckBoxLabelStyle = {
  fontSize: '13px',
}

const RowStyle = {
  padding: '0px',
}

const TableStyle = {
  float: 'left',
  width: '40%',
}

const CurrentListStyle = {
  width: '40%',
  float: 'left',
}

const HeaderStyle = {
  marginLeft: '20px',
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
    this.removeArcana = this.removeArcana.bind(this)
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


      ref.child('name').limitToLast(10).once('value', snapshot => {
        
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

  updateCheck(row, column, event) {

    console.log(`row is ${row}`)
    if (row >= this.state.nameArray.length) {
      return
    }

    let arcana = this.state.nameArray[row]
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

  removeArcana(arcana) {

    let arcanaID = arcana.arcanaID
    
    var newFestivalArray = this.state.festivalArray.slice()
    var currentArcanaDict = this.state.arcanaDictionary
    
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

  handleSubmit() {
    // ref.child('festival').set(this.state.festivalIDs)
  }

  render() {

    return (
        <MuiThemeProvider muiTheme={muiTheme}>

        <div
        style={TableStyle}
        >
        <h4 style={HeaderStyle}>
          아르카나 목록
        </h4>
        <Table
          height={'100%'}
          selectable={this.state.selectable}
          multiSelectable={true}
          onCellClick={this.updateCheck}
        >

          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
            deselectOnClickaway={false}
          >
            {this.state.nameArray.map( (row, index) => (
              <TableRow key={index}
              style={RowStyle}
              selected={this.state.arcanaDictionary[row.arcanaID]}>
                <TableRowColumn style={RowStyle}>{row.name}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        </div>
          
        <div
        style={CurrentListStyle}
        > 
        <h4 style={HeaderStyle}>
          페스티벌 목록
        </h4>
        <div style={{marginLeft: '20px',fontSize:'12px'}}>(위아래로 드래그하면 순서 바뀜)</div>
          <ReactDragList
            dataSource={this.state.festivalArray}
            handles={false}
            row={(arcana, index) => (
              <Checkbox
                key={arcana.arcanaID}
                label={arcana.name}
                style={CheckBoxStyle}
                labelStyle={CheckBoxLabelStyle}
                checked={this.state.arcanaDictionary[arcana.arcanaID]}
                onCheck={() => this.removeArcana(arcana)}
              />
            )}/>
            {/*this.state.nameArray.map( arcana =>
              
            )*/}
          <RaisedButton
            label="완료"
            style={{margin:'20px'}}
            onClick={this.handleSubmit}/>
        </div>
        
        </MuiThemeProvider>
    );
  }

}

export default UpdateArcanaRefs;
