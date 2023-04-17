import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"

export const Navbar = () => {



    return (<>



        <div class="card text-center">
            <ul
                className="nav nav-tabs card-header-tabs"

            >
                <li class="nav-item ">
                    <NavLink

                        activeClassName="navbar__link--active"
                        className="navbar__link navbarr"
                        data-toggle="tab"
                        to={`/admin/create/product`}
                    >
                        General

                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to="/admin/AddProduct/DataIdentification"
                    >
                        Stock
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to="/admin/AddProduct/Option"
                    >
                        Option
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to="/admin/AddProduct/AddImage"
                    >
                        Image
                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to="/admin/AddProduct/DiscountProduct"                    >
                        Discount
                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to="/admin/AddProduct/Specials"                    >
                        Specials
                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to="/admin/AddProduct/AddLinks"                    >
                        Links
                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to="/admin/AddProduct/Specification"                    >
                        Specifications
                    </NavLink>
                </li>
                {/* <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to="/admin/AddProduct/Specification"                    >
                        Features
                    </NavLink>
                </li> */}








            </ul>
        </div>



    </>)
}