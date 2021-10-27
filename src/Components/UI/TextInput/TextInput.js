import React, {useState, useEffect} from 'react';

import './TextInput.css';

const textInput = (props) => {

    const [inputValue, setInputValue] = useState(props.value);

    useEffect(() => {
        props.changed(inputValue);
    }, [inputValue]);

    const change = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <label>
            <span className={'label'}>{props.label}</span>
            <input className={'form-element'} type={props.type || 'text'} value={inputValue} onChange={change} />
        </label>
    );
}

export default textInput;