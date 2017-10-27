import React from 'react'
import { greenColor } from '../../helpers/constants'

import ArcanaList from '../../components/ArcanaList/ArcanaList'

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const TabBarStyle = {
    backgroundColor: 'white'
}

const TabButtonStyle = {
    color: 'black',
}

const InkBarStyle = {
    backgroundColor: greenColor
}

export default class AbilityTabs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
        }
    }

    render() {
        return (
        <Tabs onChange={this.props.onChange} inkBarStyle={InkBarStyle} initialSelectedIndex={this.props.initialSelectedIndex}>
            <Tab
                label="전사"
                style={TabBarStyle}
                value={0}
                buttonStyle={TabButtonStyle}
            >
                <ArcanaList
                    arcanaArray={this.props.warriorArray}
                    viewType='list'
                />
            </Tab>
            <Tab
                label="기사"
                style={TabBarStyle}
                value={1}
                buttonStyle={TabButtonStyle}
            >
                <ArcanaList
                    arcanaArray={this.props.knightArray}
                    viewType='list'
                />
            </Tab>
            <Tab
                label="궁수"
                style={TabBarStyle}
                value={2}
                buttonStyle={TabButtonStyle}
            >
                <ArcanaList
                    arcanaArray={this.props.archerArray}
                    viewType='list'
                />
            </Tab>
            <Tab
                label="법사"
                style={TabBarStyle}
                value={3}
                buttonStyle={TabButtonStyle}
            >
                <ArcanaList
                    arcanaArray={this.props.magicianArray}
                    viewType='list'
                />
            </Tab>
            <Tab
                label="승려"
                style={TabBarStyle}
                value={4}
                buttonStyle={TabButtonStyle}
            >
                <ArcanaList
                    arcanaArray={this.props.healerArray}
                    viewType='list'
                />
            </Tab>
        </Tabs>
        )
    }
}