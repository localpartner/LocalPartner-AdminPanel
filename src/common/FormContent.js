import React from 'react';

const FormContent = (props) =>{
    return(
        <>
            <div className="form-group col-md-6">
                <label className="col-md-12">{props.lable}</label>
                <div className="col-md-12">
                    <input type="text" className="form-control" placeholder={props.palceholder} />
                </div>
            </div>
        </>
    )
}   

export default FormContent;