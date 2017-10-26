import React from 'react';
import PropTypes from 'prop-types';
import styles from './ArcanaGridCell.css';
import logo from '../../logo.png';
import SampleMain from '../ArcanaCell/riberaMain.jpg'

class ArcanaGridCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
      }
    render() {

        var classNames
        if (!this.state.loaded) {
            classNames = styles.gridContainerPlaceholder
        }
        else {
            classNames = styles.gridContainer
        }
        
        return (
            <div className={classNames}
                onClick={this.props.onClick}>

                <img className={styles.arcanaMainImage}
                    /* src={this.props.imageURL} */
                    src={SampleMain}
                    onLoad={() => this.setState({loaded: true})}
                    alt={this.props.nameKR}/>
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