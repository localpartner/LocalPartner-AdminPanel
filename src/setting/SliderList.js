import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import FormMainTitle from "../common/FormMainTitle";
import DataTableComponent from "../common/DataTableComponent";
import { sliderList } from "./ApiSetting";
import { deleteSlider } from "./ApiSetting";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SliderList = () => {
  const [sliderArray, setSliderArray] = useState([]);
  const [checkParams, setCheckParams] = useState(false);

  const list = () => {
    sliderList().then((data) => {
      setSliderArray(data.result);
    });
  };

  useEffect(() => {
    list();
  }, []);

  const sliderDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteSlider(id).then((data) => {
        console.log(data);
        //NotificationManager.success(data.message);
        toast.success('Deleted successfully!', {
          autoClose:600
        })
        list();
      });
    }
  };

  //Store List component
  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "image",
      text: "Slider Image",
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

  // <Link
        //   to={`/admin/update/slider/${imgId}`}
        //   className="btn btn-outline btn-info m-5"
        //   onClick={() => setCheckParams(!checkParams)}
        //   aria-label="Edit"
        // >
        //   <i className="fa fa-pencil font-15"></i>
        // </Link>

  const getButtons = (imgId) => {
    return (
      <div>
        <button
          className="btn btn-outline btn-danger"
          aria-label="Delete"
          onClick={() => sliderDelete(imgId)}
        >
          <i className="fa fa-trash-o font-15"></i>
        </button>
      </div>
    );
  };
  const getSwitch = (storeStatus) => {
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
      ></img>
    );
  };

  const SlidersLists = [];
  sliderArray.forEach((item) => {
    item["id"] = item._id;
    item["image"] = getImage(item.image);
    item["createdAt"] = getDate(item.createdAt);
    item["status"] = getSwitch(item.status);
    item["action"] = getButtons(item._id);
    SlidersLists.push(item);
  });

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <NotificationContainer /> */}
        <ToastContainer />
        <FormMainTitle
          title="Slider Management"
          btnName="Add Slider"
          btnLink="/admin/create/slider"
        />

        <div className="white-box">
          <div className="col-12">
            <DataTableComponent
              keyField="id"
              title="Slider List"
              tableHeading={columns}
              tableList={SlidersLists}
              onClick=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderList;
