import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './ArcanaComposer.css';
import firebase from 'firebase';
import { HashRouter, Link, withRouter } from "react-router-dom";

import NameInput from './components/NameInput/NameInput';
import ImageInput from './components/ImageInput/ImageInput';
import SelectInput from './components/SelectInput/SelectInput';

class ArcanaComposer extends React.Component {

  constructor(props) {
    super(props);

    this.showArcana = this.getParameterByName.bind(this);
    
    const query = this.props.location.search;
    const arcanaID = this.getParameterByName('arcana');

    this.state = { 
      // arcanaID: arcanaID
      // nameKR: '무지카',
      // nicknameKR: '카세',
    };

    this.uploadArcana = this.uploadArcana.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentWillMount() {

  }

  updateField(key, value) {

    console.log(key)
    console.log(value)

    var obj = {}
    obj[key] = value;
    
    this.setState(obj)

  }

  uploadArcana() {

    console.log(this.state.nameKR);
    firebase.database().ref('/test').set({
      nameKR: this.state.nameKR,
      nicknameKR: this.state.nicknameKR,

      nameJP: this.state.nameJP,
      nicknameJP: this.state.nicknameJP,

      // rarity: this.state.rarity,
      // class: this.state.class,
      // weapon: this.state.weapon,
      // affiliation: this.state.affiliation,
      // cost: this.state.cost,
      // tavern: this.state.tavern,
      // numberOfViews: this.state.numberOfViews,
      
      // skillName1: this.state.skillName1,
      // skillMana1: this.state.skillMana1,
      // skillDesc1: this.state.skillDesc1,
      
      // skillName2: this.state.skillName2,
      // skillMana2: this.state.skillMana2,
      // skillDesc2: this.state.skillDesc2,

      // abilityName1: this.state.abilityName1,
      // abilityDesc1: this.state.abilityDesc1,

      // abilityName2: this.state.abilityName2,
      // abilityDesc2: this.state.abilityDesc2,

      // abilityName3: this.state.abilityName3,
      // abilityDesc3: this.state.abilityDesc3,

      // partyAbility: this.state.partyAbility,

      // kizunaName: this.state.kizunaName,
      // kizunaCost: this.state.kizunaCost,
      // kizunaDesc: this.state.kizunaDesc, 

      // iconURL: this.state.iconURL,
      // imageURL: this.state.imageURL,

    });
  }

  render() {

    return (
      <div className={styles.fullWidthContainer}>
        <NameInput isKR={true}
                  onChange={this.updateField}/>
        <NameInput onChange={this.updateField}/>
        <ImageInput isIcon={true} onChange={this.updateField}/>
        <ImageInput onChange={this.updateField}/>
        {/* <FullLengthInput onChange={this.updateField}/>
        <FullLengthInput onChange={this.updateField}/> */}
        <div className={styles.fullWidth}>
          <SelectInput type='rarity' onChange={this.updateField}/>
          <SelectInput type='class' onChange={this.updateField}/>
          <SelectInput type='weapon' onChange={this.updateField}/>
          <SelectInput type='cost' onChange={this.updateField}/>
          <SelectInput type='affiliation' onChange={this.updateField}/>
        </div>
        <input type="submit" value="완료" onClick={this.uploadArcana}/>

      </div>
    );

  }

  getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

}

export default ArcanaComposer;
