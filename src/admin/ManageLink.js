import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteSpecification, getAllCategory, statusSpecification, statusChangeSpecification, deleteSpecificationSoft } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
//import {NotificationContainer, NotificationManager} from 'react-notifications';
//import 'react-notifications/lib/notifications.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Managespecification = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"))

    const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        success: false
    });
    const { error, success, redirectToProfile } = values;

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getAllCategory(accessToken).then(data => {
            console.log(data, "link")
            if (data.error) {
                console.log(data.data.error);
            } else {
                setProducts(data.data.result
                    );
            }
        });
    };

    const destroy = productId => {
        deleteSpecification(productId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
                setValues({
                    ...values,
                    success: true,
                    redirectToProfile: false
                });
                //NotificationManager.success('Specification has been deleted successfully!','',2000);
                setTimeout(function () {
                    setValues({
                        ...values,
                        redirectToProfile: true
                    })
                }, 2000)
            }
        });
    };

    const destroySoft = (code) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            // const category = {
            //     manufacturerName: new Date(),
            // };
            deleteSpecificationSoft(code, accessToken).then(data => {
                if (data.error) {

                    console.log(data.error);
                } else {
                    toast.success('Deleted successfully!', {
                        autoClose: 500,
                        onClose: () => {
                            //
                        }
                    })
                    //NotificationManager.success('Specification has been deleted successfully!','',2000);
                    loadProducts();
                }
            });
        }
    };

    const status = (code) => {
        const specification = {
            status: false,
        };
        statusSpecification(code, specification, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };


    const statusChange = (code) => {
        const specification = {
            status: true,
        };
        statusChangeSpecification(code, specification, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
    useEffect(() => {
        loadProducts();
    }, []);


    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> specification Deleted </a>
        </div>
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/manuspecification" />;
            }
        }
    };

    // const getDate = (date) => {
    //     const newDate = date.split('T')[0];
    //     const DATE = newDate.split('-');
    //     return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    // }
    const columns = [{
        dataField: 'name',
        text: 'Specification Name',
        sort: true
    },
    {
        dataField: 'description',
        text: 'Description Name',
        sort: true
    },
    {
        dataField: 'specificationGroup',
        text: 'specificationGroup',
        sort: true
    },
    {
        dataField: 'status',
        text: 'Status'
    }, {
        dataField: 'action',
        text: 'Action',
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                console.log("from action", row)
                const name = row.code;
                localStorage.setItem("code", name);
            },
        },

    }];

    const getButtons = (product) => {
        return (
            <div>
                <Link to={`/admin/Updatespecification/update/${product.name}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroySoft(product.code)}><i className='fa fa-trash-o font-15'></i></button>
                {/* <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(product._id)}><i className='fa fa-trash-o font-15'></i></button> */}
            </div>
        )
    };

    const getSwitch = (product) => {
        console.log(product,"prodcut")
        return (
            <>
                {product.status == true
                    ? (
                        <>
                            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => status(product.code)} color='primary' />
                        </>
                    ) :
                    <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => statusChange(product.code)} color='primary' />
                }
            </>
        )
    };

    const productsList = [];
    products.forEach((item) => {
        if (!item.deletedAt) {
            // item['createdAt'] = getDate(item.createdAt);
            item['status'] = getSwitch(item);
            item['action'] = getButtons(item);
            productsList.push(item);
        }
        else {
            console.log("error");
        }
    });

    return (
        <div className="row">
            {/* {deleteMessage()} */}
            {redirectUser()}
            {/*<div className='row'>
                <div className='col-md-12'><button type="submit" className="btn  btn-outline btn-danger fa-pull-right" title="Remove all data"><i className="fa fa-trash-o"></i> ALL </button></div>
            </div>
            <hr></hr>*/}
            <div className="col-12">
                <ToastContainer />
                {/*<NotificationContainer/>*/}
                <DataTableComponent keyField="manufacturerName" title="Product Specification" tableHeading={columns} tableList={productsList} />
            </div>
        </div>
    );
};

export default Managespecification;
