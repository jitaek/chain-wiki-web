import React from 'react'
import { greenColor } from '../../helpers/constants'

import ArcanaList from '../../components/ArcanaList/ArcanaList'

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const TabBarStyle = {
    backgroundColor: 'white',
}

const TabButtonStyle = {
    color: 'black',
    fontWeight: '600',
    fontSize: '20px'
}
const InkBarStyle = {
    backgroundColor: greenColor
}

export default class HomeTabs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
        }
    }

    render() {
        return (
        <Tabs onChange={this.props.onChange} inkBarStyle={InkBarStyle} initialSelectedIndex={0}>
            {this.props.rewardArray.length > 0 &&
            <Tab
                label="보상"
                style={TabBarStyle}
                buttonStyle={TabButtonStyle}
                value={0}
            >
                <ArcanaList
                    arcanaArray={this.props.rewardArray}
                    viewType={this.props.viewType}
                />
            </Tab>
            }
            {this.props.festivalArray.length > 0 &&
            <Tab
                label="페스티벌"
                style={TabBarStyle}
                buttonStyle={TabButtonStyle}
                value={1}
            >
                <ArcanaList
                    arcanaArray={this.props.festivalArray}
                    viewType={this.props.viewType}
                />
            </Tab>
            }
            <Tab
                label="최신"
                style={TabBarStyle}
                buttonStyle={TabButtonStyle}
                value={2}
            >
                <ArcanaList
                    arcanaArray={this.props.recentArray}
                    viewType={this.props.viewType}
                />
            </Tab>
            <Tab
                label="레전드"
                style={TabBarStyle}
                buttonStyle={TabButtonStyle}
                value={3}
            >
                <ArcanaList
                    arcanaArray={this.props.legendArray}
                    viewType={this.props.viewType}
                />
            </Tab>
            <Tab
                label="천마"
                style={TabBarStyle}
                buttonStyle={TabButtonStyle}
                value={4}
            >
                <ArcanaList
                    arcanaArray={this.props.abyssalArray}
                    viewType={this.props.viewType}
                />
            </Tab>
        </Tabs>
        )
    }
}