import React, { useState, useEffect } from 'react';
import AdminSidebar from "../../user/AdminSidebar";
import AdminHeader from "../../user/AdminHeader";
import { Link, useParams } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { getProduct, getCategories, updateProduct } from '../apiAdmin';
import Table from "react-bootstrap/Table"
import { Navbar } from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'react-toastify/dist/ReactToastify.css';
const LinkAdd = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [notEdited, setNotEdited] = useState([])
    const [optionRadio, setOptionRadio] = useState([])
    const [prefill, setPrefill] = useState();
    const [indexs, setIndexs] = useState()
    const [user, setUser] = useState();
    const [open, setOpen] = React.useState(false);

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
    const [values, setValues] = useState({
        brand: "",
        code: "",
        subCode: "",
        name: '',
        price: ''

    })
    const loadUser = () => {
        getProduct(params.productId, accessToken).then(data => {
            console.log(data.data.result, "kkkk")
            if (data.error) {
                console.log(data.error);
            }
            else {
                setUser(data.data.result.links);
                setPrefill(data.data.result.links)

                if (data.data.result.links !== undefined) {
                    setValues({
                        ...values,
                        brand: data.data.result.links.brand,
                        code: data.data.result.links.category,
                        price: data.data.result.price,
                        name: data.data.result.name

                    })
                }
                else {
                    setValues({
                        brand: "",
                        price: data.data.result.price,
                        name: data.data.result.name
                    })
                }
            }
        });
    };
    const init = () => {
        getCategories(accessToken).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setAutoComplete(data.data.result)

            }
        });
    };
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };
    let notEditedData = [];
    const handleOpen = (index) => {
        setIndexs(index)
        setOpen(true);

        for (let i = 0; i < prefill.category.length; i++) {
            if (i === index) {
                setValues({
                    ...values,
                    code: prefill.category[i].code,
                    subCode: prefill.category[i].subCode,
                })
            }
            else {

                notEditedData.push(prefill.category[i])
                console.log(notEditedData, "data not clicked")
            }
        }
        setNotEdited(notEditedData)
        console.log(notEdited, "data in notEdited in loop")
    };
    const [autoComplete, setAutoComplete] = useState([])
    const newSubcategory = [];
    if (values.code !== '') {
        for (let i = 0; i < autoComplete.length; i++) {

            if (autoComplete[i].code === values.code) {
                const len = autoComplete[i].subcategories.length;

                newSubcategory.push(autoComplete[i].subcategories)
            }

        }
    }
    console.log(prefill, "hello prefill")
    let category = [{
        code: values.code,
        subCode: values.subCode
    }];
    for (let i = 0; i < notEdited.length; i++) {
        console.log(notEdited, "push krne se phle")
        category.push(notEdited[i])
        console.log(category, "category mai data push kiya ")
    }

    const handelChange = () => {
        setOpen(true)

        setNotEdited(prefill.category)


    }

    console.log(notEdited, "in new value...")

    let params = useParams()

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

    const { name, price, brand } = values;
    let links = {
        brand,
        category: category
    }
    let payload = { name, price, links }
    const clickSubmit = (event) => {
        event.preventDefault();
        if (values.brand == "" ||
            values.code == ""
        ) {
            setErrorMessage("Fill all fields")
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
        loadUser();
        init();
    }, [])
    return (<>


        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <NotificationContainer />
            <div className="page-wrapper">
                <div className="container-fluid">



                    <div className='row'>
                        <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'> Edit Product</h3></div>
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
                                                                                onChange={handleChange("brand")}
                                                                                value={values.brand}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div >
                                                                        <Table striped bordered hover size="sm">
                                                                            <thead>
                                                                                <tr>



                                                                                    <th>
                                                                                        <h5><b>Category</b></h5>
                                                                                    </th>
                                                                                    <th>
                                                                                        <h5><b>SubCategory</b></h5>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {user !== undefined ? (<>


                                                                                    {user.category.map((item, index) => {
                                                                                        return (
                                                                                            <>
                                                                                                <tr>
                                                                                                    <td>{item.code}</td>
                                                                                                    <td>{item.subCode}</td>



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
                                                                                                    <input type="text" className="form-control" placeholder=' Category'

                                                                                                        onChange={handleChange("code")} />
                                                                                                </td>

                                                                                                <td>
                                                                                                    <input type="text" className="form-control" placeholder=' SubCategory' onChange={handleChange("subCode")} />
                                                                                                </td>
                                                                                                <td>
                                                                                                    {<button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}>Submit</button>}

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
                                                                                        <div className="col-lg-4" > <h6><b>Links Value</b></h6></div>
                                                                                    </div>
                                                                                    <div> <hr style={{ width: "100%" }} /></div>

                                                                                </div>
                                                                                <div style={{ display: 'flex', gap: '10px' }}>


                                                                                    <div>
                                                                                        <td>
                                                                                            <select className=' form-control border-0 p-0' value={values.code} onChange={handleChange("code")}>
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
                                                                                            <select className=' form-control border-0 p-0' value={values.subCode} onChange={handleChange("subCode")}>
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



                                                                                <div className="col-lg-10">
                                                                                    <button className="btn btn-info btn-md" onClick={clickSubmit} style={{ float: 'right', borderRadius: '7px' }}> Submit </button>
                                                                                </div>
                                                                                <span className="text-danger">{errormessage}</span>
                                                                            </div>
                                                                        </Fade>
                                                                    </Modal>
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


    </>)
}
export default LinkAdd