import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createTax } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTax = () =>{

const [inputList, setInputList] = useState([{ specification: "" }]);
    
const [values, setValues] = useState({
        taxName: '',
        taxValue:'',
        taxDescription: '',
        errorsTaxName:'',
        errorsTaxvalue:'',
        error: '',
        success: false,
        redirectToProfile: false
    });

const { taxName,taxValue, taxDescription, success, error, redirectToProfile } = values;

const handleChange = taxName => event => {
    setValues({ ...values, error: false, [taxName]: event.target.value, errorsTaxName:'' });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createTax({ taxName, taxValue, taxDescription}).then(data => {
        // if (data.error) {
        //     setValues({ ...values, error: data.error, success: false });
        // } 
        if (data.status === false) {
            setValues({
              ...values,
              errorsTaxName: data.errors.TaxName
            });
           // NotificationManager.error(data.message);
          } 
        else {
            setValues({
                ...values,
                taxName: '',
                taxValue:'',
                taxDescription: '',
                errorsTaxName: '',
                error: '',
                success: true,
                redirectToProfile: false
            });
            toast.success('Added successfully!', {
                autoClose:600,
                onClose: () => {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }
            })
        }
    });
};
const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to="/admin/tax" />;
     }  
};
return(
        <>
            <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                <div className='row'>
                        <div className='col-md-8'><h3 className="font-bold"> Add Tax</h3></div>
                        <div className='col-md-4'><Link to={`/admin/tax`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        <ToastContainer />
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>
                                            <div className="form-group col-sm-7"> 
                                                <h6><b><span style={{color:'red'}}>*</span> Tax Name</b></h6>
                                                <input onChange={handleChange('taxName')} type="text" className="form-control" placeholder='Enter Attribute' value={taxName} />
                                                <span className='error text-danger'>{values.errorsTaxName}</span>
                                            </div>
                                            <div className="form-group col-sm-7"> 
                                                <h6><b><span style={{color:'red'}}>*</span> Tax Percentage (Without % Symbol)</b></h6>
                                                <input onChange={handleChange('taxValue')} type="text" className="form-control" placeholder='Enter Value' value={taxValue} />
                                                <span className='error text-danger'>{values.errorsTaxValue}</span>
                                            </div>
                                            <div className="form-group col-sm-7">
                                                <h6><b> Tax Description</b></h6>
                                                <textarea onChange={handleChange('taxDescription')} rows="4" type="text" className="form-control" placeholder='Description' value={taxDescription}></textarea>
                                            </div>
                                            <div className="form-group col-md-7">
                                            <button onClick={clickSubmit} className="btn btn-info btn-md"  style={{float: 'right', borderRadius:'7px'}}> Submit </button>
                                            </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </>

    )

}


export default AddTax;

