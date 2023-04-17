import {API} from '../config';
import axios from 'axios';

export const saveSlider = data => {
    return fetch(`${API}/saveSlider`,{
        method: 'POST',
        "headers" : {
            Accept: 'application/json',
         },
         body :data
    }).then(response => {
        return response.json();
    }).catch(error =>
        console.log("error",error)
    );
}

export const sliderList = data => {
    return fetch(`${API}/sliderList`,{
        method: 'GET',
    }).then(response => {
        return response.json();
    }).catch(error =>
        console.log("error",error)
    );
}

export const deleteSlider = id => {
    return fetch(`${API}/deleteSlider/${id}` , {
        "headers" : {
            "accept" : "application/json",
            "content-type" : "application/json"
        },
    }).then(response => {
        return response.json();
    }).catch(error =>
            console.log("error",error)
        );
}

export const getDataOfSlider = (id) =>{
    return axios.get(`${API}/getSliderDataById/${id}`)
    .then((responce)=>{
        return responce
    })
    .catch((error)=>{
        console.log(error)
    })
}


export const saveAdvertise = bodyFormData => {
    return axios({
        url: `${API}/saveAdvertise`,
        method : 'POST',
        data : bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response)=>{
            return response;
    }).catch((error) => 
            console.log(error)
     )
}

export const advertisingListApi = () => {
    return axios.get(`${API}/advertiseList`)
    .then((responce) =>{
        return responce;
    }).catch((error) =>{
        console.log(error);
    })
}

export const deleteAdvertisingImage = (_id) => {
    return axios.get(`${API}/deleteAdvertise/${_id}`)
    .then((responce) => {
        return responce;
    }).catch((error) =>{
        console.log(error);
    })
}

export const savePartnerImg = bodyFormData => {
    return axios({
        url: `${API}/savePartnerImg`,
        method : 'POST',
        data : bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response)=>{
            return response;
    }).catch((error) => 
            console.log(error)
     )
}

export const partnerImgListApi = () => {
    return axios.get(`${API}/partnerImgList`)
    .then((responce) =>{
        return responce;
    }).catch((error) =>{
        console.log(error);
    })
}

export const deletePartnerImage = (_id) =>{
    return axios.get(`${API}/deletePartnerImg/${_id}`)
    .then((responce) => {
        return responce;
    }).catch((error) =>{
        console.log(error);
    })
}