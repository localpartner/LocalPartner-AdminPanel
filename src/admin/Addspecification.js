import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AdminSidebar from "../user/AdminSidebar";
import { createspecification, getActiveAttributes } from "./apiAdmin";
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAttributes } from "../actions";

export const fetchActiveAttributes = async (dispatch) => {
    try {
        const res = await getActiveAttributes();
        console.log(res.data.result, "resa")
        dispatch(fetchAttributes(res.data.result));
    } catch (err) {
        console.log(err);
    }
};

const mapState = (state) => {
    console.log(state);
    return (state.staticData && state.staticData.attributes ? state.staticData.attributes : [])
}

const Addspecification = () => {

    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [values, setValues] = useState({
        name: '',
        code: '',
        description: '',
        errorDescription: '',
        specificationGroup: '',
        errorCode: '',
        errorsSpecificationName: '',
        errorsSpecificationValue: '',

        error: '',
        success: false,
        redirectToProfile: false
    });
    const [type, setType] = useState();
    const [attributeCode, setAttributeCode] = useState();
    const setSpecificationType = (e) => {
        setType(e.target.value)
        setAttributeCode("");

    }

    const setAttribute = (e) => {
        setAttributeCode(e.target.value);

    }

    const dispatch = useDispatch();

    useEffect(() => {
        fetchActiveAttributes(dispatch);
    }, []);

    const attributes = useSelector(mapState);




    const { manufacturerName, name, specificationGroup, code, description, success, error, redirectToProfile } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value, errorsSpecificationName: '', errorDescription: '', errorCode: '', errorGroup: '', errorType: '' });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });

        createspecification({ name, specificationGroup, description, code, type, attributeCode }, accessToken).then(data => {
            if (data.errors) {
                setValues({
                    ...values,
                    errorsSpecificationName: data.errors.name,
                    errorDescription: "Description is Required",
                    errorCode: data.errors.code,
                    errorType: data.errors.type,
                    errorGroup: "Specification Group is Required",
                });
                //NotificationManager.error(data.message);
                toast.error(data.message, {
                    autoClose: 500
                })
            }
            else {
                setValues({
                    ...values,
                    name: '',
                    specificationgroup: '',
                    errorsSpecificationName: '',
                    description: '',
                    errorCode: '',
                    errorDescription: '',
                    errorType: '',
                    errorGroup: '',
                    error: '',
                    success: false,
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
                //NotificationManager.success('Specification has been added successfully!','',2000);
                //setTimeout(function () {
                //setValues({
                //...values,
                //redirectToProfile: true
                //})
                //}, 2000)
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
            <a className='text-center' style={{ color: 'white' }}> Specification add successfully </a>
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            return <Redirect to="/admin/SpecificationList" />;
        }
    };

    return (
        <>
            <div id="wrapper">
                <AdminSidebar />

                <div className="page-wrapper">
                    <div className="container-fluid">
                        {/* <Select options={options} isMulti='true'/> */}
                        <ToastContainer />
                        {/*<NotificationContainer />*/}
                        <div className='row'>
                            <div className='col-md-8'><h3 className="font-bold"> Add Specification</h3></div>
                            <div className='col-md-4'><Link to={`/admin/SpecificationList`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i className="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    {showError()}
                                    <form onSubmit={clickSubmit}>
                                        {/* {showSuccess()} */}
                                        {redirectUser()}
                                        <div className="demoPage" style={{ background: '#ffffff', padding: '20px' }}>
                                            <div className="form-group col-lg-7 ">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Specification Name</b></h6>
                                                <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter name' />
                                                <span className='error text-danger'>{values.errorsSpecificationName}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Specification code</b></h6>
                                                <input type="text" className="form-control" onChange={handleChange('code')} placeholder="Enter values" value={code} />
                                                <span className='error text-danger'>{values.errorCode}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b> <span style={{ color: 'red' }}>*</span>Specification Description</b></h6>
                                                <textarea onChange={handleChange('description')} rows="4" type="text" className="form-control" placeholder='Description' value={description}></textarea>
                                                <span className='error text-danger'>{values.errorDescription}</span>

                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b> <span style={{ color: 'red' }}>*</span>Specification Group</b></h6>
                                                <input type="text" className="form-control" onChange={handleChange('specificationGroup')} placeholder="Enter values" value={specificationGroup} />
                                                <span className='error text-danger'>{values.errorGroup}</span>

                                            </div>

                                            <div className="form-group col-lg-7">
                                                <div className="form-group col-lg-6">
                                                    <h6><b><span style={{ color: 'red' }}>*</span> Type </b></h6>
                                                    <select className=' form-control border-0 p-0' onChange={(e) => setSpecificationType(e)}  >
                                                        <option> Select Type</option>
                                                        <option value="text">Text</option>
                                                        <option value="attribute">Attribute</option>



                                                        {/* {user.map((role) => {
                                                            return (
                                                                <option value={role._id}>{role.roleName}</option>
                                                            )
                                                        })
                                                        } */}

                                                    </select>
                                                    <span className='text-danger' > {values.errorType}</span>
                                                </div>
                                                {type == "attribute" &&
                                                    <div className="form-group col-lg-6">
                                                        <h6><b><span style={{ color: 'red' }}>*</span>Attribute</b></h6>
                                                        <select className=' form-control border-0 p-0' onChange={(e) => setAttribute(e)}  >
                                                            <option> Select Type</option>
                                                            {attributes.map((attr) => {
                                                                return (
                                                                    <option value={attr.name}>{attr.name}</option>
                                                                )
                                                            })
                                                            }

                                                        </select>
                                                        <span className='text-danger' > {values.errorType}</span>
                                                    </div>}
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <button className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px' }}>Submit</button>
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


export default Addspecification;

