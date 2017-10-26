import React from 'react';
import PropTypes from 'prop-types';
import styles from './ArcanaCell.css';
import logo from '../../logo.png';

class ArcanaCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
      }
    render() {
        var classNames
        if (!this.state.loaded) {
            classNames = styles.arcanaIconPlaceholder
        }
        else {
            classNames = styles.arcanaIcon
        }
        return (
            <div className={styles.container} onClick={this.props.onClick}>
                <img
                    className={classNames}
                    src={this.props.iconURL}
                    alt={this.props.nameKR}
                    onLoad={() => this.setState({loaded: true})}
                    />
                <div>
                    <div className={styles.nameKRContainer}>
                        <div className={styles.nameKRLabel}>{this.props.nameKR}</div>
                        <div className={styles.nicknameKRLabel}>{this.props.nicknameKR}</div>
                    </div>
                    <div className={styles.nameJPContainer}>
                        <div className={styles.nameJPLabel}>{this.props.nameJP}</div>
                        <div className={styles.nicknameJPLabel}>{this.props.nicknameJP}</div>
                    </div>
                    <div className={styles.nameKRContainer}>
                        <div className={styles.detailLabel}>#{this.props.rarity}성</div>
                        <div className={styles.detailLabel}>#{this.props.class}</div>
                        <div className={styles.detailLabel}>#{this.props.weapon}</div>
                        <div className={styles.detailLabel}>#{this.props.affiliation}</div>
                        <div className={styles.detailLabel}>조회 {this.props.numberOfViews}</div>
                    </div>
                </div>
            </div>                
        );
    }
    
};

ArcanaCell.propTypes = {

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

export default ArcanaCell;