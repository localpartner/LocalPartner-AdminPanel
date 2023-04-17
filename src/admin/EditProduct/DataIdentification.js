import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminLayout from '../../core/AdminLayout';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import "quill/dist/quill.snow.css";
import { getProduct, updateProduct } from '../apiAdmin';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import { Navbar } from './Navbar';
const DataIdentification = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [values, setValues] = useState({
        dateAvailable: "",
        quantity: "",
        substractStock: "",
        oosMessage: "",
        name: "",
        description: "",

        price: "",

    })
    let params = useParams()
    const loadUser = () => {
        getProduct(params.productId,accessToken).then(data => {

            if (data.error) {
                console.log(data.error);
            }
            else {

                if (data.data.result.stock !== undefined) {
                    setValues({
                        ...values,
                        dateAvailable: data.data.result.stock.dateAvailable.split('T')[0],
                        quantity: data.data.result.stock.quantity,
                        substractStock: data.data.result.stock.substractStock,
                        oosMessage: data.data.result.stock.oosMessage,
                        name: data.data.result.name,
                        price: data.data.result.price,

                    })
                }
                else {
                    setValues({
                        dateAvailable: "",
                        quantity: "",
                        substractStock: "",
                        oosMessage: ""
                    })
                }
            }
        });
    };
    useEffect(() => {
        loadUser()
    }, [])

    const [dateState, setDateState] = useState(new Date());
    const [errormessage, setErrorMessage] = useState();

    const changeDate = (e) => {
        setDateState(e.target.value)
    }

    const handleChange = (name) => (event) => {

        setValues({ ...values, dateAvailable: dateState.toLocaleDateString(), error: false, [name]: event.target.value });
    };
    const { dateAvailable, quantity, substractStock, oosMessage, name, description, price, } = values;

    let stock = { dateAvailable, quantity, substractStock, oosMessage, }
    let payload = { name, description, price, stock: stock }


    const clickSubmit = (event) => {
        event.preventDefault();
        if (values.dateAvailable == "" ||
            values.quantity == "" ||
            values.substractStock == "" ||
            values.oosMessage == "") {
            setErrorMessage("Fill All Fields")
        }
        else {
            setValues({ ...values, error: false });
            setErrorMessage("")
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
    }
    return (
        <>

            <AdminLayout>
                <NotificationContainer />

                <div id="wrapper">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className='row'>
                                <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'> Edit Product</h3></div>
                                <div className='col-md-4'><Link to={`/admin/create/product`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i className="fa fa-backward"></i> Back</button></Link></div>
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
                                                                                        value={values.quantity}
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
                                                                                    <select className='form-control' value={values.substractStock} onChange={handleChange("substractStock")}
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
                                                                                        value={values.oosMessage}
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
                                                                                        value={values.dateAvailable}

                                                                                        onChange={handleChange("dateAvailable")}

                                                                                    />
                                                                                </div>

                                                                            </div>
                                                                            <span className='text-danger'>{errormessage}</span>
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

export default DataIdentification;