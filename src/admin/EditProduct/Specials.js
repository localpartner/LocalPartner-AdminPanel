import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../core/AdminLayout";
import Table from "react-bootstrap/Table"
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { getProduct, updateProduct } from "../apiAdmin";

import { Navbar } from "./Navbar";
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

const Specials = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [notEdited, setNotEdited] = useState([])
    const [prefill, setPrefill] = useState();
    const [indexs, setIndexs] = useState()
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };
    let notEditedData = []

    const handleOpen = (index) => {
        setIndexs(index)
        setOpen(true);

        for (let i = 0; i < prefill.length; i++) {

            if (i === index) {
                setValues({
                    ...values,
                    price: prefill[i].price,
                    startDate: prefill[i].startDate.split('T')[0],
                    endDate: prefill[i].endDate.split('T')[0]
                })
            }
            else {
                notEditedData.push(prefill[i])
            }
            setNotEdited(notEditedData)
        }
    };
    const handelChange = () => {
        setOpen(true)

        for (let i = 0; i < prefill.length; i++) {
            setNotEdited(prefill)
        }
    }
    const [user, setUser] = useState()
    const [values, setValues] = useState({

        startDate: "",
        price: "",
        endDate: "",
        name: '',
        priceGeneral: ''
    })
    let params = useParams()
    const loadUser = () => {
        getProduct(params.productId, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setPrefill(data.data.result.specials)
                setValues({
                    ...values,
                    priceGeneral: data.data.result.price,
                    name: data.data.result.name
                })


                setUser(data.data.result)

            }
        });
    };
    const [tableBody, setTableBody] = useState([])
    const [errormessage, setErrorMessage] = useState()
    const increase = () => {

        setTableBody([...tableBody, tableBody])

    }
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const Pop = (index) => {
        const list = [...tableBody];
        list.splice(index, 1);
        setTableBody(list);
    }
    const handleChange = (name) => (event) => {

        setValues({ ...values, error: false, [name]: event.target.value });

    };
    const { name } = values;

    let specials = [{
        startDate: values.startDate,
        endDate: values.endDate,
        price: values.price
    }]
    for (let i = 0; i < notEdited.length; i++) {
        specials.push(notEdited[i])
    }
    let payload = { name, price: values.priceGeneral, specials }
    const clickSubmit = (event) => {
        event.preventDefault();
        if (values.startDate == "" ||
            values.price == "" ||
            values.endDate == "") {
            setErrorMessage("Fill all Fields")
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


    useEffect(() => {
        loadUser()
    }, [])

    return (<>
        <AdminLayout>
            <NotificationContainer />

            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'> Add Product</h3></div>
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
                                                                <div>
                                                                    <Table striped bordered hover size="sm">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>
                                                                                    <h5><b>Date Start</b></h5>
                                                                                </th>
                                                                                <th>
                                                                                    <h5><b>Date End</b></h5>
                                                                                </th>
                                                                                <th>
                                                                                    <h5><b>Price</b></h5>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {user !== undefined ? (<>


                                                                                {user.specials.map((item, index) => {




                                                                                    return (
                                                                                        <>
                                                                                            <tr>

                                                                                                <td>{item.startDate}</td>
                                                                                                <td>{item.endDate}</td>
                                                                                                <td>{item.price}</td>

                                                                                                <td> <button className='btn btn-outline btn-info m-5' aria-label='Edit' onClick={() => handleOpen(index)} ><i className='fa fa-pencil font-15' ></i></button></td>

                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                                }
                                                                            </>) : (<></>)}


                                                                            {tableBody.map((val, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <DatePicker selected={startDate} className="form-control" onChange={(date) => setStartDate(date)} />
                                                                                            </td>

                                                                                            <td>
                                                                                                <DatePicker className="form-control  " selected={startDate} onChange={(date) => setEndDate(date)} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="number" className="form-control" placeholder=' Price'
                                                                                                    onChange={handleChange("price")} />
                                                                                            </td>
                                                                                            <td>
                                                                                                <div>
                                                                                                    {
                                                                                                        <button className="btn btn-danger "
                                                                                                            key={index} onClick={() => Pop(index)}

                                                                                                        >

                                                                                                            <i className="fa fa-minus"></i>
                                                                                                        </button>
                                                                                                    }

                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                                <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}> Submit </button>

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
                                                                                    <div className="col-lg-4" > <h6><b>Option Value</b></h6></div>
                                                                                </div>
                                                                                <div> <hr style={{ width: "100%" }} /></div>

                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <h6> <b>Price</b>
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
                                                                                            value={values.price}
                                                                                            onChange={handleChange("price")}
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
                                                                                <button className="btn btn-info btn-md" onClick={clickSubmit} style={{ float: 'right', borderRadius: '7px', marginTop: "10px" }}> Submit </button>
                                                                            </div>
                                                                            <span className="text-danger">{errormessage}</span>
                                                                        </div>
                                                                    </Fade>
                                                                </Modal>
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
                    </div>
                </div>
            </div>
        </AdminLayout>






    </>)
}
export default Specials;