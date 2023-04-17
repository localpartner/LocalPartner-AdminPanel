import React from 'react';
import { Link } from "react-router-dom";
import Managespecification from "./Managespecification";
import AdminLayout from "../core/AdminLayout";
const Manufacturer = () => {

    return (
        <AdminLayout>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> Specification Management </p></div>
                            <div className='col-md-4'><Link to={`specification`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton" style={{float: 'right'}} >Add Specification</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Managespecification />
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