import axios from 'axios';
import client from '../Client';

import { API } from '../config';
// import { isAuthenticated } from "../common/utils";
// const { token } = isAuthenticated();
var accessToken = JSON.parse(localStorage.getItem("jwt"));
export const addStoreData = async (data, accessToken) => {
    const payload = data;
    try {
        const response = await client.post(`${API}/store`, payload);
        return response
    }
    catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        return err
        
    }
}

export const storeList = async (accessToken) => {
    try {
        const response = await client.get(`${API}/store/list`)
        return response
    }
    catch (err) {
        console.log(err)
    }
}



export const deleteStore = async (storeId, accessToken) => {
    try {
        const response = await client.delete(`${API}/store/${storeId}`)
        return response
    } catch (err) {
        console.log(err)
    }
}


export const addUserRoleData = async (data, storeId, accessToken) => {
    const payload = data
    try {
        const response = await client.post(`${API}/usermgmt/store/${storeId}/role`, payload);
        return response;
    }
    catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
}

export const getUserRoleListData = async (storeId, accessToken) => {
    try {
        const response = await client.get(`${API}/usermgmt/store/${storeId}/role/list`)
        return response
    }
    catch (err) {
        console.log(err)
    }
}

export const getUserRoleByIdData = async (storeId, roleId, accessToken) => {
    try {
        const response = await client.get(`${API}/usermgmt/store/${storeId}/role/${roleId}`);
        return response;
    }
    catch (err) {
        console.log(err)
    }
}

export const deleteUserRole = async (storeId, userRoleId) => {
    try {
        const response = client.delete(`${API}/usermgmt/store/${userRoleId}/role/${storeId}`);
        return response;
    }
    catch (err) {
        console.log(err)
    }
}

export const accessModuleList = async (accessToken) => {
    try {
        const response = await client.get(`${API}/accessModuleList`);
        return response
    }
    catch (err) {
        console.log(err)
    }
}

export const storeUserList = async (storeId, accessToken) => {
    try {
        const repsonse = await client.get(`${API}/storeUserList/${storeId}`);
        return repsonse;
    }
    catch (err) {
        console.log(err)
    }
}
// changes on status
export const statusChangeStore = async(category, storeId) => {

    const payload = category
    try {
        const response = await client.post(`${API}/store/${storeId}/status`, payload);
        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
};
export const statusStore =async (category, storeId) => {

    const payload = category
    try {
        const response = await client.post(`${API}/store/${storeId}/status`, payload);
        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
};


export const RoleUpdate = async (data, storeId, roleId, accessToken) => {
    const payload = data
    try {

        const response = await client.put(`${API}/usermgmt/store/${storeId}/role/${roleId}`, payload);
        return response
    }


    catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
}
export const StoreUpdate = async (data, storeId, accessToken) => {
    const payload = data
    try {
        const response = await client.put(`${API}/store/${storeId}`, payload)
        return response
    }
    catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
};