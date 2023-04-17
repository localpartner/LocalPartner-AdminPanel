import React from "react";
import AdminLayout from "../core/AdminLayout";
import { isAuthenticated } from "../auth/Cutomer";
import { Link } from "react-router-dom";

import AdminDashboardContent from './AdminDashboardContent';

const AdminDashboard = () => {
    return(
        <AdminLayout>
            <AdminDashboardContent />
        </AdminLayout>            
    )
};

export default AdminDashboard;
