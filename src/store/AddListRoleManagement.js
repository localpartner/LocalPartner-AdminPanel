import React, { useState, useEffect } from "react";
import FormMainTitle from "../common/FormMainTitle";
import AddStoreContent from "./AddStoreContent";
import { Link, useParams, useHistory } from "react-router-dom";
import Select from 'react-select'
import { addUserRoleData } from "./ApiStore";
import { getUserRoleListData } from "./ApiStore";
import { getUserRoleByIdData } from "./ApiStore";
import { deleteUserRole } from "./ApiStore";
import DataTableComponent from "../common/DataTableComponent";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import './AccessModuleOption';
import { accessModuleList } from "./ApiStore";
import { storeUserList } from "./ApiStore";


const AddListRoleManagement = () => {
  const accessToken = JSON.parse(localStorage.getItem("jwt"));

  const StoreName = localStorage.getItem("storeName");
  const history = useHistory();
  let params = useParams();
  var storeId = params.storeId;
  const [values, setValues] = useState({
    roleName: "",
    accessModules: "",

    redirectToProfile: false

  });

  const [list, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [checkParams, setCheckParams] = useState(false);
  const [accessModules, setAccessModules] = useState([]);
  const [statusOnOff, setStatusOnOff] = useState(false);

  useEffect(() => {
    if (params.userRoleId != undefined) {
      getUserRoleById();
      window.scrollTo(0, 0);
      setCheckParams(true);
    }//role module is editing
    else {
      setValues({
        roleName: "",
        accessModules: "",

        errorRoleName: "",
        errorAccessModules: ""

      })
      setCheckParams(true);
    }
    getUserRoleList(); //fetch List of added user role
    // getStoredata(); //Get store details 
    getAccessModuleList(); // fetch list of access module

  }, [checkParams])

  const getUserRoleById = () => {
    getUserRoleByIdData({ roleId: params.userRoleId }, storeId, accessToken).then((data) => {
      const assignToArray = {
        value: data.user[0]._id,
        label: data.user[0].name,
      }
      const accessModuleArray = [];
      data.module.forEach((res) => {
        accessModuleArray.push({ label: res.label, value: res.name })
      })
      setValues({
        roleName: data.roleName,
        accessModules: data.accessModules,

      })
    })
  }




  const { redirectToProfile } = values;
  const getUserRoleList = () => {
    getUserRoleListData(storeId, accessToken).then((data) => {

      setList(data.data.data);
    });
  };

  const getAccessModuleList = () => {
    accessModuleList().then((data) => {

      setAccessModules(data.data.result);
    })
  }

  const deleteUserRoleDetails = (userRoleId, storeId) => {


    if (window.confirm('Are you sure you want to delete this record?')) {
      deleteUserRole(userRoleId, storeId, accessToken).then((data) => {
        NotificationManager.success('Deleted successfully');

        getUserRoleList();

        if (params.userRoleId != undefined) {
          history.push(`/admin/rolemanagement/${values.storeId}`);
          setValues({
            roleName: '',
            accessModules: '',
            errorRoleName: '',
            errorAccessModules: '',

          })
        }
      })
    }
  }

  const selectedOption = (event) => {
    const data = [];
    event.forEach(element => {
      data.push(element.value);
    });

    setValues({
      ...values, accessModules: data,
    });
  }

  // const selectedUserOption = (data) => {
  //   setValues({
  //     ...values, assingTo: data
  //   })
  // }

  const handleChange = (name) => (event) => {
    setValues({
      ...values, [name]: event.target.value,
      errorRoleName: "",
      errorAccessModules: ""
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    addUserRoleData({ ...values }, storeId, accessToken).then((data) => {
      console.log(data)
      if (data.message= 'Invalid Request' ) {
        setValues({
          ...values,

          errorRoleName: "roll name reqired",
          errorAccessModules: "Access Module Is required",
        });



        NotificationManager.error('Please Check your details',);
      }
      else {
        setValues({
          accessModuleLabel: '',
          roleName: "",
          accessModules: "",

          errorRoleName: "",

          errorAccessModules: "",
          redirectToProfile: false,
        });

        NotificationManager.success('Added successfully');
        setCheckParams(true);
        getUserRoleList();
        setTimeout(function () {
          setValues({
            ...values,

            redirectToProfile: true,
            roleName: "",
            accessModules: "",

          })
        }, 2000)
      }
    })
  }
  console.log(values, "lll")
  const redirectUser = () => {
    if (redirectToProfile) {
      return <Redirect to={`/admin/storemanagement`} />;
    }
  };
  var selectOption = [];
  var option = [];

  accessModules.map((item) => {
    selectOption = {
      value: item.name,
      label: item.label
    }
    option.push(selectOption);
  });

  //users List
  var userSelectOption = [];
  var userOption = [];

  // userList.map((item) => {
  //   userSelectOption = {
  //     value: item._id,
  //     label: item.name
  //   }
  //   userOption.push(userSelectOption);
  // })

  // Data table content
  const columns = [
    {
      dataField: 'id',
      text: 'ID',

    },
    {
      dataField: 'assingTo',
      text: 'User ID',
      hidden: true
    },
    {
      dataField: 'userRoleName',
      text: 'User Role',
      sort: true
    },
    {
      dataField: 'accessModuleId',
      text: 'Access Module',
      sort: true
    },
    {
      dataField: 'createdAt',
      text: 'Date',
      sort: true
    }, {
      dataField: 'status',
      text: 'Status'
    }, {
      dataField: 'action',
      text: 'action'
    }];



  const getButtons = (userRoleId) => {
    return (
      <div>
        <Link to={`/admin/rolemanagement/edit/${storeId}/${userRoleId}`} className='btn btn-outline btn-info m-5' onClick={() => setCheckParams(!checkParams)} aria-label='Edit' ><i className='fa fa-pencil font-15'></i></Link>
        <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => deleteUserRoleDetails(userRoleId, storeId)}><i className='fa fa-trash-o font-15'></i></button>
      </div>
    )
  };

  const handleStatusChange = (event) => {

    setStatusOnOff(event.target.checked);
  }

  const getSwitch = (storeStatus) => {
    return (
      <Switch checked={statusOnOff} onChange={handleStatusChange} inputProps={{ 'aria-label': 'controlled' }} />
    )
  };

  const accessModuleListTable = (item) => {



    return (

      < ul >
        <li className="list1">
          {`${item}`}
        </li>



      </ul >
    )
  }

  const userRoleArray = [];
  list.forEach((item) => {
    // console.log(item)
    item['id'] = item._id;
    // item['assingTo'] = item.user.name
    item['userRoleName'] = item.roleName
    item['accessModuleId'] = accessModuleListTable(item.accessModuleId)

    // item['createdAt'] = getDate(item.createdDate)
    item['action'] = getButtons(item._id)
    item['status'] = getSwitch(item.status)
    userRoleArray.push(item);

  });

  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid">

          <NotificationContainer />
          <FormMainTitle title={`Role Management of ${StoreName}`}
            btnIcon="fa fa-backward"
            btnName="Back"
            btnLink="/admin/storemanagement"
            onClick={() => setCheckParams(!checkParams)}
          />
          {redirectUser()}
          <div className="white-box">
            <h3 className="box-title">
              User Role List
            </h3>
            <div className="col-12">
              {userRoleArray.length != 0 ? <DataTableComponent keyField="id" title=" User Role List" tableHeading={columns} tableList={userRoleArray} /> : "Please add user role...."}
            </div>
          </div>

          <div className="white-box">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="box-title">
                  {!(params.userRoleId) ? "Add Role " : "Edit Role"}
                </h4>
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
                    <label className="col-sm-12 lable">Access Module<span className='text-danger'>*</span></label>
                    <div className="col-sm-12">
                      <Select options={option} isMulti='true' value={values.accessModuleLabel} onChange={selectedOption} />
                      <span className='error text-danger'>{values.errorAccessModules}</span>
                    </div>
                  </div>

                  <div className="col-md-6 t-a-r">
                    <input type="hidden" value={values.storeId} name="storeId" />
                    <br></br>
                    {params.userRoleId != undefined ? <input type="hidden" value={values.userRoleId} name="userRoleId" /> : ""}
                    <button type="submit" className="btn btn-rounded-min btn-primary" onClick={clickSubmit}>
                      {!params.userRoleId ? "Add Role" : "Update Role"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
export default AddListRoleManagement;
