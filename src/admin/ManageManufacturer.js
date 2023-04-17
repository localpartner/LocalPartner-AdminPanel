import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteManufacturer, getManufacturers, deleteManufacturer1, statusManfacturer, statusChangeManfacturer } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageManufacturer = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        success: false
    });
    const { error, success, redirectToProfile } = values;

    const [manufacture, setManufacture] = useState([]);

    const { user, token } = isAuthenticated();

    const { manufacturerName } = isAuthenticated;

    const loadProducts = () => {

        getManufacturers(accessToken).then(data => {
            
            if (data.error) {
                console.log(data.error);
            } else {
                setManufacture(data.data.result);
            }
        });
    };
    const destroy1 = productId => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            const category = {
                // manufacturerName: productId,
                manufacturerName: new Date(),
            };
            deleteManufacturer1(productId, accessToken).then(data => {
                if (data.error) {

                    console.log(data.error);
                } else {
                    //NotificationManager.success('Manufacturer has been deleted successfully!','',2000);
                    toast.success('Deleted successfully!', {
                        autoClose: 600
                    })
                    loadProducts();
                }
            });
        }
    };

    const destroy = manufacturerId => {
        deleteManufacturer(manufacturerId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
                setValues({
                    ...values,
                    success: true,
                    redirectToProfile: false
                });
                setTimeout(function () {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }, 1000)
            }
        });
    };

    const destroyAll = manufacturerId => {


        deleteManufacturer(manufacturerId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
                setValues({
                    ...values,
                    success: true,
                    redirectToProfile: false
                });
                setTimeout(function () {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }, 1000)
            }
        });
    };

    const status = (name) => {
        const manufactures = {
            status: false,
        };
        statusManfacturer(name, manufactures, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const statusChange = (name) => {
        const manufacturers = {
            status: true,
        };
        statusChangeManfacturer(name, manufacturers, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Manufacturer Deleted </a>
        </div>
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/manufacturers" />;
            }
        }
    };


    useEffect(() => {
        loadProducts();
    }, []);



    const columns = [
        {
            dataField: 'image',
            text: 'Manufacturer Image',

        },
        {
            dataField: 'name',
            text: 'Manufacturer Name',
            sort: true
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: true
        },

        {
            dataField: 'status',
            text: 'Status'
        },
        {
            dataField: 'action',
            text: 'Action'
        }];

    const getButtons = (manufacture) => {
      

        return (
            <div>
                <div style={{ width: '100px' }}>
                    <Link to={`/admin/manufacturer/update/${manufacture.name}`}><button className='btn btn-outline btn-info m-5 btn-sm' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
                    {/* <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(manufacture._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button> */}
                    <button className='btn btn-outline btn-danger m-5 btn-sm' aria-label='Delete' onClick={() => destroy1(manufacture.name)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button>
                </div>
            </div>
        )
    };

    const getSwitch = (manufacture) => {
        return (
            <>
                {manufacture.status == 1
                    ? (
                        <>
                            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => status(manufacture.name)} color='primary' />
                        </>
                    ) :
                    <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => statusChange(manufacture.name)} color='primary' />
                }
            </>
        )
    };
    const getImage = (path) => {
        
        return (
            <>
                {
                    path.img.data !== undefined ? (<> <img src={path.img.data} width="50" /></>) : (<><img src='https://getuikit.com/v2/docs/images/placeholder_200x100.svg' width="50" /></>)
                }


            </>
        )
    }
    const manufactureList = [];
    manufacture.forEach((item) => {
        if (item) {
            item['id'] = item._id;
            // item['createdAt'] = getDate(item.createdAt);
            item['status'] = getSwitch(item);
            item['action'] = getButtons(item);
            item['image'] = getImage(item)
            manufactureList.push(item);
        }
        else {
            console.log("error");
        }
    });


    return (

        <div className="row">
            {deleteMessage()}
            {redirectUser()}
            <div className="col-12">
                <ToastContainer />
                {/* <NotificationContainer/> */}
                <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={manufactureList} />
            </div>
        </div>
    );
};

export default ManageManufacturer;
