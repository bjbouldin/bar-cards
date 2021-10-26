import React, {useState} from 'react';

import classes from './FullscreenMenu.css';
import Button from "../Button/Button";
import Aux from '../../../hoc/Aux';

const fullscreenMenu = (props) => {

    const [showStateClass, setShowStateClass] = useState('closed');

    let buttonText;
    if (props.showBtnText) {
        buttonText = (<span>{props.btnText}</span>);
    } else {
        buttonText = (<span className={'sr-only'}>{props.btnText}</span>);
    }

    let menuIcon = null;
    if (props.btnIcon) {
        menuIcon = (<i className={'icon-' + props.btnIcon}/>);
    }
    let toggleMenu = () => {
        (showStateClass === 'closed') ? setShowStateClass('open') : setShowStateClass('closed')
    }

    let btnClasses = ['secondary', 'fullscreen-toggle', showStateClass]

    return (
        <Aux>
            <Button btnClasses={btnClasses} clicked={toggleMenu}>
                {buttonText}
                {menuIcon}
            </Button>
            <div className={'fullscreen-menu-wrapper'}>
                <div className={'fullscreen-menu'}>
                    {props.children}
                </div>
            </div>
        </Aux>
    );
}


export default fullscreenMenu;