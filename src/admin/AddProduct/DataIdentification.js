import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../core/AdminLayout';
import "quill/dist/quill.snow.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import { Navbar } from './Navbar';
import { updateProduct } from '../apiAdmin';
import { connect } from "react-redux"
import { addData } from '../../actions';
const DataIdentification = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [values, setValues] = useState({

        dateAvailable: "",
        quantity: "",
        substractStock: "",
        oosMessage: ""

    })



    const [show, setShow] = React.useState();
    const [errormessage, setErrorMessage] = useState()


    const handleChange = (name) => (event) => {

        setValues({ ...values, error: false, [name]: event.target.value });
    };



    let payload = {}

    const clickSubmit = (event) => {
        event.preventDefault();
        if (values.dateAvailable == "" ||
            values.quantity == "" ||
            values.substractStock == "" ||
            values.oosMessage == "") {
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
            setValues({ ...values, error: false });

            setErrorMessage("")
            toast.success('Added successfully!', {
                autoClose: 600,
                onClose: () => {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }
            })

            payload = {
                name: props.gerneralData[0].productName.name,


                price: props.gerneralData[0].productName.price,

                stock: {
                    quantity: values.quantity,
                    dateAvailable: values.dateAvailable,
                    substractStock: values.substractStock,
                    oosMessage: values.oosMessage
                },
            }
            props.dispatch(addData({ values }))
            updateProduct(payload, props.gerneralData[0].productName.code, accessToken).then(data => {
                if (data.error) {
                    toast.error('Check the details!')
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

            <AdminLayout>
                <div id="wrapper">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className='row'>
                                <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'> Add Product</h3></div>
                                <div className='col-md-4'><Link to={`/admin/productlist`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i className="fa fa-backward"></i> Back</button></Link></div>
                            </div>
                            <div className="white-box">
                                <div className="row">
                                    <ToastContainer />
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
                                                                    <div >



                                                                        <div>

                                                                            <div className="row form-group">

                                                                                <div className="col-lg-2 " style={{

                                                                                    padding: "0px",

                                                                                }}>

                                                                                    <h2
                                                                                        style={{

                                                                                            paddingBottom: "0",
                                                                                            marginBottom: "-20px"
                                                                                        }}
                                                                                    >
                                                                                        <b>Stock</b>
                                                                                    </h2>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-lg-12'><hr style={{ color: "solid black", marginTop: "0px", marginBottom: "40px" }} /></div>
                                                                            <div className="row form-group">
                                                                                <div
                                                                                    className="col-lg-2"
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center"
                                                                                    }}
                                                                                >

                                                                                    <h6>
                                                                                        <b> Quantity</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-lg-10">
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        placeholder="Quantity"
                                                                                        onChange={handleChange("quantity")}
                                                                                    />
                                                                                </div>
                                                                            </div>


                                                                            <div className="row form-group">
                                                                                <div className="col-lg-2">

                                                                                    <h6>
                                                                                        <b> Substrack Stock</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-lg-10">
                                                                                    <select className='form-control' onChange={handleChange("substractStock")}
                                                                                    >
                                                                                        <option className='form-control'>Select SubstractStock </option>
                                                                                        <option className='form-control' value={true}>Yes</option>
                                                                                        <option className='form-control' value={false}>No</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>


                                                                            <div className="row form-group">
                                                                                <div className="col-lg-2">

                                                                                    <h6>
                                                                                        <b> Out Of Stock Status</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-lg-10">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Out Of Stock Status"
                                                                                        onChange={handleChange("oosMessage")}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="row form-group">
                                                                                <div className="col-lg-2">

                                                                                    <h6>
                                                                                        <b>Date Available</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-lg-5">
                                                                                    <input
                                                                                        type="date"
                                                                                        className="form-control"

                                                                                        onChange={handleChange("dateAvailable")}

                                                                                    />
                                                                                </div>
                                                                                {/* <div className="col-lg-10 ">


                                                                                    <Calendar

                                                                                        onChange={changeDate}
                                                                                        className={`calendar${show ? "show" : ""}`}

                                                                                    />

                                                                                </div> */}
                                                                            </div>
                                                                            <span className='text-danger'>{errormessage}</span>
                                                                            <div className="row form-group">
                                                                                <div className="col-lg-7 ">
                                                                                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}> Save </button>
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
}
const mapStateToProps = (state) => ({
    gerneralData: state.general.General,
    optionData: state.option.Option,
    stockData: state.stock.Stock,
    imageData: state.image.Image,

});
export default (connect)(mapStateToProps)(DataIdentification);