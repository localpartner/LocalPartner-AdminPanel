
import React, { useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createManufacturer } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { image } from '../reducers/image';


const AddManufacturer = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"))
    const [baseImage, setBaseImage] = useState("");
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

    const [values, setValues] = useState({
        name: '',
        nameError: '',
        descriptionError: '',
        imageError:'',
        imageNameError:'',
        imageDescriptionError:'',
        description: '',
        imageName: '',
        data: '',
        imageDescription: '',
        error: '',
        success: false,
        redirectToProfile: false
    });
    const [duplicateName, setDuplicateName] = useState()

    const { name, description, success, error, redirectToProfile } = values;

    const handleChange = name => event => {
        setValues({
            ...values, error: false, [name]: event.target.value, errormanufacturerName: '',
            nameError: '', descriptionError: '',imageError:'',imageNameError:'',
            imageDescriptionError:''
        });
    };
    let img = {
        name: values.imageName,
        description: values.imageDescription,
        data: baseImage
    }


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        createManufacturer({ name, description, img }, accessToken).then(data => {
            console.log(data)
            if (data.errors) {
                setValues({
                    ...values,
                    nameError: data.errors.name,
                    descriptionError: "Description is required",
                    imageError:"Image is required required",
                    imageDescriptionError:"Image Description is ",
                    imageNameError:"Image name is required"

                });
                toast.error(data.message, {
                    autoClose: 500
                })


            }
            else if (data.error) {
                setDuplicateName("Name  Already Exist")
            }
            else {
                setValues({
                    ...values,
                    name: '',
                    nameError: '',
                    description: '',
                    descriptionError: '',
                    error: '',
                    NotificationManager: false,
                    redirectToProfile: false
                });
                toast.success('Added successfully!', {
                    autoClose: 600,
                    onClose: () => {
                        setValues({
                            ...values,
                            redirectToProfile: true
                        })
                    }
                })

            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Manufacture add successfully </a>
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            return <Redirect to="/admin/manufacturers" />;
        }
    };
    return (
        <>
            <div id="wrapper">
                <AdminHeader />
                <AdminSidebar />
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><h4 className="font-bold"> Add Manufacture</h4></div>
                            <div className='col-md-4'><Link to={`/admin/manufacturers`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <ToastContainer />
                                {/* <NotificationContainer/> */}
                                <div className="col-lg-12">
                                    <form>
                                        {/*{showSuccess()}
                                        {showError()} */}
                                        {redirectUser()}
                                        <div class="demoPage" style={{ background: '#ffffff', padding: '20px' }}>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Manufacturer Name</b></h6>
                                                <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter name' value={name} />
                                                <span className='error text-danger'>{values.nameError}</span>
                                                <span className='error text-danger'>{duplicateName}</span>

                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b> Manufacturer Description</b></h6>
                                                <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                                <span className='error text-danger'>{values.descriptionError}</span>

                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b>Image Name</b></h6>
                                                <input type="text" className="form-control" placeholder='Enter name' onChange={handleChange('imageName')} />
                                                <span className='error text-danger'>{values.imageNameError}</span>

                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b>Image Description</b></h6>
                                                <input type="text" className="form-control" placeholder='Enter name' onChange={handleChange('imageDescription')} />
                                                <span className='error text-danger'>{values.imageDescriptionError}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b>Select Image</b></h6>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    onChange={(e) => {
                                                        uploadImage(e);
                                                    }}
                                                />
                                                <img src={baseImage} height="200px" />
                                                <span className='error text-danger'>{values.imageError}</span>
                                            </div>
                                            <div className="col-lg-7">
                                                <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}> Submit </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}


export default AddManufacturer;

