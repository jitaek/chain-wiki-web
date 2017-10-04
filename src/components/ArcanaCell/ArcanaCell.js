import React from 'react';
import PropTypes from 'prop-types';
import styles from './ArcanaCell.css';
import logo from '../../logo.png';

class ArcanaCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nameKR: props.nameKR,
            nicknameKR: props.nicknameKR,
            iconURL: props.iconURL
        };
      }
    render() {
        return (
            <div className={styles.container} onClick={this.props.onClick}>
                <img className={styles.arcanaIcon} src={logo} alt='not loaded'/>
                <div>
                    <div className={styles.nameKRContainer}>
                        <div className={styles.nameKRLabel}>{this.state.nameKR}</div>
                        <div className={styles.nicknameKRLabel}>카세</div>
                    </div>
                    <div className={styles.nameJPContainer}>
                        <div className={styles.nameJPLabel}>ムジカ</div>
                        <div className={styles.nicknameJPLabel}>歌聖</div>
                    </div>
                    <div className={styles.nameKRContainer}>
                        <div className={styles.detailLabel}>#5성</div>
                        <div className={styles.detailLabel}>#궁수</div>
                        <div className={styles.detailLabel}>#궁</div>
                        <div className={styles.detailLabel}>#호수도시</div>
                        <div className={styles.detailLabel}>조회 61</div>
                    </div>
                </div>
            </div>                
        );
    }
    
};

ArcanaCell.propTypes = {

    nameKR: PropTypes.string.isRequired,
    nicknameKR: PropTypes.string,
    // nameJP: PropTypes.string.isRequired,
    // nicknameJP: PropTypes.string,

    // rarity: PropTypes.string.isRequired,
    // class: PropTypes.string.isRequired,
    // weapon: PropTypes.string.isRequired,
    // affiliation: PropTypes.string.isRequired,
    // numberOfViews: PropTypes.number.isRequired,

    // iconURL: PropTypes.string,
};

export default ArcanaCell;