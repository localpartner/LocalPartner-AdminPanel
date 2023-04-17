import React from "react";
import Menu from "./Menu";
import "../styles.css";
import { Link } from "react-router-dom"
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";

const AdminLayout = ({
    className="",
    children,
    title
}) => (
    <div id="wrapper">
        <AdminHeader />
        <AdminSidebar />
        {children}
    </div>
);

export default AdminLayout;