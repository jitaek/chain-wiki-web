import React from 'react';
import PropTypes from 'prop-types';
import styles from '../SelectInput.css';

const COST_RANGE = 26;

class CostInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {

        const weapon = event.target.value
        this.props.onChange('cost', weapon);

    }

    render() {
        
        const costArray = [];
        for (var i = COST_RANGE; i >= 0; i--) {
            costArray.push(i)
        }
        return (
            <div className={styles.twoColumns}>
                <label>코스트</label>
                <select onChange={this.handleChange}>
                    <option value={40}>40</option>
                    {costArray.map(cost =>
                        <option value={cost}>{cost}</option>)
                    }
                </select>
            </div>
        );
        
    }
    
};

export default CostInput;