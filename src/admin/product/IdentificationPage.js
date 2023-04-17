import React, { useState, useEffect } from 'react';

import {useSelector, useDispatch} from 'react-redux'
import {setProductIdentificationData,saveProduct,cancelSaveProduct} from '../../actions/productConfigActions'
import Table from "react-bootstrap/Table"
import {ModalDialog} from './ModalDialog'
import {formatDate,formatDateYYYMMDD} from '../../utils'
import { Link } from 'react-router-dom';


export const IdentificationPage = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    
    const [identificationState, setIdentificationState] = useState({...props.productData.identification});    
    const dispatch = useDispatch();
    let previousTab = useSelector((state)=>{return state && state.product && state.product.previousTab});
    
   
    const handleChange = e => {
        const { name, value } = e.target;
     
        setIdentificationState(prevState => ({
            ...prevState,
            [name]: value
        }));
       
    };

    useEffect(()=>{
        if(previousTab==3)
            dispatch(setProductIdentificationData(identificationState))
    },[previousTab])

  
    const clickSubmit = ()=>{
        dispatch(setProductIdentificationData(identificationState))
        dispatch(saveProduct(true))
    }

    const clickCancel = ()=>{
     dispatch(cancelSaveProduct(true))    
    }
   
    return (

       
        <div id="identification" class="tab-pane active">

        <div class="row g-3" style={{'paddingTop': '20Px'}} >
           
           
            <div class="col-md-4">
                <label for="sku" class="form-label"><h6><b>SKU</b></h6></label>
                <input type="text" value={identificationState.sku} onChange={handleChange} name="sku" class="form-control" id="sku" />
            </div>
            <div class="col-md-4">
                <label for="upc" class="form-label"><h6><b>UPC</b></h6></label>
                <input type="text" value={identificationState.upc} onChange={handleChange} name="upc" class="form-control" id="upc" />
            </div>
            <div class="col-md-4">
                <label for="ean" class="form-label"><h6><b>EAN</b></h6></label>
                <input type="text" value={identificationState.ean} onChange={handleChange} name="ean" class="form-control" id="ean" />
            </div>
            <div class="col-md-4">
                <label for="jan" class="form-label"><h6><b>JAN</b></h6></label>
                <input type="text" value={identificationState.jan} onChange={handleChange} name="jan" class="form-control" id="jan" />
            </div>
            <div class="col-md-4">
                <label for="isbn" class="form-label"><h6><b>ISBN</b></h6></label>
                <input type="text" value={identificationState.isbn} onChange={handleChange} name="isbn"class="form-control" id="isbn" />
            </div>
            <div class="col-md-4">
                <label for="mpn" class="form-label"><h6><b>MPN</b></h6></label>
                <input type="text" value={identificationState.mpn} onChange={handleChange} name="mpn" class="form-control" id="mpn" />
            </div>
            
        </div>
        <div className="row form-group" style={{"marginTop":"20px"}}>
                <div className="col-lg-12 float-right ">
                {/* <button className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" , backgroundColor:'#e74a25' , border: '2px solid #e74a25'}}><a href="/admin/productlist">Cancel</a></button> */}
                <button onClick={clickCancel} className="btn btn-danger btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel</button>
                <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                    
                </div>
        </div>
       
    </div>
    )




}

