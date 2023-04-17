import React from 'react';
import AddListStore from "./AddListStore";
import AdminLayout from '../core/AdminLayout';

const StoreManagement = () => {

    return (
        <>
            <div id="wrapper">
                <AdminLayout>
                    <AddListStore />
                </AdminLayout>
            </div>
        </>
    )

}


export default StoreManagement;