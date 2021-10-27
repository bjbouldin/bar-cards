import React, {useState, useEffect} from 'react';

import './SelectList.css';
import Aux from "../../../hoc/Aux";

const selectList = (props) => {
    const [inputValue, setInputValue] = useState(props.value);

    let options = (
        <Aux>
            {props.options.map((option, index) => {
                return <option value={option} key={index}>{option.replace(/([A-Z])/g, " $1")}</option>
            })}
        </Aux>
    );

    useEffect(() => {
        props.changed(inputValue);
    }, [inputValue]);

    const change = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <label>
            <span className="label">
                {props.label}
            </span>
            <select onChange={change} value={props.value} className="form-element select-list">
                {options}
            </select>
        </label>
    );
}

export default selectList;