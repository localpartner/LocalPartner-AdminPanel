import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getSpecification, updatespecification } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";

//import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Updatespecification = ({ match }) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"))

    const code = localStorage.getItem("code");
    const [values, setValues] = useState({

        name: '',
        code: '',
        description: '',
        type: '',
        specificationGroup: '',

        specificationGroup: '',
        errorsSpecificationName: '',
        errorCode: '',
        errorDescription: '',
        errorType: '',
        description: '',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });



    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { manufacturerName, type, description, success, error, redirectToProfile, specificationGroup } = values;

    const init = productId => {
        getSpecification(code, accessToken).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    manufacturerName: data.data.result.name,
                    description: data.data.result.description,
                    specificationGroup: data.data.result.specificationGroup,
                    type: data.data.result.type
                });

            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = manufacturerName => event => {
        setValues({ ...values, error: false, [manufacturerName]: event.target.value, errorDescription: '', errorsSpecificationName: '', errorCode: '', errorGroup: '', errorType: '' });
    };




    const submitCategoryForm = e => {
        e.preventDefault();
        const category = {
            name: manufacturerName,
            description: description,

            type: type,
            specificationGroup: specificationGroup,
        };
        updatespecification(code, category, accessToken).then(data => {
            if (data.errors ) {
                setValues({
                    ...values,
                    errorsSpecificationName: data.errors.name,
                    errorDescription: "Description is Required",
                    errorCode: data.errors.code,
                    errorType: data.errors.type,
                    errorGroup: "Specification Group is Required",
                });
                toast.error("Please try again")
            }
            else {
                setValues({
                    ...values,
                    manufacturerName: '',
                    description: '',
                    errorsSpecificationName: '',
                    errorDescription: '',
                    errorType: '',
                    errorCode: '',
                    errorGroup: '',
                    error: false,
                    success: true,
                    redirectToProfile: false
                });
                toast.success('Updated successfully!', {
                    autoClose: 500,
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

    const updateCategoryForm = () => (
        <div className="">
            <form className="col-lg-6 offset-md-4" onSubmit={submitCategoryForm}>
                <div className="form-group">
                    <h6><b><span style={{ color: 'red' }}>*</span> Specification Name</b></h6>
                    <input onChange={handleChange('manufacturerName')} type="text" className="form-control" value={manufacturerName} manufacturerName="manufacturerName" />
                    <span className='error text-danger'>{values.errorsSpecificationName}</span>
                </div>
                <div className="form-group">
                    <h6><b><span style={{ color: 'red' }}>*</span> Specification Type</b></h6>
                    <select className="form-control border-0 p-0" value={type} onChange={handleChange('type')}>
                        <option > select tag</option>

                        <option > text</option>
                        <option> attribute</option>
                    </select>
                    <span className='error text-danger'>{values.errorType}</span>
                </div>


                <div className="form-group">
                    <h6><b> <span style={{ color: 'red' }}>*</span>specification Group</b></h6>
                    <input type="text" className="form-control" onChange={handleChange('specificationGroup')} placeholder="Enter values" value={specificationGroup} />
                    <span className='error text-danger'>{values.errorGroup}</span>

                </div>
                <div className="form-group">
                    <h6><b>  <span style={{ color: 'red' }}>*</span>Description</b></h6>
                    <textarea onChange={handleChange('description')} rows="4" className="form-control" value={description} description="description" />
                    <span className='error text-danger'>{values.errorDescription}</span>

                </div>
                <div className="form-group">
                    <button className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}>Update</button>
                </div>

            </form>
        </div>
    );
    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Specification updated successfully </a>
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
                return <Redirect to="/admin/SpecificationList" />;
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
                        <div className='col-md-8'><h3 className="font-bold"> Update Specification</h3></div>
                        <div className='col-md-4'><Link to={`/admin/SpecificationList`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                    {/*<NotificationContainer/>*/}
                                    {/* {showSuccess()} */}
                                    {showError()}
                                    {updateCategoryForm()}
                                    {redirectUser()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
};

export default Updatespecification;
