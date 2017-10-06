import React from 'react';
import PropTypes from 'prop-types';
import styles from '../SelectInput.css';

class WeaponInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {

        const weapon = event.target.value
        this.props.onChange('weapon', weapon);

    }

    render() {
        
        return (
            <div className={styles.twoColumns}>
                <label>무기</label>
                <select onChange={this.handleChange}>
                    <option value='검'>검</option>
                    <option value='봉'>봉</option>
                    <option value='창'>창</option>
                    <option value='마'>마</option>
                    <option value='궁'>궁</option>
                    <option value='성'>성</option>
                    <option value='권'>권</option>
                    <option value='총'>총</option>
                    <option value='저'>저</option>
                </select>
            </div>
        );
        
    }
    
};

export default WeaponInput;