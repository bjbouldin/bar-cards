import React from 'react';

import Hand from '../../Components/Hand/Hand';
import './Player.css';
import Button from "../UI/Button/Button";
import FullscreenMenu from "../UI/FullscreenMenu/FullscreenMenu";
import SelectList from "../UI/SelectList/SelectList";
import TextInput from "../UI/TextInput/TextInput";
import CheckboxSwitch from "../UI/CheckboxSwitch/CheckboxSwitch";

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
                    <FullscreenMenu btnText={'player settings'} btnIcon={'cog'} showBtnText={false}>
                        <div className={'full-width'}>
                            <h2>Player Settings for {settings.name}</h2>
                        </div>
                        <div className={'flex'}>
                            <div className={'col col-grow'}>
                                <TextInput label={'Player Name'} value={settings.name} changed={nameChangedHandler} />
                            </div>
                            <div className={'col col-grow'}>
                                <SelectList options={['option 1','option 2','option 3']} changed={null} value={settings.highlightStyle} label={'Highlight Style'} change={highlightStyleChangedHandler} />
                            </div>
                            <div className={'col col-grow'}>
                                <SelectList options={['option 1','option 2','option 3']} changed={null} value={settings.playStyle} label={'Play Style'} change={playStyleChangedHandler} />
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
            <Hand hand={hand} faceDown={props.rules.faceDown} selectCard={selectCardHandler}/>
        </div>
    );
};

export default player;