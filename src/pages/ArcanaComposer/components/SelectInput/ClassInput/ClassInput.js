import React from 'react';
import PropTypes from 'prop-types';
import styles from '../SelectInput.css';

class ClassInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {

        const rarity = event.target.value
        this.props.onChange('class', rarity);

    }

    render() {
        
        return (
            <div className={styles.twoColumns}>
                <label>직업</label>
                <select onChange={this.handleChange}>
                    <option value='전사'>전사</option>
                    <option value='기사'>기사</option>
                    <option value='궁수'>궁수</option>
                    <option value='법사'>법사</option>
                    <option value='힐러'>힐러</option>
                </select>
            </div>
        );
        
    }
    
};

export default ClassInput;