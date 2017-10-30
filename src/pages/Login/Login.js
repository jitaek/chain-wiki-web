import React, { Component } from 'react'
import firebase from 'firebase'
import { login, resetPassword, firebaseAuth, googleProvider, facebookProvider } from '../../helpers/auth'

import logo from '../../logo.png'
import GoogleLoginButton from '../../btn_google_light_normal_ios.svg'
import RaisedButton from 'material-ui/RaisedButton'
import { ValidatorForm } from 'react-form-validator-core'
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const logoStyle = {
    width: '250px',
    display: 'block',
}

const buttonStyle = {
    marginTop: '20px',
}
export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = { 
        }

        this.handleSubmit = this.handleSubmit.bind(this);    
        this.handleText = this.handleText.bind(this);
    }

    componentWillMount() {
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // ...
            }
            // The signed-in user info.
            var user = result.user;
            console.log(user.displayName)
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.email)
        console.log(this.state.password)
        login(this.state.email, this.state.password)
            .catch((error) => {
                console.log('invalid login')
            })

    }

    handleText(event, text) {

        var input = {}
        input[event.target.name] = text;

        this.setState(input);
    }

    emailLogin() {

        const email = this.state.email
        const password = this.state.password

        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {

            console.log('email login successfull')
        }).catch(error => {
            console.log('email login error')
        })
    }

    googleLogin() {
        firebaseAuth.signInWithPopup(googleProvider)
    }

    facebookLogin() {
        firebaseAuth.signInWithRedirect(facebookProvider)
    }

    logout() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('logout successful')
          }).catch(function(error) {
            // An error happened.
            console.log('logout error')
          });
    }

    render() {
        return (
            <div style={containerStyle}>
                <div>
                    <img style={logoStyle} src={logo}/><br clear='all'/>
                    체인크로니클 위키
                </div>
                <div>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >
                        <TextValidator
                        name="email"
                        floatingLabelText="이메일"
                        value={this.state.email}
                        onChange={this.handleText}
                        /><br />

                        <TextValidator
                        name="password"
                        type="password"
                        floatingLabelText="비밀번호"
                        value={this.state.password}
                        onChange={this.handleText}
                        /><br/>

                        <RaisedButton
                            label="로그인"
                            style={buttonStyle}
                            onClick={this.emailLogin.bind(this)}
                        /><br/>
                    </ValidatorForm>

                    <RaisedButton
                        label="구글 로그인"
                        labelColor={"#ffffff"}
                        backgroundColor="#dd4b39"
                        style={buttonStyle}
                        icon={<FontIcon className="fa fa-google-plus"/>}
                        onClick={this.googleLogin.bind(this)}
                    /><br/>
                    <RaisedButton
                        label="페이스북 로그인"
                        labelColor={"#ffffff"}
                        backgroundColor="#3b5998"
                        style={buttonStyle}
                        icon={<FontIcon className="fa fa-google-plus"/>}
                        onClick={this.facebookLogin.bind(this)}
                    /><br/>

                    <RaisedButton
                        label="로그아웃"
                        style={buttonStyle}
                        onClick={this.logout.bind(this)}
                    /><br/>
                </div>
            </div>
        );
    }
}