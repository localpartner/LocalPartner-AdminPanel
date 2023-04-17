import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import FormMainTitle from "../common/FormMainTitle";
import DataTableComponent from "../common/DataTableComponent";
import { partnerImgListApi } from "./ApiSetting";
import { deletePartnerImage } from "./ApiSetting";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PartnerList = () => {
  const [list, setList] = useState([]);
  const [checkParams, setCheckParams] = useState(false);
  const [disable , setDisable] = useState(false)

  const imagelist = () => {
    partnerImgListApi().then((data) => {
      setList(data.data.res_);
    });
  };

  useEffect(() => {
    imagelist();
  }, []);

  const partnerImgDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deletePartnerImage(id).then((data) => {
        //NotificationManager.success(data.data.message);
        toast.success('Deleted successfully!', {
          autoClose:600
        })
        imagelist();
      });
    }
  };

  //Partner image List component
  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "image",
      text: "Image",
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
    },
  ];

  const getDate = (date) => {
    const newDate = date.split("T")[0];
    const DATE = newDate.split("-");
    return DATE[2] + "-" + DATE[1] + "-" + DATE[0];
  };

  const getButtons = (imgId) => {
    return (
      <div>
        {/* <Link
          to={`/admin/update/partnerImage/${imgId}`}
          className="btn btn-outline btn-info m-5"
          onClick={() => setCheckParams(!checkParams)}
          aria-label="Edit"
        >
          <i className="fa fa-pencil font-15"></i>
        </Link> */}
        <button
          className="btn btn-outline btn-danger"
          aria-label="Delete"
          onClick={() => partnerImgDelete(imgId)}
        >
          <i className="fa fa-trash-o font-15"></i>
        </button>
      </div>
    );
  };
  const getSwitch = (status) => {
    return (
      <Switch
        name="checkedA"
        inputProps={{
          "aria-label": "secondary checkbox",
          size: "medium",
          color: "primary",
        }}
        color="primary"
        checked
      />
    );
  };

  const getImage = (path) => {
    return (
      <img
        src={path}
        alt="footer-logo"
        width="100"
        height="70"
      ></img>
    );
  };

  const partnerImageList = [];
  list.forEach((item) => {
    item["id"] = item._id;
    item["image"] = getImage(item.image);
    item["createdAt"] = getDate(item.createdAt);
    item["status"] = getSwitch(item.status);
    item["action"] = getButtons(item._id);
    partnerImageList.push(item);
  });

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
      <ToastContainer />
        {/* <NotificationContainer /> */}
        <FormMainTitle
          title="Partner Images Management"
          btnName="Add Partner Image"
          btnLink="/admin/create/partnerImage"
        />

        <div className="white-box">
          <div className="col-12">
            <DataTableComponent
              keyField="id"
              title="Partner Image List"
              tableHeading={columns}
              tableList={partnerImageList}
              onClick=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerList;
