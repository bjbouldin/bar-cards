import React from 'react';

import './Player.css';
import Hand from '../../Components/Hand/Hand';
import Button from "../UI/Button/Button";
import FullscreenMenu from "../UI/FullscreenMenu/FullscreenMenu";
import SelectList from "../UI/SelectList/SelectList";
import TextInput from "../UI/TextInput/TextInput";
import CheckboxSwitch from "../UI/CheckboxSwitch/CheckboxSwitch";

const player = (props) => {

    const playerSettingsOptions = {
        highlightStyle: ['standard', 'scaleHover', 'raiseHover'],
        playStyle: ['standard', 'fancy', 'obnoxious']
    }

    const {hand, settings} = props.player;

    let selectCardHandler = (card) => {
        props.selectCard(props.index, card);
    }

    let sortHandler = () => {
        props.sort(props.index);
    }

    let playHandler = () => {
        props.playCards(props.index);
    }

    let endTurnHandler = () => {
        props.endTurn(props.index);
    }

    let settingsChangedHandler = (settingsName, newValue) => {
        props.settingChange(settingsName, newValue, props.index);
    }

    let autoSortChangedHandler = (newValue) => {
        settingsChangedHandler('autoSort', newValue);
    }

    let allowReorderChangedHandler = (newValue) => {
        settingsChangedHandler('allowReorder', newValue);
    }

    let nameChangedHandler = (newValue) => {
        settingsChangedHandler('name', newValue);
    }

    let highlightStyleChangedHandler = (newValue) => {
        settingsChangedHandler('highlightStyle', newValue);
    }

    let playStyleChangedHandler = (newValue) => {
        settingsChangedHandler('playStyle', newValue);
    }

    let endTurnButton = null;
    if ((props.rules.canPass || props.player.played || props.player.drawCount > 0) && (props.turn === props.index)) {
        let text = 'Pass';
        if (props.player.played || props.player.drawCount > 0) text = 'End Turn'
        endTurnButton = (<Button btnClasses={['secondary']} clicked={endTurnHandler}>{text}</Button>)
    }

    let playButton = null;
    if (props.turn === props.index) {
        playButton = (
            <Button btnClasses={['primary']} clicked={playHandler} disabled={props.player.played}>Play</Button>)
    }

    return (
        <div className={'player-viewport'}>
            <div className={'player-bar flex'}>
                <div className={'col col-grow'}>
                    <h3 className={'player-title'}>{settings.name}</h3>
                </div>
                <div className={'col'}>
                    {playButton}
                </div>
                <div className={'col'}>
                    {endTurnButton}
                </div>
                <div className={'col'}>
                    <Button btnClasses={['secondary']} clicked={sortHandler}>sort</Button>
                </div>
                <div className={'col'}>
                    <FullscreenMenu btnText={'player settings'} btnIcon={'cog'} showBtnText={false}>
                        <div className={'full-width'}>
                            <h2>Player Settings for {settings.name}</h2>
                        </div>
                        <div className={'flex'}>
                            <div className={'col col-grow'}>
                                <TextInput label={'Player Name'} value={settings.name} changed={nameChangedHandler}/>
                            </div>
                            <div className={'col col-grow'}>
                                <SelectList options={playerSettingsOptions.highlightStyle} value={settings.highlightStyle} label={'Highlight Style'} changed={highlightStyleChangedHandler}/>
                            </div>
                            <div className={'col col-grow'}>
                                <SelectList options={playerSettingsOptions.playStyle} value={settings.playStyle} label={'Play Style'} changed={playStyleChangedHandler}/>
                            </div>
                            <div className={'col col-grow'}>
                                <CheckboxSwitch value={settings.autoSort} label={'Auto Sort'} changed={autoSortChangedHandler}/>
                            </div>
                            <div className={'col col-grow'}>
                                <CheckboxSwitch value={settings.allowReorder} label={'Allow Reorder'} changed={allowReorderChangedHandler}/>
                            </div>
                        </div>
                    </FullscreenMenu>
                </div>
            </div>
            <Hand hand={hand} settings={settings} faceDown={props.rules.faceDown} selectCard={selectCardHandler}/>
        </div>
    );
};

export default player;