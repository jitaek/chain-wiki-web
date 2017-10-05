import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './Arcana.css';
import firebase from 'firebase';
import ArcanaCell from '../../components/ArcanaCell/ArcanaCell';
import { HashRouter, Link, withRouter } from "react-router-dom";
import sampleMain from '../../sampleMainImage.jpg';

function Skill(props) {
  const skillNumber = props.skillNumber;
  const skillName = props.skillName;
  const skillMana = props.skillMana;  
  const skillDesc = props.skillDesc;
  const isKizuna = props.isKizuna;

  if (skillDesc) {
    return (
      <div>
        <table className={styles.arcanaSkillTable}>
        <tbody>
          <tr>
            <th className={styles.headerCell}>{isKizuna == undefined ? "스킬 "  + skillNumber : "인연"}</th>
              <td className={styles.bodyCell}>
                  <div>
                      <div className={styles.skillNameCell}>{skillName}</div>
                      <div className={styles.manaContainer}>
                          <div className={styles.manaLabelCell}>{isKizuna == undefined ? "마나" : "코스트"}</div>
                          <div className={styles.manaCell}>{skillMana}</div>
                      </div>
                  </div>
              </td>
          </tr>
        </tbody>
        </table>
        <div className={styles.skillAbilityDescCell}>{skillDesc}</div>
      </div>
    );
  }
  else {
    return null;
  } 
}

function Ability(props) {
  const abilityNumber = props.abilityNumber;
  const abilityName = props.abilityName;
  const abilityDesc = props.abilityDesc;
  if (abilityDesc) {
    return (
      <div>
        <table className={styles.arcanaSkillTable}>
        <tbody>
          <tr>
            <th className={styles.headerCell}>{abilityNumber != 4 ? "어빌 " + abilityNumber : "파티 어빌"}</th>
            <td className={styles.bodyCell}>{abilityNumber != 4 ? abilityName : ""}</td>
          </tr>
        </tbody>
        </table>
        <div className={styles.skillAbilityDescCell}>{abilityDesc}</div>
      </div>
    );
  }
  else {
    return null;
  } 
}

class Arcana extends React.Component {

  constructor(props) {
    super(props);

    this.showArcana = this.getParameterByName.bind(this);
    
    const query = this.props.location.search;
    const arcanaID = this.getParameterByName('arcana');

    this.state = { 
      arcanaID: arcanaID
    };
    this.openJPWiki = this.openJPWiki.bind(this);
  }

  componentWillMount(){

    let arcanaRef = firebase.database().ref('arcana').child(this.state.arcanaID);
    arcanaRef.on('value', snapshot => {
      let arcana = snapshot.val();
      this.setState({
        
        nameKR: arcana.nameKR,
        nicknameKR: arcana.nicknameKR,

        nameJP: arcana.nameJP,
        nicknameJP: arcana.nicknameJP,

        rarity: arcana.rarity,
        class: arcana.class,
        weapon: arcana.weapon,
        affiliation: arcana.affiliation,
        cost: arcana.cost,
        tavern: arcana.tavern,
        numberOfViews: arcana.numberOfViews,
        
        skillName1: arcana.skillName1,
        skillMana1: arcana.skillMana1,
        skillDesc1: arcana.skillDesc1,
        
        skillName2: arcana.skillName2,
        skillMana2: arcana.skillMana2,
        skillDesc2: arcana.skillDesc2,

        abilityName1: arcana.abilityName1,
        abilityDesc1: arcana.abilityDesc1,

        abilityName2: arcana.abilityName2,
        abilityDesc2: arcana.abilityDesc2,

        abilityName3: arcana.abilityName3,
        abilityDesc3: arcana.abilityDesc3,

        partyAbility: arcana.partyAbility,

        kizunaName: arcana.kizunaName,
        kizunaCost: arcana.kizunaCost,
        kizunaDesc: arcana.kizunaDesc, 

        iconURL: arcana.iconURL,
        imageURL: arcana.imageURL,

      });
      // this.setState({ arcanaArray: [arcana].concat(this.state.arcanaArray) });
    })

  }

