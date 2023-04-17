import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../core/AdminLayout";
import Table from "react-bootstrap/Table"
import 'react-calendar/dist/Calendar.css';
import { updateProduct } from "../apiAdmin";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { special } from "../../actions";
import { connect } from "react-redux";

import { Navbar } from "./Navbar";
const Specials = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));


    const useStyles = makeStyles(theme => ({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5]
            // padding: theme.spacing(2, 4, 3),
        }
    }));
    const classes = useStyles()
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const [open, setOpen] = React.useState(false)

    const [values, setValues] = useState({

        startDate: "",
        price: "",
        endDate: ""
    })
    const [sepcialRadio, setSepcialRadio] = useState([])

    const [tableBody, setTableBody] = useState([])
    const [errormessage, setErrorMessage] = useState()
    const increase = () => {
        setTableBody([...tableBody, tableBody])
    }

    const Pop = (index) => {
        const list = [...tableBody];
        list.splice(index, 1);
        setTableBody(list);
    }
    const handleChange = (name) => (event) => {

        setValues({ ...values, error: false, [name]: event.target.value });

    };
    let specials = []
    const clickSave = event => {
        event.preventDefault()
        for (let i = 0; i < props.specialData.length; i++) {

            specials.push({


                startDate: props.specialData[i].startDate.values.startDate,
                endDate: props.specialData[i].startDate.values.endDate,
                price: props.specialData[i].startDate.values.price,
            })
        }
        payload = {
            name: props.gerneralData[0].productName.name,
            code: props.gerneralData[0].productName.code,
            description: props.gerneralData[0].productName.description,
            price: props.gerneralData[0].productName.price,
            specials: specials
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
    useEffect(() => {
        setSepcialRadio(props.specialData)
    }, [props.specialData])
    let payload = {};
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
            props.dispatch(special({ values }))
        }
    }









    return (<>
        <AdminLayout>
            <NotificationContainer />
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'> Add Product</h3></div>
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
                                                                <div className="white-box" >




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

                                                                            {sepcialRadio.map((item, index) => {


                                                                                return (
                                                                                    <>
                                                                                        <tr>

                                                                                            <td>{item.startDate.values.startDate}</td>
                                                                                            <td>{item.startDate.values.endDate}</td>
                                                                                            <td>{item.startDate.values.price}</td>

                                                                                        </tr>
                                                                                    </>
                                                                                )
                                                                            })}



                                                                            <tr>
                                                                                <td colSpan={7}></td>
                                                                                <td>
                                                                                    <div>
                                                                                        {
                                                                                            <button
                                                                                                className="btn btn-info"
                                                                                                onClick={handleOpen}
                                                                                            >
                                                                                                <i className="fa fa-plus"></i>
                                                                                            </button>
                                                                                        }
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </div>

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
                                                                                <div
                                                                                    className="col-lg-1"
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        alignItem: "center",
                                                                                        justifyContent: "center",
                                                                                        paddingTop: "10px"
                                                                                    }}
                                                                                >
                                                                                    <b>
                                                                                        <i
                                                                                            className="fa fa-pencil"
                                                                                            style={{ marginLeft: "35px" }}
                                                                                        ></i>
                                                                                    </b>
                                                                                </div>
                                                                                <div className="col-lg-4">

                                                                                    <h6>
                                                                                        <b>Special Value</b>
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                            <div>

                                                                                <hr style={{ width: "100%" }} />
                                                                            </div>
                                                                            <div className="col-lg-12">

                                                                                <h6>

                                                                                    <b>StartDate</b>
                                                                                    <span style={{ color: "red" }}>
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>

                                                                            <div className="col-lg-12">
                                                                                <input
                                                                                    type="date"
                                                                                    className="form-control"

                                                                                    onChange={handleChange("startDate")}

                                                                                />
                                                                            </div>
                                                                            <div className="col-lg-12">
                                                                                <h6>
                                                                                    <b>EndDATE</b>
                                                                                    <span style={{ color: "red" }}>
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>
                                                                            <div className="col-lg-12">
                                                                                <input
                                                                                    type="date"
                                                                                    className="form-control"

                                                                                    onChange={handleChange("endDate")}

                                                                                />
                                                                            </div>

                                                                        </div>

                                                                        <div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    {" "}
                                                                                    <h6>
                                                                                        {" "}
                                                                                        <b>Price</b>
                                                                                        <span style={{ color: "red" }}>
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>

                                                                                <div className="d-flex">
                                                                                    <div className="col-lg-12">
                                                                                        <input
                                                                                            type="number"
                                                                                            placeholder="Enter Price"
                                                                                            className="form-control"
                                                                                            onChange={handleChange(
                                                                                                "price"
                                                                                            )}
                                                                                        ></input>
                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                        </div>

                                                                        <div className="col-lg-7">
                                                                            <button

                                                                                className="btn btn-info btn-md "
                                                                                onClick={clickSubmit}
                                                                                style={{
                                                                                    float: "right",
                                                                                    borderRadius: "7px",
                                                                                    marginTop: "10px"
                                                                                }}
                                                                            >

                                                                                Save
                                                                            </button>
                                                                        </div>
                                                                        <span className="text-danger">
                                                                            {errormessage}
                                                                        </span>
                                                                    </div>
                                                                </Fade>
                                                            </Modal>
                                                        </div>

                                                        <div className="row form-group">
                                                            <button
                                                                className="btn btn-info btn-md"

                                                                onClick={clickSave}
                                                                style={{
                                                                    float: "right",
                                                                    borderRadius: "7px"
                                                                }}
                                                            >
                                                                Submit

                                                            </button>
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
export default connect(mapStateToProps)(Specials)