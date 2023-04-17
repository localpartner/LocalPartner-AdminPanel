import React from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import CustomerList from "./Customer";
import { Link } from "react-router-dom";


const CustomerManagement = () => {

    return (
        <>
            <AdminHeader />
            <AdminSidebar />
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> Customer List </p></div>
                            <div className='col-md-4'><Link to={''}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"> Add Customers</button></Link></div>

                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <CustomerList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default CustomerManagement;