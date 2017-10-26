import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class FilterButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // selected: false
        }
    }

    handleClick() {
        // this.setState((prevState, props) => ({
            // selected: !prevState.selected
        // }));
        // this.props.onClick()
    }

    render() {

        return (
            <RaisedButton
                backgroundColor={
                    this.props.selected ?
                    '#68a283' : 'white'
                }
                labelStyle={
                    this.props.selected ?
                    {color:'white', padding:'0px'} : {color:'black', padding:'0px'}
                }
                fullWidth={true} label={this.props.label} filter={this.props.filter} onClick={() => this.props.onClick(this.props.filter, this.props.label)}/> 
        );
    }

}
