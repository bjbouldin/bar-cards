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
        <select onChange={props.changed} value={props.value} className={"select-list"}>
            {options}
        </select>
    );
}

export default selectList;