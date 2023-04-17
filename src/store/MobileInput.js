import React, { useState ,useEffect} from 'react';

const MobileInput = (props) =>{

    const [value,setValue] = useState()
    
    useEffect( () =>{
     !props.value ? setValue('') : setValue(props.value);
     setValue(props.value)
    },[props.value])

    return(
            <div className={`form-group col-md-6 ${props.name}`} id={`${props.name}`} >
                <label className="col-md-12 lable">{props.label}<span className='text-danger'>*</span></label>
                <div className="col-md-12">
                    <input type={props.type} 
                    className="form-control" 
                    value={value}
                    maxLength="10"
                    placeholder={props.placeholder} 
                    onChange = {props.onChange}
                    autoComplete='new-password'
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    />
                   <span className='error text-danger'>{props.errorSpan}</span> 
                </div>
            </div>
    )
}   

export default MobileInput;