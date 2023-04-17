import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addUserRole } from "../auth/User";


const AddRollManagement = () =>{
    const [values, setValues] = useState({});
    const [error , setError ] = useState('');
    const [result_data, setResult] = useState([]);
    const [list , setList] = useState([]);
    const {roleName , accessModule} = values;
    // let history =useHistory();

    const handleChange = (name) => event =>{
        console.log(event.target.value);
        setValues( {...values , [name] : event.target.value});
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const res = await addUserRole({...values});
        console.log(res,"hhh")
        // const data = res.json();
        if(res.error !== "" || !res){
            setError("Please enter proper error");
        }else{
            setResult("Data added successfully!")
            setValues('');
            setList(res.list);
            console.log(res.list,"hhh");
            // history.push("/admin/addRollManagement");
        }
    }

    const addrole = () =>(
        <>
        <div className="container">
        <form>
            <div className="row">
                <div className="col-md-12 col-12">
                    <h3>Roll Management</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    Role
                </div>
                <div className="col-md-4">
                    <label>Add role Name</label>
                    <br />
                    <input type="text" 
                        name="roleName"
                        placeholder="Enter role name"
                        onChange={handleChange("roleName")}
                        value={roleName}
                        ></input>
                </div>
                <div className="col-md-4">
                    <label>Access Module</label><br/>
                    <select name="accessModule" onChange={handleChange("accessModule")}>
                        <option>Select Module</option>
                        <option value="1">Product</option>
                        <option value="2">Customer</option>
                        <option value="3">Payment</option>
                        <option value="4">Store</option>
                    </select>
                </div>
                <br />
                {result_data && (<span> { result_data} </span>)}
                {error && (<span className="validation"> {error} </span>)}
                <br />
                
                <div className="col-md-12">
                   <button type="submit" className="btn btn-primary" onClick={handleSubmit}> Add Role </button>
                </div>
            </div>
        </form>
        </div>
        </>
   );

   const roleMangementList = () =>(
       <table>
       <thead>
           <tr>
               <th>checkboxxx</th>
               <th>Role</th>
               <th>Access Module</th>
               <th>Active On</th>
               <th>Action</th>
           </tr>
        </thead> 
        <tbody>
        { list.map((data , i) => (
            <tr>
                <td>{data.name}</td>
                <td>{data.access_moduleId}</td>
                <td>{data.parent_RoleId}</td>
                <td>{data.status}</td>
                <td>{data.date_added}</td>
            </tr>
        ))}
           </tbody>
       </table>
   )


    return(
       <>
           {addrole()}
           {roleMangementList()}
       </>
    )
}

export default AddRollManagement;