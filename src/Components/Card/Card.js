import React, {useEffect, useState} from 'react';

import './Card.css';

const card = (props) => {
    const [displayIcons, setDisplayIcons] = useState(null);
    const [cardClasses, setCardClasses] = useState(['card']);

    const {number, suit, displayNumber, selected} = props.card;

    useEffect(() => {
        setDisplayIcons(setIconsHandler());
    }, [])

    useEffect(() => {

        let cardClassesCopy = [...cardClasses];
        (props.faceDown) ? cardClassesCopy.push('face-down') : null;
        setCardClasses(cardClassesCopy);
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

    let selectCardHandler = () => {
        //skip class setting when clicking the deck
        if (number){
            let cardClassesCopy = [...cardClasses];
            (selected) ? cardClassesCopy.pop() : cardClassesCopy.push('selected');
            setCardClasses(cardClassesCopy);
        }

        props.selectCard(props.card);
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