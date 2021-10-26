import React, {useEffect, useState} from 'react';

import './Deck.css';
import Card from '../Card/Card';
import Aux from '../../hoc/Aux';

const deck = (props) => {

    const [cardsDisplay, setCardsDisplay] = useState(null);

    useEffect(() => {
        setCardsDisplay(setCardSizeHandler());
    }, [props.deck])

    let setCardSizeHandler = () => {
        let cards = [];
        for (let i = 0; i < props.deck.length; i += 5) {
            cards.push(i);
        }
        return (<Aux>{cards.map((card, index) => {
            return <Card key={index}
                         card={{number: null, suit: null, displayNumber: null}}
                         faceDown={true}
                         selectCard={props.drawCard}/>
        })}</Aux>);
    }

    return (
        <div className="deck">
            {cardsDisplay}
        </div>
    );
};

export default deck;