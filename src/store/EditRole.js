import React, { useState, useEffect } from "react";
import AdminLayout from "../core/AdminLayout";
import AddStoreContent from "./AddStoreContent";
import { Link, useParams, useForm, useHistory } from "react-router-dom";
import Select from "react-select";
import { getUserRoleListData } from "./ApiStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AccessModuleOption";
import { accessModuleList } from "./ApiStore";
import { RoleUpdate } from "./ApiStore";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
export const EditRole = () => {
  const [user, setUser] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("jwt"));

  const history = useHistory();
  let params = useParams();
  var storeId = params.storeId;
  const [values, setValues] = useState({
    roleName: "",
    storeId: "",
    errorRoleName: "",
    errorAccessModule: "",
  });
  const [userList, setUserList] = useState([]);
  const [checkParams, setCheckParams] = useState(false);
  const [accessModules, setAccessModules] = useState([]);
  const getUserRoleList = () => {
    getUserRoleListData(storeId, accessToken).then((data) => {
      data.data.data.map((prefill) => {
        console.log(prefill.accessModuleId, "prefill");
        var accessmodule = prefill.accessModuleId[1]
        console.log(accessmodule, "accessmodule");
        if (prefill._id === params.userRoleId) {
          setValues(prefill);
        }
      });
    });
  };

  const getAccessModuleList = () => {
    accessModuleList(accessToken).then((data) => {
      setAccessModules(data.data.result);
    });
  };

  useEffect(() => {
    getUserRoleList(); // fetch list of access module
    getAccessModuleList();
  }, []);

  const selectedOption = (event) => {
    const data = [];
    event.forEach((element) => {
      data.push(element.value);
    });

    setValues({
      ...values,
      accessModules: data,
    });
  };

  // const selectedUserOption = (data) => {
  //     setValues({
  //         ...values, assingTo: data
  //     })
  // }

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
      errorRoleName: "",
      errorAccessModules: "",
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    RoleUpdate({ ...values }, storeId, params.userRoleId, accessToken).then(
      (data) => {
        console.log(data, "dayata");
        if (data === undefined) {
          setValues({
            ...values,
            errorRoleName: "roll name reqired",
            errorAccessModules: "Access Module Is required",
          });
          NotificationManager.error("Invalid Request", "", 1000);
        } else {
          setValues({
            roleName: "",
            accessModules: "",
            errorRoleName: "",
            errorAccessModules: "",
          });
          NotificationManager.success(
            "User has been updated successfully",
            "",
            1000
          );
          setCheckParams(true);
          getUserRoleList();
          if (params.userRoleId != undefined) {
            history.push(`/admin/rolemanagement/${values.storeId}`);
          }
        } //else end
      }
    );
  };

  var selectOption = [];

  var option = [];

  accessModules.map((item) => {
    selectOption = {
      value: item.name,
      label: item.label,
    };
    option.push(selectOption);
  });

  //users List
  // var userSelectOption = [];
  // var userOption = [];

  // userList.map((item) => {
  //     userSelectOption = {
  //         value: item._id,
  //         label: item.name
  //     }
  //     userOption.push(userSelectOption);
  // });
  // const modules = [{ "value": "store", "label": 'Store Management' }]
  //  var mod = []

  // for (let i = 0; i < values.accessModuleId.length; i++) {
  //     mod = [{ label: values.accessModuleId }];
  // }

  // const val = {

  //     value: true, label: "Younger",

  // };

  // console.log(val.label, "valll");
console.log(values,"values")

  return (
    <div>
      <AdminLayout>
        <div className="row">
          <NotificationContainer />

          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="font-bold"> Edit Role</h4>
                </div>
                <div className="col-md-4">
                  <Link to={`/admin/rolemanagement/${params.storeId}`}>
                    <button
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
                    <form className="form-horizontal" id="myForm">
                      <AddStoreContent
                        label="Role Name"
                        placeholder="Enter role name"
                        type="text"
                        value={values.roleName}
                        onChange={handleChange("roleName")}
                        errorSpan={values.errorRoleName}
                      />
                      <div className="form-group col-md-6">
                        <label className="col-sm-12 lable">
                          Access Module<span className="text-danger">*</span>
                        </label>

                        <div className="col-sm-12">

                          <Select
                            options={option}
                            isMulti="true"
                            name="accessModuleLabel"
                            value={values}     
                          />
                          {/* <h1>{values.accessModuleId}</h1> */}
                          {/* <select       className=' form-control border-0 p-0' >
                            <option> Select Type</option>
                            {accessModules.map((item)=> {
                              return (
                                <>
                                  <option value={item.accessModuleId}>{item.name}</option>
                                </>
                              )
                            })
                            }
                          </select> */}

                          <span>{values.accessModuleId}</span>
                          <span className="error text-danger">
                            {values.errorAccessModules}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 t-a-r">
                        <input
                          type="hidden"
                          value={values.storeId}
                          name="storeId"
                        />
                        <br></br>
                        <button
                          type="submit"
                          className="btn btn-rounded-min btn-primary"
                          onClick={clickSubmit}
                        >
                          Update Role
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};
