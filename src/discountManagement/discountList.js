import React from 'react';
import { Link } from "react-router-dom";

const DiscountList = () => {

    return (
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> Discount Management  </p></div>
                            <div className='col-md-4'><Link to={`/admin/create/discount`}><button type="submit" className="btn  btn-outline btn-info fa-pull-right" id="addButton">Add Discount</button></Link></div>
                        </div>
                        <div className="white-box">
                            <div className="row" >
                                <div className="col-lg-12">
                                    <h1>welcome</h1>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )

}


export default DiscountList;