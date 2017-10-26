import React from 'react'
import { greenColor } from '../../helpers/constants'

import ArcanaList from '../../components/ArcanaList/ArcanaList'

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const TabBarStyle = {
    backgroundColor: greenColor
}

const InkBarStyle = {
    backgroundColor: 'white'
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
            >
                <ArcanaList
                    arcanaArray={this.props.warriorArray}
                    viewType='list'
                    onClick={this.props.onClick}
                />
            </Tab>
            <Tab
                label="기사"
                style={TabBarStyle}
                value={1}
            >
                <ArcanaList
                    arcanaArray={this.props.knightArray}
                    viewType='list'
                    onClick={this.props.onClick}
                />
            </Tab>
            <Tab
                label="궁수"
                style={TabBarStyle}
                value={2}
            >
                <ArcanaList
                    arcanaArray={this.props.archerArray}
                    viewType='list'
                    onClick={this.props.onClick}
                />
            </Tab>
            <Tab
                label="법사"
                style={TabBarStyle}
                value={3}
            >
                <ArcanaList
                    arcanaArray={this.props.magicianArray}
                    viewType='list'
                    onClick={this.props.onClick}
                />
            </Tab>
            <Tab
                label="승려"
                style={TabBarStyle}
                value={4}
            >
                <ArcanaList
                    arcanaArray={this.props.healerArray}
                    viewType='list'
                    onClick={this.props.onClick}
                />
            </Tab>
        </Tabs>
        )
    }
}