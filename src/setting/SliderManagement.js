import React from "react";
import AdminLayout from "../core/AdminLayout";
import SliderList from "./SliderList";

const SliderManagement = () => {
    return(
        <div id="wrapper">
            <AdminLayout>
                <SliderList />
            </AdminLayout>
       </div>
    )
}

export default SliderManagement;