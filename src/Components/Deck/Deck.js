import React from 'react';

import './Deck.css';
import Card from '../Card/Card';

const deck = (props) => {

    return (
        <div className="deck">
            <Card key={'deck'} card={{number: null, suit: null, displayNumber:null}} faceDown={true} selectCard={props.drawCard} />
        </div>
    );
};

export default deck;