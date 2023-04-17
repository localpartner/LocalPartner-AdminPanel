import React from "react";
import AdminLayout from "../core/AdminLayout";
import { isAuthenticated } from "../auth/Cutomer";
import { Link } from "react-router-dom";

import AdminDashboardContent from '../user/AdminDashboardContent';

const Reports = () => {
    return(
        <AdminLayout>
            <AdminDashboardContent />
        </AdminLayout>            
    )
};

export default Reports;
