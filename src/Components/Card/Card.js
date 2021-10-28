import React from 'react';

import './Card.css';

const card = (props) => {

    const {number, suit, displayNumber, selected} = props.card;

    let cardClasses = ['card'];
    (props.faceDown) ? cardClasses.push('face-down') : null;
    //skip class setting when clicking the deck - the deck has null passed for number
    if (number) {
        (selected) ? cardClasses.push('selected') : null;
    }

    let displayIcons;
    //skip creating icons for face cards
    if (Number(displayNumber) > 0){
        //Create an array with a length equal to card number for looping over
        displayIcons = (<span className={'card-icon-wrapper'}>{[...Array(number).keys()].map((icon, index) => {
            return <i key={index} className={'card-icon-col icon-' + suit}/>;
        })}</span>);
    }

    let selectCardHandler = () => {
        props.selectCard(props.index);
    }

    return (
        <div className={cardClasses.join(' ')} data-number={number} data-suit={suit}>
            <a className={'card-inner'} onClick={selectCardHandler}>
                <span className={'sr-only'}>select the {displayNumber} of {suit}</span>
                {displayIcons}
                <span className={'card-number-wrapper'}>
                    <span className={'card-number'}>{displayNumber}<i className={'icon-' + suit}/></span>
                </span>
                <span className={'card-number-wrapper'}>
                    <span className={'card-number'}>{displayNumber}<i className={'icon-' + suit}/></span>
                </span>
            </a>
            <a className={'card-inner-back'} onClick={selectCardHandler}>
            </a>
        </div>
    );
};

export default card;