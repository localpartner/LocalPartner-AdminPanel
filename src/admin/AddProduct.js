import React, { useState, useEffect } from 'react';
import AdminSidebar from "../user/AdminSidebar";
import AdminHeader from "../user/AdminHeader";
import { Link } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css";
import { isAuthenticated } from '../auth';
import { addGeneral } from '../actions';
import { connect } from 'react-redux';
import { Navbar } from './AddProduct/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct } from './apiAdmin';


const AddProduct = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [values, setValues] = useState({
        error: "",
        name: "",
        description: "",
        code: "",
        price: "",
        sku: "",
        upc: "",
        ean: "",
        jan: "",
        isbn: "",
        mpn: "",
    });

    const [errormessage, setErrorMessage] = useState()

    const handleChange = (name) => {

        return (event) => {

            setValues({ ...values, error: false, [name]: event.target.value });
        };
    }

    const { name,
        description,
        code,
        price } = values;


    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],


        ],
        clipboard: {
            matchVisual: false,
        },
    }
    const { quill, quillRef } = useQuill({ modules });

    let identification = {
        sku: values.sku,
        upc: values.upc,
        ean: values.ean,
        jan: values.jan,
        isbn: values.isbn,
        mpn: values.mpn
    }
    const clickSubmit = (event) => {
        event.preventDefault();


        if (values.name == "" || values.description == "" || values.code == "" || values.price == "") {
            // setErrorMessage("Fill All Fields")
            toast.error('Fill All Fields', {
                autoClose: 600,
                onClose: () => {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }
            })
        }
        else {
            setErrorMessage("")
            setValues({ ...values, error: false });
            toast.success('Added successfully!', {
                autoClose: 600,
                onClose: () => {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }
            })
            props.dispatch(addGeneral(values));
          
            createProduct({
                name,
                description,
                code,
                price,
                identification

            }, accessToken).then(data => {
                if (data.error) {

                }
                else {
                    setValues({

                    })
                }
            })
        }

    }
    return (


        <>

            <div id="wrapper">
                <AdminHeader />
                <AdminSidebar />

                <div className="page-wrapper">
                    <div className="container-fluid">

                        <ToastContainer />

                        <div className='row'>
                            <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'> Add Product</h3></div>
                            <div className='col-md-4'><Link to={`/admin/productlist`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i className="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div class="card text-center">
                                        <div class="card text-center">
                                            <Navbar />
                                        </div>
                                        <div id="general" class="tab-pane active">

                                            <div>
                                                <div>
                                                    <div>

                                                        <div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div
                                                                        class="demoPage"
                                                                        style={{
                                                                            background: "#ffffff",
                                                                            paddingTop: "20px"
                                                                        }}
                                                                    >


                                                                        <div className="row form-group">
                                                                            <div className="col-lg-2">

                                                                                <h6>
                                                                                    <b> Product Name</b>
                                                                                    <span style={{ color: "red" }}>*</span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Enter Attribute"
                                                                                    onChange={handleChange('name')}
                                                                                />

                                                                            </div>
                                                                        </div>



                                                                        <div className="row form-group">
                                                                            <div className="col-lg-2">

                                                                                <h6>
                                                                                    <b> Product Description</b>
                                                                                    <span style={{ color: "red" }}>*</span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10">
                                                                                <textarea
                                                                                    rows="4"
                                                                                    className="form-control"
                                                                                    type="text"
                                                                                    placeholder="Enter Description"
                                                                                    onChange={handleChange('description')}
                                                                                    ref={quillRef}
                                                                                />

                                                                            </div>
                                                                        </div>



                                                                        <div className="row form-group">
                                                                            <div className="col-lg-2">

                                                                                <h6>
                                                                                    <b> Product Code</b>
                                                                                    <span style={{ color: "red" }}>*</span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10">
                                                                                <textarea
                                                                                    rows="1"
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    placeholder="Enter Code"
                                                                                    onChange={handleChange('code')}
                                                                                ></textarea>

                                                                            </div>


                                                                        </div>
                                                                        <div className="row form-group">
                                                                            <div className="col-lg-2">

                                                                                <h6>
                                                                                    <b> Price</b>
                                                                                    <span style={{ color: "red" }}>*</span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10">
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    placeholder="Enter Price"
                                                                                    onChange={handleChange('price')}

                                                                                />

                                                                            </div>
                                                                        </div>



                                                                        <div className="row form-group">

                                                                            <div className="col-lg-2 ">

                                                                                <h6
                                                                                    style={{
                                                                                        text: "right",
                                                                                        alignSelf: "center"
                                                                                    }}
                                                                                >
                                                                                    <b>SKU</b>
                                                                                    <span style={{ color: "red" }}>
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10 ml-0">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder=" Enter Stock Keeping Unit"
                                                                                    onChange={handleChange('sku')}

                                                                                />

                                                                            </div>
                                                                        </div>

                                                                        {/* UPC */}
                                                                        <div className="row form-group">

                                                                            <div className="col-lg-2">
                                                                                {" "}
                                                                                <h6>
                                                                                    <b> UPC</b>
                                                                                    <span style={{ color: "red" }}>
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Enter Universal Product Code"
                                                                                    onChange={handleChange('upc')}

                                                                                />

                                                                            </div>
                                                                        </div>

                                                                        {/* EAN */}
                                                                        <div className="row form-group">

                                                                            <div className="col-lg-2">
                                                                                {" "}
                                                                                <h6>
                                                                                    <b> EAN</b>
                                                                                    <span style={{ color: "red" }}>
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Enter European Article Number"
                                                                                    onChange={handleChange('ean')}
                                                                                />

                                                                            </div>
                                                                        </div>
                                                                        {/* JAN */}
                                                                        <div className="row form-group">

                                                                            <div className="col-lg-2">
                                                                                {" "}
                                                                                <h6>
                                                                                    <b> JAN</b>
                                                                                    <span style={{ color: "red" }}>
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Enter Japanese Article Number"
                                                                                    onChange={handleChange('jan')}

                                                                                />


                                                                            </div>
                                                                        </div>

                                                                        {/* ISBN */}
                                                                        <div className="row form-group">

                                                                            <div className="col-lg-2">
                                                                                {" "}
                                                                                <h6>
                                                                                    <b> ISBN</b>
                                                                                    <span style={{ color: "red" }}>
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Enter International Standard Book Number"
                                                                                    onChange={handleChange('isbn')}

                                                                                />

                                                                            </div>
                                                                        </div>
                                                                        {/* MPN */}
                                                                        <div className="row form-group">

                                                                            <div className="col-lg-2 col-sm-2">
                                                                                {" "}
                                                                                <h6>
                                                                                    <b> MPN</b>
                                                                                    <span style={{ color: "red" }}>
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-10 col-sm-8">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Enter Manufacturer Part Number"
                                                                                    onChange={handleChange('mpn')}

                                                                                />
                                                                                <div >

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <span className='text-danger'>{errormessage}</span>
                                                                        <div className="text-center">
                                                                            <button onClick={clickSubmit} className="btn btn-primary btn-md" style={{ borderRadius: '7px' }}> Submit </button>
                                                                        </div>











                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )




}
export default connect()(AddProduct);
