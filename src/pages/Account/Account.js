import React, { Component } from 'react'
import firebase from 'firebase'

import RaisedButton from 'material-ui/RaisedButton'

const buttonStyle = {
    marginTop: '20px',
}

export default class Account extends Component {

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
                    업데이트 예정..
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