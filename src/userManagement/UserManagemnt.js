import React from "react";
import AdminLayout from '../core/AdminLayout';
import UserList from "./UserList";

const userManagemnt = () =>{
    return(
        <>
          <AdminLayout>
              <UserList/>
         </AdminLayout>
        </>
    );
}
export default userManagemnt;