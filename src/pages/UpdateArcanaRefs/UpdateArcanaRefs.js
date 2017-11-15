import React from 'react';
import { ref } from '../../helpers/constants'
import { forceCheck } from 'react-lazyload';
import Checkbox from 'material-ui/Checkbox';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import Snackbar from 'material-ui/Snackbar';

// Material UI
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'

const RadioButtonStyle = {
  width: 'auto',
  margin: '20px',
  whiteSpace: 'nowrap',
}

const TableStyle = {
  float: 'left',
  width: '50%',
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
      arcanaNameDictionary: {}, // Use arcanaID of selected list to find the names. 
      arcanaDictionary: {}, // For check/uncheck
      arcanaListArray: [], // selected list arcana. Ex: festival, reward, with arcanaIDs.
      alert: false,
      confirmationText: "",
    };
    
    this.getNames = this.getNames.bind(this)
    this.selectList = this.selectList.bind(this)
    this.updateOrder = this.updateOrder.bind(this)
    this.updateCheck = this.updateCheck.bind(this)
    this.removeArcana = this.removeArcana.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showAlert = this.showAlert.bind(this)
  }

  componentWillMount() {

    this.getNames()
    
  }

  componentDidMount() {

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);    
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
          nameKR: nameKR,
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

    // Get arcana IDs and names for filtering.

    ref.child(listType).orderByValue().on('value', snapshot => {

      const arcanaListDict = {}
      const currentArcanaListArray = []
      
      snapshot.forEach(child => {

        let arcanaID = child.key
        let arcana = {
          arcanaID: arcanaID,
          nameKR: this.state.arcanaNameDictionary[arcanaID]
        }
        arcanaListDict[arcanaID] = true
        currentArcanaListArray.push(arcana)

      });

      // todo: sort nameArray based on checked arcana
      var nameArray = this.state.nameArray;
      nameArray.sort(function (a,b) {
        if (arcanaListDict[a.arcanaID] === arcanaListDict[b.arcanaID]) {
          return a.arcanaID > b.arcanaID ? -1 : 1
        }
        else if (arcanaListDict[a.arcanaID]) {
          return -1;
        }
        else {
          return 1;
        }
      })

      this.setState({
        nameArray: nameArray,
        arcanaDictionary: arcanaListDict,
        arcanaListArray: currentArcanaListArray,
      }, () => {
        forceCheck()        
      })
    
    });

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

    const oldIndex = event.oldIndex
    const newIndex = event.newIndex
    
    const updatedArcanaListArray = this.state.arcanaListArray

    if (oldIndex < updatedArcanaListArray.length) {
      
      const arcana = updatedArcanaListArray[oldIndex]

      updatedArcanaListArray.splice(oldIndex, 1);
      updatedArcanaListArray.splice(newIndex, 0, arcana);

      this.setState({
        arcanaListArray: updatedArcanaListArray
      })
    }
  }

  updateCheck(arcana) {

    let arcanaID = arcana.arcanaID

    const currentArcanaDict = Object.assign({}, this.state.arcanaDictionary)

    if (currentArcanaDict[arcanaID] === undefined) {
      const newListArray = Object.assign([], this.state.arcanaListArray)
      newListArray.push(arcana)

      currentArcanaDict[arcanaID] = true

      this.setState({
        arcanaListArray: newListArray,
        arcanaDictionary: currentArcanaDict
      })
    }
    else {

      var newListArray = Object.assign([], this.state.arcanaListArray)
      
      var index = -1
      for(var i = 0, len = newListArray.length; i < len; i++) {
        if (newListArray[i].arcanaID === arcanaID) {
            index = i;
            break;
        }
      }

      if (index > -1) {
        newListArray.splice(index, 1)
      }

      delete currentArcanaDict[arcanaID]

      this.setState({
        arcanaListArray: newListArray,
        arcanaDictionary: currentArcanaDict
      })

    }

  }

  removeArcana(arcana) {

    console.log(`removing arcana ${arcana}`)
    let arcanaID = arcana.arcanaID
    
    var newListArray = this.state.arcanaListArray.slice()
    var currentArcanaDict = this.state.arcanaDictionary
    
    var index = -1
    for(var i = 0, len = newListArray.length; i < len; i++) {
      if (newListArray[i].arcanaID === arcanaID) {
          index = i;
          break;
      }
    }

    if (index > -1) {
      newListArray.splice(index, 1)
    }

    currentArcanaDict[arcanaID] = undefined
    this.setState({
      arcanaListArray: newListArray,
      arcanaDictionary: currentArcanaDict
    })
  }

  handleSubmit() {
    // ref.child('festival').set(this.state.festivalIDs)

    console.log('uploading...')
    // arcanaListArray will be in order of what the user dragged around.
    var updatedArcanaDict = {}
    const arcanaListArray = this.state.arcanaListArray
    for (var i = 0; i < arcanaListArray.length; i++) {

      let arcanaID = arcanaListArray[i].arcanaID
      updatedArcanaDict[arcanaID] = i

    }

    const listType = this.state.listType

    if (listType) {
      
      ref.child(listType).set(updatedArcanaDict, error => {
        this.showAlert(error)
      })
    }

  }

  showAlert(error) {

    let text = ""

    if (error) {
      text = "업데이트 실패."
    }
    else {
      text = "목록 업데이트 완료!"
    }
    this.setState({
      alert: true,
      confirmationText: text,
    })
  }

  render() {

    return (
        <div>
        <div style={{margin:'10px'}}>
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
              {/* <RadioButton
                value="legend"
                label="레전드"
                style={RadioButtonStyle}
              />
              <RadioButton
                value="abyssal"
                label="천마"
                style={RadioButtonStyle}
              /> */}
            </RadioButtonGroup>
          </div>
        </div>

        <div
        style={TableStyle}
        >
        <h4 style={HeaderStyle}>
          전체 아르카나 목록
        </h4>
        
          {this.state.nameArray.map( (arcana, index) => (

            // <LazyLoad height={24} key={arcana.arcanaID}>
              <Checkbox
                key={arcana.arcanaID}
                label={arcana.nameKR}
                checked={this.state.arcanaDictionary[arcana.arcanaID] !== undefined}
                disabled={this.state.listType === undefined}
                onCheck={() => this.updateCheck(arcana)}
              />

            // </LazyLoad>
              
          ))}

        </div>
          
        {this.state.listType !== undefined &&
        <div
        style={CurrentListStyle}
        > 
        <h4 style={HeaderStyle}>
          현재 목록
        </h4>
        <div style={{marginLeft: '20px',fontSize:'12px'}}>(위아래로 드래그하면 표시 순서 바뀜)</div>

        <SortableList items={this.state.arcanaListArray} onSortEnd={this.updateOrder}/>
        
          <RaisedButton
            label="완료"
            style={{margin:'20px'}}
            onClick={this.handleSubmit}/>
        </div>
        }
        <Snackbar
          open={this.state.alert}
          message={this.state.confirmationText}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        </div>
    );
  }

}

const SortableItem = SortableElement(({value}) =>
  <li>
    {value.nameKR}
  </li>
);

const SortableList = SortableContainer(({items, props1}) => {
return (
  <ol>
    {items.map((value, index) => (
      <SortableItem key={value.arcanaID} index={index} value={value}/>
    ))}
  </ol>
);
});

export default UpdateArcanaRefs;
