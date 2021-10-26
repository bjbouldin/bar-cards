import React from 'react';

import './SelectList.css';
import Aux from "../../../hoc/Aux";

const selectList = (props) => {
    let options = (
        <Aux>
            {props.options.map((option, index) => {
                return <option value={option} key={index}>{option.replace(/([A-Z])/g, " $1")}</option>
            })}
        </Aux>
    );

    return (
        <label>
            <span className="label">
                {props.label}
            </span>
            <select onChange={props.changed} value={props.value} className="form-element select-list">
                {options}
            </select>
        </label>
    );
}

export default selectList;