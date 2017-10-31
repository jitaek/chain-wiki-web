import React from 'react';
import styles from './Arcana.css';
import {ref, ARCANA_REF, firebaseDynamicLink } from '../../helpers/constants'

import {
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import sampleMain from '../../components/ArcanaCell/riberaMain.jpg'
import logo from '../../logo.png'

import { getParams } from '../../helpers/QueryParameter'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import LinkIcon from 'material-ui/svg-icons/content/link'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'

var arcanaID
var shareLink
var relatedArcana = {}

const LinkStyle = {
  textDecoration:'none',
  color:'inherit'
}

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
  const skillNumber = props.skillNumber
  const skillName = props.skillName
  const skillMana = props.skillMana
  const skillDesc = props.skillDesc
  const isKizuna = props.isKizuna

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
    )
  }
  else {
    return null
  } 
}

function Ability(props) {
  const abilityNumber = props.abilityNumber
  const abilityName = props.abilityName
  const abilityDesc = props.abilityDesc
  const isBuddy = props.isBuddy
  const isBuddySkill = props.isBuddySkill
  
  if (isBuddy) {
    return (
      <div>
        <table className={styles.arcanaSkillTable}>
        <tbody>
          <tr>
            <th className={styles.headerCell}>{isBuddySkill ? "버디 스킬 " : "버디 어빌"}</th>
            <td className={styles.bodyCell}></td>
          </tr>
        </tbody>
        </table>
        <div className={styles.skillAbilityDescCell}>{abilityDesc}</div>
      </div>
    )
  }

  else if (abilityDesc) {
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
    )
  }
  else {
    return null
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

function RelatedArcana(props) {
  
  const relatedArcanaArray = props.relatedArcanaArray

  if (relatedArcanaArray.length > 0) {
    return (
      <div style={{borderBottom:'1px solid lightGray'}}>
        <div style={{fontWeight: 'bold',margin: '10px'}}>관련 아르카나</div>
        {
        relatedArcanaArray.map(arcana => (
          <Link to={`/arcana?arcana=${arcana.arcanaID}`} style={LinkStyle} key={arcana.arcanaID}>
            <div className={styles.headerContainer}>
              {/* <img className={styles.arcanaImageIcon} src={this.state.iconURL} alt="사진"/> */}
              <img className={styles.icon} src={arcana.iconURL || logo}/>
              <div className={styles.nameContainer}>
                <div className={styles.nameKRContainer}>
                  <div className={styles.nameKRLabel}>{arcana.nameKR}</div>
                </div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>

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

function createShareLinkWithArcana(arcanaID) {

  const linkQuery = `?link=${window.location.href}`

  const link = firebaseDynamicLink + linkQuery

  return link
}

class Arcana extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      arcanaID: null,
      mainImageLoaded: false,
      iconLoaded: false,
      linkCopied: false,
      relatedArcanaArray: [],
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
        relatedArcanaArray: [],
        arcanaID: newArcanaID
      }, () => {
        window.scrollTo(0,0)
        this.observeArcana()
      })
    }
    
    this.observeRelatedArcanaWithID = this.observeRelatedArcanaWithID.bind(this)
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
        relatedArcanaArray: [],
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
      let arcanaRef = ARCANA_REF.child(arcanaID);
      arcanaRef.off()
    }

  }

  observeRelatedArcanaWithID() {
      // TODO: call /arcana/key and get profile image and nameKR (nicknameKR?)
      
      const relatedArcanaArray = []

      if (relatedArcana) {

        Object.keys(relatedArcana).forEach(arcanaID => {
          ARCANA_REF.child(arcanaID).child('nameKR').once('value', snapshot => {
            
              const nameKR = snapshot.val()
      
              if (nameKR) {
      
                ARCANA_REF.child(arcanaID).child('iconURL').once('value', snapshot => {
      
                  const iconURL = snapshot.val()
      
                  const relatedArcana = {
                    arcanaID: arcanaID,
                    nameKR: nameKR,
                    iconURL: iconURL || logo,
                  }

                  relatedArcanaArray.push(relatedArcana)
      
                  this.setState({
                    relatedArcanaArray: relatedArcanaArray
                  })
                })
              }
            })
        })
      }
  }
  
  observeArcana() {

    const arcanaID = this.state.arcanaID

    if (arcanaID) {
      shareLink = createShareLinkWithArcana(arcanaID)
      
      // incrementViewCount(arcanaID)
      
      let arcanaRef = ARCANA_REF.child(arcanaID)

      arcanaRef.on('value', snapshot => {

        let arcana = snapshot.val()

        this.createJPLink(arcana.nicknameJP, arcana.nameJP)

        // relatedArcana = {}
        relatedArcana = Object.assign({}, arcana.related)
        this.observeRelatedArcanaWithID()

        this.setState({
          
          uid: arcana.uid,

          nameKR: arcana.nameKR,
          nicknameKR: arcana.nicknameKR || "",

          nameJP: arcana.nameJP,
          nicknameJP: arcana.nicknameJP || "",

          iconURL: arcana.iconURL || null,
          imageURL: arcana.imageURL || null,

          rarity: arcana.rarity,
          class: arcana.class,
          weapon: arcana.weapon,
          affiliation: arcana.affiliation,
          cost: arcana.cost,
          tavern: arcana.tavern,
          numberOfViews: arcana.numberOfViews,
          
          skillCount: arcana.skillCount || 1,

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

          buddyNameKR: arcana.buddyNameKR || null,
          buddyNameJP: arcana.buddyNameJP || null,

          buddyIconURL: arcana.buddyIconURL || null,

          buddyClass: arcana.buddyClass || null,
          buddyWeapon: arcana.buddyWeapon || null,

          buddySkillDesc: arcana.buddySkillDesc || null,
          buddyAbilityDesc: arcana.buddyAbilityDesc || null,

          related: arcana.related || null,

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

  rarity(rarity) {

    if (rarity === "5") {
      return "★★★★★ SSR"
    }
    else if (rarity === "4") {
      return "★★★★ SR"
    }
    else if (rarity === "3") {
      return "★★★ SR"
    }
    else if (rarity === "2") {
      return "★★ HN"
    }
    else if (rarity === "1") {
      return "★ N"
    }

    return ""
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

        <div className={styles.container}>

          <div className={styles.mainImageContainer}>
            <img className={mainImageClassNames} src={this.state.imageURL} onLoad={() => this.setState({mainImageLoaded: true})}/>
          </div>
          <div className={styles.headerContainer}>
            {/* <img className={styles.arcanaImageIcon} src={this.state.iconURL} alt="사진"/> */}
            <img className={iconClassNames} src={this.state.iconURL || logo} onLoad={() => this.setState({iconLoaded: true})}/>
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
              <tr>
                  <th className={styles.headerCell}>레어</th>
                  <td className={styles.bodyCell}>{this.rarity(this.state.rarity)}</td>
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

        {
          this.state.buddySkillDesc && 
          <div >
            <div className={styles.headerContainer}>
              {/* <img className={styles.arcanaImageIcon} src={this.state.iconURL} alt="사진"/> */}
              <img className={styles.icon} src={this.state.buddyIconURL || logo}/>
              <div className={styles.nameContainer}>
                <div className={styles.nameKRContainer}>
                  <div className={styles.nameKRLabel}>{this.state.buddyNameKR}</div>
                </div>
                <div className={styles.nameJPContainer}>
                <div className={styles.nameJPLabel}>{this.state.buddyNameJP}</div>
                </div>
            </div>
            </div>
            <table className={styles.arcanaDetailTable} style={{margin:'0'}}>
              <tbody>
                {/* <tr>
                    <th className={styles.headerCell}>이름</th>
                    <td className={styles.bodyCell}>{this.state.nicknameKR + " " + this.state.nameKR} </td>
                </tr> */}
                <tr>
                    <th className={styles.headerCell}>버디 직업</th>
                    <td className={styles.bodyCell}>{this.state.buddyClass}</td>
                </tr>
                <tr>
                    <th className={styles.headerCell}>버디 무기</th>
                    <td className={styles.bodyCell}>{this.state.buddyWeapon}</td>
                </tr>
              </tbody>
            </table>
            <Ability isBuddy={true} isBuddySkill={true} abilityDesc={this.state.buddySkillDesc}/>
            <Ability isBuddy={true} abilityDesc={this.state.buddyAbilityDesc}/>
          </div>
          
        }
        <RelatedArcana relatedArcanaArray={this.state.relatedArcanaArray}/>

        <div className={styles.skillAbilityDescCell}>
          <a href={this.state.linkJP}
            target="_blank"
            >일첸 위키 가기</a>
        </div>
        <div style={{margin:'10px'}}>
          <Link to={`/arcanaComposer?arcana=${this.state.arcanaID}`}>
            아르카나 수정
          </Link>
        </div>
        
        <Toolbar className={styles.toolbar} style={{backgroundColor:'white'}}>
          <ToolbarGroup lastChild={true}>
            <CopyToClipboard text={shareLink} onCopy={() => this.setState({linkCopied:true})}>
              <IconButton tooltip="퍼가기" tooltipPosition='top-center'>
                <LinkIcon/>
              </IconButton>
            </CopyToClipboard>
          </ToolbarGroup>
        </Toolbar>

        <Snackbar
          open={this.state.linkCopied}
          message="링크가 복사되었습니다."
          autoHideDuration={4000}
          /* onRequestClose={this.handleRequestClose} */
        />

        </div>
      )

    }

    else {
      return <LoadingIndicator/>
      
    }
  }

}

export default Arcana
