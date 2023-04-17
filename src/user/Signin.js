import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { adminsignin, getToken } from "../auth/User";
import { authenticate, isAuthenticated } from '../common/utils';
import { useHistory } from "react-router-dom";

const AdminSignin = () => {
    const [values, setValues] = useState({})
    const [error, setError] = useState('');
    const { email, password } = values;
    //const { admin } = isAuthenticated();
    let history = useHistory();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setValues({ ...values, error : false ,loading: true });
        const res = await getToken({ email, password });
        console.log(res)

        if (res.status === 400) {
            setError('Please enter valid Email and Password!');
        } else {
            authenticate(res, () => { history.push("/admin/dashboard") })

        }

    };

    const signUpForm = () => (
        <div>
            <div id="wrapper" className='login-register' >
                <div className='login-box'>
                    <div className='white-box'>
                        {/* <div className='row'> */}
                        <div className="logoimage t-a-c" >
                            {/* <img className="img-fluid" src="../assets/images/logo.png" alt="logo" /> */}
                            <h1>Admin</h1>
                        </div>
                        <div className="login_form">
                            <form>
                                <div className='admin_login'>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            onChange={handleChange("email")}
                                            className="form-control"
                                            placeholder='email'
                                            value={email}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            onChange={handleChange("password")}
                                            className="form-control"
                                            placeholder='password'
                                            value={password}
                                        />
                                        {error && (<span className="text-danger"> {error} </span>)}
                                    </div>
                                    <div className='t-a-c'>
                                        <div type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">
                                            Login
                                        </div>
                                    </div>
                                    {/* <div className='t-a-c'>
                                        <i className='fa fa-lock'></i> 
                                        <Link to="#" className='admin_link t-a-c'> Forgotten Password</Link>
                                    </div> */}
                                </div>
                            </form>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>

        </div>
    );
    localStorage.clear();
    // const redirectUser = () => {
    //     if (isAuthenticated()) {
    //         return <Redirect to="/admin/dashboard" />;
    //     }
    // };

    const AdminFooter = () => (
        <footer className='admin_footer'>
            <Link className='admin_link' to="keasofttech.com"><small>KEA Softtech Pvt. Ltd</small></Link>
            <small>"© 2017-2021 All Rights Reserved"</small>
        </footer>
    );

    return (
        <>
            {signUpForm()}
            {/* {AdminFooter()} */}
            {/* {redirectUser()} */}
        </>
    );
};

export default AdminSignin;