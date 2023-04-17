import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createAttribute } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddAttributenew() {
    const accessToken = JSON.parse(localStorage.getItem("jwt"))

    const [inputList, setInputList] = useState([{ att_value: "" }]);
    const value = [];
    inputList.map(function (obj) {

        value.push(obj.att_value)
    });



    const [values, setValues] = useState({
        name: '',
        errorsAttributeName: '',
        errorsAttributeValue: '',
        errorsAttributeDescription: '',
        value: '',
        description: '',
        error: '',
        success: false,
        redirectToProfile: false
    });

    const { name, description, success, error, dimension, redirectToProfile } = values;
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const redirectUser = () => {
        if (redirectToProfile) {
            return <Redirect to="/admin/attribute" />;
        }
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        const manufacturer = { name: name, value: value, description: description }
        createAttribute(manufacturer, accessToken).then(data => {
            console.log(data, "dataj")

            if (data.errors ) {
                setValues({
                    ...values,
                    errorsAttributeName: data.errors.name,
                    errorsAttributeValue: data.errors.value,
                    errorsAttributeDescription: "Description is required"
                });
                // NotificationManager.error(data.message);
            }
            else {
                setValues({
                    ...values,
                    name: '',
                    errorsAttributeName: '',
                    errorsAttributeValue: '',
                    value: '',
                    description: '',
                    error: '',
                    success: true,
                    redirectToProfile: false,
                    errorsAttributeDescription: ''
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
                /*NotificationManager.success('Attribute has been added successfully!','',2000);
                setTimeout(function(){
                    setValues({
                        ...values,
                        redirectToProfile:true
                    })
                },2000)*/
            }
        });
    };
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value, errorsAttributeValue: '', errorsAttributeDescription: '', errorsAttributeName: '' });
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { att_value: "" }]);
    };

    return (
        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-md-8'><h3 className="font-bold"> Add Attribute</h3></div>
                        <div className='col-md-4'><Link to={`/admin/attribute`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">


                                <div class="demoPage" style={{ background: '#ffffff', padding: '20px' }}>
                                    <ToastContainer />
                                    {/*<NotificationContainer/>*/}
                                    {/* {showSuccess()} */}
                                    {/* {/* {showError()} */}
                                    {redirectUser()}

                                    <div className="form-group col-sm-7">
                                        <h6><b> Attribute Name</b><span style={{ color: 'red' }}>*</span></h6>
                                        <input type="text" className="form-control" placeholder='Enter Attribute' onChange={handleChange('name')} />
                                        <span className='error text-danger'>{values.errorsAttributeName}</span>
                                    </div>
                                    <div className="form-group col-sm-7">
                                        <h6><b> Attribute Description</b></h6>
                                        <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description'></textarea>
                                        <span className='error text-danger'>{values.errorsAttributeDescription}</span>

                                    </div>
                                    <div className="form-group col-sm-7">
                                        <h6><b> Attributes Values</b></h6>
                                        {/* <input onChange={handleChange('dimension')} type="text" className="form-control" placeholder='Enter Dimension' value={dimension} /> */}
                                        {/* <span className='error text-danger'>{values.errorsAttributeValue}</span> */}

                                        {inputList.map((x, i) => {
                                            return (
                                                <div className="form-group">
                                                    <input
                                                        type="text" className="form-control"
                                                        name="att_value"
                                                        placeholder='Enter Value'
                                                        value={x.att_value}
                                                        onChange={e => handleInputChange(e, i)}
                                                    />
                                                    <span className='error text-danger'>{values.errorsAttributeValue}</span>
                                                    <div className="btn-box">
                                                        {inputList.length !== 1 && <button
                                                            className="btn btn-danger "
                                                            onClick={() => handleRemoveClick(i)}><i className='fa fa-minus '></i></button>}
                                                        {inputList.length - 1 === i && <button className="btn btn-info" onClick={handleAddClick}><i className='fa fa-plus'></i></button>}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>


                                <div className="form-group col-md-7">
                                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}> Submit </button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddAttributenew; 