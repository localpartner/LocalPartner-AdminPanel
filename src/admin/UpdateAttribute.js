import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect, useParams } from 'react-router-dom';
import { getAttribute, updateAttribute } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateAttribute = ({ match }) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"))

    const [inputList, setInputList] = useState([]);
    const value = [];
    console.log(inputList, "inputList")
    inputList.map(function (obj) {

        value.push(obj)

    });
    const [values, setValues] = useState({
        manufacturerName: '',
        description: '',
        dimension: '',
        value: '',
        errorsAttributeName: '',
        errorsAttributeValue: '',
        errorsAttributeDescription: '',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });
    const params = useParams();
    const name = params.attributeId


    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { attributeName, description, error, success, redirectToProfile, att_value } = values;

    const init = attributeId => {
        getAttribute(attributeId, accessToken).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    attributeName: data.data.result.name,
                    dimension: data.data.result.value,
                    description: data.data.result.description
                });


                setInputList(data.data.result.value);
            }
        });
    };


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);

        setValues({ ...values, dimension: list });
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, '']);
    };
    //end multiple

    useEffect(() => {
        init(match.params.attributeId);
    }, []);


    const handleChange_des = description => event => {
        setValues({ ...values, error: false, [description]: event.target.value });
    };

    const submitAttributeForm = e => {
        e.preventDefault();
        const attribute = {
            value: value,
            description: description
        };
        updateAttribute(params.attributeId, attribute, accessToken).then(data => {
            if (data.errors ) {
                setValues({
                    ...values,
                    errorsAttributeName: data.errors.name,
                    errorsAttributeValue: data.errors.value,
                    errorsAttributeDescription: "Description is required"
                });
                // NotificationManager.error(data.message);
                toast.error('Please try again!', {
                    autoClose: 600
                })
            }
            else {
                setValues({
                    ...values,
                    dimension: '',
                    description: '',
                    errorsAttributeName: '',
                    errorsAttributeValue: '',
                    errorsAttributeDescription: '',
                    error: false,
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

                // NotificationManager.success('Attribute has been updated successfully!','',2000);
                // setTimeout(function(){
                //     setValues({
                //         ...values,
                //         redirectToProfile:true
                //     })
                // },2000)
            }
        });
    };


    const updateAttributeForm = () => (
        <div className="">

            <div className="form-group col-sm-7">
                <h6><b><span style={{ color: 'red' }}>*</span> Attribute Name</b></h6>
                <input type="text" placeholder='Enter Attribute' className="form-control" value={attributeName} />
                <span className='error text-danger'>{values.errorsAttributeName}</span>
            </div>
            <div className="form-group col-sm-7">
                <h6><b> Attribute value</b></h6>

            </div>
            {inputList.map((x, i) => {
                console.log(x, "xxx")
                return (
                    <>
                        <div className="form-group">
                            <div className='col-lg-7'>
                                <input
                                    type="text" className="form-control"
                                    name="att_value"
                                    placeholder='Enter Value'
                                    value={x}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>
                            <div className='form-group col-lg-1'>
                                {inputList.length !== 1 && <button
                                    className="btn btn-danger "
                                    onClick={() => handleRemoveClick(i)}><i className='fa fa-minus '></i></button>}
                                {inputList.length - 1 === i && <button className="btn btn-info" onClick={handleAddClick}><i className='fa fa-plus'></i></button>}
                            </div>
                        </div>
                    </>

                );
            })}

            <div className="form-group col-sm-7">
                <h6><b>Attribute Description</b></h6>
                <textarea onChange={handleChange_des('description')} rows="4" className="form-control" placeholder='Description' value={description} description="description" />
                <span className='error text-danger'>{values.errorsAttributeDescription}</span>

            </div>
            <div className="form-group col-md-7">
                <button onClick={submitAttributeForm} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}>Update</button>
            </div>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Attribute  update successfully </a>
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
                return <Redirect to="/admin/attribute" />;
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
                        <div className='col-md-8'><h3 className="font-bold"> Edit Attribute</h3></div>
                        <div className='col-md-4'><Link to={`/admin/attribute`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                    <ToastContainer />
                                    {/* <NotificationContainer/> */}
                                    {/* {showSuccess()} */}
                                    {showError()}
                                    {updateAttributeForm()}
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

export default UpdateAttribute;
