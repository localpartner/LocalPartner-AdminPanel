import React from "react";
import AdminLayout from "../core/AdminLayout";
import { isAuthenticated } from "../auth/Cutomer";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return(
        <>
            <h2>
                Dashboard here
            </h2>
            <Link to="admin/addRollManagement"> Roll Management</Link>
        </>
    )
    // const {
    //     user: { _id, name, email, role }
    // } = isAuthenticated();

    // const adminLinks = () => {
    //     return (
    //         <div className="card">
    //             <h4 className="card-header">Admin Links</h4>
    //             <ul className="list-group">
    //                 <li className="list-group-item">
    //                     <Link className="nav-link" to="/create/category">
    //                         Create Category
    //                     </Link>
    //                 </li>
    //                 <li className="list-group-item">
    //                     <Link className="nav-link" to="/create/product">
    //                         Create Product
    //                     </Link>
    //                 </li>
    //                 <li className="list-group-item">
    //                     <Link className="nav-link" to="/admin/orders">
    //                         View Orders
    //                     </Link>
    //                 </li>
    //                 <li className="list-group-item">
    //                     <Link className="nav-link" to="/admin/products">
    //                         Manage Products
    //                     </Link>
    //                 </li>
    //             </ul>
    //         </div>-
    //     );
    // };

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">name</li>
                    <li className="list-group-item">email</li>
                    <li className="list-group-item">
                        {/* {role === 1 ? "Admin" : "Registered User"} */}
                    </li>
                </ul>
            </div>
        );
    };

    return (
    //     <AdminLayout
    //     //title="User Information"
    //     className="container col-md-8 offset-md-2"
    // >
    //     {adminInfo()}
    // </AdminLayout>
    // );
    <div>
        <header className="navbar">
            <div className="logo">
                <Link to="index.html">
                <img className="img-fluid" src="" alt="logo" />
                </Link>
            </div>
            <div className="col-lg-9 col-6">
                <nav id="menu" className="main-menu">
                    <ul>
                        <li className="iconheader"><span><i className="far fa-bell"></i></span></li>
                        <li><span className="profilename"><i className="fa fa-user">Kea Eccommerce</i>
                        <small className="headerMail">kea@gmail.com</small></span></li>
                    </ul>
                </nav>
            </div>
        </header>
    </div>
    )
};

export default AdminDashboard;
