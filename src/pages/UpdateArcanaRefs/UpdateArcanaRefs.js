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
import FlatButton from 'material-ui/FlatButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
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

const ButtonStyle = {
  margin: '10px',
}

const ButtonLabelStyle = {
  fontWeight: '600',
}

const RadioButtonStyle = {
  width: 'auto',
  margin: '20px',
  whiteSpace: 'nowrap',
}

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
      height: '0px',
      listType: props.listType,
      nameArray: [],  // list of names, on the left.
      festivalArray: [],  // list of current festival arcana. In future, will contain whole arcana data.
      arcanaNameDictionary: {},
      arcanaDictionary: {}, // For check/uncheck
      arcanaListArray: [],
    };
    
    this.updateTableHeight = this.updateTableHeight.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.getNames = this.getNames.bind(this)
    this.selectList = this.selectList.bind(this)
    this.updateOrder = this.updateOrder.bind(this)
    this.updateCheck = this.updateCheck.bind(this)
    this.removeArcana = this.removeArcana.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {

    this.getNames()
    
  }

  componentDidMount() {

    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateTableHeight()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);    
  }

  updateWindowDimensions() {
    this.updateTableHeight()
  }

  updateTableHeight() {

    const rect = ReactDOM.findDOMNode(this.table)
    .getBoundingClientRect()
    
    const offset = rect.y
    const windowHeight = window.innerHeight
    const heightValue = windowHeight - offset

    const height = `${heightValue}px`

    this.setState({ height });
  }
  

  getNames() {

    const arcanaNameDict = {}

    // ref.child('name').limitToLast(20).once('value', snapshot => {
    ref.child('name').once('value', snapshot => {

      var array = [];
      
      snapshot.forEach(child => {

        let arcanaID = child.key
        let nameKR = child.val()

        let arcana = {
          arcanaID: arcanaID,          
          name: nameKR,
        }
        array.push(arcana)
        arcanaNameDict[arcanaID] = nameKR

      });

      array = array.reverse()
      this.setState({
        nameArray: array,
        arcanaNameDictionary: arcanaNameDict,
      });
    });
  }

  getArcanaList(listType) {

    // clear previous values
    // this.state.arcanaDictionary = {}
    // this.state.arcanaListArray = []
    this.setState({
      arcanaDictionary: {},
      arcanaListArray: []
    }, function() {
      // Get arcana IDs and names for filtering.
      const arcanaListDict = {}
      const currentArcanaListArray = []

      ref.child(listType).orderByValue().on('child_added', snapshot => {

          let arcanaID = snapshot.key
          let order = snapshot.val()
          console.log(arcanaID, order)
          arcanaListDict[arcanaID] = order
          currentArcanaListArray.push(arcanaID)

          this.setState({
            arcanaDictionary: arcanaListDict,
            arcanaListArray: currentArcanaListArray,
          })
      
      });
    })

  }

  selectList(event, listType) {
    
    console.log(`update listType to ${listType}`)
    this.setState({
      listType: listType,
    }, function() {
      this.getArcanaList(listType)      
    })
  }

  updateOrder(event) {
    console.log(event)
    const oldIndex = event.oldIndex
    const newIndex = event.newIndex
    
    const updatedArcanaListArray = this.state.arcanaListArray

    if (oldIndex < updatedArcanaListArray.length) {
      
      const arcana = updatedArcanaListArray[oldIndex]
      console.log(arcana)
      updatedArcanaListArray.splice(oldIndex, 1);
      updatedArcanaListArray.splice(newIndex, 0, arcana);

      console.log(updatedArcanaListArray[newIndex])
      this.setState({
        arcanaListArray: updatedArcanaListArray
      }, function(){
        // this.handleSubmit()
      })
    }
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

    console.log('uploading...')
    // arcanaListArray will be in order of what the user dragged around.
    var updatedArcanaDict = {}

    for (var i = 0; i < this.state.arcanaListArray.length; i++) {

      let arcanaID = this.state.arcanaListArray[i]
      updatedArcanaDict[arcanaID] = i

    }

    if (this.state.listType !== undefined) {
      ref.child(this.state.listType).set(updatedArcanaDict)      
    }


  }

  render() {

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <div>
          아르카나 목록 선택
          <div>
            <RadioButtonGroup name="shipSpeed" style={{display:'flex'}} defaultSelected="not_light" onChange={this.selectList}>
              <RadioButton
                value="reward"
                label="보상"
                style={RadioButtonStyle}
              />
              <RadioButton
                value="festival"
                label="페스티벌"
                style={RadioButtonStyle}
              />
              <RadioButton
                value="legend"
                label="레전드"
                style={RadioButtonStyle}
              />
              <RadioButton
                value="abyssal"
                label="천마"
                style={RadioButtonStyle}
              />
            </RadioButtonGroup>
          </div>
        </div>

        <div
        style={TableStyle}
        >
        <h4 style={HeaderStyle}>
          전체 아르카나 목록
        </h4>
        <Table
          ref={el => this.table = el}
          height={this.state.height}
          selectable={this.state.listType !== undefined}
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
              selected={this.state.arcanaDictionary[row.arcanaID] !== undefined}>
                <TableRowColumn style={RowStyle}>{row.name}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        </div>
          
        {this.state.listType !== undefined &&
        <div
        style={CurrentListStyle}
        > 
        <h4 style={HeaderStyle}>
          현재 목록
        </h4>
        <div style={{marginLeft: '20px',fontSize:'12px'}}>(위아래로 드래그하면 표시 순서 바뀜)</div>
          <ReactDragList
            dataSource={this.state.arcanaListArray}
            handles={false}
            onUpdate={this.updateOrder}
            row={(arcanaID, index) => (
              <Checkbox
                key={arcanaID}
                label={this.state.arcanaNameDictionary[arcanaID]}
                style={CheckBoxStyle}
                labelStyle={CheckBoxLabelStyle}
                checked={this.state.arcanaDictionary[arcanaID] !== undefined}
                onCheck={() => this.removeArcana(arcanaID)}
              />
            )}
            />
            
          <RaisedButton
            label="완료"
            style={{margin:'20px'}}
            onClick={this.handleSubmit}/>
        </div>
        }
        </div>
        </MuiThemeProvider>
    );
  }

}

export default UpdateArcanaRefs;
