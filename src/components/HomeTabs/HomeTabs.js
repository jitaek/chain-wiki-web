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
        this.calculateIndex = this.calculateIndex.bind(this)
    }

    calculateIndex(index) {

        const rewardArray = this.props.rewardArray
        const festivalArray = this.props.festivalArray

        if (rewardArray.length > 0 && festivalArray.length > 0) {
            return index
        }

        if (rewardArray.length > 0 || festivalArray.length > 0) {
            return index--
        } 

        // both arrays are empty
        return index - 2

        // if (this.props.rewardArray.length === 0 && this.props.festivalArray.length === 0) {
        //     index = index - 2
        // }
        // else if (this.props.festivalArray.length > 0) {
        //     index--
        // }
        // else if (this.props.rewardArray.length > 0) {
        //     index--
        // }

        return index
        
    }

    render() {
        return (
        <Tabs onChange={this.props.onChange} tabItemContainerStyle={{backgroundColor:'white'}} inkBarStyle={InkBarStyle} initialSelectedIndex={this.calculateIndex(this.props.index)}>
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
                    ref='recentRef'
                    id="homeID"
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