import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './ArcanaComposer.css';
import firebase from 'firebase';
import { HashRouter, Link, withRouter } from "react-router-dom";

import NameInput from './components/NameInput/NameInput';
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

    this.setState({
      key: value
    });

  }

  uploadArcana() {

  }

  render() {

    return (
      <div className={styles.fullWidth}>
        <NameInput isKR={true}
                  onChange={this.updateField}/>
        <NameInput onChange={this.updateField}/>
        {/* <FullLengthInput onChange={this.updateField}/>
        <FullLengthInput onChange={this.updateField}/> */}
        <div className={styles.container}>
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
