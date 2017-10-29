import React from 'react';
import styles from './Arcana.css';
import {ref} from '../../helpers/constants'

import {
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import sampleMain from '../../components/ArcanaCell/riberaMain.jpg'
import { getParams } from '../../helpers/QueryParameter'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'

var arcanaID

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

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
            <th className={styles.headerCell}>{isKizuna === undefined ? "스킬 "  + skillNumber : "인연"}</th>
              <td className={styles.bodyCell}>
                  <div>
                      <div className={styles.skillNameCell}>{skillName}</div>
                      <div className={styles.manaContainer}>
                          <div className={styles.manaLabelCell}>{isKizuna === undefined ? "마나" : "코스트"}</div>
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
            <th className={styles.headerCell}>{abilityNumber !== 4 ? "어빌 " + abilityNumber : "파티 어빌"}</th>
            <td className={styles.bodyCell}>{abilityNumber !== 4 ? abilityName : ""}</td>
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

function Tavern(props) {

  const tavern = props.tavern

  if (tavern) {
    return (
      <tr>
          <th className={styles.headerCell}>출현 장소</th>
          <td className={styles.bodyCell}>{tavern}</td>
      </tr>
    )
  }

  return null
}

function incrementViewCount(arcanaID) {

  if (arcanaID) {
    ref.child(`arcana/${arcanaID}/numberOfViews`).transaction(function(count) {
      if (count) {
        count++;
      }
      return count;
    });
  }
}

class Arcana extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      arcanaID: null,
      mainImageLoaded: false,
      iconLoaded: false,
    }
    this.openJPWiki = this.openJPWiki.bind(this);
    this.editArcana = this.editArcana.bind(this);
    this.observeArcana = this.observeArcana.bind(this);
    this.createJPLink = this.createJPLink.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    const search = this.props.history.location.search
    let params = getParams(search)

    const newArcanaID = params['arcana'];

    if (this.state.arcanaID !== newArcanaID) {
      // arcanaID = newArcanaID
      this.setState({
        arcanaID: newArcanaID
      }, () => {
        this.observeArcana()  
        
      })
    }

  }

  componentWillMount() {

  }

  componentDidMount() {
    
    const search = this.props.history.location.search
    let params = getParams(search)

    const newArcanaID = params['arcana'];

    if (this.state.arcanaID !== newArcanaID) {
      // arcanaID = newArcanaID
      this.setState({
        arcanaID: newArcanaID
      }, () => {
        this.observeArcana()          
      })
    }
    // if (arcanaID !== newArcanaID) {
    //   arcanaID = newArcanaID
    //   this.observeArcana()      
    // }

    // this.observeArcana()

  }

  componentWillUnmount() {
    
    // let arcanaRef = ref('arcana').child(arcanaID)
    const arcanaID = this.state.arcanaID
    if (arcanaID) {
      let arcanaRef = ref.child('arcana').child(arcanaID);
      arcanaRef.off()
    }

  }
  
  observeArcana() {

    const arcanaID = this.state.arcanaID

    if (arcanaID) {

      incrementViewCount(arcanaID)
      
      let arcanaRef = ref.child('arcana').child(arcanaID)

      arcanaRef.on('value', snapshot => {

        let arcana = snapshot.val()

        this.createJPLink(arcana.nicknameJP, arcana.nameJP)

        this.setState({
          
          nameKR: arcana.nameKR,
          nicknameKR: arcana.nicknameKR || "",

          nameJP: arcana.nameJP,
          nicknameJP: arcana.nicknameJP || "",

          rarity: arcana.rarity,
          class: arcana.class,
          weapon: arcana.weapon,
          affiliation: arcana.affiliation,
          cost: arcana.cost,
          tavern: arcana.tavern,
          numberOfViews: arcana.numberOfViews,
          
          skillName1: arcana.skillName1 || null,
          skillMana1: arcana.skillMana1,
          skillDesc1: arcana.skillDesc1,
          
          skillName2: arcana.skillName2 || null,
          skillMana2: arcana.skillMana2 || null,
          skillDesc2: arcana.skillDesc2 || null,

          skillName3: arcana.skillName3 || null,
          skillMana3: arcana.skillMana3 || null,
          skillDesc3: arcana.skillDesc3 || null,

          abilityName1: arcana.abilityName1 || null,
          abilityDesc1: arcana.abilityDesc1 || null,

          abilityName2: arcana.abilityName2 || null,
          abilityDesc2: arcana.abilityDesc2 || null,

          abilityName3: arcana.abilityName3 || null,
          abilityDesc3: arcana.abilityDesc3 || null,

          partyAbility: arcana.partyAbility || null,

          kizunaName: arcana.kizunaName || null,
          kizunaCost: arcana.kizunaCost,
          kizunaDesc: arcana.kizunaDesc, 

          iconURL: arcana.iconURL || null,
          imageURL: arcana.imageURL || null,

        });
      })
    }
  }

  createJPLink(nicknameJP, nameJP) {
    var linkJP = 'https://チェインクロニクル.gamerch.com/';
    if (nicknameJP) {
      linkJP += nicknameJP
    }
    linkJP += nameJP;
  
    const obj = {}
    obj['linkJP'] = linkJP
  
    this.setState(obj)
  }

  openJPWiki() {
    
    var linkJP = 'https://チェインクロニクル.gamerch.com/';
    if (this.state.nicknameJP) {
      linkJP += this.state.nicknameJP
    }
    linkJP += this.state.nameJP;

    window.open(linkJP, '_blank');
     
  }

  editArcana() {

    this.props.history.push({
      pathname: '/login',
      state: this.state
    })
  }

  render() {

    if (this.state.nameKR !== undefined) {

      var mainImageClassNames
      if (!this.state.mainImageLoaded) {
        mainImageClassNames = styles.mainImagePlaceholder
      }
      else {
        mainImageClassNames = styles.mainImage
      }

      var iconClassNames
      if (!this.state.iconLoaded) {
        iconClassNames = styles.iconPlaceholder
      }
      else {
        iconClassNames = styles.icon
      }

      return (

        <div ref="homeRoot">

          <div className={styles.mainImageContainer}>
            <img className={mainImageClassNames} src={this.state.imageURL} onLoad={() => this.setState({mainImageLoaded: true})}/>
          </div>
          <div className={styles.headerContainer}>
            {/* <img className={styles.arcanaImageIcon} src={this.state.iconURL} alt="사진"/> */}
            <img className={iconClassNames} src={this.state.iconURL} onLoad={() => this.setState({iconLoaded: true})}/>
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
              <Tavern tavern={this.state.tavern}/>
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

        <div className={styles.skillAbilityDescCell}>
          <a href={this.state.linkJP}
            target="_blank"
            >일첸 위키 가기</a>
        </div>
        <div style={{margin:'10px'}}>
          <Link 
            to={{
              pathname: '/arcanaComposer',
              state: this.state
            }}
          >아르카나 수정</Link>
        </div>
        
        </div>
      );
    }

    else {
      return <LoadingIndicator/>
      
    }
  }

}

export default Arcana;
