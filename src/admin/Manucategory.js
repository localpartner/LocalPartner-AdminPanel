import React from 'react';
import { Link } from "react-router-dom";
import Managecategory from "./Managecategory";
import AdminLayout from "../core/AdminLayout";
const Manufacturer = () => {

    return (
        <AdminLayout>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> Category Management </p></div>
                            <div className='col-md-4'><Link to={`create/category`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add Category</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Managecategory />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}


export default Manufacturer;