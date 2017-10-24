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

                <div className={styles.grid} ref="homeRoot">
                
                    {this.props.arcanaArray.map(arcana => 
        
                        <LazyLoad height={300} offset={[200,200]} unmountIfInvisible={true} once={true} key={arcana.uid}>
                            <ArcanaGridCell

                            onClick={() => this.props.onClick(arcana.uid)}
                            key={arcana.uid}
        
                            nameKR={arcana.nameKR}
                            nicknameKR={arcana.nicknameKR}
                            nameJP={arcana.nameJP}
                            nicknameJP={arcana.nicknameJP}
            
                            rarity={arcana.rarity}
                            class={arcana.class}
                            weapon={arcana.weapon}
                            affiliation={arcana.affiliation}
                            numberOfViews={arcana.numberOfViews}
            
                            imageURL={arcana.imageURL}
                            iconURL={arcana.iconURL}
                            /> 
                        </LazyLoad>   
                    
                    )}
                </div>
            );
        }

        return ( 

            <div ref="homeRoot">

                {this.props.arcanaArray.map(arcana => 

                    <LazyLoad height={90} offset={[200,200]} unmountIfInvisible={true} once={true} key={arcana.uid}>
                        <ArcanaCell

                        onClick={() => this.props.onClick(arcana.uid)}
                        key={arcana.uid}

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
                    </LazyLoad>
                )}
            </div>
        );
    }

}