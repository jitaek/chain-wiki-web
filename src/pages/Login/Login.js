import React, { Component } from 'react';
import { login, resetPassword } from '../../helpers/auth'

import logo from '../../logo.png'
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const logoStyle = {
    width: '250px',
    display: 'block',
}

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = { 
        }

        this.handleSubmit = this.handleSubmit.bind(this);    
        this.handleText = this.handleText.bind(this);
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

    render() {
        return (
            <div style={containerStyle}>
                <img style={logoStyle} src={logo}/><br clear='all'/>
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

                        <RaisedButton label="로그인" type="submit"/>
                    </ValidatorForm>
                </div>
            </div>
        );
    }
}