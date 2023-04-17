import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {showSpecialDailogBox,hideSpecialDailogBox,addSpecial,setSpecial,setSpecialData,setEditIndex,saveProduct,cancelSaveProduct} from '../../actions/productConfigActions'
import { updateProduct } from '../apiAdmin';
import Table from "react-bootstrap/Table"
import {formatDate,formatDateYYYMMDD} from '../../utils'



import {ModalDialog} from './ModalDialog'
const SpecialTable = (args) =>{

    let specials = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.specials  })
    specials = specials==undefined ? [] : specials; 

    const dispatch = useDispatch();
    const openSpecialBox = ()=>{
        dispatch(showSpecialDailogBox())
        dispatch(setSpecialData({}))

    }
    const deleteSpecial = (index) =>{
        let array = [...specials]
        array.splice(index,1)
        dispatch(setSpecial(array))

    }
    const editSpecial = (index) =>{
        dispatch(setEditIndex(index))        
        let array = [...specials]        
        dispatch(setSpecialData(array[index]))
        dispatch(showSpecialDailogBox())

    }
    
    return (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
               
                <th>
                    <h5><b>Price</b></h5>
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
                            <td>{item.price}</td>
                            <td>{formatDate(item.startDate)}</td>
                            <td>{formatDate(item.endDate)}</td>
                            <td>
                                <button className="btn btn-info" onClick={()=>editSpecial(index)} >
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-outline btn-danger" onClick={()=>deleteSpecial(index)} >
                                    <i className="fa fa-trash-o"></i>
                                </button>
                               
                            </td>                         
                        </tr>
                 
                )
            })}
            <tr>
                <td colSpan={3}></td>
                <td>
                    <div>
                        <button className="btn btn-info" onClick={openSpecialBox} ><i className="fa fa-plus"></i></button>
                    </div>
                </td>
            </tr>

        </tbody>
    </Table>);
}

const SpecialDialogForm = ()=>{


    let specialData = useSelector((state)=>{return state && state.product && state.product.specialData})
    specialData = specialData? {...specialData,startDate:formatDateYYYMMDD(specialData.startDate),endDate:formatDateYYYMMDD(specialData.endDate)} : { }
    const [state, setState] = useState(specialData);
    const dispatch = useDispatch();
    const handleChange = e => {
        const { name, value } = e.target;
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
    };

    useEffect(() => {
        dispatch(setSpecialData(state))
    }, [state]);

   

   

    return (
        <div id="DiscountDialogForm" class="tab-pane active">
       

                <div class="row mb-3" >
                    <label for="quantity" class="col-sm-3 col-form-label"><h6><b>Price</b><span style={{ color: "red" }}>*</span></h6></label>
                    <div class="col-sm-6">
                        <input type="number" value={state.price} onChange={handleChange} name="price" class="form-control" id="quantity" />
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
const SpecialModalDialog = (args)=>{    
    const specialData = useSelector((state)=>{return state && state.product && state.product.specialData})
    let options = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.specials})
    const editIndex = useSelector((state)=>{return state && state.product && state.product.editIndex})
    const dispatch = useDispatch();

    const onSave =()=>{
        
        let data = specialData ? specialData : []
        if(editIndex<0){
            dispatch(addSpecial(data))
        }else{

            let array = [...options]
            array.splice(editIndex,1,data)       
           
            dispatch(setSpecial(array))      
            dispatch(setEditIndex(-1))            

        }
        
    }
    return (
        <ModalDialog isOpen={args.isOpen} onSaveAction={onSave} onCloseAction={hideSpecialDailogBox} title="Add Discount" component={SpecialDialogForm} />
    );
}


export const SpecialPage = (props) => {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state)=>{return state && state.product && state.product.specialDialogBox})
    const specialData = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.specials})
    const clickSubmit = ()=>{
        //dispatch(setProductGeneralData(state))
        dispatch(saveProduct(true))
    }

    const clickCancel = ()=>{
        dispatch(cancelSaveProduct(true))        
    }

   
    return (        
        <div id="discountPage" class="tab-pane active">
            <SpecialTable tableData={specialData}/>
            <SpecialModalDialog isOpen={isDialogOpen}></SpecialModalDialog>
            <div className="row form-group">
                <div className="col-lg-12 float-right ">
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                    
                </div>
            </div>
        </div>

    )
}
