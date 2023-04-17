import React from 'react';
import { Route, Redirect } from "react-router-dom";
const StoreMain = () => {
    return (
        <Route
            render={props =>
                1 == 1 ? (
                    <Redirect
                        to={{
                            pathname: "/store/dashboard",
                            state: { from: props.location }
                        }}
                    />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/store/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
};

export default StoreMain;