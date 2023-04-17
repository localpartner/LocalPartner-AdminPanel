import React, { useState, useEffect, useCallback } from "react";
import AddStoreContent from "./AddStoreContent";
import { addStoreData } from "./ApiStore";
import { Link, useParams, useForm, useHistory } from "react-router-dom";
import FormMainTitle from "../common/FormMainTitle";
import { storeList } from "./ApiStore";
import { deleteStore } from "../store/ApiStore";
import { statusStore } from "../store/ApiStore";
import { statusChangeStore } from "../store/ApiStore";
import StorePasswordInput from "./StorePasswordInput";
import DataTableComponent from "../common/DataTableComponent";
import AdminSidebar from "../user/AdminSidebar";
import AdminHeader from "../user/AdminHeader";
import { Switch } from "@mui/material";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileInput from "./MobileInput";

const AddStore = () => {
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
  });
  const accessToken = JSON.parse(localStorage.getItem("jwt"));
  const [list, setList] = useState([]);
  const [checkParams, setCheckParams] = useState(false);
  const history = useHistory();

  let params = useParams();
  useEffect(() => {
    if (params.storeId != undefined) {
      // getStoreById();
      window.scrollTo(0, 0);
      setValues({ storeId: params.storeId });
      setCheckParams(true);
    } else {
      setValues({
        storeName: "",
        firstName: "",
        lastName: "",
        firstNameError: "",
        lastNameError: "",
        storeNameError: "",
        address: "",
        addressError: "",
        userName: "",
        userNameError: "",
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
      });
      setCheckParams(true);
    }
    getStoreList();
  }, [checkParams]);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,

      firstNameError: "",
      lastNameError: "",
      ownerNameError: "",
      addressError: "",
      mobileError: "",
      passwordError: "",
      emailError: "",
      storeNameError: "",
    });
  };
  

  const getStoreList = () => {
    storeList(accessToken).then((data) => {
      setList(data.data.result);
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    addStoreData({ ...values }, accessToken).then((data) => {
      console.log(data.status, "data");
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
        // toast.error("check your details!", {
        //   autoClose: 600,
        // });
        NotificationManager.error('Check Your Details...','',2000);
      } else {
        setValues({
          storeName: "",
          storeNameError: "",
          firstName: "",
          firstNameError: "",
          lastName: "",
          lastNameError: "",
          address: "",
          addressError: "",
          userName: "",
          userNameError: "",
          mobile: "",
          mobileError: "",
          password: "",
          passwordError: "",
          email: "",
          emailError: "",
        });

        // toast.success(data.message, {
        //   autoClose: 600,
        // });
        NotificationManager.success("Store has been Added",'',2000);
        getStoreList();
        setTimeout(function () {
            history.push("/admin/storemanagement");
        }, 2000)
         
        
        setCheckParams(true);
      }
    });
  };

  console.log("value", values)
  return (
    <>
      <div id="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <div className="page-wrapper">
          <div className="container-fluid">
            <ToastContainer />
            <NotificationContainer />
            <div className="row">
              <div className="col-md-8">
                <h4 className="font-bold"> Add Store</h4>
              </div>
              <div className="col-md-4">
                <Link to={`/admin/storemanagement`}>
                  <button
                    type="submit"
                    className="btn btn-outline btn-info fa-pull-right"
                    id="addButton"
                  >
                    <i class="fa fa-backward"></i> Back
                  </button>
                </Link>
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
                      label="Store Owner First Name"
                      placeholder="Enter owner First name"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange("firstName")}
                      errorSpan={values.firstNameError}
                    />
                    <AddStoreContent
                      label="Store Owner Last Name"
                      placeholder="Enter owner Last name"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange("lastName")}
                      errorSpan={values.lastNameError}
                    />
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
                    <MobileInput
                      label="Mobile No"
                      placeholder="Enter Mobile No"
                      type="text"
                      value={values.mobile}
                      onChange={handleChange("mobile")}
                      errorSpan={values.mobileError}
                    />

                    <AddStoreContent
                      label="Email Id"
                      placeholder="Enter Email Id"
                      type="text"
                      value={values.email}
                      onChange={handleChange("email")}
                      errorSpan={values.emailError}
                    />
                    <StorePasswordInput
                      label="Store Password"
                      placeholder="Enter Store Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange("password")}
                      errorSpan={values.passwordError}
                    />
                    <div className="col-md-6 t-a-r">
                      <br></br>
                      {params.storeId != undefined ? (
                        <input
                          type="hidden"
                          value={values.storeId}
                          name="storeId"
                        />
                      ) : (
                        ""
                      )}
                      <button
                        type="submit"
                        className="btn btn-rounded-min btn-primary"
                        onClick={clickSubmit}
                      >
                        Add Store 
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStore;
