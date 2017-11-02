import React from 'react'
import { greenColor } from '../../helpers/constants'
import { Link } from 'react-router-dom'

import {List, ListItem} from 'material-ui/List'
import {Tabs, Tab} from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'
import Divider from 'material-ui/Divider'

const TabBarStyle = {
    backgroundColor: 'white'
}

const TabButtonStyle = {
    color: 'black',
    fontWeight: '600',
    fontSize: '18px',
}

const InkBarStyle = {
    backgroundColor: greenColor
}

const LinkStyle = {
    textDecoration:'none',
    color:'inherit'
}
export default class TavernTabs extends React.Component {

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
                label="1부"
                style={TabBarStyle}
                value={0}
                buttonStyle={TabButtonStyle}
            >
                <List>
                    {
                        this.props.tavern1Array.map(tavern => 
                            <Link to={`/tavern?query=${tavern.en}`} style={LinkStyle} key={tavern.en}>
                                <ListItem primaryText={tavern.kr} />
                                <Divider/>
                            </Link>
                        )
                    }
                </List>
            </Tab>
            <Tab
                label="2부"
                style={TabBarStyle}
                value={1}
                buttonStyle={TabButtonStyle}
            >
                <List>
                    {
                        this.props.tavern2Array.map(tavern => 
                            <Link to={`/tavern?query=${tavern.en}`} style={LinkStyle} key={tavern.en}>
                                <ListItem primaryText={tavern.kr} />
                                <Divider/>
                            </Link>
                        )
                    }
                </List>
            </Tab>
            <Tab
                label="3부"
                style={TabBarStyle}
                value={2}
                buttonStyle={TabButtonStyle}
            >
                <List>
                    {
                        this.props.tavern3Array.map(tavern => 
                            <Link to={`/tavern?query=${tavern.en}`} style={LinkStyle} key={tavern.en}>
                                <ListItem primaryText={tavern.kr} />
                                <Divider/>
                            </Link>
                        )
                    }
                </List>
            </Tab>
        </Tabs>
        )
    }
}