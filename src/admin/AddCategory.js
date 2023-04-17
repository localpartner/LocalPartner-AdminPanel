
import React, { useState, useEffect } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createCategory, getCategories } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
//import {NotificationContainer, NotificationManager} from 'react-notifications';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddManufacturer = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    const [values, setValues] = useState({
        name: '',
        code: "",
        description: '',
        errorName: "",
        errorCode: '',
        errorDescription: '',
        // categories: [],
        // subcategory: '',
        // navigation: '',
        // navigation_image: '',
        error: '',
        success: false,
        redirectToProfile: false
    });
    /*     */
    const [isParent, setIsParent] = useState(true)

    const { name, success, description, categories, code, subcategory, navigation, navigation_image, error, redirectToProfile } = values;


    useEffect(() => {
        init();
        // getDataById();
        setValues({
            ...values,
            formData: new FormData(),
        });
    }, []);
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
                errorDescription: ''

            });
        };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        createCategory({ name, description, code, subcategory, navigation, navigation_image }, accessToken).then(data => {
            console.log("data", data)
            if(data !==undefined){

            if (data.status == false || data.message == "Invalid Request"|| data.status == 401 ) {
                setValues({
                    ...values,
                    errorName: data.errors.name,
                    errorCode: data.errors.code,
                    errorDescription: "Description Is Required"
                });

                toast.error('Please try again!', {
                    autoClose: 600
                })
            }
            else {
                setValues({
                    ...values,
                    name: '',
                    errorName: '',
                    description: '',
                    errorDescription: '',
                    code: '',
                    errorCode: '',



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
        }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Category add successfully </a>
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            return <Redirect to="/admin/category" />;
        }
    };


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                });
            }
        });
    };




    return (
        <>
            <div id="wrapper">
                <AdminHeader />
                <AdminSidebar />
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><h4 className="font-bold"> Add Category</h4></div>
                            <div className='col-md-4'><Link to={`/admin/category`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={clickSubmit} >
                                        <ToastContainer />
                                        {/* <NotificationContainer/> */}
                                        {/* {showSuccess()} */}

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
                                            {/* <div className="form-group col-lg-7">
                                                 <h6><b>Select Parent Category </b></h6>
                                                <select onChange={handleChange('subcategory')} className="form-control" >
                                                    <option>Please select</option>
                                                     {categories &&
                                                        categories.map((c, i) => (
                                                            <>
                                                            {c.subcategory == '' && !c.deletedAt ?(
                                                                <option key={i} value={c._id}>
                                                                {c.name}
                                                            </option>
                                                            ):null}
                                                           </>
                                                        ))
                                                       } 
                                                </select>
                                            </div> */}

                                            {/* {isParent? (
                                                <>
                                                <div id="navigation_id" className="form-group col-lg-7">
                                                <h6><b>Top navigation </b></h6>
                                                <input onChange={handleChange('navigation')} name="navigation" type="checkbox" className="" value={navigation} style={{width: '32px', height:'30px'}} /> 
                                                </div>
                                                    <div id="navigation_id" className="form-group col-lg-7">
                                                        <h6><b>Top navigation image</b></h6>
                                                        <input onChange={handleChange('navigation_image')} name="navigation_image" type="file" className="" value={navigation_image} />


                                                        
                                                    </div>
                                                   
                                                </>
                                            ):null} */}


                                            <div className="form-group col-lg-7">
                                                <h6><b>Category Description</b></h6>
                                                <textarea onChange={handleChangeDescription('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                                <span className='error text-danger'>{values.errorDescription}</span>

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


export default AddManufacturer;

