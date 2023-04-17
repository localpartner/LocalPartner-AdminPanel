import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import AdminLayout from "../../core/AdminLayout";
import { Navbar } from "./Navbar";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAttributes,specifications } from "../../actions";

import {showSpecificationDailogBox,hideSpecificationDailogBox,addSpecification,setSpecificationData,setSpecification,setEditIndex,cancelSaveProduct,saveProduct,} from '../../actions/productConfigActions'
import { updateProduct,getAttributeByCode } from '../apiAdmin';
import Table from "react-bootstrap/Table"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles"

import {ModalDialog} from './ModalDialog'
const SpecificationTable = (args) =>{
    const dispatch = useDispatch();
    let specifications = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.specifications  })
    specifications = specifications==undefined ? [] : specifications; 
    let specificationsList = useSelector((state)=>{return state && state.product && state.product.specifications})
    specificationsList = specificationsList==undefined ? [] : specificationsList; 
    // let categoryList = useSelector((state)=>{return state && state.product && state.product.category})
    const map = {};

    if(args.tableData){
        args.tableData.forEach((item)=>{
            let spec= specificationsList.find((s)=>{
                return s.code ==item.code
            })
            if(spec){
                map[spec.code]=spec; 
            }
            
        })
    }

    const openSpecificationBox = ()=>{
        dispatch(showSpecificationDailogBox())
        dispatch(setSpecificationData({}))
        //dispatch(setEditIndex(-1))        

    }
    const deleteSpecification = (index) =>{
        let array = [...specifications]
        array.splice(index,1)
        dispatch(setSpecification(array))

    }
    const editSpecification = (index) =>{
        dispatch(setEditIndex(index))        
        let array = [...specifications]        
        dispatch(setSpecificationData(array[index]))
        dispatch(showSpecificationDailogBox())

    }
    return (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>
                    <h5><b>Group</b></h5>
                </th>
                <th>
                    <h5><b>Name</b></h5>
                </th>
                <th>
                    <h5><b>Value</b></h5>
                </th>   
                <th>                  
                </th>             
            </tr>
        </thead>
        <tbody>
            {args.tableData.map((item, index) => {
              console.log("kk",args)
                return (
                   
                        <tr>
                            <td>{map[item.code] ? map[item.code].specificationGroup:''}</td>
                            <td>{map[item.code] ? map[item.code].name:''}</td>
                            <td>{item.value}</td>
                            <td>
                                <button className="btn btn-info" onClick={()=>editSpecification(index)} >
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-outline btn-danger" onClick={()=>deleteSpecification(index)} >
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
                        <button className="btn btn-info" onClick={openSpecificationBox} ><i className="fa fa-plus"></i></button>
                    </div>
                </td>
            </tr>

        </tbody>
    </Table>);
}

const SpecificationDialogForm =  ()=>{
    let specificationData = useSelector((state)=>{return state && state.product && state.product.specificationData})
    specificationData = specificationData? {...specificationData} : { }

    
   
    const dispatch = useDispatch();
    const [specificationState,setSpecificationState] = useState(specificationData); 
    const [selectedSpec,setSelectedSpec] = useState(); 
    const [attributeList,setAttributeList] = useState(); 
    let specifications = useSelector((state)=>{return state && state.product && state.product.specifications})
    const handleChange = e => {
        const { name, value } = e.target;
     
        setSpecificationState(prevState => ({
            ...prevState,
            [name]: value
        }));
       
    };
    const selectSpecification = async (e) => {
        const { name, value } = e.target;
     
        setSpecificationState(prevState => ({
            ...prevState,
            [name]: value
        }));
        let spec = specifications.find((s)=>s.code==value)    
        if(spec && spec.type=="attribute"){
            let attr = await getAttributeByCode(spec.attributeCode)
            setAttributeList(attr.data.result)
        }   
        setSelectedSpec(spec)
        setSpecificationState(prevState => ({
            ...prevState,
            value: ''
        }));
       
    };

    const selectAttribute = async (e) => {
        const { name, value } = e.target;
        setSpecificationState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(async()=>{
       
        if(specificationData){
            let spec = specifications.find((s)=>s.code==specificationData.code)    
            if(spec && spec.type=="attribute"){
                let attr = await getAttributeByCode(spec.attributeCode)
                setAttributeList(attr.data.result)
            }   
            setSelectedSpec(spec)

        }

       
      

    },[specificationData.code])

    
  

    useEffect(async () => {
        dispatch(setSpecificationData(specificationState))
        
    }, [specificationState]);
    
    return (
        <div id="SpecificationDialogForm" class="tab-pane active">
       
                <div class="row mb-3" >
                    <label for="specification" class="col-sm-3 col-form-label"><h6><b>Specification</b><span style={{ color: "red" }}>*</span></h6></label>
                    <div class="col-sm-6">
                        <select value={specificationState.code} className=' form-control border-0 p-0' onChange={async (e) => selectSpecification(e)} id="specification" name="code" >
                            <option> Select Type</option>
                            {specifications.map((spec) => {
                                return (
                                    <option value={spec.code}>{spec.name}</option>
                                )
                            })
                            }
                        </select>
                        {selectedSpec && <span style={{marginTop:"5px"}}>
                            <small class="display-6">{selectedSpec.description}</small>
                        </span>}

                    </div>
                </div>
                

                {selectedSpec && selectedSpec.type=='attribute' && attributeList && attributeList.value && 
                <div class="row mb-3" style={{paddingTop:'20px'}}>
                    <label for="attribute" class="col-sm-3 col-form-label"><h6><b>Specification Value</b><span style={{ color: "red" }}>*</span></h6></label>
                    <div class="col-sm-6">
                        <select value={specificationState.value} className=' form-control border-0 p-0' onChange={async (e) => selectAttribute(e)} id="attribute" name="value" >
                            <option> Select Value</option>
                            {attributeList.value.map((spec) => {
                                return (
                                    <option value={spec}>{spec}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                </div>}

                
                {selectedSpec && selectedSpec.type=='text' && <div class="row mb-3" style={{paddingTop:'20px'}}>                   
                    <label for="value-text" class="col-sm-3 col-form-label"><h6><b>Specification Value</b><span style={{ color: "red" }}>*</span></h6></label>
                    <div class="col-sm-8">
                        <textarea value={specificationState.value} rows="4" onChange={async (e) => handleChange(e)} id="value-text" name="value" class="form-control"  />
                    </div>
                </div>}

                                
        </div>
    )

}
const SpecificationModalDialog = (args)=>{    
    const specificationData = useSelector((state)=>{return state && state.product && state.product.specificationData})
    let specificationList = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.specifications})
    const editIndex = useSelector((state)=>{return state && state.product && state.product.editIndex})
    const dispatch = useDispatch();
    const saveSpecification = ()=>{

        let data = specificationData ? specificationData : []
        if(editIndex<0){
            let obj = {...data}
            // if(obj.type=="text"){
            //     obj.value = obj.valueText;
            // }
            dispatch(addSpecification(obj))
        }else{

            let array = [...specificationList]
            array.splice(editIndex,1,data)       
           
            dispatch(setSpecification(array))      
            dispatch(setEditIndex(-1))        

        }
    }
    const cancelSpecification = ()=>{
        dispatch(setEditIndex(-1))
    }
    return (
        <ModalDialog isOpen={args.isOpen} onSaveAction={saveSpecification} onCloseAction={hideSpecificationDailogBox} title="Specification Dialog" component={SpecificationDialogForm} />
    );

}

export const SpecificationPage = (props) => {
    
    const isDialogOpen = useSelector((state)=>{return state && state.product && state.product.specificationDialogBox})
    let specifications = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.specifications})
    const dispatch = useDispatch();
    
    
    const clickSubmit = ()=>{
        //dispatch(setProductGeneralData(state))
        dispatch(saveProduct(true))
    }

    const clickCancel = ()=>{
        // dispatch(cancelSaveProduct(false))  
        SpecificationTable("")      
    }

    return (        
        <div id="stock" class="tab-pane active">
            <SpecificationTable tableData={specifications}/>
            <SpecificationModalDialog isOpen={isDialogOpen}></SpecificationModalDialog>
            <div className="row form-group">
                <div className="col-lg-12 float-right ">
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                    
                </div>
            </div>
        </div>

    )
}
