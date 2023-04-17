import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "./apiUser";
import DataTableComponent from "../common/DataTableComponent";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const UserList= () =>{

    const [user, setUser] = useState([]);
    
    const loadUser = () => {
        getUser().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUser(data);
            }
        });
    };
   
    useEffect(() => {
        loadUser();
    }, []);
    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const dt = newDate.split('-');
        return dt[2] + '-' + dt[1] + '-' + dt[0];
    }
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'storeName',
            text: 'Store Name',
            sort: true,
            href:'/'
        },
        {
            dataField: 'firstName',
            text: 'FirstName'
        }, 
        {
            dataField: 'email',
            text: 'E-mail'
        }, 
        {
            dataField: 'address',
            text: 'Address'
        }, 
        {
            dataField: 'createdDate',
            text: 'Date'
        }];

      const getuserLink = (storeName,_id) =>{
          return(
              <Link to={`/admin/user/list/${_id}`}>{storeName}</Link>
          )
      }

      const productsList = [];
      user.forEach((item) => {
       // console.log(item.role);
        if(item.role == 3){
            item['storeName']= getuserLink(item.storeId.storeName,item.storeId._id);
            item['createdDate'] = getDate(item.createdAt);
            productsList.push(item);
        }else{
            console.log("error")
        }
        
      });

    return(
        <>
            <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle"> User Management </p></div>
                        </div>
                        <div className="white-box">
                            <div className="row">
                                <div className="col-12">
                                    <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={productsList}/>                             
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserList;