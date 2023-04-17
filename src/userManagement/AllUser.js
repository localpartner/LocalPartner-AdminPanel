import React, { useState, useEffect } from "react";
import { getUser, deleteUser, statusUser, statusChangeUser } from "./apiUser";
import AdminLayout from '../core/AdminLayout';
import { Link, useParams } from "react-router-dom";
import { Switch } from '@mui/material';
import DataTableComponent from "../common/DataTableComponent";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const AllUser = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    const StoreName = localStorage.getItem("storeName");
    const [user, setUser] = useState([]);
    console.log(user, "user")
    const params = useParams();

    // console.log("param", params)
    const loadUser = () => {
        getUser(params.storeid, accessToken).then(data => {
            
            if (data.error) {
                console.log(data.error);
            } else {

                setUser(data.data.data);


            }

        });
    };

    const status = (userId) => {

        const users = {
            active: false,
        };
        statusUser(users, params.storeid, userId, accessToken).then(data => {

            if (data.error) {
                console.log(data.error);
            } else {
                loadUser();
            }
        });
    };

    const statusChange = (userId) => {
        const users = {
            active: true,
        };
        statusChangeUser(users, params.storeid, userId, accessToken).then(data => {

            if (data.error) {
                console.log(data.error);
            } else {
                loadUser();
            }
        });
    };

    const destroy = (userId, storeId) => {
        

        if (window.confirm('Are you sure you want to delete this record?')) {

            deleteUser(userId, params.storeid,accessToken).then(data => {
               
                if (data.error) {
                    console.log(data.error);
                } else {
                    NotificationManager.success('User has been deleted successfully!', '', 2000);
                    loadUser();
                }
            });
        }
    };
    const getRoleId = () => {
        console.log("hello params", params.storeid)
        localStorage.setItem('Storeid', params.storeid);
    }
    useEffect(() => {
        loadUser();
    }, []);

    // const getDate = (date) => {
    //     const newDate = date.split('T')[0];
    //     const dt = newDate.split('-');
    //     return dt[2] + '-' + dt[1] + '-' + dt[0];
    // }
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'firstName',
            text: 'FirstName'
        },
        {
            dataField: 'lastName',
            text: 'lastName'
        },
        {
            dataField: 'email',
            text: 'E-mail'
        },
        {
            dataField: 'mobile',
            text: 'Mobile'
        },

        {
            dataField: 'status',
            text: 'Status'
        },
        {
            dataField: 'action',
            text: 'Action'
        }];


    const getButtons = (user) => {
        return (
            <div>
                <Link to={`/admin/users/update/${user._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer" onClick={getRoleId}><i className='fa fa-pencil font-15' ></i></button></Link>
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(user._id, params.storeId)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
    };

    const getSwitch = (user) => {
        console.log(user, "status")
        return (
            <>
                {user.active == 1
                    ? (
                        <>
                            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => status(user._id)} color='primary' />
                        </>
                    ) :
                    <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => statusChange(user._id)} color='primary' />
                }
            </>
        )
    };

    const productsList = [];
    user.forEach((item) => {
        console.log(item, "item")
        console.log(item._id);
        console.log(params, "paramsparams")
        // if(params.storeid == item.storeId._id && item.role == 5){
        // if (params._id == item._id || item.role == 3) {
        if (params.storeid) {

            item['firstName'] = item.details.firstName;
            item['lastName'] = item.details.lastName;
            item['mobile'] = item.details.mobile;

            // item['address']= item.storeId.address;
            // item['ownerName']= item.storeId.ownerName;
            // item['createdDate'] = getDate(item.createdAt);
            item['status'] = getSwitch(item);
            item['action'] = getButtons(item);
            productsList.push(item);
        } else {
            console.log("error")
        }

    });

    return (
        <>
            <AdminLayout>
                <div id="wrapper">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className='row'>
                                <div className='col-md-8'><p style={{width:"70%"}} id="hedingTitle">{ `User Management of ${StoreName}  `}</p></div>
                                <div className='col-md-4'><p>
                                    <Link to={`/admin/create/users/${params.storeid}`} className="btn btn-outline btn-info fa-pull-right addButton"> Add User </Link>
                                    <Link to="/admin/storemanagement" className="btn  btn-outline btn-info fa-pull-right m-r-5 addButton"> <i className="fa fa-backward"></i> Back</Link>
                                </p></div>
                            </div>
                            <div className="white-box">
                                <div className="row">
                                    <NotificationContainer />
                                    <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={productsList} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
export default AllUser;