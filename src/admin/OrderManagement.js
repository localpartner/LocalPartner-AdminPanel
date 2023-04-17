import React from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import OrderList from "./Orders";

const OrderManagement = () =>{
    return(
            <>
              <AdminHeader />
              <AdminSidebar />
                <div id="wrapper">
                    <div className="page-wrapper">
                        <div className="container-fluid">
                                <div className='row'>
                                    <div className='col-md-8'><p id="hedingTitle"> Order Management  </p></div>
                                </div>
                                <div className="white-box">
                                    <div className="row">
                                        <div className="col-lg-12">
                                             <OrderList />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
          </>
    )

}


export default OrderManagement;