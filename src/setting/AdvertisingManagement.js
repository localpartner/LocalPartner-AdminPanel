import React from "react";
import AdminLayout from "../core/AdminLayout";
import FirebaseImage from "./FirebaseImage";
import AdvertisList from "./AdvertisList";

const AdvertisingManagement = () => {
  return (
    <div id="wrapper">
      <AdminLayout>
        {/* <FirebaseImage /> */}
        <AdvertisList />
      </AdminLayout>
    </div>
  );
};

export default AdvertisingManagement;
