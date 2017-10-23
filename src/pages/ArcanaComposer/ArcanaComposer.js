import React, { Component } from 'react';
import logo from '../../logo.png';
import styles from './ArcanaComposer.css';
import firebase from 'firebase';
import { ref } from '../../helpers/constants'
import { HashRouter, Link, withRouter } from "react-router-dom";
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';

const costArray = [];
for (let i = 26; i >= 0; i--) {
  costArray.push(<MenuItem value={`${i}`} key={i} primaryText={`${i}`} />);
}

const buttonStyle = {
  margin: 12,
}

class ArcanaComposer extends React.Component {

  constructor(props) {
    super(props);

    console.log('constructer for composer loaded')
    console.log(props.location.state)
    this.showArcana = this.getParameterByName.bind(this);
    
    const query = this.props.location.search;
    const arcanaID = this.getParameterByName('arcana');

    if (props.location.state !== undefined) {
      this.state = props.location.state;      
    }
    else {
      this.state = { 
        
      };
    }

    this.validateInput = this.validateInput.bind(this);    
    this.uploadArcana = this.uploadArcana.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleClass = this.handleClass.bind(this);
    this.handleRarity = this.handleRarity.bind(this);
    this.handleWeapon = this.handleWeapon.bind(this);
    this.handleAffiliation = this.handleAffiliation.bind(this);
    this.handleCost = this.handleCost.bind(this);
    this.handleSkillMana1 = this.handleSkillMana1.bind(this);
    this.handleSkillMana2 = this.handleSkillMana2.bind(this);
    this.handleSkillMana3 = this.handleSkillMana3.bind(this);
    this.handleKizunaCost = this.handleKizunaCost.bind(this);
    
    
  }

