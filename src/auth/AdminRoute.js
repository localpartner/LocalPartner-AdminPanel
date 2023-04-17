import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./Cutomer";

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                1 === 1 ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/admin/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
};

export default AdminRoute;
