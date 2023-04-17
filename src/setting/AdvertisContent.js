import React, { useState, useEffect } from "react";
import FormMainTitle from "../common/FormMainTitle";
import { saveSlider } from "./ApiSetting";
import { saveAdvertise } from "./ApiSetting";
import { Redirect } from "react-router-dom";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdvertisContent = () => {
  const [previewImg, setPreviewImg] = useState(null);
  
  const [values, setValues] = useState({
    title: "",
    link: "",
    sequence: "",
    image: "",
    description: "",
    imageError: "",
    titleError: "",
    sequenceError: "",
    redirect: false,
    formData: "",
  });
  const {
    title,
    link,
    sequence,
    image,
    description,
    imageError,
    titleError,
    sequenceError,
    redirect,
    formData,
  } = values;

  const imgTypes = ["image/png", "image/jpeg"];

  useEffect(() => {
    setValues({
      formData: new FormData(),
    });
  }, []);

  const handleChange = (name) => (event) => {
    const value =
      name === "advertiseImg" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: event.target.value });

    //Privew image

    if (name === "advertiseImg") {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        if (selectedFile && imgTypes.includes(selectedFile.type)) {
          setPreviewImg(URL.createObjectURL(selectedFile));
          setValues({ ...values, imageError: "" });
        } else {
          setPreviewImg(null);
          setValues({
            ...values,
            imageError: "Please select valid image type jpeg or png",
          });
        }
      } else {
        console.log("Select your file");
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    saveAdvertise(formData).then((data) => {
      if (data.data.status == false) {
        setValues({
          ...values,
          imageError: data.data.errors.error,
        });
      } else {
        setValues({
          ...values,
          title: "",
          link: "",
          sequence: "",
          image: "",
          description: "",
          imageError: "",
          redirect: false,
        });
        toast.success('Added successfully!', {
          autoClose:600,
          onClose: () => {
            setValues({
              ...values,
              redirect: true
            })
          }
        })
        // NotificationManager.success(data.data.message);
        // setTimeout(function () {
        //   setValues({
        //     ...values,
        //     redirect: true,
        //   });
        // }, 2000);
      }
    });
  };

  const redirectUser = () => {
    if (redirect) {
      return <Redirect to="/admin/advertis" />;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <ToastContainer />
        {/* <NotificationContainer /> */}
        <FormMainTitle
          title="Add Advertise Image"
          btnName="Back"
          btnLink="/admin/Advertis"
        />
        <div className="white-box">
          <div className="row">
            <div className="col-lg-12">
              <form
                className="form-horizontal"
                id="myForm"
                autoComplete="false"
              >
                {redirectUser()}
                <div className="form-group col-md-6 Advertise-preview-img">
                  <img
                    className="img-fluid"
                    src={
                      previewImg
                        ? previewImg
                        : "../assets/images/preview_Image.jpg"
                    }
                    alt="footer-logo"
                    height={400}
                    width={450}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">
                    Image<span className="text-danger">*</span>
                  </label>
                  <div className="col-md-12">
                    <input
                      type="file"
                      name="advertiseImg"
                      className="form-control"
                      accept="image/*"
                      onChange={handleChange("advertiseImg")}
                    />
                    <span className="error text-danger">{imageError}</span>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">
                    Title
                  </label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title of advertise Image"
                      value={title}
                      onChange={handleChange("title")}
                    />
                    <span className="error text-danger"></span>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">Link</label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter link of advertise image"
                      value={link}
                      onChange={handleChange("link")}
                    />
                    <span className="error text-danger"></span>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">
                    Sequence
                  </label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter sequence of advertise image"
                      value={sequence}
                      onChange={handleChange("sequence")}
                    />
                    <span className="error text-danger"></span>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">
                    Description
                  </label>
                  <div className="col-md-12">
                    <textarea
                      rows="4"
                      type="text"
                      className="form-control"
                      placeholder="Description of advertise image"
                      value={description}
                      onChange={handleChange("description")}
                    ></textarea>
                    <span className="error text-danger"></span>
                  </div>
                </div>
                <div className="col-md-12 t-a-c">
                  <button
                    type="submit"
                    className="btn btn-rounded-min btn-primary"
                    onClick={handleClick}
                  >
                    Add Advertise
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisContent;
