import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteAttribute, getAttributes, deleteAttributeone, statusAttributes, statusChangeAttributes } from "./apiAdmin";
import { Switch } from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
//import {NotificationContainer, NotificationManager} from 'react-notifications';
//import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageAttribute = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"))
    const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        success: false
    });
    const { error, success, redirectToProfile } = values;
    const params = useParams()
    const [AttributeList, setAttribute] = useState([]);
    console.log(AttributeList, "AttributeList")

    const loadProducts = () => {
        getAttributes(accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setAttribute(data.data.result);
            }
        });
    };



    const destroy1 = (name) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            const attribute = {
                attributeName: new Date(),
            };
            deleteAttributeone(name, accessToken).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    loadProducts();

                    toast.success('Deleted successfully!', {
                        autoClose: 600,
                        onClose: () => {
                            setValues({
                                ...values,
                                redirectToProfile: true
                            })
                        }
                    })

                }
            });
        }
    };

    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Attribute Deleted </a>
        </div>
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/attribute" />;
            }
        }
    };

    useEffect(() => {
        loadProducts();

    }, []);



    const status = (name) => {
        const attribute = {
            status: false,
        };
        statusAttributes(name, attribute, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const statusChange = (name) => {
        const attribute = {
            status: true,
        };
        statusChangeAttributes(name, attribute, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
    // Table 
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },

        {
            dataField: 'name',
            text: 'Attribute Name',
            sort: true
        },
        {
            dataField: 'value',
            text: 'Attribute Values'
        },
        {
            dataField: 'description',
            text: 'Attribute Description',
            sort: true
        },
        {
            dataField: 'createdAt',
            text: 'Date',
            hidden: true
        },
        {
            dataField: 'status',
            text: 'Status'
        },
        {
            dataField: 'action',
            text: 'Action'
        }];

    const getButtons = (attribute) => {
        return (
            <div>
                <Link to={`/admin/attribute/update/${attribute.name}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={() => destroy1(attribute.name)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
    };

    const getSwitch = (attribute) => {
        console.log(attribute, "attribute")
        return (
            <>
                {attribute.status == true
                    ? (
                        <>
                            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => status(attribute.name)} color='primary' />
                        </>
                    ) :
                    <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => statusChange(attribute.name)} color='primary' />
                }
            </>
        )
    };
    const accessModuleListTable = (item) => {



        return (

            < ul >
                <li className="list1">
                    {`${item}`}
                </li>


                {/* {item.map(element => <li>{element.label}</li>)} */}
            </ul >
        )
    }

    const attributeList = [];
    AttributeList.forEach((item) => {
        console.log(item, "item")
        if (!item.deletedAt) {
            item['id'] = item._id;
            item['name'] = item.name
            item['value'] = accessModuleListTable(item.value)
            // item['createdAt'] = getDate(item.createdAt);
            item['status'] = getSwitch(item);
            item['action'] = getButtons(item);
            attributeList.push(item);
        }
        else {
            console.log("error");
        }
    });
    // end table
    return (
        <div className="row">
            {deleteMessage()}
            {redirectUser()}
            <div className="col-md-12">
                <ToastContainer />
                {/* <NotificationContainer/> */}
                <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={attributeList}
                    selectRow={{
                        mode: 'checkbox',
                        hideSelectColumn: true
                    }}

                />
            </div>
        </div>
    );
};

export default ManageAttribute;
