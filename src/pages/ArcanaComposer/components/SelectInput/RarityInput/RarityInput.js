import React from 'react';
import PropTypes from 'prop-types';
import styles from '../SelectInput.css';

class RarityInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {

        const rarity = event.target.value
        this.props.onChange('rarity', rarity);

    }

    render() {
        
        return (
            <div className={styles.twoColumns}>
                <label>레어</label>
                <select onChange={this.handleChange}>
                    <option value='5'>5</option>
                    <option value='4'>4</option>
                    <option value='3'>3</option>
                    <option value='2'>2</option>
                    <option value='1'>1</option>
                </select>
            </div>
        );
        
    }
    
};

export default RarityInput;