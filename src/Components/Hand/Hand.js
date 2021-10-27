import React from 'react';

import Card from '../Card/Card';
import './Hand.css';

const hand = (props) => {
    //check to see if any cards are selected
    let handClasses = ['hand'];
    handClasses.push(props.settings.highlightStyle);
    (props.hand.some(card => (card.selected))) ? handClasses.push('card-selection-started') : null;
    let handStyle = {'--card-number': props.hand.length,'--card-number-one-less': props.hand.length-1};

    //create all the current cards that are in the players hand
    let cards = props.hand.map(card => {
        return <Card key={card.value} card={card} faceDown={props.faceDown} selectCard={props.selectCard}/>
    });


    return (
        <div className={handClasses.join(' ')} style={handStyle}>
            {cards}
        </div>
    );
};

export default hand;