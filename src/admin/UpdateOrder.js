import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getOrder, updateOrderData } from './apiAdmin';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateOrder = ({ match }) => {

    const [values, setValues] = useState({
        status: '',
        error: '',
        errorsStatus:'',
        success: false,
        redirectToProfile: false,
        formData: ''
    });

    const { status, error, success, redirectToProfile } = values;

    const init = orderId => {
        getOrder(orderId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                //data.status 
                setValues({
                    ...values,
                    status: data.status
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.orderId);
    }, []);

    const handleChange = status => event => {
        setValues({ ...values, error: false, [status]: event.target.value, errorsStatus:''});
    };

    const submitOrderForm = e => {
        e.preventDefault();
        const order = {
            status: status
        };
        updateOrderData(match.params.orderId,order).then(data => {
            if (data.status == false) {
                setValues({
                  ...values,
                  errorsStatus: data.errors.status
                });
                toast.success('Please try again!', {
                    autoClose:600
                })
              } 
            else {
                setValues({
                    ...values,
                    status: data.status,
                    error: false,
                    success: true,
                    redirectToProfile: false
                });
                toast.success('Updated successfully!', {
                    autoClose:600,
                    onClose: () => {
                        setValues({
                            ...values,
                            redirectToProfile: true
                        })
                    }
                })
            }
        });
    };

    const updateOrderForm = () => (
        <div className="">
            <form className="mb-3" onSubmit={submitOrderForm}>
            {/* <div className="form-group col-sm-7">
                <h6><b>Product Name</b></h6>
                {'----'}
            </div> */}
            <div className="form-group col-sm-7">
                <h6><b><span style={{color:'red'}}>*</span> Order Status</b></h6>
                {/* <input onChange={handleChange('status')} type="text" placeholder='Enter Name' className="form-control" value={status} status="status" /> */}
                <select className="form-control" onChange={handleChange('status')}>
                    <option val="">Status</option>
                    <option val="Not processed">Not processed</option>
                    <option val="Processing">Processing</option>
                    <option val="Shipped">Shipped</option>
                    <option val="Delivered">Delivered</option>
                    <option val="Cancelled">Cancelled</option>
                </select>
                <span className='error text-danger'>{values.errorsStatus}</span>
            </div>
            <div className="form-group col-md-7">
                <button className="btn btn-info btn-md"style={{float: 'right', borderRadius:'7px'}}>Update</button>
            </div>
        </form>
        </div>
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/orders" />;
            }
        }
    };

    return (
            <div className="row">
                 <AdminHeader />
                 <AdminSidebar />
                 <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><h3 className="font-bold"> Edit Order</h3></div>
                            <div className='col-md-4'><Link to={`/admin/order`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                        </div>
                            <div className="white-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-md-12 offset-md-2 m-b-250 mb-5">
                                            <ToastContainer />
                                            {showError()}
                                            {updateOrderForm()}
                                            {redirectUser()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    };

export default UpdateOrder;
