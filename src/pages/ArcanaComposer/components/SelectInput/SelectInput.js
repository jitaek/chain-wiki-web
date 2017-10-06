import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectInput.css';
import RarityInput from './RarityInput/RarityInput';
import ClassInput from './ClassInput/ClassInput';
import WeaponInput from './WeaponInput/WeaponInput';
import CostInput from './CostInput/CostInput';
import AffiliationInput from './AffiliationInput/AffiliationInput';

class SelectInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
        };
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {

        const nameValue = event.target.value

        const nameKey = this.state.isKR != undefined ? "nameKR" : "nameJP"

        this.props.onChange(nameKey, nameValue);

    }

    render() {
        
        const type = this.state.type

        if (type == 'rarity') {
            return <RarityInput onChange={this.props.onChange}/>
        }
        else if (type == 'class') {
            return <ClassInput onChange={this.props.onChange}/>
        }
        else if (type == 'weapon') {
            return <WeaponInput onChange={this.props.onChange}/>
        }
        else if (type == 'cost') {
            return <CostInput onChange={this.props.onChange}/>
        }
        else if (type == 'affiliation') {
            return <AffiliationInput onChange={this.props.onChange}/>
        }
        else {
            return null
        }
        
    }
    
};

export default SelectInput;