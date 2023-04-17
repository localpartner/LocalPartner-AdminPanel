import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../core/AdminLayout';
import { connect } from "react-redux"
import { addImage } from '../../actions';
import { updateProduct } from '../apiAdmin';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import { Navbar } from './Navbar';
import { image } from '../../reducers/image';
const AddImage = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [values, setValues] = useState({
        primaryImage: '',
        name: '',

    });
    const [baseImage, setBaseImage] = useState("");
    const [errormessage, setErrorMessage] = useState()

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    console.log(values, "imagessss")
    let payload = {};
    let data = [];

    const handleChange = (name) => (event) => {

        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const clickSubmit = (event) => {
        if (values.primaryImage == '' ||
            values.name == '') {
            // setErrorMessage("Fill All Fields")
            toast.error('Fill All Fields', {
                autoClose: 600,
                onClose: () => {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }
            })
        } else {
            event.preventDefault();
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
            setValues({ values, error: false });
            props.dispatch(addImage(values, baseImage))


            payload = {
                name: props.gerneralData[0].productName.name,

                price: props.gerneralData[0].productName.price,



                images: [
                    {
                        primaryImage: values.primaryImage,
                        name: values.name,
                        content: baseImage
                    }
                ]

            }
            updateProduct(payload, props.gerneralData[0].productName.code, accessToken).then(data => {
                if (data.error) {
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
                                                                    <div>
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
                                                                                    <b> Image Name</b>
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
                                                                                    placeholder="Name"
                                                                                    onChange={handleChange("name")}
                                                                                />
                                                                            </div>
                                                                        </div>






                                                                        <div className="row form-group">
                                                                            <div className="col-lg-2">

                                                                                <h6>
                                                                                    <b> Primary Image</b>
                                                                                    <span
                                                                                        style={{ color: "red" }}
                                                                                    >
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>

                                                                            <div className="col-lg-10">
                                                                                <select className='form-control' onChange={handleChange("primaryImage")}
                                                                                >
                                                                                    <option className='form-control'>Select SubstractStock </option>
                                                                                    <option className='form-control' value={true}>Yes</option>
                                                                                    <option className='form-control' value={false}>No</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>

                                                                        {/* icon */}
                                                                        <div className="row form-group">
                                                                            <div className="col-lg-2">
                                                                                <h6>
                                                                                    <b>  Image</b>
                                                                                    <span
                                                                                        style={{ color: "red" }}
                                                                                    >
                                                                                        *
                                                                                    </span>
                                                                                </h6>
                                                                            </div>

                                                                            <div className="col-lg-10">

                                                                                <input
                                                                                    className="form-control"
                                                                                    type="file"
                                                                                    onChange={(e) => {
                                                                                        uploadImage(e);
                                                                                    }}
                                                                                />
                                                                                <img src={baseImage} height="200px" />
                                                                            </div>
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
export default connect(mapStateToProps)(AddImage)