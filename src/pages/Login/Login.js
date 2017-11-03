import React, { Component } from 'react'
import firebase from 'firebase'
import { login, resetPassword, firebaseAuth, googleProvider, facebookProvider, storageKey } from '../../helpers/auth'
import { Link, withRouter, Redirect} from "react-router-dom";
import styles from './Login.css'
import logo from '../../logo.png'
import { greenColor } from '../../helpers/constants'

import RaisedButton from 'material-ui/RaisedButton'
import { ValidatorForm } from 'react-form-validator-core'
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Snackbar from 'material-ui/Snackbar'

const buttonStyle = {
    marginTop: '20px',
}

class Login extends Component {

    constructor(props) {
        super(props)

        if (props.location.state && props.location.state.from) {
            this.state = {
                from: props.location.state.from,
                redirectAfterLogin: false,
                loginError: false,

                email: '',
                password: '',
            }
        }
        else {
            this.state = {
                redirectAfterLogin: false,
                loginError: false,

                email: '',
                password: '',
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this) 
        this.handleText = this.handleText.bind(this)
        this.getRedirectResult = this.getRedirectResult.bind(this)
    }

    componentWillMount() {
        this.getRedirectResult()
    }

    getRedirectResult() {
        firebase.auth().getRedirectResult().then(result => {

            if (result.credential) {
                var user = result.user;
                console.log(`redirect successful for user ${user}`)
                this.setState({
                    redirectAfterLogin: true,
                })
            }

          }).catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...

            // show snackbar
            if (error) {
                console.log(error)
                this.setState({
                    loginError: true,
                })
            }

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
            console.log('email login successful')
            this.setState({
                redirectAfterLogin: true,
            })
        }).catch(error => {
            console.log('email login error')
        })
    }

    googleLogin() {
        firebaseAuth.signInWithRedirect(googleProvider)
    }

    facebookLogin() {
        firebaseAuth.signInWithRedirect(facebookProvider)
    }

    render() {

        if (this.state.redirectAfterLogin) {
            const from = this.state.from
            if (from) {
                const pathname = this.state.from.pathname
                const search = this.state.from.search || ''
                console.log(pathname)
                if (!!pathname && pathname !== '/login') {
                    return (
                        <Redirect to ={{pathname: pathname, search: search}} />
                    )
                } 
            }
            else {
                return (
                    <Redirect to ={{pathname: '/', search: ''}} />
                )
            }
        }
        return (
            <div>
                <div className={styles.logoContainerStyle}>
                    <img className={styles.logoStyle} src={logo}/>
                    <h3 style={{margin:'0px'}}>체인크로니클 위키</h3>
                </div>
                <div className={styles.loginContainer}>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >
                        <TextValidator
                        name="email"
                        floatingLabelText="이메일"
                        fullWidth={true}
                        value={this.state.email}
                        onChange={this.handleText}
                        />

                        <TextValidator
                        name="password"
                        type="password"
                        fullWidth={true}
                        floatingLabelText="비밀번호"
                        value={this.state.password}
                        onChange={this.handleText}
                        /><br/>

                        <RaisedButton
                            label="로그인"
                            fullWidth={true}
                            style={buttonStyle}
                            onClick={this.emailLogin.bind(this)}
                        /><br/>
                    </ValidatorForm>

                    <RaisedButton
                        label="구글 로그인"
                        labelColor={"#ffffff"}
                        backgroundColor="#dd4b39"
                        fullWidth={true}
                        style={buttonStyle}
                        icon={<FontIcon className="fa fa-google-plus"/>}
                        onClick={this.googleLogin.bind(this)}
                    /><br/>
                    <RaisedButton
                        label="페이스북 로그인"
                        labelColor={"#ffffff"}
                        backgroundColor="#3b5998"
                        fullWidth={true}
                        style={buttonStyle}
                        icon={<FontIcon className="fa fa-google-plus"/>}
                        onClick={this.facebookLogin.bind(this)}
                    /><br/>
                    <RaisedButton
                        label="이메일 계정 생성"
                        labelColor={"#ffffff"}
                        backgroundColor={greenColor}
                        fullWidth={true}
                        style={buttonStyle}
                        icon={<FontIcon className="fa fa-google-plus"/>}
                        onClick={this.facebookLogin.bind(this)}
                    /><br/>
                    <div style={{marginTop:'20px',textAlign:'center'}}>
                        계정 관리는 <a href='https://firebase.google.com/' target='_blank'>구글 파이어베이스</a>가 지원합니다.
                    </div>

                </div>
                <Snackbar
                    open={this.state.loginError}
                    message="로그인 실패."
                    autoHideDuration={4000}
                    /* onRequestClose={this.handleRequestClose} */
                />
            </div>
        )
    }
}

export default withRouter(Login)