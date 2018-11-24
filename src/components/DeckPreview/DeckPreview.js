import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DeckCard.css';

const LinkStyle = {
    textDecoration:'none',
    color:'inherit'
}

export const DeckPreview = (props) => {
    return (
        <Link to={`/deck?d=${props.deck.deckID}`} style={LinkStyle}>
            <div style={{
                display: 'flex'
            }}>
                <DeckGrid arcanaArray={props.deck.arcana.main} main={true}/>
                <DeckGrid arcanaArray={props.deck.arcana.sub} main={false}/>                
            </div>
        </Link>
    );
}

const DeckGrid = (props) => {
    return (
        <div className={props.main ? styles.gridMain : styles.gridSub}>
            {props.arcanaArray.map((arcana, index) =>
                <div key={index}>
                    <img
                        height={66}
                        width={66}
                        src={arcana.iconURL}
                        alt={arcana.nameKR}
                    />
                </div>
            )}
        </div>
    );
}