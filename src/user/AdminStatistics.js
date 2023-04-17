import React from 'react';
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminStatisticPage from './AdminStatisticPage';


const AdminStatistics = () =>{
   

    return(
        <> 
            <div id="wrapper">

                <AdminHeader />
                <AdminSidebar />
                <AdminStatisticPage />
            </div>
        </>
    )

}

export default AdminStatistics;

