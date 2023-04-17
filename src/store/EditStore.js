import React, { useState, useEffect } from "react";
import AdminLayout from '../core/AdminLayout'
import { Link, Redirect, useParams } from 'react-router-dom'
import AddStoreContent from "./AddStoreContent";

import { storeList } from "./ApiStore";
import { StoreUpdate } from "./ApiStore";
import 'react-toastify/dist/ReactToastify.css';
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";


export const Editstore = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));


    const redirectUser = () => {
        if (redirectToStore) {
            return <Redirect to={`/admin/storemanagement`} />;
        }
    }

    const [values, setValues] = useState({
        storeName: "",
        storeNameError: "",
        firstName: "",
        firstNameError: "",
        address: "",
        addressError: "",
        lastName: "",
        lastNameError: "",
        mobile: "",
        mobileError: "",
        password: "",
        passwordError: "",
        email: "",
        emailError: "",
        errorNotification: "",
        alertColour: "",
        displayNotification: "dn",
        storeId: "",
        redirectToStore: false,
    });
    const params = useParams();

    const {
        storeName,
        storeNameError,
        address,
        addressError,
        redirectToStore
    } = values;

    const getStoreList = () => {
        storeList(accessToken).then((data) => {
            data.data.result.map((prefill) => {
                if (prefill._id === params.storeId) {
                    setValues(prefill);
                }
            })

        });
    };
    useEffect(() => {
        getStoreList()
    }, [])

    const clickSubmit = (event) => {
        event.preventDefault();
        StoreUpdate({ ...values }, params.storeId, accessToken).then((data) => {
            if (data.status == false) {
                setValues({
                    ...values,
                    storeNameError: data.errors.storeName,
                    firstNameError: data.errors.firstName,
                    lastNameError: data.errors.lastName,
                    addressError: data.errors.address,
                    userNameError: data.errors.userName,
                    mobileError: data.errors.mobile,
                    passwordError: data.errors.password,
                    emailError: data.errors.email,
                });
                NotificationManager.error("Please check your details", '', 1000);

            } else {
                setValues({
                    storeName: "",
                    firstName: "",

                    lastName: "",

                    address: "",

                    userName: "",

                    mobile: "",

                    password: "",

                    email: "",
                });
                NotificationManager.success("User has been updated successfully", '', 1000);
                setTimeout(() => {
                    setValues({
                        ...values,
                        redirectToStore: true,
                    })

                }, 1000);
                getStoreList();

            }
        });
    };
    const handleChange = (name) => (event) => {
        console.log(name)
        setValues({
            ...values,
            [name]: event.target.value,
            addressError: "",
            storeNameError: "",

        });
    };

    return (
        <div>
            <AdminLayout>
                <NotificationContainer />


                <div className="row">

                    <div className="page-wrapper">
                        <div className="container-fluid">


                            <div className="row">
                                <div className="col-md-8">
                                    <h4 className="font-bold"> Edit Store</h4>
                                </div>
                                <div className="col-md-4">
                                    <Link to={`/admin/storemanagement`}>
                                        <button
                                            className="btn btn-outline btn-info fa-pull-right"
                                            id="addButton"
                                        >
                                            <i className="fa fa-backward"></i> Back
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">

                                    <form
                                        className="form-horizontal"
                                        id="myForm"
                                        autoComplete="false"
                                    >


                                        <AddStoreContent
                                            label="Store Name"
                                            placeholder="Enter store name"
                                            type="text"
                                            value={values.storeName}
                                            onChange={handleChange("storeName")}
                                            errorSpan={values.storeNameError}
                                        />
                                        <AddStoreContent
                                            label="Store Address"
                                            placeholder="Enter Store Address"
                                            type="text"
                                            value={values.address}
                                            onChange={handleChange("address")}
                                            errorSpan={values.addressError}
                                        />
                                        <div className="col-md-6 t-a-r">
                                            <button
                                                type="submit"
                                                className="btn btn-rounded-min btn-primary"
                                                onClick={clickSubmit}
                                            >
                                                Update Store
                                                {redirectUser()}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

















            </AdminLayout>
        </div>
    )
}
