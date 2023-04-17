import React, { useState, useEffect } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createUser, getUser, getRoleList } from "./apiUser";
import { Redirect } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


const AddUser = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const [roleId, setSelectapioption] = useState();



    const [user, setUser] = useState([]);
    const [listData, setListData] = useState();
    console.log(listData, "listData")
    const [emailError, setEmailError] = useState();
    const params = useParams();

    const getData = () => {
        getRoleList(params.storeId, accessToken).then((data => {
            setUser(data.data.data);

        })
        )
    }
    const loadUser = () => {
        getUser(params.storeId, accessToken).then(data => {


            if (data.error) {
                console.log(data.error);
            } else {
                setListData(data.data.data);

            }
        });
    };


    useEffect(() => {
        getData();
        loadUser();
    }, []);





    const getRoleId = (e) => {


        setSelectapioption(e.target.value);

    }

    const [values, setValues] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: '',
        error: '',
        firstNameError: '',
        lastNameError: '',
        mobileError: '',
        emailError: '',
        passwordError: '',
        roleError: "",
        success: false,
        redirectToProfile: false
    });

    const { email, password, mobile, storeId, firstName, lastName, error, redirectToProfile, } = values;
    // var role = 5;
    // const loadUser = () => {
    //     getUser().then(data => {
    //         if (data.error) {
    //         } else {
    //             setValues({userId : data[0]._id, storeId :params.storeId, role:role});
    //         }
    //     });
    // };

    const handleChange = email => event => {
        if (listData.length !== 0) {
            listData.map((item) => {
                console.log(item, "item")
                if (item.email === event.target.value) {

                    toast.error("Email Already Exist", {
                        autoClose: 800
                    })
                }
                else {

                    setValues({
                        ...values, error: false, [email]: event.target.value,
                        firstNameError: '',
                        lastNameError: '',
                        mobileError: '',
                        emailError: '',
                        passwordError: '',
                        roleError: "",

                    });
                }


            });
        }
        else {
            setValues({
                ...values, error: false, [email]: event.target.value,
                firstNameError: '',
                lastNameError: '',
                mobileError: '',
                emailError: '',
                passwordError: '',
                roleError: "",

            });
        }


    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        createUser({ email, password, mobile, firstName, lastName, roleId }, params.storeId, accessToken).then(data => {
            
            if (data.error) {
                setValues({
                    ...values,
                    firstNameError: data.error.firstName,
                    lastNameError: data.error.lastName,
                    mobileError: data.error.mobile,
                    emailError: data.error.email,
                    passwordError: data.error.password,
                    roleError: data.error.roleId
                });
            }
            else if (data.errors) {
                setEmailError("Email Already Exist")
            }


            else {
                setValues({

                    ...values,
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    mobile: '',
                    error: '',
                    firstNameError: '',
                    lastNameError: '',
                    mobileError: '',
                    emailError: '',
                    passwordError: '',
                    roleError: "",
                    success: true,
                    redirectToProfile: false,
                });
                NotificationManager.success("User has been added successfully", '', 2000);
                setTimeout(function () {
                    setValues({
                        ...values,

                        redirectToProfile: true
                    })
                }, 2000)
            }
        });
    };
    const redirectUser = () => {
        if (redirectToProfile) {
            return <Redirect to={`/admin/user/list/${params.storeId}`} />;
        }
    };

    return (
        <>
            <div id="wrapper">
                <AdminHeader />
                <AdminSidebar />
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <ToastContainer />
                        <NotificationContainer />
                        <div className='row'>
                            <div className='col-md-8'><h4 className="font-bold"> Add Users</h4></div>
                            <div className='col-md-4'><Link to={`/admin/user/list/${params.storeId}`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        {redirectUser()}

                                        <input hidden value={values.userId} />
                                        <input hidden value={values.storeId} />
                                        <input hidden value={values.role} />

                                        <div class="demoPage" style={{ background: '#ffffff', padding: '20px' }}>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> FirstName

                                                </b></h6>
                                                <input onChange={handleChange('firstName')} type="text" className="form-control" placeholder='Enter FirstName' />
                                                <span className='text-danger'>{values.firstNameError}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> LastName

                                                </b></h6>
                                                <input onChange={handleChange('lastName')} type="text" className="form-control" placeholder='Enter LastName' />
                                                <span className='text-danger'>{values.lastNameError}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Mobile </b></h6>
                                                <input onChange={handleChange('mobile')} type="text" maxLength={10} className="form-control" placeholder='Enter mobile' onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} />
                                                <span className='text-danger'>{values.mobileError}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Email </b></h6>
                                                <input onChange={handleChange('email')} type="text" className="form-control" placeholder='Enter name' />
                                                <span className='text-danger'>{values.emailError}</span>
                                                <span className='text-danger'>{emailError}</span>

                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Password </b></h6>
                                                <input onChange={handleChange('password')} type="password" className="form-control" placeholder='Enter password' autoComplete="new-password" />
                                                <span className='text-danger'>{values.passwordError}</span>
                                            </div>
                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{ color: 'red' }}>*</span> Role </b></h6>
                                                <select className=' form-control border-0 p-0' onChange={(e) => getRoleId(e)}   >
                                                    <option> Select Role</option>
                                                    {user.map((role) => {
                                                        return (
                                                            <option value={role._id}>{role.roleName}</option>
                                                        )
                                                    })
                                                    }

                                                </select>
                                                <span className='text-danger' > {values.roleError}</span>

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
            </div >
        </>

    )

}

export default AddUser;

