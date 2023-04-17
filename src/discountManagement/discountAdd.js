import React, { useState , useEffect} from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { createUser ,getUser } from "./apiDiscount";
import { Redirect } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const AddDiscount = () =>{

const [user, setUser] = useState([]);
const params = useParams();


const [values, setValues] = useState({
        name:'',
        success: false,
        redirectToProfile: false
    });

const { name, success, error, redirectToProfile } = values;
 
const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createUser({ name }).then(data => {
        if (data.error) {
            setValues({ 
                ...values,
            });
        } else {
            setValues({
                ...values, 
                name:'',
                success: true,
                redirectToProfile: false
            });
            NotificationManager.success("Discount add successfully",'',2000);
            setTimeout(function(){
                setValues({
                    ...values,
                    redirectToProfile:true
                })
            },2000)
        }
    });
};


const redirectUser = () => {
    if(redirectToProfile) {
        return <Redirect to={`/admin/discount/`} />;
     }  
};

return(
        <>
            <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                <NotificationContainer />
                <div className='row'>
                        <div className='col-md-8'><h4 className="font-bold"> Add Discount</h4></div>
                        <div className='col-md-4'><Link to={`/admin/user/list/`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form>
                                        {redirectUser()}
  
                                        <div class="demoPage" style={{ background: '#ffffff', padding:'20px'}}>

                                            <div className="form-group col-lg-7">
                                                <h6><b><span style={{color:'red'}}>*</span> Discount  </b></h6>
                                                <input onChange={handleChange('name')} type="text" className="form-control" placeholder='Enter discount' />
                                                <span className='text-danger'>{values.nameError}</span>
                                            </div>

                                            <div className="col-lg-7">
                                                <button onClick={clickSubmit} className="btn btn-info btn-md" style={{float: 'right', borderRadius:'7px'}}> Submit </button>
                                            </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </>

    )

}


export default AddDiscount;

