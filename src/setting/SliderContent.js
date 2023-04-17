import React, { useState, useEffect } from "react";
import FormMainTitle from "../common/FormMainTitle";
import { saveSlider, getDataOfSlider } from "./ApiSetting";
import { Redirect, useParams } from "react-router-dom";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SliderContent = () => {
  const [previewImg, setPreviewImg] = useState(null);
  let params = useParams();
  console.log("params",params);
  const [values, setValues] = useState({
    title: "",
    link: "",
    sequence: "",
    image: "",
    description: "",
    imageError: "",
    titleError: "",
    sequenceError: "",
    sliderId : "",
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
    sliderId
  } = values;

  const imgTypes = ["image/png", "image/jpeg"];

  const getDataById = () =>{
    const id = params.sliderId;
    getDataOfSlider(id).then((data)=>{
      setValues({
        ...values,
        title: data.data.title,
        link: data.data.link,
        sequence: data.data.sequence,
        image: data.data.image,
        description: data.data.description,
        redirect: false,
        sliderId: id,
      });
      setPreviewImg(data.data.image)
    })
  }


  useEffect(() => {
    // getDataById();
    setValues({
      ...values,
      formData: new FormData(),
    });
  }, []);

  const handleChange = (name) => (event) => {
    const value =
      name === "sliderImg" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: event.target.value });

    //Privew image
    if (name === "sliderImg") {
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
    saveSlider(formData).then((data) => {
      if (data.status == false) {
        setValues({
          ...values,
          imageError: data.errors.sliderError,
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
        // NotificationManager.success(data.message);
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
      return <Redirect to="/admin/slider" />;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
      <ToastContainer />
        {/* <NotificationContainer /> */}
        <FormMainTitle
          title="Add Slider"
          btnName="Back"
          btnLink="/admin/slider"
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
                <div className="form-group col-md-6 slider-preview-img">
                  <img
                    className="img-fluid"
                    src={
                      previewImg
                        ? previewImg
                        : "../assets/images/preview_Image.jpg"
                    }
                    alt="footer-logo" height={400} width={450}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">
                    Image<span className="text-danger">*</span>
                  </label>
                  <div className="col-md-12">
                    <input
                      type="file"
                      name="sliderImg"
                      className="form-control"
                      accept="image/*"
                      onChange={handleChange("sliderImg")}
                    />
                    <span className="error text-danger">{imageError}</span>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">
                    Title<span className="text-danger">*</span>
                  </label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title of slider"
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
                      placeholder="Enter link of slider"
                      value={link}
                      onChange={handleChange("link")}
                    />
                    <span className="error text-danger"></span>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">
                    Sequence<span className="text-danger">*</span>
                  </label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter sequence of slider"
                      value={sequence}
                      onChange={handleChange("sequence")}
                    />
                    <span className="error text-danger"></span>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12 lable">
                    Description<span className="text-danger">*</span>
                  </label>
                  <div className="col-md-12">
                    <textarea
                      rows="4"
                      type="text"
                      className="form-control"
                      placeholder="Description of slider"
                      value={description}
                      onChange={handleChange("description")}
                    ></textarea>
                    <span className="error text-danger"></span>
                  </div>
                </div>
                <div className="col-md-12 t-a-r">
                {/* <input type="text" name="_id" value={sliderId}  /> */}
                  <button
                    type="submit"
                    className="btn btn-rounded-min btn-primary"
                    onClick={handleClick}
                    disabled = {false}
                  >
                    Add Slider
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
export default SliderContent;
