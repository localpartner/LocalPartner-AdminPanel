import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {showDiscountDailogBox,hideDiscountDailogBox,addDiscount,setDiscount,setDiscountData,setEditIndex,saveProduct,cancelSaveProduct} from '../../actions/productConfigActions'
import { updateProduct } from '../apiAdmin';
import Table from "react-bootstrap/Table"
import {formatDate,formatDateYYYMMDD} from '../../utils'

import {ModalDialog} from './ModalDialog'
const DiscountTable = (args) =>{

    let discounts = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.discount})
    discounts = discounts==undefined ? [] : discounts; 

    const dispatch = useDispatch();
    const openDiscountBox = ()=>{
        dispatch(showDiscountDailogBox())
        dispatch(setDiscountData({}))

    }
    const deleteDiscount = (index) =>{
        let array = [...discounts]
        array.splice(index,1)
        dispatch(setDiscount(array))

    }
    const editDiscount = (index) =>{
        dispatch(setEditIndex(index))        
        let array = [...discounts]        
        dispatch(setDiscountData(array[index]))
        dispatch(showDiscountDailogBox())

    }
    return (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>
                    <h5><b>Quanity</b></h5>
                </th>
                <th>
                    <h5><b>Discount (%)</b></h5>
                </th>
                <th>
                    <h5><b>Start Date</b></h5>
                </th>  
                <th>
                    <h5><b>End Date</b></h5>
                </th>  
                <th>                  
                </th>             
            </tr>
        </thead>
        <tbody>
            {args.tableData.map((item, index) => {
              
                return (
                   
                        <tr key={index}>
                            <td>{item.quantity}</td>
                            <td>{item.discount}</td>
                            <td>{formatDate(item.startDate)}</td>
                            <td>{formatDate(item.endDate)}</td>
                            <td>
                                <button className="btn btn-info" onClick={()=>editDiscount(index)} >
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-outline btn-danger" onClick={()=>deleteDiscount(index)} >
                                    <i className="fa fa-trash-o"></i>
                                </button>
                               
                            </td>                         
                        </tr>
                 
                )
            })}
            <tr>
                <td colSpan={4}></td>
                <td>
                    <div>
                        <button className="btn btn-info" onClick={openDiscountBox} ><i className="fa fa-plus"></i></button>
                    </div>
                </td>
            </tr>

        </tbody>
    </Table>);
}

const DiscountDialogForm = ()=>{


    let discountData = useSelector((state)=>{return state && state.product && state.product.discountData})
    discountData = discountData?  {...discountData,startDate:formatDateYYYMMDD(discountData.startDate),endDate:formatDateYYYMMDD(discountData.endDate)} : { }
    const [state, setState] = useState(discountData);
    const dispatch = useDispatch();
    const handleChange = e => {
        const { name, value } = e.target;
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
    };

    useEffect(() => {
        dispatch(setDiscountData(state))
    }, [state]);

   

    return (
        <div id="DiscountDialogForm" class="tab-pane active">
       
                <div class="row mb-3" >
                    <label for="quantity" class="col-sm-3 col-form-label"><h6><b>Quanity</b><span style={{ color: "red" }}>*</span></h6></label>
                    <div class="col-sm-6">
                        <input type="number" value={state.quantity} onChange={handleChange} name="quantity" class="form-control" id="quantity" />
                    </div>
                </div>

                <div class="row mb-3" style={{paddingTop:'20px'}}>
                    <label for="discount" class="col-sm-3 col-form-label"><h6><b>Discount (%)</b><span style={{ color: "red" }}>*</span></h6></label>
                    <div class="col-sm-6">
                        <input type="number" value={state.discount} onChange={handleChange} name="discount"  class="form-control" id="discount" />
                    </div>
                </div>

                
                <div class="row mb-3" style={{paddingTop:'20px'}}>                   
                    <label for="startDate" class="col-sm-3 col-form-label"><h6><b>Start Date</b><span style={{ color: "red" }}>*</span></h6></label>
                    <div class="col-sm-6">
                        <input type="date" value={state.startDate} onChange={handleChange} name="startDate"  class="form-control" id="startDate" />
                    </div>
                </div>

                <div class="row mb-3" style={{paddingTop:'20px'}}>                   
                    <label for="endDate" class="col-sm-3 col-form-label"><h6><b>End Date</b><span style={{ color: "red" }}>*</span></h6></label>
                    <div class="col-sm-6">
                        <input type="date" value={state.endDate} onChange={handleChange} name="endDate"  class="form-control" id="endDate" />
                    </div>
                </div>                            
        </div>
    )

}
const DiscountModalDialog = (args)=>{    
    const discountData = useSelector((state)=>{return state && state.product && state.product.discountData})
    let options = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.discount})
    const editIndex = useSelector((state)=>{return state && state.product && state.product.editIndex})
    const dispatch = useDispatch();

    const onSave =()=>{
        
        let data = discountData ? discountData : []
        if(editIndex<0){
            dispatch(addDiscount(data))
        }else{

            let array = [...options]
            array.splice(editIndex,1,data)       
           
            dispatch(setDiscount(array))      
            dispatch(setEditIndex(-1))            

        }
        
    }
    return (
        <ModalDialog isOpen={args.isOpen} onSaveAction={onSave} onCloseAction={hideDiscountDailogBox} title="Add Discount" component={DiscountDialogForm} />
    );
}


export const DiscountPage = (props) => {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state)=>{return state && state.product && state.product.discountDialogBox})
    const discountData = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.discount})
    const clickSubmit = ()=>{
        //dispatch(setProductGeneralData(state))
        dispatch(saveProduct(true))
    }

    const clickCancel = ()=>{
        dispatch(cancelSaveProduct(true)) 
    }
   
   
    return (        
        <div id="discountPage" class="tab-pane active">
            <DiscountTable tableData={discountData}/>
            <DiscountModalDialog isOpen={isDialogOpen}></DiscountModalDialog>
            <div className="row form-group">
                <div className="col-lg-12 float-right ">
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                    
                </div>
            </div>
        </div>

    )
}
