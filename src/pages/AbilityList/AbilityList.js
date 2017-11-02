import React, { Component } from 'react';
import { abilityListDataSource } from '../../data/AbilityListDataSource'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const RadioButtonStyle = {
  display: 'inline-block',
  width: '120px'
}

class AbilityList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      abilityType: "Ability", // Either ability or kizuna
    }

    this.selectAbility = this.selectAbility.bind(this)
    this.setAbilityType = this.setAbilityType.bind(this)
    
  }
  
  componentWillMount() {

  }

  componentDidMount() {

    
  }

  componentWillUnmount() {

  }

  setAbilityType(event, value) {

    if (value !== undefined) {
      this.setState({
        abilityType: value
      })
    }

  }

  selectAbility(ability) {

    let abilityType = this.state.abilityType;

    this.props.history.push({
      pathname: '../ability',
      search: '?query=' + ability + abilityType,
    });

  }

  render() {

    return (
        <div>          
          <div style={{marginTop:'20px'}}>
            <RadioButtonGroup style={{marginLeft: '10px'}} name="status" defaultSelected="Ability" onChange={this.setAbilityType}>
              <RadioButton style={RadioButtonStyle} label="어빌리티" value="Ability" />
              <RadioButton style={RadioButtonStyle} label="인연" value="Kizuna" />
            </RadioButtonGroup>

            <List>
              {
                abilityListDataSource.map(ability => 
                  <div key={ability.en}>
                    <ListItem primaryText={ability.kr} onClick={() => this.selectAbility(ability.en)}/>
                    <Divider/>
                  </div>
                )
              }
            </List>
          </div>
        </div>
    );
  }

}

export default AbilityList
