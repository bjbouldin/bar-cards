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

    let settingsChangedHandler = (settingsName, newValue) => {
        props.settingChange(settingsName, newValue, props.player.id);
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

    let passButton = null;
    if (props.rules.canPass && (props.turn === props.index)) {
        passButton = (<Button btnClasses={['secondary']} clicked={passHandler}>Pass</Button>)
    }

    let playButton = null;
    if (props.turn === props.index) {
        playButton = (<Button btnClasses={['primary']} clicked={playHandler}>Play</Button>)
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
                    {passButton}
                </div>
                <div className={'col'}>
                    <Button btnClasses={['secondary']} clicked={sortHandler}>sort</Button>
                    <FullscreenMenu btnText={'player settings'} btnIcon={'cog'} showBtnText={false}>
                        <div className={'full-width'}>
                            <h2>Player Settings for {settings.name}</h2>
                        </div>
                        <div className={'flex'}>
                            <div className={'col col-grow'}>
                                <TextInput label={'Player Name'} value={settings.name} changed={nameChangedHandler} />
                            </div>
                            <div className={'col col-grow'}>
                                <SelectList options={playerSettingsOptions.highlightStyle} value={settings.highlightStyle} label={'Highlight Style'} changed={highlightStyleChangedHandler} />
                            </div>
                            <div className={'col col-grow'}>
                                <SelectList options={playerSettingsOptions.playStyle} value={settings.playStyle} label={'Play Style'} changed={playStyleChangedHandler} />
                            </div>
                            <div className={'col col-grow'}>
                                <CheckboxSwitch value={settings.autoSort} label={'Auto Sort'} changed={autoSortChangedHandler} />
                            </div>
                            <div className={'col col-grow'}>
                                <CheckboxSwitch value={settings.allowReorder} label={'Allow Reorder'} changed={allowReorderChangedHandler} />
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