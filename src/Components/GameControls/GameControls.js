import React, {useState} from 'react';

import './GameControls.css';
import SelectList from "../UI/SelectList/SelectList";
import Button from "../UI/Button/Button";
import FullscreenMenu from "../UI/FullscreenMenu/FullscreenMenu";
import CheckboxSwitch from "../UI/CheckboxSwitch/CheckboxSwitch";

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

    let settingsChangedHandler = () => {
        props.settingChange(props.gameSettings)
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

                    <FullscreenMenu btnText={'player settings'} btnIcon={'cog'} showBtnText={false}>
                        <div className={'full-width'}>
                            <h2>Game Settings</h2>
                        </div>
                        <div className={'flex'}>
                            <div className={'col col-grow'}>
                                <SelectList options={props.gameOptions} changed={settingsChangedHandler} value={props.game} label={'Game'} />
                            </div>
                        </div>
                    </FullscreenMenu>
                </div>
            </div>
            <div className={'play-field'}>
                {props.children}
            </div>
        </div>
    );
}

export default gameControls;