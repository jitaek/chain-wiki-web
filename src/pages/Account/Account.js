import React, { Component } from 'react'
import firebase from 'firebase'
import { ref } from '../../helpers/constants'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { ValidatorForm } from 'react-form-validator-core'
import { TextValidator } from 'react-material-ui-form-validator'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog';

const buttonStyle = {
    marginTop: '20px',
}


function currentUser() {
    const user = firebase.auth().currentUser
    if (user) {
        return user.displayName
    }
}

export default class Account extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openNicknameAlert: false,
            nicknameUpdated: false,
        }

        console.log(`props is ${props.user}`)
        this.handleText = this.handleText.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log(`received props ${nextProps}`)
        
        const user = nextProps.user

        if (user && user.displayName) {
            var obj = {}
            obj.nickname = user.displayName

            this.setState(obj)
        }

    }

    updateNickname() {

        const nickname = this.state.nickname
        if (nickname) {
            ref.child('nickName').child(nickname).once('value', snapshot => {
                if (snapshot.val()) {
                    // nickname already exists.
                    console.log('nickname already exists')
                    this.setState({
                        openNicknameAlert: true,
                    })
                    return
                }
                else {
                    this.setState({
                        nicknameUpdated: true,
                    })
                }
            })
        }

    }

    handleText(event, text) {
        
        this.setState({
            nickname: text
        })
    }

    logout() {
        firebase.auth().signOut().then(function() {
            console.log('logout successful')
        }).catch(function(error) {
            console.log('logout error')
        })
    }

    render() {
        const user = this.props.user
        const actions = [
            <FlatButton
              label="확인"
              primary={true}
              onClick={this.handleClose}
            />
        ]
        if (user) {
            return (
                <div style={{margin:'20px'}}>
                    <ValidatorForm
                        onSubmit={this.updateNickname}
                        onError={errors => console.log(errors)}
                    >
                        <TextValidator
                            name='nickname'
                            floatingLabelText="닉네임"
                            value={this.state.nickname}
                            validators={['required']}
                            errorMessages={[`닉네임을 입력하세요.`]}
                            onChange={this.handleText}
                        /><br/>

                        <RaisedButton label="닉네임 수정" style={buttonStyle} type="submit"/>
                    </ValidatorForm>

                    <RaisedButton
                        label="로그아웃"
                        style={buttonStyle}
                        onClick={this.logout.bind(this)}
                    />

                    <Dialog
                        title="닉네임이 이미 존재합니다."
                        actions={actions}
                        modal={false}
                        open={this.state.openNicknameAlert}
                        onRequestClose={this.handleClose}
                        >
                        다른 닉네임을 입력하세요.
                    </Dialog>
                    <Snackbar
                    open={this.state.nicknameUpdated}
                    message="변경 완료!"
                    autoHideDuration={4000}
                    /* onRequestClose={this.handleRequestClose} */
                    />
                </div>
            )
        }
        return null
    }
}