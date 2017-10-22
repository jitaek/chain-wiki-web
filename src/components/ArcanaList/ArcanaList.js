import React, { Component } from 'react'
import ArcanaCell from '../../components/ArcanaCell/ArcanaCell'
import ArcanaGridCell from '../../components/ArcanaGridCell/ArcanaGridCell'
import styles from './ArcanaList.css';

export default class ArcanaList extends React.Component {

    render () {

        const viewType = this.props.viewType

        if (viewType === 'grid') {

            return (
                <div className={styles.grid} ref="homeRoot">
                
                    {this.props.arcanaArray.map( arcana => 
        
                        <ArcanaGridCell

                        onClick={() => this.props.onClick(this, arcana.uid)}
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
                    
                    )}
                    {/* <div style={{display:'none'}}>
                    {this.state.arcanaArray.map((arcana, i) =>
                        <img 
                        src={arcana.imageURL}
                        onLoad={this.onLoad.bind(this, arcana)} 
                        key={i} />
                    )}
                    </div> */}
                </div>
            );
        }

        return ( 
            <div ref="homeRoot">
                {this.props.arcanaArray.map( arcana => 
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
                )}
            </div>
        );
    }

}