  componentDidMount() {
    window.scrollTo(0,0)
  }

  componentWillUnmount() {
    let arcanaRef = firebase.database().ref('arcana').child(this.state.arcanaID);
    arcanaRef.off();

  }
  
  openJPWiki() {
    
    var linkJP = 'https://チェインクロニクル.gamerch.com/';
    if (this.state.nicknameJP) {
      linkJP += this.state.nicknameJP
    }
    linkJP += this.state.nameJP;

    window.open(linkJP, '_blank');
     
  }

  render() {

    return (
      <div ref="homeRoot">
        <div className={styles.placeholderMain}>
          {/* <img className={styles.arcanaImageMain} src={this.state.imageURL}/> */}
          <img className={styles.arcanaImageMain} src={sampleMain}/>
        </div> 
        <div className={styles.container}>
          {/* <img className={styles.arcanaImageIcon} src={this.state.iconURL} alt="사진"/> */}
          <img className={styles.arcanaImageIcon} src={logo}/>
          <div className={styles.nameContainer}>
            <div className={styles.nameKRContainer}>
              <div className={styles.nameKRLabel}>{this.state.nicknameKR + " " + this.state.nameKR}</div>
            </div>
            <div className={styles.nameJPContainer}>
            <div className={styles.nameJPLabel}>{this.state.nicknameJP + " " + this.state.nameJP}</div>
            </div>
          </div>
        </div>
        <table className={styles.arcanaDetailTable}>
          <tbody>
            {/* <tr>
                <th className={styles.headerCell}>이름</th>
                <td className={styles.bodyCell}>{this.state.nicknameKR + " " + this.state.nameKR} </td>
            </tr> */}
            <tr>
                <th className={styles.headerCell}>레어</th>
                <td className={styles.bodyCell}>{this.state.rarity + " ★"}</td>
            </tr>
            <tr>
                <th className={styles.headerCell}>직업</th>
                <td className={styles.bodyCell}>{this.state.class}</td>
            </tr>
            <tr>
                <th className={styles.headerCell}>소속</th>
                <td className={styles.bodyCell}>{this.state.affiliation}</td>
            </tr>
            <tr>
                <th className={styles.headerCell}>코스트</th>
                <td className={styles.bodyCell}>{this.state.cost}</td>
            </tr>
            <tr>
                <th className={styles.headerCell}>무기</th>
                <td className={styles.bodyCell}>{this.state.weapon}</td>
            </tr>
            <tr>
                <th className={styles.headerCell}>출현 장소</th>
                <td className={styles.bodyCell}>{this.state.tavern}</td>
            </tr>
          </tbody>
      </table>

      <Skill skillNumber={1} skillName={this.state.skillName1} skillMana={this.state.skillMana1} skillDesc={this.state.skillDesc1} />
      <Skill skillNumber={2} skillName={this.state.skillName2} skillMana={this.state.skillMana2} skillDesc={this.state.skillDesc2} />
      <Skill skillNumber={3} skillName={this.state.skillName3} skillMana={this.state.skillMana3} skillDesc={this.state.skillDesc3} />
      
      <Ability abilityNumber={1} abilityName={this.state.abilityName1} abilityDesc={this.state.abilityDesc1}/>
      <Ability abilityNumber={2} abilityName={this.state.abilityName2} abilityDesc={this.state.abilityDesc2}/>
      <Ability abilityNumber={3} abilityName={this.state.abilityName3} abilityDesc={this.state.abilityDesc3}/>

      <Ability abilityNumber={4} abilityName={this.state.partyAbility} abilityDesc={this.state.partyAbility}/>

      <Skill isKizuna={true} skillName={this.state.kizunaName} skillMana={this.state.kizunaCost} skillDesc={this.state.kizunaDesc} />

      <div className={styles.skillAbilityDescCell} onClick={this.openJPWiki}>일첸 위키 가기</div>

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

export default Arcana;
