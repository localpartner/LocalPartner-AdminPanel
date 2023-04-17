import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import AdminLayout from "../../core/AdminLayout";
import { Navbar } from "./Navbar";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAttributes,specifications } from "../../actions";
import { updateProduct } from '../apiAdmin';
import Table from "react-bootstrap/Table"
const SpecificationTable = (args) =>{
    const dispatch = useDispatch();
    return (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>
                    <h5><b>Group</b></h5>
                </th>
                <th>
                    <h5><b>Name</b></h5>
                </th>
                <th>
                    <h5><b>Value</b></h5>
                </th>   
                <th>                  
                </th>             
            </tr>
        </thead>
        <tbody>
            {args.tableData.map((item, index) => {
              
                return (
                   
                        <tr>
                            <td>{item.group}</td>
                            <td>{item.code}</td>
                            <td>{item.value}</td>
                            <td>
                                <button className="btn btn-info" >
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-outline btn-danger" >
                                    <i className="fa fa-trash-o"></i>
                                </button>
                               
                            </td>                           
                        </tr>
                 
                )
            })}
            <tr>
                <td colSpan={3}></td>
                <td>
                    <div>
                        <button className="btn btn-info" ><i className="fa fa-plus"></i></button>
                    </div>
                </td>
            </tr>

        </tbody>
    </Table>);
}

const SpecificationModalDialog = (args)=>{

return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description"
        className={classes.modal}  open={args.isOpen} onClose={args.handleClose} closeAfterTransition
        BackdropComponent={Backdrop} BackdropProps={{timeout: 500}} style={{ borderRadius: "10px" }}>
        <Fade in={open} style={{padding: "40px",width: "40%"}}>
            <div className={classes.paper}>
                <div className="row">
                    <div className="row">
                        <div className="col-lg-1" style={{ display: "flex", alignItem: "center", justifyContent: "center", paddingTop: "10px" }}><b><i className="fa fa-pencil" style={{ marginLeft: "35px" }}></i></b></div>
                        <div className="col-lg-4" > <h6><b>Specification Details</b></h6></div>
                    </div>
                    <div> <hr style={{ width: "100%" }} /></div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h6> <b>Quantity</b>
                            <span style={{ color: "red" }}
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

                                onChange={handleChange("endDate")}

                            />

                        </div>
                    </div>
                </div>


                <div className="col-lg-7">
                    <button
                        className="btn btn-info btn-md"
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


            </div>
        </Fade>
    </Modal>)
}
const Specification = (props) => {
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
            updateProduct(payload, props.gerneralData[0].productName.code).then(data => {
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
                                                    <SpecificationTable tableData={[]}/>
                                                </div>

                                                <span className="text-danger text-center">{errormessage}</span>
                                                <div className="row form-group">
                                                    <div className="col-lg-12 float-right ">
                                                        <button onClick={clickSubmit} className="btn btn-danger btn-md" style={{float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                                                        <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                                                        
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