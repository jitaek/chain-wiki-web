import React from 'react';
import PropTypes from 'prop-types';
import styles from '../SelectInput.css';

class AffiliationInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {

        const affiliation = event.target.value
        this.props.onChange('affiliation', affiliation);

    }

    render() {
        
        return (
            <div className={styles.twoColumns}>
                <label>소속</label>
                <select id="affiliation" onChange={this.handleChange}>
                    <option value='여행자'>여행자</option>
                    <option value='마신'>마신</option>
                    <option value='부도'>부도</option>
                    <option value='성도'>성도</option>
                    <option value='현탑'>현탑</option>
                    <option value='미궁'>미궁</option>
                    <option value='호도'>호도</option>
                    <option value='정령섬'>정령섬</option>
                    <option value='구령'>구령</option>
                    <option value='대해'>대해</option>
                    <option value='수인'>수인</option>
                    <option value='죄'>죄</option>
                    <option value='박명'>박명</option>
                    <option value='철연'>철연</option>
                    <option value='연대기'>연대기</option>
                    <option value='레무'>레무</option>
                    <option value='의용군'>의용군</option>
                    <option value='화격단'>화격단</option>
                </select>
            </div>
        );
        
    }
    
};

export default AffiliationInput;