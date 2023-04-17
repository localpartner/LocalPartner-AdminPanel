import React from 'react';
import { Link } from "react-router-dom";
import Managespecification from "./Managespecification";

const Manuspecification = () => {

    return (
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <h2 className="font-bold"> Product Manufacturer
                            <Link to={`create/manufacturer`}><button type="submit" className="btn  btn-outline btn-rounded  btn-info fa-pull-right"><i className="fa fa-plus-circle"></i> Add Manufacturer</button></Link></h2>
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
        </>
    )

}


export default Manuspecification;