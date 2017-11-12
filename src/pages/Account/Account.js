import React, { Component } from 'react'
import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton'

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
    }
    logout() {
        firebase.auth().signOut().then(function() {
            console.log('logout successful')
          }).catch(function(error) {
            console.log('logout error')
          });
    }


    render() {
        return (
        <div style={{margin:'20px'}}>
                <div>
                    닉네임: {
                        this.props.user
                        }
                </div>
                <RaisedButton
                    label="로그아웃"
                    style={buttonStyle}
                    onClick={this.logout.bind(this)}
                /><br/>
            </div>
        )
    }
}