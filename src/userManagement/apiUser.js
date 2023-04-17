import axios from 'axios';
import { API } from '../config';
import client from '../Client';

var accessToken = JSON.parse(localStorage.getItem("jwt"));



/*get user */
export const getUser = async (storeId, accessToken) => {
    try {
        const response = await client.get(`${API}/usermgmt/store/${storeId}/user/list`);
        return response;
    }
    catch (err) {
        console.log(err)
    }


};
// delete user
export const deleteUser = async (userId, storeId, accessToken) => {
    try {
        const response = await client.delete(`${API}/usermgmt/store/${storeId}/user/${userId}`);
        return response;
    }
    catch (err) {
        console.log(err)
    }
};

export const getUsers = async (userId, storeId, accessToken) => {
    try {
        const response = await client.get(`${API}/usermgmt/store/${storeId}/user/${userId}`)
        return response;
    }
    catch (err) {
        console.log(err)
    }
};

export const createUser = async (users, storeId) => {
    const payload = users

    try {
        const response = await client.post(`${API}/usermgmt/store/${storeId}/user`, payload);
        return response;
    } catch (err) {
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err);
    }
};
export const updateUser = async(userId, users, storeId) => {
    const payload=users;

    try{
        const response=await client.put(`${API}/usermgmt/store/${storeId}/user/${userId}`,payload)
        return response;

    }
    catch(err){
        if (err.response) {
            // Request made but the server responded with an error
            return(err.response.data);
           
        }
        console.log(err)
    }
}

export const statusUser = async (users, storeId, userId, accessToken) => {
    const payload = users;
    try {
        const response = await client.post(`${API}/usermgmt/store/${storeId}/user/${userId}/status`, payload)
        return response
    }

    catch (err) {
        console.log(err)
    }
};
export const statusChangeUser = async (users, storeId, userId, accessToken) => {
    const payload = users
    try {
        const response = await client.post(`${API}/usermgmt/store/${storeId}/user/${userId}/status`, payload);
        return response;
    }

    catch (err) {
        console.log(err)
    }
};
export const getRoleList = async (storeId, accessToken) => {
    try {
        const response = await client.get(`${API}/usermgmt/store/${storeId}/role/list`);
        return response;
    }
    catch (err) {
        console.log(err)
    }

};
