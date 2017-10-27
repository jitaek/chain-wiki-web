import React, { Component } from 'react'
import ArcanaCell from '../../components/ArcanaCell/ArcanaCell'
import ArcanaGridCell from '../../components/ArcanaGridCell/ArcanaGridCell'
import styles from './ArcanaList.css';
import LazyLoad from 'react-lazyload';

var _ = require('lodash');

export default class ArcanaList extends React.Component {

    render () {

        const viewType = this.props.viewType

        if (viewType === 'grid') {

            return (

                <div className={styles.grid}>
                
                    {this.props.arcanaArray.map(arcana => 
        
                        <ArcanaGridCell
                        key={arcana.uid}
                        arcanaID={arcana.uid}
                        imageURL={arcana.imageURL}
                        /> 
                
                    )}
                </div>
            );
        }

        return (             
            <div>
                {this.props.arcanaArray.map(arcana => 

                    <ArcanaCell
                    
                    key={arcana.uid}
                    arcanaID={arcana.uid}

                    nameKR={arcana.nameKR}
                    nicknameKR={arcana.nicknameKR}
                    nameJP={arcana.nameJP}
                    nicknameJP={arcana.nicknameJP}

                    rarity={arcana.rarity}
                    class={arcana.class}
                    weapon={arcana.weapon}
                    affiliation={arcana.affiliation}
                    numberOfViews={arcana.numberOfViews}

                    iconURL={arcana.iconURL}
                    />
                )}
            </div>
        );
    }

}