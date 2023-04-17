import React from "react";
import AdminLayout from "../core/AdminLayout";
import { Link } from "react-router-dom";
import ManageTax from "./ManageTax";

const Tax = () =>{
    return(
        <AdminLayout>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle">Tax Management  </p></div>
                            <div className='col-md-4'><Link to={`create/addTax`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add Tax</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ManageTax/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
export default Tax;