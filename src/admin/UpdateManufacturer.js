import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect, useParams } from 'react-router-dom';
import { getManufacturer, updateManfacturer } from './apiAdmin';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateManufacturer = ({ match }) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

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

        description: '',
        errormanufacturerName: '',
        imageName: '',
        nameError: '',
        imageDescription: '',
        imageError:'',
        imageNameError:'',
        imageDescriptionError:'',
        error: '',
        success: false,
        redirectToProfile: false,
        formData: ''
    });
    const params = useParams();
    const { user, token } = isAuthenticated();

    const { description, error, success, redirectToProfile, imageName, imageDescription } = values;

    const init = () => {
        getManufacturer(params.manufacturerId, accessToken).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
              
                    setValues({
                        ...values,
                        description:data.data.result.description,
                        imageName: data.data.result.img.name,
                        imageName: data.data.result.img.name,
                        imageDescription: data.data.result.img.description
                    });
                
               
                

            }
            setBaseImage(data.data.result.img.data)
        });
    };

    useEffect(() => {
        init(match.params.manufacturerId);
    }, []);


    const handleChange_des = description => event => {
        setValues({ ...values, error: false, [description]: event.target.value });
    };
    let img = {
        name: values.imageName,
        imageDescription: values.imageDescription,
        data: baseImage
    }
    const submitCategoryForm = e => {
        e.preventDefault();

        updateManfacturer(match.params.manufacturerId, { description, img }, accessToken).then(data => {
console.log(data)
            if (data.errors ) {
                setValues({
                    ...values,
                    nameError: "Name is Required",
                    descriptionError: "Description is required",
                    imageError:"Image is required required",
                    imageDescriptionError:"Image Description is ",
                    imageNameError:"Image name is required"
                });

            }
            else {
                setValues({
                    ...values,
                    description: "",
                    errormanufacturerName: '',
                    error: false,
                    success: true,
                    redirectToProfile: false
                });

                toast.success('Updated successfully!', {
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

    const updateCategoryForm = () => (
        <div className="">
            <form className="mb-3" onSubmit={submitCategoryForm}>

                <div className="form-group col-lg-7">
                    <h6><b> Manufacturer Description</b></h6>
                    <textarea onChange={handleChange_des('description')} rows="4" className="form-control" placeholder='Description' value={description} description="description" />
                    <span className='error text-danger'>{values.descriptionError}</span>

                </div>

                <div className="form-group col-lg-7">
                    <h6><b> Image Name</b></h6>
                    <input onChange={handleChange_des('imageName')} className="form-control" placeholder='imageName' value={imageName} description="description" />
                    <span className='error text-danger'>{values.imageNameError}</span>

                </div>
                <div className="form-group col-lg-7">
                    <h6><b> Image Description</b></h6>
                    <input onChange={handleChange_des('imageDescription')} className="form-control" placeholder='imageDescription' value={imageDescription} description="description" />
                    <span className='error text-danger'>{values.imageDescriptionError}</span>

                </div>
                <div className="form-group col-lg-7">
                    <h6><b> Image </b></h6>
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
                <div className='col-lg-7'>
                    <button className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}>Update</button>
                </div>
            </form>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Manufacture update successfully </a>
        </div>
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/manufacturers" />;
            }
        }
    };



    return (
        <div className="row">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-md-8'><h4 className="font-bold"> Edit Manufacture</h4></div>
                        <div className='col-md-4'><Link to={`/admin/manufacturers`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                    <ToastContainer />
                                    {/* <NotificationContainer/> */}
                                    {/* {showSuccess()} */}
                                    {showError()}
                                    {updateCategoryForm()}
                                    {redirectUser()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateManufacturer;
