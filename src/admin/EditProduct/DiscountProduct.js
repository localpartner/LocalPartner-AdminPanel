import React, { useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../core/AdminLayout";
import Table from "react-bootstrap/Table"

import { NotificationContainer, NotificationManager } from 'react-notifications';

import { getProduct, updateProduct } from "../apiAdmin";
import { Navbar } from "./Navbar";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],

    },
}));
const DiscountProduct = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));


    const [notEdited, setNotEdited] = useState([])
    const [optionRadio, setOptionRadio] = useState([])
    const [errormessage, setErrorMessage] = useState()
    const [tableBody, setTableBody] = useState([])
    const [prefill, setPrefill] = useState();
    const [indexs, setIndexs] = useState()
    const [user, setUser] = useState();
    const [open, setOpen] = React.useState(false);

    const [values, setValues] = useState({
        startDate: "",
        endDate: "",
        quantity: "",
        discount: "",
        name: '',
        priceGeneral: ''
    })
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };
    let notEditedData = []


    let params = useParams();
    const loadUser = () => {
        getProduct(params.productId, accessToken).then(data => {

            if (data.error) {
                console.log(data.error);
            }
            else {
                setUser(data.data.result);
                setPrefill(data.data.result.discount)

                setValues({
                    ...values, price: data.data.result.price,
                    name: data.data.result.name
                })


            }
        });
    };

    const increase = () => {

        setTableBody([...tableBody, tableBody])

    }


    const Pop = (index) => {
        const list = [...tableBody];
        list.splice(index, 1);
        setTableBody(list);
    }


    const handleOpen = (index) => {
        setIndexs(index)
        setOpen(true);

        for (let i = 0; i < prefill.length; i++) {

            if (i === index) {
                setValues({
                    ...values,
                    quantity: prefill[i].quantity,
                    discount: prefill[i].discount,
                    startDate: prefill[i].startDate.split('T')[0],
                    endDate: prefill[i].endDate.split('T')[0]
                })
            }
            else {
                notEditedData.push(prefill[i])
                console.log(notEdited, "notEdited")
            }
        }
        setNotEdited(notEditedData)


    };
    let discount = [{
        startDate: values.startDate,
        endDate: values.endDate,
        quantity: values.quantity,
        discount: values.discount
    }]
    for (let i = 0; i < notEdited.length; i++) {
        discount.push(notEdited[i])
    }

    const { name, price } = values;
    const handelChange = () => {
        setOpen(true)

        for (let i = 0; i < prefill.length; i++) {
            setNotEdited(prefill)
        }
    }
    let payload = { name, price, discount: discount }
    const clickSubmit = (event) => {
        event.preventDefault();
        if (values.startDate == "" ||
            values.endDate == "" ||
            values.quantity == "" ||
            values.price == "") {
            setErrorMessage("Fill all fields");
        }
        else {
            setErrorMessage("")
            setValues({ ...values, error: false });
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

    const handleChange = (name) => (event) => {

        setValues({ ...values, error: false, [name]: event.target.value });

    };
    useEffect(() => {
        loadUser();
        setOptionRadio(props.discountData)
    }, [props.discountData])
    return (<>
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




                                                                    <Table striped bordered hover size="sm">
                                                                        <thead>
                                                                            <tr>



                                                                                <th>
                                                                                    <h5><b>Quantity</b></h5>
                                                                                </th>
                                                                                <th>
                                                                                    <h5><b>Discount</b></h5>
                                                                                </th>
                                                                                <th>
                                                                                    <h5><b>Date Start</b></h5>
                                                                                </th>
                                                                                <th>
                                                                                    <h5><b>Date End</b></h5>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {user !== undefined && user.length !== 0 ? (<>


                                                                                {user.discount.map((item, index) => {
                                                                                    return (
                                                                                        <>
                                                                                            <tr>
                                                                                                <td>{item.quantity}</td>
                                                                                                <td>{item.discount}</td>
                                                                                                <td>{item.startDate}</td>
                                                                                                <td>{item.endDate}</td>

                                                                                                <td> <button className='btn btn-outline btn-info m-5' aria-label='Edit' onClick={() => handleOpen(index)} ><i className='fa fa-pencil font-15' ></i></button></td>

                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                })}
                                                                            </>) : (<></>)}

                                                                            {tableBody.map((val, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <input type="number" className="form-control" placeholder=' Qunatity'

                                                                                                    onChange={handleChange("quantity")} />
                                                                                            </td>

                                                                                            <td>
                                                                                                <input type="number" className="form-control" placeholder=' Discount' onChange={handleChange("price")} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="date"
                                                                                                        className="form-control"

                                                                                                        onChange={handleChange("dateAvailable")}

                                                                                                    />
                                                                                                </td>                                                                                            </td>

                                                                                            <td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="date"
                                                                                                        className="form-control"

                                                                                                        onChange={handleChange("dateAvailable")}

                                                                                                    />
                                                                                                </td>                                                                                            </td>

                                                                                            {/* <div>
                                                                                                    {
                                                                                                        <button className="btn btn-danger "
                                                                                                            key={index} onClick={() => Pop(index)}

                                                                                                        >

                                                                                                            <i className="fa fa-minus"></i>
                                                                                                        </button>

                                                                                                    }
                                                                                                </div> */}

                                                                                            <td>
                                                                                                {<button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', marginTop: "10px" }}>Submit</button>}

                                                                                            </td>

                                                                                        </tr>
                                                                                    </>
                                                                                )
                                                                            })}



                                                                            <tr>
                                                                                <td colSpan={7}></td>
                                                                                <td>
                                                                                    <div>

                                                                                        <button className="btn btn-info"
                                                                                            onClick={handelChange}
                                                                                        >

                                                                                            <i className="fa fa-plus"></i>
                                                                                        </button>


                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                                <Modal
                                                                    aria-labelledby="transition-modal-title"
                                                                    aria-describedby="transition-modal-description"
                                                                    className={classes.modal}
                                                                    open={open}
                                                                    onClose={handleClose}
                                                                    closeAfterTransition
                                                                    BackdropComponent={Backdrop}
                                                                    BackdropProps={{
                                                                        timeout: 500
                                                                    }}
                                                                    style={{ borderRadius: "10px" }}
                                                                >
                                                                    <Fade
                                                                        in={open}
                                                                        style={{
                                                                            padding: "40px",
                                                                            width: "40%"
                                                                        }}
                                                                    >
                                                                        <div className={classes.paper}>
                                                                            <div className="row">
                                                                                <div className="row">
                                                                                    <div className="col-lg-1" style={{ display: "flex", alignItem: "center", justifyContent: "center", paddingTop: "10px" }}><b><i className="fa fa-pencil" style={{ marginLeft: "35px" }}></i></b></div>
                                                                                    <div className="col-lg-4" > <h6><b>Discount Value</b></h6></div>
                                                                                </div>
                                                                                <div> <hr style={{ width: "100%" }} /></div>

                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <h6> <b>Quantity</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="d-flex">

                                                                                    <div className="col-lg-12">
                                                                                        <input type="text"
                                                                                            placeholder="Enter Quantity"
                                                                                            className="form-control"
                                                                                            value={values.quantity}
                                                                                            onChange={handleChange("quantity")}
                                                                                        ></input>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <h6> <b>Discount</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="d-flex">
                                                                                    <div className="col-lg-12">
                                                                                        <input type="number" placeholder="Enter Discount"
                                                                                            className="form-control"
                                                                                            value={values.discount}
                                                                                            onChange={handleChange("discount")}

                                                                                        ></input>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <h6> <b>StartDate</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="d-flex">
                                                                                    <div className="col-lg-12">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control"
                                                                                            value={values.startDate}
                                                                                            onChange={handleChange("startDate")}

                                                                                        />
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <h6> <b>EndDate</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="d-flex">
                                                                                    <div className="col-lg-12">

                                                                                        <input
                                                                                            type="date"
                                                                                            className="form-control"
                                                                                            value={values.endDate}
                                                                                            onChange={handleChange("endDate")}

                                                                                        />

                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                            <div className="col-lg-7">
                                                                                <button className="btn btn-info btn-md" onClick={clickSubmit} style={{ float: 'right', borderRadius: '7px' }}> Submit </button>
                                                                            </div>
                                                                            <span className="text-danger">{errormessage}</span>
                                                                        </div>
                                                                    </Fade>
                                                                </Modal>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-lg-7 ">
                                                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}> Submit </button>
                                                </div>
                                            </div>
                                            <span className="text-danger">{errormessage}</span>
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

export default DiscountProduct;