import React, { Component } from 'react';
import { DeckPreview } from '../../components/DeckPreview/DeckPreview';
import { Link } from 'react-router-dom';

let mockDecks = require('./decks.json');

export default class DeckList extends Component {

  state = {
    decksArray: mockDecks
  }
  componentWillMount() {

    const parsed = window.location.search.slice(1);
    if (parsed.u) {
        // TODO: network call to get (u)ser's decks
        // queryOrderedByValue(?)
        /**
         * userID
         *  decks
         *   deckID1
         *   deckID2
         */

    }
    else {
      // no query string supplied, get logged in user's list of decks.
      // Maybe history replace with userID added as query string?
    }
  }

  render() {

    return (
        <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <h1 style={{margin: '16px', flexGrow: 1}}>덱 목록</h1>
            <Link to="/deck" style={{margin: '8px', flexShrink: 0}}>덱 추가</Link>
          </div>
          {this.state.decksArray.map((deck, index) =>
            <div style={{backgroundColor: index % 2 === 0 ? '#f1f2f4' : 'white'}}>
                <DeckPreview key={deck.deckID} deck={deck}/>
            </div>
          )}
        </div>
    );
  }

}