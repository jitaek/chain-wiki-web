import React from 'react';
import PropTypes from 'prop-types';
import styles from './NameInput.css';
// import styles from './skeleton.css';

class NameInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isKR: props.isKR,
            name: props.name,
            nickname: props.nickname,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
      }

    handleNameChange(event) {

        const nameValue = event.target.value

        const nameKey = this.state.isKR != undefined ? "nameKR" : "nameJP"

        this.props.onChange(nameKey, nameValue);

    }

    handleNicknameChange(event) {
        
        const nicknameValue = event.target.value

        const nicknameKey = this.state.isKR != undefined ? "nicknameKR" : "nicknameJP"

        this.props.onChange(nicknameKey, nicknameValue);

    }

    render() {
        return (
            <form>
            <div className={styles.container + ' ' + styles.fullWidth}>
                <div className={styles.half}>
                    <label>{this.state.isKR != undefined ? '한글 호칭' : '일어 호칭'}</label>
                    <input type='text' className={styles.fullWidth} onChange={this.handleNameChange}/>
                </div>
                <div className={styles.half}>
                    <label>{this.state.isKR != undefined ? '한글 이름' : '일어 이름'}</label>
                    <input type='text' className={styles.fullWidth} onChange={this.handleNicknameChange}/>
                </div>
            </div>
            </form>
        );
    }
    
};

export default NameInput;