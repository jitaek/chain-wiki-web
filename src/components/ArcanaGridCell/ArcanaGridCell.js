import React from 'react';
import PropTypes from 'prop-types';
import styles from './ArcanaGridCell.css';
import logo from '../../logo.png';
import SampleMain from '../ArcanaCell/riberaMain.jpg'

class ArcanaGridCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nameKR: props.nameKR,
            nicknameKR: props.nicknameKR,

            nameJP: props.nameJP,
            nicknameJP: props.nicknameJP,

            rarity: props.rarity,
            class: props.class,
            weapon: props.weapon,
            affiliation: props.affiliation,
            numberOfViews: props.numberOfViews,

            iconURL: props.iconURL
        };
      }
    render() {
        return (
            <div className={styles.gridContainer} onClick={this.props.onClick}>
                <img className={styles.arcanaMainImage} src={SampleMain} alt='not loaded'/>
                {/* <div className={styles.container}>
                    <img className={styles.arcanaIcon} src={logo} alt='not loaded'/>
                    <div>
                        <div className={styles.nameKRContainer}>
                            <div className={styles.nameKRLabel}>{this.state.nameKR}</div>
                            <div className={styles.nicknameKRLabel}>{this.state.nicknameKR}</div>
                        </div>
                        <div className={styles.nameJPContainer}>
                            <div className={styles.nameJPLabel}>{this.state.nameJP}</div>
                            <div className={styles.nicknameJPLabel}>{this.state.nicknameJP}</div>
                        </div>
                        <div className={styles.nameKRContainer}>
                            <div className={styles.detailLabel}>#{this.state.rarity}성</div>
                            <div className={styles.detailLabel}>#{this.state.class}</div>
                            <div className={styles.detailLabel}>#{this.state.weapon}</div>
                            <div className={styles.detailLabel}>#{this.state.affiliation}</div>
                            <div className={styles.detailLabel}>조회 {this.state.numberOfViews}</div>
                        </div>
                    </div>
                </div>    */}
            </div>             
        );
    }
    
};

ArcanaGridCell.propTypes = {

    nameKR: PropTypes.string.isRequired,
    nicknameKR: PropTypes.string,
    nameJP: PropTypes.string.isRequired,
    nicknameJP: PropTypes.string,

    rarity: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    weapon: PropTypes.string.isRequired,
    affiliation: PropTypes.string.isRequired,
    numberOfViews: PropTypes.number.isRequired,

    iconURL: PropTypes.string,
};

export default ArcanaGridCell;