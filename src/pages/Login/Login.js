import React, { Component } from 'react'
import firebase from 'firebase'
import { login, resetPassword, firebaseAuth, googleProvider, facebookProvider, storageKey } from '../../helpers/auth'
import {withRouter, Redirect} from "react-router-dom";

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

class Login extends Component {

    constructor(props) {
        super(props)

        if (props.location.state && props.location.state.from) {
            this.state = {
                pathname: props.location.state.from.pathname,
                redirectAfterLogin: false,

                email: '',
                password: '',
            }
        }
        else {
            this.state = {
                redirectAfterLogin: false,

                email: '',
                password: '',
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this) 
        this.handleText = this.handleText.bind(this)
    }

    componentWillMount() {

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
            console.log('email login successful')
            this.setState({
                redirectAfterLogin: true,
            })
            // const pathname = this.state.pathname
            // console.log(pathname)
            // if (pathname) {
            //     console.log('pushing')
            //     this.props.history.push(pathname)
            // }
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

        console.log(this.state.pathname)
        if (this.state.redirectAfterLogin) {
            return (
                <Redirect to={{pathname: this.state.pathname}} />
            )
        }
        return (
            <div style={containerStyle}>
                <div style={{textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>
                    <img style={logoStyle} src={logo}/><br clear='all'/>
                    <div>체인크로니클 위키</div>
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

export default withRouter(Login)