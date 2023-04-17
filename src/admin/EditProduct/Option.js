import React, { useEffect, useState } from "react";
import AdminLayout from "../../core/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { Navbar } from './Navbar';
import { getProduct, updateProduct } from "../apiAdmin";
import Table from "react-bootstrap/Table"
import "react-calendar/dist/Calendar.css"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import "react-datepicker/dist/react-datepicker.css";
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
const Option = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [user, setUser] = useState()
    const [prefill, setPrefill] = useState();
    const [notEdited, setNotEdited] = useState([])
    const [radio, setRadio] = useState([])
    const [indexs, setIndexs] = useState()
    const [values, setValues] = useState({
        type: "radio",
        displayName: "",
        value: "",
        quantity: "",
        dateAvailable: "",
        price: "",
        substractStock: "",
        quantity: "",
        name: "",
        description: "",
        priceGeneral: "",
    });
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

    let params = useParams()
    const loadUser = () => {
        getProduct(params.productId, accessToken).then(data => {

            if (data.error) {
                console.log(data.error);
            }
            else {

                setUser(data.data.result.options);
                if (data.data.result.options !== undefined && data.data.result.options.length !== 0) {

                    setPrefill(data.data.result.options[0].data);
                    setValues({
                        name: data.data.result.name,
                        priceGeneral: data.data.result.price,
                        displayName: data.data.result.options[0].displayName,
                        type: "radio"

                    })
                }
                else {
                    setPrefill("")
                }


            }
        });
    };
    useEffect(() => {
        loadUser();
    }, [])
    console.log(values, "values")

    const [errormessage, setErrorMessage] = useState()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const { name, priceGeneral, displayName, type } = values;

    let notEditedData = []


    const handleClose = () => {
        setOpen(false);
    };

    const [options, setOptions] = useState([]);

    const Option = (e) => {
        setOptions([...options, e.target.value])

    }

    const Pop = (index) => {
        const list = [...options];
        list.splice(index, 1);
        setOptions(list);
    }




    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleOpen = (index) => {
        setIndexs(index)

        setOpen(true);


        for (let i = 0; i < prefill.length; i++) {

            if (i === index) {
                setValues({
                    ...values,
                    value: prefill[i].value,
                    quantity: prefill[i].quantity,
                    price: prefill[i].price,
                    substractStock: prefill[i].substractStock.toString(),
                    dateAvailable: prefill[i].dateAvailable.split('T')[0]
                })
            }
            else {

                notEditedData.push(prefill[i])

            }
        }

        setNotEdited(notEditedData)
    };
    const handelChange = () => {
        setOpen(true)

        for (let i = 0; i < prefill.length; i++) {
            setNotEdited(prefill)
        }
    }

    let data = [{
        value: values.value,
        quantity: values.quantity,
        price: values.price,
        substractStock: values.substractStock,
        dateAvailable: values.dateAvailable
    },
    ];
    let option = [{
        displayName, type, data: data,
    }]
    for (let i = 0; i < notEdited.length; i++) {
        data.push(notEdited[i])
    }
    let payload = { name, price: priceGeneral, options: option }
    const clickSubmit = (event) => {
        event.preventDefault();
        if (
            values.value == "" ||
            values.quantity == "" ||
            values.dateAvailable == "" ||
            values.price == "" ||
            values.substractStock == ""
        ) {
            setErrorMessage("Fill All Fields")
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
    console.log(values, "substr")
    return (<>
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
                                                                <div >
                                                                    <div>

                                                                        <div className="row form-group">

                                                                            <div className="col-lg-1 ">

                                                                                <h2
                                                                                    style={{
                                                                                        marginBottom: "10px"
                                                                                    }}
                                                                                >
                                                                                    <b>RADIO</b>
                                                                                </h2>
                                                                            </div>
                                                                            <div className="col-lg-9 "></div>


                                                                            <div
                                                                                className="col-lg-12 container-fluide White-box"
                                                                                style={{ padding: "10px" }}
                                                                            ></div>

                                                                            <div className="row form-group">
                                                                                <div className="col-lg-2">

                                                                                    <h6>
                                                                                        <b> Display Name </b>
                                                                                        <span style={{ color: "red" }}>*</span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-lg-10">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Enter Name"
                                                                                        onChange={handleChange("displayName")}
                                                                                        value={values.displayName}
                                                                                    />
                                                                                </div>
                                                                            </div>



                                                                            <Table striped bordered hover size="sm">
                                                                                <thead>
                                                                                    <tr>



                                                                                        <th>
                                                                                            <h4><b> Value</b></h4>
                                                                                        </th>
                                                                                        <th>
                                                                                            <h4><b>Quantity</b></h4>
                                                                                        </th>
                                                                                        <th>
                                                                                            <h4><b>Subtract Stock</b></h4>
                                                                                        </th>
                                                                                        <th>
                                                                                            <h4><b>Date Available</b></h4>
                                                                                        </th>

                                                                                        <th>
                                                                                            <h4><b>Price</b></h4>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>

                                                                                <tbody>

                                                                                    {user !== undefined && user.length !== 0 ? (<>


                                                                                        {user[0].data.map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <tr>
                                                                                                        <td>{item.value}</td>
                                                                                                        <td>{item.quantity}</td>
                                                                                                        <td>{item.substractStock.toString()}</td>
                                                                                                        <td>{item.dateAvailable}</td>
                                                                                                        <td>{item.price}</td>

                                                                                                        <td> <button className='btn btn-outline btn-info m-5' aria-label='Edit' onClick={() => handleOpen(index)} ><i className='fa fa-pencil font-15' ></i></button></td>

                                                                                                    </tr>
                                                                                                </>
                                                                                            )
                                                                                        })}
                                                                                    </>) : (<> </>)}


                                                                                </tbody>

                                                                            </Table>

                                                                        </div>


                                                                    </div>
                                                                    <button className="btn btn-info text" onClick={handelChange}>

                                                                        <i className="fa fa-plus"></i>
                                                                    </button>
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
                                                                                <div className="col-lg-12">
                                                                                    {" "}
                                                                                    <h6> <b>Date Available</b>
                                                                                        <span
                                                                                            style={{ color: "red" }}
                                                                                        >
                                                                                            *
                                                                                        </span>
                                                                                    </h6>
                                                                                </div>
                                                                                <div className="col-lg-12">
                                                                                    <input
                                                                                        type="date"
                                                                                        className="form-control"
                                                                                        value={values.dateAvailable}
                                                                                        onChange={handleChange("dateAvailable")}

                                                                                    />
                                                                                </div>

                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <h6> <b>Value</b>
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
                                                                                            placeholder="Enter Value"
                                                                                            className="form-control"
                                                                                            value={values.value}
                                                                                            onChange={handleChange("value")}
                                                                                        ></input>
                                                                                    </div>
                                                                                </div>
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
                                                                                        <input type="number" placeholder="Enter Quantity"
                                                                                            className="form-control"
                                                                                            value={values.quantity}
                                                                                            onChange={handleChange("quantity")}

                                                                                        ></input>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <div className="row">
                                                                                    <div className="col-lg-12">
                                                                                        {" "}
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
                                                                                            <input type="number" placeholder="Enter Price"
                                                                                                className="form-control"
                                                                                                value={values.price}
                                                                                                onChange={handleChange("price")}
                                                                                            ></input>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row  d-flex form-group">
                                                                                    <div className="col-lg-12">
                                                                                        {" "}
                                                                                        <h6> <b>Substrack Stock</b>
                                                                                            <span
                                                                                                style={{ color: "red" }}
                                                                                            >
                                                                                                *
                                                                                            </span>
                                                                                        </h6>
                                                                                    </div>
                                                                                    <div className="d-flex">
                                                                                        <div className="col-lg-12">
                                                                                            <select
                                                                                                onChange={handleChange("substractStock")}
                                                                                                className="form-control"
                                                                                                value={values.substractStock}
                                                                                            >
                                                                                                <option>Select Option</option>
                                                                                                <option value={true}>Yes</option>
                                                                                                <option value={false}>No</option>
                                                                                            </select>
                                                                                        </div>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout >
    </>
    )
}
// const mapStateToProps = (state) => ({
//     gerneralData: state.general.General,
//     optionData: state.option.Option,
//     stockData: state.stock.Stock,
// });
export default Option;