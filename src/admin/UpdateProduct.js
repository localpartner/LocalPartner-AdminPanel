import React, { useState, useEffect } from 'react';

import { isAuthenticated } from '../auth';
import { Link, Redirect, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from './apiAdmin';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import AdminLayout from '../core/AdminLayout';
import { Navbar } from './EditProduct/Navbar';
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css";
const UpdateProduct = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [user, setUser] = useState()
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
    let params = useParams()
    const loadUser = () => {
        getProduct(params.productId, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setUser(data.data);

                setValues({
                    ...values,
                    name: data.data.result.name,
                    description: data.data.result.description,
                    code: data.data.result.code,
                    price: data.data.result.price,
                    sku: data.data.result.identification.sku,
                    upc: data.data.result.identification.upc,
                    ean: data.data.result.identification.ean,
                    jan: data.data.result.identification.jan,
                    isbn: data.data.result.identification.isbn,
                    mpn: data.data.result.identification.mpn
                })

            }
        });
    };
    const [errormessage, setErrorMessage] = useState()

    const handleChange = (name) => {

        return (event) => {

            setValues({ ...values, error: false, [name]: event.target.value });

        };
    }
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
    const { name, description, price } = values;
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
        if (values.name == "" || values.description == "" || values.code == "", values.price == "") {
            setErrorMessage("Fill All Fields")
        }
        else {
            setErrorMessage("")
            setValues({ ...values, error: false });
            updateProduct({ name, description, price, identification }, params.productId, accessToken)
                .then(data => {
                    if (data.error) {
                        setValues({});
                        NotificationManager.error("Please check your details", '', 1000);

                    }
                    else {
                        setValues({

                        });
                        NotificationManager.success("User has been updated successfully", '', 1000);
                    }
                })
        }

    }
    useEffect(() => {
        loadUser();
    }, []);
    return (
        <>
            <AdminLayout>
                <NotificationContainer />
                <div id="wrapper">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className='row'>
                                <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'> Edit Product</h3></div>
                                <div className='col-md-4'><Link to={`/admin/productlist`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i className="fa fa-backward"></i> Back</button></Link></div>
                            </div>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div>
                                            <div id="wrapper">
                                                <div>
                                                    <div>
                                                        <div>
                                                            <div className="col-12">
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
                                                                                                                value={user != undefined ? values.name : ""}
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
                                                                                                                value={user != undefined ? values.description : ""}
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
                                                                                                                value={user != undefined ? values.code : ""}
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
                                                                                                                value={user != undefined ? values.price : ""}
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
                                                                                                                value={user != undefined ? values.sku : ""}

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
                                                                                                                value={values.upc}

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
                                                                                                                value={user != undefined ? values.ean : ""}
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
                                                                                                                value={user != undefined ? values.jan : ""}

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
                                                                                                                value={user != undefined ? values.isbn : ""}

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
                                                                                                                value={user != undefined ? values.mpn : ""}

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
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </AdminLayout>

        </>
    )
};

export default UpdateProduct;
