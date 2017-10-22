import React, { Component } from 'react'
import ArcanaCell from '../../components/ArcanaCell/ArcanaCell'
import ArcanaGridCell from '../../components/ArcanaGridCell/ArcanaGridCell'
import styles from './ArcanaList.css';
import LazyLoad from 'react-lazyload';

export default class ArcanaList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loadedMainImages: [],
            loadedIconImages: [],
        }
    }

    onLoad(arcana, imageType) {
        if (imageType === "main") {
            this.setState(({ loadedMainImages }) => {
                return { loadedMainImages: loadedMainImages.concat(arcana) }
            })
        }
        else {
            this.setState(({ loadedIconImages }) => {
                return { loadedIconImages: loadedIconImages.concat(arcana) }
            })
        }
    }

    render () {

        const viewType = this.props.viewType

        if (viewType === 'grid') {

            return (

                <div className={styles.grid} ref="homeRoot">
                
                    {this.state.loadedMainImages.map( arcana => 
        
                        <LazyLoad height={200}>
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
                    <div style={{display:'none'}}>
                    {this.props.arcanaArray.map((arcana, i) =>

                        <LazyLoad height={200}>
                            <img 
                            src={arcana.imageURL}
                            onLoad={this.onLoad.bind(this, arcana, 'main')} 
                            key={i} />
                        </LazyLoad>
                    )}
                    </div>
                </div>
            );
        }

        return ( 

            <div ref="homeRoot">

                {this.state.loadedIconImages.map( arcana => 

                    <LazyLoad height={200}>
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
                <div style={{display:'none'}}>
                    {this.props.arcanaArray.map((arcana, i) =>

                        <LazyLoad height={200}>
                            <img 
                            src={arcana.iconURL}
                            onLoad={this.onLoad.bind(this, arcana, 'icon')} 
                            key={i}
                            />
                        </LazyLoad>
                    )}
                </div>
            </div>
        );
    }

}