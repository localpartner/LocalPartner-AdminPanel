import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select'

const FormDropdown = (props) => {
   
    const handleChange = (event) => {
        const selectedValue = [];
        event.forEach(element => {
            selectedValue.push(element.value);
        });
        props.selectedData(selectedValue);
    }

    return (
        <Select options={props.option} isMulti='true' onChange={handleChange}  />
    )
}

export default FormDropdown;
