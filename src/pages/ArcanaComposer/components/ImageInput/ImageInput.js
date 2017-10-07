import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageInput.css';

class ImageInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isIcon: props.isIcon,
            iconURL: props.iconURL,
            imageURL: props.imageURL,
        };
        this.handleImageChange = this.handleImageChange.bind(this);
      }

    handleImageChange(event) {
        
        const imageURL = event.target.value

        const imageURLKey = this.state.iconURL != undefined ? "iconURL" : "imageURL"

        this.props.onChange(imageURLKey, imageURL);

    }

    render() {
        return (
            <form>
            <div className={styles.container + ' ' + styles.fullWidth}>
                <div className={styles.fullWidth}>
                    <label>{this.state.isIcon != undefined ? '얼굴 사진 주소' : '메인 사진 주소'}</label>
                    <input type='text' className={styles.fullWidth} onChange={this.handleImageChange}/>
                </div>
            </div>
            </form>
        );
    }
    
};

export default ImageInput;