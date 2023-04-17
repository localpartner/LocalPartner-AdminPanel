import React, { useState, useEffect } from 'react';
import AdminSidebar from "../../user/AdminSidebar";
import AdminHeader from "../../user/AdminHeader";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { links } from '../../actions';
import Table from "react-bootstrap/Table"
import { getCategories, updateProduct } from '../apiAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Navbar } from './Navbar';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-toastify/dist/ReactToastify.css';
const LinkAdd = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [values, setValues] = useState({
        brandName: "",
        // code1: "",
        code: "",
        subCode: "",

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
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);
    const [optionRadio, setOptionRadio] = useState([])

    const [autoComplete, setAutoComplete] = useState([])
    const [matchCode, setMatchCode] = useState({
        code: '', subCode: ""
    });
    const newSubcategory = [];
    const handleOpen = () => {
        setOpen(true)
    }

    let count = 0
    if (values.code !== '') {
        for (let i = 0; i < autoComplete.length; i++) {
            console.log(autoComplete[i], "kkk")

            if (autoComplete[i].code === values.code) {

                newSubcategory.push(autoComplete[i].subcategories)

            }

        }
    }
    let category = [];
    const clickSave = event => {
        event.preventDefault()
        for (let i = 0; i < props.linksData.length; i++) {
            console.log(props.linksData, "propslinkdata");

            category.push({
                code: props.linksData[0].code.values.code,
                subCode: props.linksData[0].code.values.subCode
            })
        }
        payload = {
            name: props.gerneralData[0].productName.name,
            code: props.gerneralData[0].productName.code,
            description: props.gerneralData[0].productName.description,
            price: props.gerneralData[0].productName.price,
            links: {
                brand: props.linksData[0].code.values.brandName,
                category: category

            }

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

    const init = () => {
        getCategories(accessToken).then(data => {
            console.log(data)

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setAutoComplete(data.data.result)

            }
        });
    };
    useEffect(() => {
        init();
        setOptionRadio(props.linksData)
    }, [props.linksData])
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
    const handleChangeCode = (code) => (event) => {
        setMatchCode({
            ...matchCode, [code]: event.target.value
        });

    };

    let payload = {};


    const clickSubmit = (event) => {
        event.preventDefault();
        if (values.startDate == "" ||
            values.brandName == "" ||
            values.code == "" ) {
            setErrorMessage("Fill all fields")
        }
        else {
            setErrorMessage("")
            setValues({ ...values, error: false });
            props.dispatch(links({ values }));
            setValues({
                code: "",
                subCode: ""
            })
        }
    }

    return (<>


        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <NotificationContainer />
            <div className="page-wrapper">
                <div className="container-fluid">
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
                                                                                <b>Brand Name</b>
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-lg-10">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Brand Name"
                                                                                onChange={handleChange("brandName")}
                                                                            />
                                                                        </div>
                                                                    </div>


                                                                    <div >
                                                                        <Table striped bordered hover size="sm">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>
                                                                                        <h5>Code</h5>
                                                                                    </th>
                                                                                    <th>
                                                                                        <h5>SubCode</h5>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {optionRadio.map((item, index) => {
                                                                                    console.log(item, "redux discount")

                                                                                    return (
                                                                                        <>
                                                                                            <tr>
                                                                                                <td>{item.code.values.code}</td>
                                                                                                <td>{item.code.values.subCode}</td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                })}
                                                                                {/* {tableBody.map((val, index) => {
                                                                                    return (
                                                                                        <>
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <select className=' form-control border-0 p-0' onChange={handleChange("code")}>
                                                                                                        <option>  Category</option>
                                                                                                        {autoComplete.map((role) => {
                                                                                                            return (
                                                                                                                <option value={role._id}>{role.code}</option>
                                                                                                            )
                                                                                                        })
                                                                                                        }

                                                                                                    </select>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <select className=' form-control border-0 p-0' onChange={handleChange("subCode")}>
                                                                                                        <option>  Subcategory</option>
                                                                                                        {newSubcategory.length === 1 ? (<>
                                                                                                            {newSubcategory[0].map((role) => {

                                                                                                                return (
                                                                                                                    <option value={role._id}>{role.code}</option>
                                                                                                                )
                                                                                                            })
                                                                                                            } </>) : (<>
                                                                                                            </>)}


                                                                                                    </select>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                })} */}



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
                                                                                        <div className="col-lg-4" > <h6><b>Links Value</b></h6></div>
                                                                                    </div>
                                                                                    <div> <hr style={{ width: "100%" }} /></div>

                                                                                </div>
                                                                                <div style={{ display: 'flex', gap: '10px' }}>


                                                                                    <div>
                                                                                        <td>
                                                                                            <select className=' form-control border-0 p-0' onChange={handleChange("code")}>
                                                                                                <option>  Category</option>
                                                                                                {autoComplete.map((role) => {
                                                                                                    return (
                                                                                                        <option value={role._id}>{role.code}</option>
                                                                                                    )
                                                                                                })
                                                                                                }

                                                                                            </select>
                                                                                        </td>
                                                                                    </div>
                                                                                    <div>
                                                                                        <td>
                                                                                            <select className=' form-control border-0 p-0' onChange={handleChange("subCode")}>
                                                                                                <option>  Subcategory</option>
                                                                                                {newSubcategory.length === 1 ? (<>
                                                                                                    {newSubcategory[0].map((role) => {

                                                                                                        return (
                                                                                                            <option value={role._id}>{role.code}</option>
                                                                                                        )
                                                                                                    })
                                                                                                    } </>) : (<>
                                                                                                    </>)}


                                                                                            </select>
                                                                                        </td>
                                                                                    </div>
                                                                                </div>



                                                                                <div className="col-lg-7">
                                                                                    <button
                                                                                        className="btn btn-info btn-md"
                                                                                        onClick={clickSubmit}
                                                                                        style={{
                                                                                            float: "right",
                                                                                            borderRadius: "7px"
                                                                                        }}
                                                                                    >

                                                                                        Save
                                                                                    </button>
                                                                                </div>

                                                                                <span className="text-danger">{errormessage}</span>
                                                                            </div>
                                                                        </Fade>
                                                                    </Modal>
                                                                    <span className='text-danger'>{errormessage}</span>
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
export default (connect)(mapStateToProps)(LinkAdd)