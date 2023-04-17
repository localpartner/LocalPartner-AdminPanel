import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import AdminLayout from "../../core/AdminLayout";
import { Navbar } from "./Navbar";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAttributes,specifications } from "../../actions";
import { updateProduct } from '../apiAdmin';
const Specification = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [values, setValues] = useState({
        code: "",
        value: ''

    });
   
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
            props.dispatch(specifications({ values }))




            payload = {
                name: props.gerneralData[0].productName.name,
                code: props.gerneralData[0].productName.code,
                description: props.gerneralData[0].productName.description,
                price: props.gerneralData[0].productName.price,
                specifications: [
                    {
                        code: values.code,
                        value: values.value

                    }
                ],

            }
            updateProduct(payload, props.gerneralData[0].productName.code, accessToken).then(data => {
                if (data.error) {
                    NotificationManager.error("Please check your details", '', 1000);
                }
                else {
                    setValues({
                    })
                    NotificationManager.success("User has been updated successfully", '', 1000);

                }
            })

        }


    }

    let payload = {};



    return (<>



        <AdminLayout>
            <NotificationContainer />
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> Add Product </p></div>
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
                                                <div className="white-box">
                                                    <div className="row form-group  mt-5">
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
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row  form-group mt-0">
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
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <span className="text-danger text-center">{errormessage}</span>
                                                <div className="row form-group">
                                                    <div className="col-lg-7 ">
                                                        <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}> Submit </button>
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
const mapStateToProps = (state) => ({
    gerneralData: state.general.General,
    optionData: state.option.Option,
    stockData: state.stock.Stock,
    imageData: state.image.Image,
    specialData: state.special.Special,
    linksData: state.links.Link,
    specificationData: state.specification.Specification,
    discountData: state.discount.Discount,
});
export default (connect)(mapStateToProps)(Specification);