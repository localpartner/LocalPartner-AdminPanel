import React, { useState, useEffect } from 'react'
import AdminHeader from '../user/AdminHeader'
import AdminSidebar from '../user/AdminSidebar'
import { CreateSubCategory, getCategoryBycode } from './apiAdmin';
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

export const CreateSubCategoy = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const params = useParams();
    const codes = localStorage.getItem("code");
    const [values, setValues] = useState({


        name: '',
        errorName: '',
        code: "",
        errorCode: '',
        description: '',
        errorDescriptiom: '',

        error: '',
        success: false,
        redirectToProfile: false

    }

    );

    const { name, description, code, redirectToProfile } = values;


    const handleChange = (name) => (event) => {
        setValues({
            ...values, [name]: event.target.value,
            errorName: ''

        });
    };
    const handleChangeCode = (code) => (event) => {
        setValues({
            ...values, [code]: event.target.value,
            errorCode: ''

        });
    };
    const handleChangeDescription = (description) => (event) => {
        setValues({
            ...values, [description]: event.target.value,
            errorDescriptiom: ''

        });
    };


    const redirectUser = () => {
        if (redirectToProfile) {
            return <Redirect to={`/admin/category/subupdate/${params.categoryId}`} />;
        }
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        CreateSubCategory(codes, { name, description, code }, accessToken).then(data => {
console.log(data)
            if (data.status == false) {
                setValues({
                    ...values,
                    errorName: data.errors.name,
                    errorCode: data.errors.code,
                    errorDescriptiom: "Descriptionis required"
                });

                toast.error('Please try again!', {
                    autoClose: 600
                })
            }
            else {
                setValues({
                    ...values,
                    name: '',
                    code: "",
                    errorName: '',
                    errorCode: "",
                    errorDescriptiom: '',
                    description: '',
                    error: '',
                    success: true,
                    redirectToProfile: false
                });
                toast.success('Added successfully!', {
                    autoClose: 600,
                    onClose: () => {
                        setValues({
                            ...values,
                            redirectToProfile: true
                        })
                    }
                })

            }
        });

    }
    return (
        <>

            <div id="wrapper">
                <AdminHeader />
                <AdminSidebar />

                <div className="page-wrapper">
                    <div className="container-fluid">


                        <div className='row'>
                            <div className='col-md-8'><h4 className="font-bold"> Add SubCategory</h4></div>
                            <div className='col-md-4'><Link to={`/admin/category/subupdate/${params.categoryId}`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={clickSubmit} >
                                        <ToastContainer />

                                        {/* {showError()} */}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding: '20px' }}>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Category Name</b></h6>
                                                <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter name' value={name} />
                                                <span className='error text-danger'>{values.errorName}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Code </b></h6>
                                                <input onChange={handleChangeCode('code')} type="text" className="form-control" placeholder='Enter name' value={code} />
                                                <span className='error text-danger'>{values.errorCode}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b>Category Description</b></h6>
                                                <textarea onChange={handleChangeDescription('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                                <span className='error text-danger'>{values.errorDescriptiom}</span>
                                            </div>
                                            <div className="col-lg-7">
                                                <button className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}> Submit </button>
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
