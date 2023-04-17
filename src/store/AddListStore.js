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
import { Switch } from "@mui/material";
import 'react-notifications/lib/notifications.css';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileInput from "./MobileInput";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const AddListStore = () => {
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
  const deleteStoreDetails = (deleteStoreId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const deleteStoreID = deleteStoreId;
      deleteStore(deleteStoreID, accessToken).then((data) => {
      if (data.error) {
          console.log(data.error);
      }
      else {
          NotificationManager.success('User has been deleted successfully!', '', 2000);
          getStoreList();
      }
  })}}

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
        toast.error("check your details!", {
          autoClose: 600,
        });
        //NotificationManager.error('Email already exist...','',2000);
      } else {
        setValues({
          storeName: "",
        });

        toast.success(data.message, {
          autoClose: 600,
        });
        //NotificationManager.success(data.message,'',2000);
        getStoreList();
        if (params.storeId != "undefined") {
          history.push("/admin/storemanagement");
        }
        setCheckParams(true);
      }
    });
  };

  //Store List component
  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "storeName",
      text: "Store Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "E-mail",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: "action",
      text: "Action",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          const name = row.storeName;
          localStorage.setItem("storeName", name);
        },
      },
    },
  ];

  // const getDate = (date) => {
  //     const newDate = date.split('T')[0];
  //     const DATE = newDate.split('-');
  //     return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
  // }
  const statusStores = (storeId) => {
    const category = {
      status: false,
    };
    statusStore(category, storeId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        getStoreList();
      }
    });
  };

  const statusChange = (storeId) => {
    const category = {
      status: true,
    };
    statusChangeStore(category, storeId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        getStoreList();
      }
    });
  };

  const getButtons = (storeId_) => {
    return (
      <div>
        <Link
          to={`/admin/storemanagement/edit/${storeId_}`}
          className="btn btn-outline btn-info m-5"
          onClick={() => setCheckParams(!checkParams)}
          aria-label="Edit"
        >
          <i className="fa fa-pencil font-15"></i>
        </Link>
        <button
          className="btn btn-outline btn-danger"
          aria-label="Delete"
          onClick={() => deleteStoreDetails(storeId_)}
        >
          <i className="fa fa-trash-o font-15"></i>
        </button>
        <Link
          to={`/admin/user/list/${storeId_}`}
          className="btn btn-outline btn-info m-5"
        >
          Add User
        </Link>
        <Link
          to={`/admin/rolemanagement/${storeId_}`}
          className="btn btn-outline btn-info m-5"
          aria-label="Add role"
        >
          Add Role
        </Link>
      </div>
    );
  };
  const getSwitch = (storeStatus, status) => {
    return (
      <>
        {status === true ? (
          <>
            <Switch
              name="checkedA"
              checked
              inputProps={{
                "aria-label": "secondary checkbox",
                size: "medium",
                color: "Primary",
              }}
              onClick={() => statusStores(storeStatus)}
              color="primary"
            />
          </>
        ) : (
          <Switch
            name="checkedA"
            inputProps={{
              "aria-label": "secondary checkbox",
              size: "medium",
              color: "Primary",
            }}
            onClick={() => statusChange(storeStatus)}
            color="primary"
          />
        )}
      </>
    );
  };
  const storeListArray = [];
  list.forEach((item) => {
    storeListArray.push(item);
    if (item.isDelete == false) {
      item["id"] = item._id;
      item["storeName"] = item.storeName;
      item["email"] = item.email;
      // item['createdAt'] = getDate(item.createdDate)
      item["status"] = getSwitch(item._id, item.status);
      item["action"] = getButtons(item._id);
    }
  });

  return (
    <>
      <div id="wrapper">
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <p id="hedingTitle"> Store Management </p>
              </div>
              <div className="col-md-4">
                <p>
                  <Link
                    to={`/admin/create/store`}
                    className="btn btn-outline btn-info fa-pull-right addButton"
                  >
                    {" "}
                    Add Store{" "}
                  </Link>
                 
                </p>
              </div>
            </div>
            <div className="white-box">
              <div className="row">
              <NotificationContainer />
                <DataTableComponent
                  keyField="id"
                  title=" Store List"
                  tableHeading={columns}
                  tableList={storeListArray}
                  onClick={() => setCheckParams(!checkParams)}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddListStore;
