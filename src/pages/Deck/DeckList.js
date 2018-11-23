import React, { Component } from 'react';
import { DeckPreview } from '../../components/DeckPreview/DeckPreview';
let mockDecks = require('./decks.json');

export default class DeckList extends Component {

  render() {

    return (
        <div>          
          <h1 style={{margin: '16px'}}>덱 목록</h1>
          {mockDecks.map((deck, index) =>
            <div style={{backgroundColor: index % 2 === 0 ? '#f1f2f4' : 'white'}}>
                <DeckPreview key={deck.deckID} deck={deck}/>
            </div>
          )}
        </div>
    );
  }

}