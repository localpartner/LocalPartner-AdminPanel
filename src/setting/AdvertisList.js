import React, { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import FormMainTitle from "../common/FormMainTitle";
import DataTableComponent from "../common/DataTableComponent";
import { advertisingListApi } from "./ApiSetting";
import { deleteAdvertisingImage } from "./ApiSetting";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdvertisList = () => {
    const [ list , setList] = useState([]);
    const [checkParams, setCheckParams] = useState(false);

    const advertisingLists = () => {
      advertisingListApi().then((res) => {
            setList(res.data.res_);
        });
      };

      useEffect(() => {
        advertisingLists();
      }, []);
    
      const advertisingDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this record?'))
        {
        deleteAdvertisingImage(id).then((data) => {
          //NotificationManager.success(data.data.message);
          toast.success('Added successfully!', {
            autoClose:600
          })
          advertisingLists();
        });
      }
      };

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

  const getButtons = (_id) => {
    return (
      <div>
        {/* <Link
          to={`/admin/update/advertis/${_id}`}
          className="btn btn-outline btn-info m-5"
          onClick={() => setCheckParams(!checkParams)}
          aria-label="Edit"
        >
          <i className="fa fa-pencil font-15"></i>
        </Link> */}
        <button
          className="btn btn-outline btn-danger"
          aria-label="Delete"
          onClick={() => advertisingDelete(_id)}
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
  const advertisingList = [];
  list.forEach((item) => {
    item["id"] = item._id;
    item["image"] = getImage(item.image);
    item["createdAt"] = getDate(item.createdAt);
    item["status"] = getSwitch(item.status);
    item["action"] = getButtons(item._id);
    advertisingList.push(item);
  });

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
      <ToastContainer />
        {/* <NotificationContainer /> */}
        <FormMainTitle
          title="Advertis Image Management"
          btnName="Add advertis"
          btnLink="/admin/create/advertis"
        />

        <div className="white-box">
          <div className="col-12">
          {
            list.length != 0 ?
            <DataTableComponent
              keyField="id"
              title="Advertise Image List"
              tableHeading={columns}
              tableList={advertisingList}
              onClick=""
            /> : null
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisList;