  componentWillMount() {

    console.log('will mount')
    ValidatorForm.addValidationRule('validAbility1', (value) => {
      if (value === undefined && this.state.rarity >= "3") {
          return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule('validAbility2', (value) => {
      if (value === undefined && this.state.rarity >= "4") {
          return false;
      }
      return true;
    });

  }

  handleText(event, text) {
    console.log(event.target.name)
    console.log(text)

    var input = {}
    input[event.target.name] = text;

    this.setState(input);
  }

  handleClass(event, index, value) {
    console.log(index)
    console.log(value)
    
    // var input = {}
    // input[] = text;

    this.setState({
      class: value
    })
    // this.setState(input);
  }

  handleRarity(event, index, value) {

    console.log(value)

    this.setState({
      rarity: value
    })
  }

  handleWeapon(event, index, value) {
    
    console.log(event.target.name)
    console.log(value)

    this.setState({
      weapon: value
    })
  }

  handleAffiliation(event, index, value) {
    
    console.log(value)

    this.setState({
      affiliation: value
    })
  }

  handleCost(event, index, value) {
    
    console.log(value)

    this.setState({
      cost: value
    })
  }

  handleSkillMana1(event, index, value) {
    
    console.log(value)
    
    this.setState({
      skillMana1: value
    })
  }

  handleSkillMana2(event, index, value) {
    
    console.log(value)
    
    this.setState({
      skillMana2: value
    })
  }

  handleSkillMana3(event, index, value) {
    
    console.log(value)
    
    this.setState({
      skillMana3: value
    })
  }

  handleKizunaCost(event, index, value) {
    
    console.log(value)
    
    this.setState({
      kizunaCost: value
    })
  }

  validateInput() {

    console.log('uploading arcana')
    console.log(this.state)

    ref.child('/test').set(this.state)
  }

  uploadArcana() {
    console.log(this.state)

    // check if uploading new, or editing.
    
    if (this.state.uid) {
      // editing. TODO: move previous data to /arcanaEdit, using firebase functions.
      console.log('editing arcana')
      let arcanaID = this.state.uid
      // ref.child('arcana').child(arcanaID).once('value', snapshot => {

      //   let previousArcana = snapshot.val()
      //   console.log('previous arcana is ')
      //   console.log(previousArcana)
      //   let newEditRef = ref.child('arcanaEdit').child(arcanaID).push()
      //   newEditRef.set(previousArcana)
      // });
    }
    else {
      // uploading new.
      console.log('uploading new arcana')
      const newArcanaRef = ref.child('arcana').push();

      if (this.state.imageURL) {

      }
      newArcanaRef.set(this.state)
    }
    // ref.child('arcana').child(this.state.uid)
    // ref.child('/test').update(this.state)
    // ref.child('/test').set(this.state)
    // firebase.database().ref('/test').set({
      
      // nameKR: this.state.nameKR,
      // nicknameKR: this.state.nicknameKR,

      // nameJP: this.state.nameJP,
      // nicknameJP: this.state.nicknameJP,

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

    // });
  }

  render() {

    return (
      <div className={styles.fullWidthContainer}>
      <MuiThemeProvider>
        
      <ValidatorForm
                ref="form"
                onSubmit={this.uploadArcana}
                onError={errors => console.log(errors)}
            >
        <TextValidator
          name="nicknameKR"
          floatingLabelText="한글 호칭 (선택)"
          value={this.state.nicknameKR}
          onChange={this.handleText}
          /><br/>

        <TextValidator
          name="nameKR"
          floatingLabelText="한글 이름"
          /* errorText={this.state.errorText} */
          value={this.state.nameKR}
          validators={['required']}
          errorMessages={[`한글 이름이 필요합니다.`]}
          onChange={this.handleText}/><br/>

        <TextValidator
        name="nicknameJP" 
        floatingLabelText="일어 호칭 (선택)"
        value={this.state.nicknameJP}
        onChange={this.handleText}/><br/>

        <TextValidator 
        name="nameJP" 
        floatingLabelText="일어 이름" 
        value={this.state.nameJP}
        validators={['required']}
        errorMessages={[`일어 이름이 필요합니다.`]}
        onChange={this.handleText}/><br/>

        <TextValidator
        name="imageURL"
        floatingLabelText="이미지 주소 (선택)" 
        value={this.state.imageURL}
        fullWidth={true} 
        onChange={this.handleText}
        /><br/>

        <TextValidator
        name="iconURL"
        value={this.state.iconURL}
        floatingLabelText="아이콘 주소 (선택)"
        fullWidth={true}
        onChange={this.handleText}
        /><br/>

        <div style={{display: 'flex'}}>

        <SelectValidator
          name="rarity"
          floatingLabelText="레어도"
          value={this.state.rarity}
          validators={['required']}
          errorMessages={[`레어도가 필요합니다.`]}
          onChange={this.handleRarity}>
          <MenuItem value="5" primaryText="5" />
          <MenuItem value="4" primaryText="4" />
          <MenuItem value="3" primaryText="3" />
          <MenuItem value="2" primaryText="2" />
          <MenuItem value="1" primaryText="1" />
        </SelectValidator>
        
        <SelectValidator
          name="class"
          floatingLabelText="직업"
          value={this.state.class}
          validators={['required']}
          errorMessages={[`직업이 필요합니다.`]}
          onChange={this.handleClass}>
          <MenuItem value="전사" primaryText="전사" />
          <MenuItem value="기사" primaryText="기사" />
          <MenuItem value="궁수" primaryText="궁수" />
          <MenuItem value="법사" primaryText="법사" />
          <MenuItem value="승려" primaryText="승려" />
        </SelectValidator>
        
        <SelectValidator
          name={"weapon"}
          floatingLabelText="무기"
          value={this.state.weapon}
          validators={['required']}
          errorMessages={[`무기가 필요합니다.`]}
          onChange={this.handleWeapon}>
          <MenuItem value="검" primaryText="검" />
          <MenuItem value="봉" primaryText="봉" />
          <MenuItem value="창" primaryText="창" />
          <MenuItem value="궁" primaryText="궁" />
          <MenuItem value="마" primaryText="마" />
          <MenuItem value="성" primaryText="성" />
          <MenuItem value="권" primaryText="권" />
          <MenuItem value="총" primaryText="총" />
          <MenuItem value="저" primaryText="저" />
        </SelectValidator>

        <SelectValidator
          name="affiliation"
          floatingLabelText="소속"
          value={this.state.affiliation}
          validators={['required']}
          errorMessages={[`소속이 필요합니다.`]}
          onChange={this.handleAffiliation}>
          <MenuItem value="마신" primaryText="마신" />
          <MenuItem value="여행자" primaryText="여행자" />
          <MenuItem value="부도" primaryText="부도" />
          <MenuItem value="성도" primaryText="성도" />
          <MenuItem value="현탑" primaryText="현탑" />
          <MenuItem value="미궁산맥" primaryText="미궁" />
          <MenuItem value="호수도시" primaryText="호도" />
          <MenuItem value="정령섬" primaryText="정령섬" />
          <MenuItem value="화염구령" primaryText="구령" />
          <MenuItem value="대해" primaryText="대해" />
          <MenuItem value="수인의대륙" primaryText="수인" />
          <MenuItem value="죄의대륙" primaryText="죄" />
          <MenuItem value="박명의대륙" primaryText="박명" />
          <MenuItem value="철연의대륙" primaryText="철연" />
          <MenuItem value="연대기대륙" primaryText="연대기" />
          <MenuItem value="레무레스섬" primaryText="레무레스" />
          <MenuItem value="의용군" primaryText="의용군" />
          <MenuItem value="화격단" primaryText="화격단" />
        </SelectValidator>

        <SelectValidator
          name="cost"
          floatingLabelText="코스트"
          value={this.state.cost}
          validators={['required']}
          errorMessages={[`코스트가 필요합니다.`]}
          onChange={this.handleCost}>
          <MenuItem value="40" primaryText="40" />
          {costArray}
        </SelectValidator>
        <br/>

        </div>

        <div style={{display: 'flex'}}>
          <TextField
            name="skillName1"
            value={this.state.skillName1}
            floatingLabelText="스킬 1 이름"
            onChange={this.handleText}/>
          <SelectValidator
            name="skillMana1"
            floatingLabelText="스킬 1 마나"
            value={this.state.skillMana1}
            validators={['required']}
            errorMessages={[`스킬 1 마나가 필요합니다.`]}
            onChange={this.handleSkillMana1}>
            
            <MenuItem value="1" primaryText="1" />
            <MenuItem value="2" primaryText="2" />
            <MenuItem value="3" primaryText="3" />
          </SelectValidator>
        </div>

        <TextValidator
          name="skillDesc1"
          value={this.state.skillDesc1}
          floatingLabelText="스킬 1 설명"
          fullWidth={true}
          multiLine={true}
          rows={1}
          rowsMax={5}
          validators={['required']}
          errorMessages={[`스킬 정보가 필요합니다.`]}
        />

        <div>
          <div style={{display: 'flex'}}>
          <TextField
            name="skillName2"
            value={this.state.skillName2}
            floatingLabelText="스킬 2 이름"
            onChange={this.handleText}/>
          <SelectField floatingLabelText="스킬 2 마나" value={this.state.skillMana2} onChange={this.handleSkillMana2}>
            <MenuItem value="1" primaryText="1" />
            <MenuItem value="2" primaryText="2" />
            <MenuItem value="3" primaryText="3" />
          </SelectField>
          </div>
          <TextField name="skillDesc2"
            value={this.state.skillDesc2}
            floatingLabelText="스킬 2 설명"
            fullWidth={true}
            multiLine={true}
            rows={1}
            rowsMax={5}
            onChange={this.handleText}/>
        </div>

        <div>
          <div style={{display: 'flex'}}>
          <TextField
            name="skillName3"
            value={this.state.skillName3}
            floatingLabelText="스킬 3 이름"
            onChange={this.handleText}/>
          <SelectField floatingLabelText="스킬 3 마나" value={this.state.skillMana3} onChange={this.handleSkillMana3}>
            <MenuItem value="1" primaryText="1" />
            <MenuItem value="2" primaryText="2" />
            <MenuItem value="3" primaryText="3" />
          </SelectField>
          </div>
          <TextField
            name="skillDesc3"
            value={this.state.skillDesc3}
            floatingLabelText="스킬 3 설명"
            fullWidth={true}
            multiLine={true}
            rows={1}
            rowsMax={5}
            onChange={this.handleText}/>
        </div>

        <div>
          <div style={{display: 'flex'}}>
          <TextField
            name="kizunaName"
            value={this.state.kizunaName}
            floatingLabelText="인연 이름"
            onChange={this.handleText}/>
          <SelectValidator
            name="kizunaCost"
            floatingLabelText="인연 코스트"
            value={this.state.kizunaCost}
            validators={['required']}
            errorMessages={[`인연 코스트가 필요합니다.`]}
            onChange={this.handleKizunaCost}>
            <MenuItem value="8" primaryText="8" />
            <MenuItem value="4" primaryText="4" />
            <MenuItem value="3" primaryText="3" />
            <MenuItem value="2" primaryText="2" />
            <MenuItem value="1" primaryText="1" />
            <MenuItem value="0" primaryText="0" />
          </SelectValidator>
          </div>
          <TextValidator
            name="kizunaDesc"
            value={this.state.kizunaDesc}
            floatingLabelText="인연 설명"
            fullWidth={true}
            multiLine={true}
            rows={1}
            rowsMax={5}
            validators={['required']}
            errorMessages={[`인연 어빌이 필요합니다.`]}
            onChange={this.handleText}/>
        </div>
        
        <TextField
          name="abilityName1"
          value={this.state.abilityName1}
          floatingLabelText="어빌 1 이름"
          onChange={this.handleText}/><br/>
        <TextValidator
          name="abilityDesc1"
          value={this.state.abilityDesc1}
          floatingLabelText="어빌 1 설명"
          fullWidth={true}
          multiLine={true}
          rows={1}
          rowsMax={5}
          validators={['validAbility1']}
          errorMessages={[`3성 이상 아르카나는 어빌이 필요합니다.`]}
          onChange={this.handleText}/><br/>

        <TextField
          name="abilityName2"
          value={this.state.abilityName2}
          floatingLabelText="어빌 2 이름"
          onChange={this.handleText}/><br/>
        <TextValidator
          name="abilityDesc2"
          value={this.state.abilityDesc2}
          floatingLabelText="어빌 2 설명"
          fullWidth={true}
          multiLine={true}
          rows={1}
          rowsMax={5}
          validators={['validAbility2']}
          errorMessages={[`4성 이상 아르카나는 두번째 어빌이 필요합니다.`]}
          onChange={this.handleText}/><br/>

        <TextField
          name="partyAbility"
          value={this.state.partyAbility}
          floatingLabelText="파티 어빌"
          fullWidth={true}
          onChange={this.handleText}/><br/>


          <RaisedButton label="완료" style={buttonStyle} type="submit"/>
        </ValidatorForm>
      </MuiThemeProvider>


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
