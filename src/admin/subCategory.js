import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link, useParams } from "react-router-dom";

import { deletecategory, getCategoryBycode, statusChangeCategory } from "./apiAdmin";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubCategory = ({ match }) => {
    const code1 = localStorage.getItem("code")
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const params = useParams();
    const [values, setValues] = useState({
        error: '',
        redirectToProfile: false,
        success: false
    });
    const { error, success, redirectToProfile } = values;
    const [loads, setLoads] = useState();

    const code = localStorage.getItem("code");
    const subCode = localStorage.getItem("subCode");

    const load = () => {
        getCategoryBycode(code, accessToken).then(data => {
            console.log(data.data, "data.result")
            if (data.error) {
                console.log(data.error);
            } else {
                setLoads(data.data.result);
            }

        });
    };


    const destroy = (subCode) => {

        if (window.confirm('Are you sure you want to delete this record?')) {
            deletecategory(code1, subCode, accessToken).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    toast.success('Deleted successfully!', {
                        autoClose: 600
                    })
                    load();

                }
            });
        }
    };

    useEffect(() => {
        load(code);
    }, []);

    const status = subCode => {
        const category = {
            status: false,
        };
        statusChangeCategory(category, code, subCode, accessToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                load(code);
            }
        });
    };

    const statusChange = subCode => {
        const category = {
            status: true,
        };
        statusChangeCategory(category, code, subCode, accessToken).then(data => {

            if (data.error) {
                console.log(data.error);
            } else {
                load(code);
            }
        });
    };

    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            <a class="text-center" style={{ color: 'white' }}> Category Deleted </a>
        </div>
    );
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/category" />;
            }
        }
    };

    // const getDate = (date) => {
    //     const newDate = date.split('T')[0];
    //     const DATE = newDate.split('-');
    //     return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    // }

    // Table 
    const columns = [

        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },

        {
            dataField: 'name',
            text: 'Category Name',
            sort: true
        },
        {
            dataField: "description",
            text: 'description'

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
            text: 'action',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    const name = row.code;
                    const codeName = row.code
                    const nameC = row.name;
                    console.log(row, "row")
                    localStorage.setItem("subCode", codeName);


                },
            },
        }];

    const getButtons = (category) => {
        return (
            <div>
                <Link to={`/admin/subcategory/update/${category.name}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit'><i className='fa fa-pencil font-15'></i></button></Link>
                <button className='btn btn-outline btn-danger' aria-label='Delete' onClick={() => destroy(category.code)}><i className='fa fa-trash-o font-15'></i></button>
            </div>
        )
    };

    const getSwitch = (category) => {

        return (
            <>
                {category.status == true
                    ? (
                        <>
                            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => status(category.code)} color='primary' />
                        </>
                    ) :
                    <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => statusChange(category.code)} color='primary' />
                }
            </>
        )
    };


    const arr = []

    if (loads && loads.subcategories) {
        loads.subcategories.forEach((item) => {
            if (item !== undefined) {
                item['name'] = item.name;
                item['description'] = item.description
                //item['createdAt'] = getDate(item.createdAt);
                item['status'] = getSwitch(item);
                item['action'] = getButtons(item);
                arr.push(item);
                console.log(item, "item")

            }
            else {
                console.log("error");
            }
        });
    }
    return (

        <div className="row">
            <AdminHeader />
            <AdminSidebar />
            <ToastContainer />
            {/* <NotificationContainer/> */}
            <div className="page-wrapper">
                <div className="container-fluid">

                    <div className='row'>
                        <div className='col-md-8'><p id="hedingTitle"> SubCategory List </p></div>
                        <div className='col-md-4'><p>
                            <Link to={`/admin/category/Create/subCategory/${params.categoryId}`} className="btn btn-outline btn-info fa-pull-right addButton"> Add SubCategory </Link>

                            <Link to={`/admin/category`} className="btn  btn-outline btn-info fa-pull-right m-r-5 addButton"> <i className="fa fa-backward"></i> Back</Link>

                        </p></div>
                    </div>
                    <div className="white-box">

                        <div className="row">

                            {deleteMessage()}
                            {redirectUser()}
                            <div className="col-12">


                                <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={arr} />

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default SubCategory;
