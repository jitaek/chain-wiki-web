import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './AbilityList.css';
import firebase from 'firebase';
import {ref} from '../../helpers/constants'

import ArcanaList from '../../components/ArcanaList/ArcanaList'
import { HashRouter, Link, withRouter } from "react-router-dom";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List, ListItem} from 'material-ui/List';

var _ = require('lodash');

var ability

const RadioButtonStyle = {
  display: 'inline-block',
  width: '120px'
}

class AbilityList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      abilityType: "Ability", // Either ability or kizuna
      abilityRef: null,
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

    this.props.history.push({
      pathname: '../ability',
      search: '?query=' + ability + abilityType,
    });

  }

  render() {

    return (
      <MuiThemeProvider>
        <div>
          
          <div style={{margin:'20px'}}>
            <RadioButtonGroup name="status" defaultSelected="Ability" onChange={this.setAbilityType}>
              <RadioButton style={RadioButtonStyle} label="어빌리티" value="Ability" />
              <RadioButton style={RadioButtonStyle} label="인연" value="Kizuna" />
            </RadioButtonGroup>

            <List>
              <ListItem primaryText="마나의 소양" onClick={() => this.selectAbility('mana')}/>
              <ListItem primaryText="상자 획득" onClick={() => this.selectAbility('treasure')}/>
              <ListItem primaryText="골드" onClick={() => this.selectAbility('gold')}/>
              <ListItem primaryText="경험치" onClick={() => this.selectAbility('exp')}/>
              <ListItem primaryText="AP 회복" onClick={() => this.selectAbility('apRecover')}/>
              <ListItem primaryText="서브시 증가" onClick={() => this.selectAbility('sub')}/>
              <ListItem primaryText="필살기 증가" onClick={() => this.selectAbility('skillUp')}/>
              <ListItem primaryText="보스 웨이브시 공격력 증가" onClick={() => this.selectAbility('bossWave')}/>
              <ListItem primaryText="마나 슬롯 속도" onClick={() => this.selectAbility('manaSlot')}/>
              <ListItem primaryText="마나 획득 확률 증가" onClick={() => this.selectAbility('manaChance')}/>
              <ListItem primaryText="웨이브 회복" onClick={() => this.selectAbility('partyHeal')}/>
              <ListItem primaryText="어둠 적에게 공격력 증가" onClick={() => this.selectAbility('darkAttackUp')}/>
              <ListItem primaryText="어둠 면역" onClick={() => this.selectAbility('darkImmune')}/>
              <ListItem primaryText="어둠 부여" onClick={() => this.selectAbility('darkStrike')}/>
              <ListItem primaryText="슬로우 적에게 공격력 증가" onClick={() => this.selectAbility('slowAttackUp')}/>
              <ListItem primaryText="슬로우 면역" onClick={() => this.selectAbility('slowImmune')}/>
              <ListItem primaryText="슬로우 부여" onClick={() => this.selectAbility('slowStrike')}/>
              <ListItem primaryText="독 적에게 공격력 증가" onClick={() => this.selectAbility('poisonAttackUp')}/>
              <ListItem primaryText="독 면역" onClick={() => this.selectAbility('poisonImmune')}/>
              <ListItem primaryText="독 부여" onClick={() => this.selectAbility('poisonStrike')}/>
              <ListItem primaryText="저주 적에게 공격력 증가" onClick={() => this.selectAbility('curseAttackUp')}/>
              <ListItem primaryText="저주 면역" onClick={() => this.selectAbility('curseImmune')}/>
              <ListItem primaryText="저주 부여" onClick={() => this.selectAbility('curseStrike')}/>
              <ListItem primaryText="쇠약 적에게 공격력 증가" onClick={() => this.selectAbility('weakAttackUp')}/>
              <ListItem primaryText="쇠약 면역" onClick={() => this.selectAbility('weakImmune')}/>
              <ListItem primaryText="쇠약 부여" onClick={() => this.selectAbility('weakStrike')}/>
              <ListItem primaryText="다운 적에게 공격력 증가" onClick={() => this.selectAbility('stunAttackUp')}/>
              <ListItem primaryText="다운 면역" onClick={() => this.selectAbility('stunImmune')}/>
              <ListItem primaryText="다운 부여" onClick={() => this.selectAbility('stunStrike')}/>
              <ListItem primaryText="동결 적에게 공격력 증가" onClick={() => this.selectAbility('frostAttackUp')}/>
              <ListItem primaryText="동결 면역" onClick={() => this.selectAbility('frostImmune')}/>
              <ListItem primaryText="동결 부여" onClick={() => this.selectAbility('frostStrike')}/>
              <ListItem primaryText="봉인 적에게 공격력 증가" onClick={() => this.selectAbility('sealAttackUp')}/>
              <ListItem primaryText="봉인 면역" onClick={() => this.selectAbility('sealImmune')}/>
              <ListItem primaryText="봉인 부여" onClick={() => this.selectAbility('sealStrike')}/>
              <ListItem primaryText="황무지" onClick={() => this.selectAbility('wastelands')}/>
              <ListItem primaryText="숲" onClick={() => this.selectAbility('forest')}/>
              <ListItem primaryText="덩굴" onClick={() => this.selectAbility('cavern')}/>
              <ListItem primaryText="사막" onClick={() => this.selectAbility('desert')}/>
              <ListItem primaryText="설산" onClick={() => this.selectAbility('snow')}/>
              <ListItem primaryText="도시" onClick={() => this.selectAbility('urban')}/>
              <ListItem primaryText="해변" onClick={() => this.selectAbility('water')}/>
              <ListItem primaryText="야간" onClick={() => this.selectAbility('night')}/>

            </List>
          </div>

        </div>
      </MuiThemeProvider>

    );
  }

}

export default AbilityList;
