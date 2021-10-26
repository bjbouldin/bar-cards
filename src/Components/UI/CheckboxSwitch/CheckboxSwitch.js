import React, {useEffect, useState} from 'react';

import './CheckboxSwitch.css';

const checkboxSwitch = (props) => {

    const [checkboxValue, setCheckboxValue] = useState(props.value);

    React.useEffect(() => {
        props.changed(checkboxValue);
    }, [checkboxValue]);

    const change = () => {
        setCheckboxValue(!checkboxValue);
    }

    return (
        <label className={''}>
            <span className="label">
                {props.label}
            </span>
            <span className="switch">
                <input type="checkbox" value={props.value}  onChange={change} defaultChecked={checkboxValue} />
                <a className="toggle round" role="checkbox">
                    <span className="toggle-slide" />
                </a>
            </span>
        </label>
    );
}

export default checkboxSwitch;