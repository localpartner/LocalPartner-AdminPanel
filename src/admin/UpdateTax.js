import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getTax, updateTax } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTax = ({ match }) => {

    const [values, setValues] = useState({
        taxName: '',
        taxDescription:'',
        taxValue:'',
        errorsTaxName:'',
        errorsTaxValue:'',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });

    const { taxName, taxValue, taxDescription, error, success, redirectToProfile } = values;

    const init = taxId => {
        getTax(taxId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    taxName: data.taxName,
                    taxValue:data.taxValue,
                    taxDescription: data.taxDescription
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.taxId);
    }, []);

    const handleChange = taxName => event => {
        setValues({ ...values, error: false, [taxName]: event.target.value, errorsTaxName:''});
    };

    const handleChange_des = taxDescription => event => {
        setValues({ ...values, error: false, [taxDescription]: event.target.value });
    };

    const submitTaxForm = e => {
        e.preventDefault();
        const tax = {
            taxName: taxName,
            taxValue:taxValue,
            taxDescription:taxDescription
        };
        updateTax(match.params.taxId,tax).then(data => {
            if (data.status == false) {
                setValues({
                  ...values,
                  errorsTaxName: data.errors.taxName,
                  errorsTaxValue:data.errors.taxValue,
                });
                toast.success('Please try again!', {
                    autoClose:600
                })
              } 
            else {
                setValues({
                    ...values,
                    taxName: data.taxName,
                    taxValue:data.taxValue,
                    taxDescription:data.taxDescription,
                    error: false,
                    success: true,
                    redirectToProfile: false
                });
                toast.success('Updated successfully!', {
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

    const updateTaxForm = () => (
        <div className="">
            <form className="mb-3" onSubmit={submitTaxForm}>
            <div className="form-group col-sm-7">
                <h6><b><span style={{color:'red'}}>*</span> Tax Name</b></h6>
                <input onChange={handleChange('taxName')} type="text" placeholder='Enter Name' className="form-control" value={taxName} taxName="taxName" />
                <span className='error text-danger'>{values.errorsTaxName}</span>
            </div>
            <div className="form-group col-sm-7">
                <h6><b><span style={{color:'red'}}>*</span> Tax Percentage (Without % Symbol)</b></h6>
                <input onChange={handleChange('taxValue')} type="text" placeholder='Enter Value' className="form-control" value={taxValue} taxValue="taxValue" />
            </div>
            <div className="form-group col-sm-7">
                <h6><b>Tax Description</b></h6>
                <textarea onChange={handleChange_des('taxDescription')} rows="4" className="form-control" placeholder='Description' value={taxDescription} taxDescription="taxDescription"  />
            </div>
            <div className="form-group col-md-7">
                <button className="btn btn-info btn-md"style={{float: 'right', borderRadius:'7px'}}>Update</button>
            </div>
        </form>
        </div>
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/tax" />;
            }
        }
    };

    return (
            <div className="row">
                 <AdminHeader />
                 <AdminSidebar />
                 <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><h3 className="font-bold"> Edit Tax</h3></div>
                            <div className='col-md-4'><Link to={`/admin/tax`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                            <ToastContainer />
                                            {showError()}
                                            {updateTaxForm()}
                                            {redirectUser()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    };

export default UpdateTax;
