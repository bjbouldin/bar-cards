import React from 'react';

import Hand from '../../Components/Hand/Hand';
import './Player.css';
import Button from "../UI/Button/Button";

const player = (props) => {

    const {hand, settings, id} = props.player;

    let selectCardHandler = (card) => {
        props.selectCard(props.player.id, card);
    }

    let sortHandler = () => {
        props.sort(props.player.id);
    }

    let playHandler = () => {
        if (props.player.selectedCard >= props.rules.minCardPlay) {
            props.playCards(id);
        }
    }

    let passHandler = () => {
        if (props.rules.canPass) {
            props.pass(id);
        }
    }

    let passButton = null;
    if (props.rules.canPass && (props.turn % settings.playOrder) === 0) {
        passButton = (<Button btnClasses={['secondary']} clicked={playHandler}>Play</Button>)
    }

    let playButton = null;
    if (props.rules.canPass && (props.turn % settings.playOrder) === 0) {
        passButton = (<Button btnClasses={['primary']} clicked={passHandler}>Pass</Button>)
    }

    return (
        <div className={'player-viewport'}>
            <div className={'player-bar flex'}>
                <div className={'col col-grow'}>
                    <h3 className={'player-title'}>{settings.name}</h3>
                </div>
                {playButton}
                {passButton}
                <div className={'col'}>
                    <Button btnClasses={['sort-cards']} clicked={sortHandler}>sort</Button>
                    <Button btnClasses={['player-settings']} clicked={sortHandler}>
                        <i className={'icon-cog'}/><span className={'sr-only'}>player settings</span>
                    </Button>
                </div>
            </div>
            <Hand hand={hand} faceDown={props.rules.faceDown} selectCard={selectCardHandler}/>
        </div>
    );
};

export default player;