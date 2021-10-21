import React, { useEffect, useState } from 'react';

import './Card.css';

const card = (props) => {
    const [displayIcons, setDisplayIcons] = useState(null);

    const {number, suit, displayNumber, selected} = props.card;
    useEffect(() => {
        setDisplayIcons(setIconsHandler());
        return () => {}
    }, [])

    let setIconsHandler = () => {
        let icons = [];
        for (let i = 0; i < number; i++) {
            icons.push(i);
        }
        return (<span className={'card-icon-wrapper'}>{icons.map((icon, index) => {
            return <i key={index} className={'card-icon-col icon-' + suit}/>;
        })}</span>);
    }

    let cardClasses = ['card'];
    (selected) ? cardClasses.push('selected') : null;
    (props.faceDown) ? cardClasses.push('face-down') : null;


    let selectCardHandler = () => {
        props.selectCard(props.card);
    }

    if (props.newCard) {

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