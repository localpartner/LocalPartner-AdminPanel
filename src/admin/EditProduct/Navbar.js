import React, { useState, useEffect } from "react"
import { NavLink, Link, useParams } from "react-router-dom"
import { getProduct } from "../apiAdmin"

export const Navbar = () => {
    const [user, setUser] = useState()

    let params = useParams();

    const loadUser = () => {
        getProduct(params.productId).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setUser(data.data.result.code);


            }
        });
    };
    useEffect(() => {
        loadUser();
    }, []);

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
                        to={`/admin/product/update/${user}`}
                    >
                        General

                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to={`/admin/UpdateProduct/AddData/${user}`}
                    >
                        Stock
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to={`/admin/UpdateProduct/AddOption/${user}`}
                    >
                        Option
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to={`/admin/UpdateProduct/AddImage/${user}`}
                    >
                        Image
                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to={`/admin/UpdateProduct/AddDiscount/${user}`}                    >
                        Discount
                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to={`/admin/UpdateProduct/AddSpecials/${user}`}                 >
                        Specials
                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to={`/admin/UpdateProduct/AddLinks/${user}`}                    >
                        Links
                    </NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbarr"
                        data-toggle="tab"
                        to={`/admin/UpdateProduct/Addspecification/${user}`}                    >
                        Specifications
                    </NavLink>
                </li>
            </ul>
        </div>



    </>)
}