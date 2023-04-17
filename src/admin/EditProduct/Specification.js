import React, { useEffect, useState } from "react";
import AdminLayout from "../../core/AdminLayout";
import { Navbar } from "./Navbar";
import { Link, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../apiAdmin";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Specification = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [values, setValues] = useState({
        code: "",
        value: ''

    })
    let params = useParams()
    const loadUser = () => {
        getProduct(params.productId, accessToken).then(data => {

            if (data.error) {
                console.log(data.error);
            }
            else {

                if (data.data.result.specifications !== undefined && data.data.result.specifications.length !== 0) {
                    setValues({
                        ...values,
                        code: data.data.result.specifications[0].code,
                        value: data.data.result.specifications[0].value,
                        name: data.data.result.name,
                        description: data.data.result.description,
                        price: data.data.result.price,
                    })

                }
                else {
                    setValues({
                        code: "",
                        value: ""
                    })
                }
            }

        });
    };



    useEffect(() => {
        loadUser();
    }, [])
    const [errormessage, setErrorMessage] = useState();
    const handleChange = (name) => (event) => {

        setValues({ ...values, error: false, [name]: event.target.value });

    };
    const clickSubmit = (event) => {
        event.preventDefault();
        if (values.code == "" ||
            values.value == '') {
            setErrorMessage("fill all fields")
        }
        else {
            setErrorMessage("");
            setValues({ ...values, error: false });

        }
    }
    let specification = [{
        code: values.code,
        value: values.value
    }]

    let payload = {
        name: values.name,
        price: values.price,
        specifications: specification

    }

    const submitData = (event) => {
        event.preventDefault();

        updateProduct(payload, params.productId, accessToken)
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

    return (<>



        <AdminLayout>
            <NotificationContainer />
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> Edit Product </p></div>
                            <div className='col-md-4'><p>
                                <Link to="/admin/productlist" className="btn  btn-outline btn-info fa-pull-right m-r-5 addButton"> <i className="fa fa-backward"></i> Back</Link>
                            </p></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div>
                                        <div id="wrapper">

                                            <div className="col-12">
                                                <div class="card text-center">
                                                    <div class="card text-center">
                                                        <Navbar />
                                                    </div>

                                                </div>
                                                <div>
                                                    <div className="white-box">
                                                        <div className="row form-group mt-5 ">
                                                            <div className="col-lg-2">

                                                                <h6>
                                                                    <b> Code </b>
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </h6>
                                                            </div>
                                                            <div className="col-lg-10">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Code"
                                                                    onChange={handleChange('code')}
                                                                    value={values.code}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-lg-2">

                                                                <h6>
                                                                    <b> Value </b>
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </h6>
                                                            </div>
                                                            <div className="col-lg-10">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter value"
                                                                    onChange={handleChange('value')}
                                                                    value={values.value}
                                                                />
                                                            </div>
                                                        </div>

                                                        <span className="text-danger text-center">{errormessage}</span>
                                                        <div className="row form-group">
                                                            <div className="col-lg-7 ">
                                                                <button onClick={submitData} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}> Submit </button>
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

    </>)
}

export default Specification;