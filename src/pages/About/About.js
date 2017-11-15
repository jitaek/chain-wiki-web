import React, { Component } from 'react'
import logo from '../../logo.png'
import appStoreImage from '../../appStoreKR.png'

import RaisedButton from 'material-ui/RaisedButton'

const containerStyle = {
    textAlign: 'center',
}
export default class About extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div style={containerStyle}>
                    <img src={logo} width='250px'/>
                    <h2>체인크로니클 위키입니다.</h2>
                    <a href="https://itunes.apple.com/kr/app/체인크로니클-위키/id1165642488" target="_blank"><img src={appStoreImage} width='150px'  style={{verticalAlign:'middle'}}/></a><br/>
                    <a href="https://github.com/jitaek/ChainChronicleKoreaWiki"target="_blank"><RaisedButton style={{marginTop:'20px', width:'150px'}}>Github 보기</RaisedButton></a>
                    <h5>By 제이k.</h5>
                </div>
            </div>
        )
    }
}