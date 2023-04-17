import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../core/AdminLayout';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './Navbar';
import { getProduct, updateProduct } from '../apiAdmin';
import { useParams } from 'react-router-dom';
const AddImage = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [user, setUser] = useState();

    const [values, setValues] = useState({
        primaryImage: '',
        name: '',
        content: "",
        price: '',
        name: ''
    });
    let params = useParams()
    const loadUser = () => {
        getProduct(params.productId,accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setUser(data);
                if (data.data.result.images.length !== 0) {
                    setValues({
                        ...values,
                        primaryImage: data.data.result.images[0].primaryImage,
                        name: data.data.result.images[0].name,
                        content: data.data.result.images[0].content,
                        price: data.data.result.price,
                        name: data.data.result.name
                    })
                    setBaseImage(data.data.result.images[0].content)
                }
                else {
                    setValues({
                        primaryImage: "",
                        name: "",
                        content: ""
                    })
                }
            }

        });
    };
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

    const handleChange = (name) => (event) => {

        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const { name, price } = values;
    let images = {
        primaryImage: values.primaryImage,
        content: baseImage, name: values.name
    }
    let payload = { name, price, images: images }
    const clickSubmit = (event) => {
        if (values.primaryImage == '' ||
            values.name == '') {
            setErrorMessage("Fill All Fields")
        } else {
            event.preventDefault();
            setErrorMessage("")
            setValues({ values, error: false });
            updateProduct(payload, params.productId,accessToken)
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
    }, []);
    return (
        <>

            <AdminLayout>
                <NotificationContainer />
                <div id="wrapper">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className='row'>
                                <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'> Update Product</h3></div>
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
                                                                    <div>
                                                                        <div className='col-lg-12'><hr style={{ color: "solid black", marginTop: "0px", marginBottom: "40px" }} /></div>
                                                                        <div className="row form-group">

                                                                            <div className="col-lg-10">
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
                                                                                            value={values.name}
                                                                                            onChange={handleChange("name")}

                                                                                        />
                                                                                    </div>
                                                                                </div>


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
                                                                                    value={values.primaryImage}


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
export default AddImage