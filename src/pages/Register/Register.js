import React, { Component } from 'react'
import firebase from 'firebase'
import { ref } from '../../helpers/constants'
import { Link, Redirect} from "react-router-dom";

import styles from '../Login/Login.css'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { ValidatorForm } from 'react-form-validator-core'
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import Dialog from 'material-ui/Dialog';

export default class Register extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            nickname: '',
            openNicknameAlert: false,
            redirect: false,
        }
        this.handleText = this.handleText.bind(this)
    }

    componentWillMount() {
        ValidatorForm.addValidationRule('passwordLength', (value) => {
            if (value.length < 6) {
                return false;
            }
            return true;
        });
    }

    handleText(event, text) {
        
        var input = {}
        input[event.target.name] = text;

        this.setState(input);
    }

    registerUser() {

        const email = this.state.email
        const password = this.state.password
        const nickname = this.state.nickname
        
        console.log(`checking if nickname ${nickname} exists`)
        ref.child('nickName').child(nickname).once('value', snapshot => {
            console.log(snapshot.val())
            if (snapshot.val()) {
                // nickname already exists.
                console.log('nickname already exists')
                this.setState({
                    openNicknameAlert: true,
                })
                return
                
            }

            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                console.log('user registration successful')
                ref.child('nickName').child(nickname).set(true)
                this.setState({
                    redirect: true,
                })
                // redirect.
            }).catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                // ...
              });
    
        })

        
    }

    handleClose = () => {
        this.setState({openNicknameAlert: false})
    }

    render() {

        if (this.state.redirect) {
            return (
                <Redirect to ={{pathname: '/'}} />
            )
        }
        const actions = [
            <FlatButton
              label="확인"
              primary={true}
              onClick={this.handleClose}
            />
        ]
        return (
            <div className={styles.loginContainer}>
                <ValidatorForm
                    onSubmit={this.registerUser.bind(this)}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                    name="email"
                    floatingLabelText="이메일"
                    fullWidth={true}
                    value={this.state.email}
                    onChange={this.handleText}
                    validators={['required', 'isEmail']}
                    errorMessages={[`올바른 이메일을 입력하세요.`]}
                    />

                    <TextValidator
                    name="password"
                    type="password"
                    fullWidth={true}
                    floatingLabelText="비밀번호"
                    value={this.state.password}
                    onChange={this.handleText}
                    validators={['required', 'passwordLength']}
                    errorMessages={[`비밀번호를 입력하세요.`, `6자 이상 입력하세요.`]}
                    />

                    <TextValidator
                    name="nickname"
                    fullWidth={true}
                    floatingLabelText="닉네임"
                    value={this.state.nickname}
                    onChange={this.handleText}
                    validators={['required']}
                    errorMessages={[`닉네임을 입력하세요.`]}
                    />
                    <RaisedButton
                        label="계정 생성"
                        fullWidth={true}
                        style={{marginTop:'20px'}}
                        type="submit"
                    />
                </ValidatorForm>

                <Dialog
                    title="닉네임이 이미 존재합니다."
                    actions={actions}
                    modal={false}
                    open={this.state.openNicknameAlert}
                    onRequestClose={this.handleClose}
                    >
                    다른 닉네임을 입력하세요.
                </Dialog>
            </div>
        )
    }

}