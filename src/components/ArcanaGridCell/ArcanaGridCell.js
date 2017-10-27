import React from 'react';
// import PropTypes from 'prop-types';
import styles from './ArcanaGridCell.css'
import logo from '../../logo.png'
import SampleMain from '../ArcanaCell/riberaMain.jpg'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload';

function ImagePlaceholder() {
    
    return (
        <div style={{height: '325px'}}></div>
    )
}

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
            <Link to={`/arcana?arcana=${this.props.arcanaID}`} className={styles.linkContainer}>
                <LazyLoad height={325} debounce={100} placeholder={<ImagePlaceholder/>} once={true}>
                    <div className={classNames}>
                            <img className={styles.arcanaMainImage}
                                /* src={this.props.imageURL} */
                                src={SampleMain}
                                alt={this.props.nameKR}
                                onLoad={() => this.setState({loaded: true})}
                            />
                    </div>    
                </LazyLoad>
            </Link>        
        );
    }
    
};

// ArcanaGridCell.propTypes = {

//     nameKR: PropTypes.string.isRequired,
//     nicknameKR: PropTypes.string,
//     nameJP: PropTypes.string.isRequired,
//     nicknameJP: PropTypes.string,

//     rarity: PropTypes.string.isRequired,
//     class: PropTypes.string.isRequired,
//     weapon: PropTypes.string.isRequired,
//     affiliation: PropTypes.string.isRequired,
//     numberOfViews: PropTypes.number.isRequired,

//     iconURL: PropTypes.string,
// };

export default ArcanaGridCell;