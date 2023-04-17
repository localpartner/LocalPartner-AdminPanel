import React from 'react';
import Select from 'react-select'

const FormDropdown = (props) => {
   
    const handleChange = (event) => {
        props.selectedData(event.value);
    }

    return (
        <Select options={props.option} onChange={handleChange}  />
    )
}

export default FormDropdown;
