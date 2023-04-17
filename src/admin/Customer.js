import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteCustomer, getCoustomer, statusCustomer, statusCheckCustomer, removeCustomer } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));


    const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        success: false
    });

    const { error, success, redirectToProfile } = values;

    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        getCoustomer(accessToken).then(data => {
            console.log(data.data.result, "data")
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data.data.result);
            }
        });
    };

    const destroy = productId => {

        const category = {
            // manufacturerName: productId,
            name: new Date(),
        };
        deleteCustomer(productId, category).then(data => {
            if (data.error) {

                console.log(data.error);
            } else {
                alert('Are you soure you wont delete record!');
                loadProducts();
            }
        });
    };

    const remove = productId => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            removeCustomer(productId).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    toast.success('Deleted successfully!', {
                        autoClose: 600
                    })
                    //NotificationManager.success('Customer has been deleted successfully!','',2000);
                    loadProducts();
                    /*setValues({
                        ...values,
                        success:true,
                        redirectToProfile: false
                    });*/
                    // setTimeout(function(){
                    //     setValues({
                    //         ...values,
                    //         redirectToProfile:true
                    //     })
                    // },2000)
                }
            });
        }
    };

    const status = productId => {

        const category = {
            statusV: 0,
        };
        statusCustomer(productId, category).then(data => {
            if (data.error) {

                console.log(data.error);
            } else {
                //alert('Are you soure you wont delete record!');
                loadProducts();
            }
        });
    };

    const statusCheck = productId => {

        const category = {
            status: 1,
        };
        statusCheckCustomer(productId, category).then(data => {
            if (data.error) {

                console.log(data.error);
            } else {
                //alert('Are you soure you wont delete record!');
                loadProducts();
            }
        });
    };

    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Customer Deleted </a>
        </div>
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/coustomers" />;
            }
        }
    };


    useEffect(() => {
        loadProducts();
    }, []);

    // const getDate = (date) => {
    //     const newDate = date.split('T')[0];
    //     const DATE = newDate.split('-');
    //     return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    // }

    const columns = [
        {
            dataFiled: 'id',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Customer Name',
            sort: true
        },
        {
            dataField: 'mobile',
            text: 'Mobile No',
            sort: true
        },
        {
            dataField: 'image',
            text: 'Image',
            sort: true
        },
        {
            dataField: 'status',
            text: 'Status'
        },
      
        {
            dataField: 'action',
            text: 'action'
        }];

    const getButtons = (product) => {
        return (
            <div>
                <Link to={`/admin/coustomers/update/${product._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Customer"><i className='fa fa-pencil font-15'></i></button></Link>
                {/* <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(product._id)} title=" Soft Delet"><i className='fa fa-trash-o font-15'></i></button> */}
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => remove(product._id)} title="Delet"><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
    };

    const getImage = (path) => {
       

        return (
            <>
                {
                    path?.data !== undefined ? (<> <img src={path.data} width="50" /></>) : (<><img src='https://getuikit.com/v2/docs/images/placeholder_200x100.svg' width="50" /></>)
                }


            </>
        )
    }
    const getSwitch = (product) => {
        return (
            <>
                {product.status == 1
                    ? (
                        <>
                            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => status(product._id)} color='primary' />
                        </>
                    ) :
                    <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => statusCheck(product._id)} color='primary' />
                }
            </>
        )
    };

    const productsList = [];
    products.forEach((item) => {
        console.log(item.firstname, "inside loop")
        item['id'] = item._id;
        item['name'] = item.firstname + item.lastname;
        item['mobile'] = item.mobile;
        item['image'] = getImage(item.img);
        // item['createdAt'] = getDate(item.createdAt);
        item['status'] = getSwitch(item);
        item['action'] = getButtons(item);
        productsList.push(item);
    });

    return (

        <div className="row">
            <div className="col-12">
                {deleteMessage()}
                {redirectUser()}
                <ToastContainer />
                {/* <NotificationContainer/> */}
                <DataTableComponent keyField="id" title="Test" tableHeading={columns} tableList={productsList} />
            </div>
        </div>
    );
};

export default Customer;
