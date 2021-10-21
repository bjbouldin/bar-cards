import React, {useState} from 'react';

import './GameControls.css';
import SelectList from "../UI/SelectList/SelectList";
import Button from "../UI/Button/Button";

const gameControls = (props) => {

    let gamePlayerButton = null;
    if (props.showGameStartButton) {
        gamePlayerButton = (<Button btnClasses={['primary']} clicked={props.newGame}>Game Start</Button>)
    }

    let newPlayerButton = null;
    if (props.showNewPlayerButton) {
        newPlayerButton = (<Button btnClasses={['primary']} clicked={props.newPlayer}>New Player</Button>)
    }

    let endGameButton = null;
    if (props.showEndGameButton) {
        endGameButton = (<Button btnClasses={['warn']} clicked={props.endGame}>End Game</Button>)
    }

    return (
        <div className={'gameControls'}>
            <div className={'game-bar flex'}>
                <div className={'col col-grow'}>
                    {gamePlayerButton}
                    {newPlayerButton}
                    {endGameButton}
                </div>
                <div className={'col'}>
                    <Button btnClasses={['game-settings-toggle']}><i className={'icon-cog'} /><span className={'sr-only'}>player settings</span></Button>
                </div>
            </div>
            <div className={'game-settings flex'}>

            </div>
            <SelectList options={props.gameOptions} changed={props.gameChange} value={props.game}/>
            {props.children}
        </div>
    );
}

export default gameControls;