import React from 'react';
import ManageAttribute from "./ManageAttribute";
import { Link } from "react-router-dom";

const Attribute = () => {

    return (
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle">Attribute Management  </p></div>
                            <div className='col-md-4'><Link to={`create/addAttributenew`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add Attribute</button></Link></div>
                        </div>

                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ManageAttribute/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )

}


export default Attribute;