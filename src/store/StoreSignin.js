import React, { useState, useEffect } from 'react';
import { storesignin } from "../auth/Store";
import { useHistory } from "react-router-dom";

const StoreSignin = () => {
    const [values, setValues] = useState({})
    const [error, setError] = useState('');
    const { email, password } = values;
    let history = useHistory();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await storesignin({ email, password })
        const data = res.json();
        if (res.status === 400 || !data) {
            setError('Please enter valid Email and Password!');
        } else {
            history.push("/store/dashboard");
        }

    };

    const signUpForm = () => (
        <div>
            <div id="wrapper" className='login-register' >
                <div className='login-box'>
                    <div className='white-box'>
                        <div className="logoimage t-a-c" >
                            <h1>Store</h1>
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {signUpForm()}
        </>
    );
};

export default StoreSignin;