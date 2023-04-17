import React, { useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
const AdminMain = () => {
    console.log("i am in")
    return (
        <Route
            render={props =>
                1 == 1 ? (
                    <Redirect
                        to={{
                            pathname: "/admin/dashboard",
                            state: { from: props.location }
                        }}
                    />
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

export default AdminMain;