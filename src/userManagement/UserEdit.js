import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { updateUser, getUsers, getRoleList } from "./apiUser";
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { useParams } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const UpdateUsers = ({ match }) => {
  const accessToken = JSON.parse(localStorage.getItem("jwt"));

  const storeid = localStorage.getItem("Storeid");
  const [roleId, setSelectapioption] = useState();
  const [user, setUser] = useState([]);

  const params = useParams();
console.log(user,"user")
  const getData = (storeid) => {
    getRoleList(storeid, accessToken).then((data) => {
      setUser(data.data.data);
    });
  };

  useEffect(() => {
    getData(storeid);
  }, []);

  const getRoleId = (e) => {
    setSelectapioption(e.target.value);
  };

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",

    nameError: "",
    firstNameError: '',
    lastNameError: '',
    mobileError: '',
    emailError: '',
    passwordError: '',
    roleError: "",
    error: "",
    success: false,
    redirectToProfile: false,
    formData: "",
  });
  console.log("values", values);

  const {
    firstName,
    lastName,
    mobile,
    password,
    storeId,
    createdDate,
    error,
    success,
    redirectToProfile,
  } = values;

  const init = (userId, storeid) => {
    getUsers(userId, storeid, accessToken).then((data) => {
      
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          firstName: data.data.data.details.firstName,
          lastName: data.data.data.details.lastName,
          mobile: data.data.data.details.mobile,
          password: data.data.data.password,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId, storeid);
  }, []);

  const handleChange = (firstName) => (event) => {
    console.log(event);
    setValues({ ...values, error: false, [firstName]: event.target.value });
  };
  const handleChange_last = (lastName) => (event) => {
    console.log(event);
    setValues({ ...values, error: false, [lastName]: event.target.value });
  };
  const handleChange_mobile = (mobile) => (event) => {
    console.log(event);
    setValues({ ...values, error: false, [mobile]: event.target.value });
  };
  const handleChange_password = (password) => (event) => {
    console.log(event);
    setValues({ ...values, error: false, [password]: event.target.value });
  };

  const submitUserForm = (e) => {
    e.preventDefault();
    const users = {
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      password: password,
      roleId: roleId,
    };
    updateUser(match.params.userId, users, storeid, accessToken).then(
      (data) => {
        
        if (data.error) {
          setValues({
            ...values,
            firstNameError: data.error.firstName,
            lastNameError: data.error.lastName,
            mobileError: data.error.mobile,
            emailError: data.error.email,
            passwordError:data.error.password,
            roleError: data.error.roleId,
            success: false,
          });
          NotificationManager.error(
            "Please Check Your Details",
            "",
            2000
          );
        } else {
          setValues({
            ...values,

            nameError: "",
            emailError: "",
            error: false,
            success: true,
            redirectToProfile: false,
          });
          NotificationManager.success(
            "User has been updated successfully",
            "",
            2000
          );

          setTimeout(function () {
            setValues({
              ...values,
              redirectToProfile: true,
            });
          }, 2000);
        }
      }
    );
  };

  const updateUserForm = () => (
    <div className="">
      <form className="mb-3" onSubmit={submitUserForm}>
        <div className="form-group col-lg-7">
          <h6>
            <b>
              <span className="text-danger">*</span> FirstName
            </b>
          </h6>
          <input
            onChange={handleChange("firstName")}
            type="text"
            placeholder="Enter firstName"
            className="form-control"
            value={firstName}
            name="name"
          />
          <span className="text-danger">{values.firstNameError}</span>
        </div>
        <div className="form-group col-lg-7">
          <h6>
            <b>
              <span className="text-danger">*</span> LastName
            </b>
          </h6>
          <input
            onChange={handleChange_last("lastName")}
            type="text"
            placeholder="Enter name"
            className="form-control"
            value={lastName}
            name="name"
          />
          <span className="text-danger">{values.lastNameError}</span>
        </div>
        {/* <div className="form-group col-lg-7">
          <h6>
            <b>
              <span className="text-danger">*</span> Password
            </b>
          </h6>
          <input
            onChange={handleChange_password("password")}
            type="password"
            placeholder="Enter name"
            className="form-control"
            value={password}
            name="name"
          />
          <span className="text-danger">{values.nameError}</span>
        </div> */}
        <div className="form-group col-lg-7">
          <h6>
            <b>
              <span className="text-danger">*</span> Mobile
            </b>
          </h6>
          <input
            onChange={handleChange_mobile("mobile")}
            type="text"
            placeholder="Enter name"
            className="form-control"
            value={mobile}
            name="name"
          />
          <span className="text-danger">{values.mobileError}</span>
        </div>
        <div className="form-group col-lg-7">
          <h6>
            <b>
              <span style={{ color: "red" }}>*</span> Role{" "}
            </b>
          </h6>

          <select
            className=" form-control border-0 p-0"
            onChange={(e) => getRoleId(e)}
          >
            <option> Select Role</option>

            {user.map((role) => {
              return <option value={role._id}>{role.roleName}</option>;
            })}
          </select>
          <span className="text-danger">{values.roleError}</span>

        </div>

        <div className="col-lg-7">
          <button
            className="btn btn-info btn-md"
            style={{ float: "right", borderRadius: "7px" }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to={`/admin/user/list/${storeid}`} />;
      } else {
        return <Redirect to={`/admin/user/list/${storeid}`} />;
      }
    }
  };

  return (
    <div className="row">
      <AdminHeader />
      <AdminSidebar />
      <div className="page-wrapper">
        <div className="container-fluid">
          <NotificationContainer />
          <div className="row">
            <div className="col-md-8">
              <h4 className="font-bold"> Edit Users</h4>
            </div>
            <div className="col-md-4">
              <Link to={`/admin/user/list/${storeid}`}>
                <button
                  type="submit"
                  className="btn btn-outline btn-info fa-pull-right"
                  id="addButton"
                >
                  <i className="fa fa-backward"></i> Back
                </button>
              </Link>
            </div>
          </div>
          <div className="white-box">
            <div className="row">
              <div className="col-lg-12">
                <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                  {updateUserForm()}
                  {redirectUser()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsers;
