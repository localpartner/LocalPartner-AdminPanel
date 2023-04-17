import axios from "axios";
import { API, API_BASE_URL } from './config';
// LocalstorageService
// Add a request interceptor
const client = axios;
client.defaults.baseURL= API;
client.interceptors.request.use(
  (config) => {
    const basicAuth = Buffer.from("FE_WEB" + ":" + "secret").toString('base64');
    const token = JSON.parse(localStorage.getItem("jwt"));
    if (token) {
     
      if(config.url==="https://local-partner-node-service.vercel.app/oauth/token"){
        config.headers["Authorization"] = "Basic " + basicAuth;
      }
      
      else{
        config.headers["Authorization"] = "Bearer " + token;
    }
  }
     
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//Add a response interceptor
client.interceptors.response.use(
  (response) => {

    return response;
    
  },
function (error) {
    const originalRequest = error.config;
    console.log(error)
    if (
      error.status === 401 &&
      originalRequest.url === `${API_BASE_URL}/oauth/token`

    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const basicAuth = Buffer.from("FE_WEB" + ":" + "secret").toString('base64');
      const payload=new URLSearchParams({
        'refresh_token': refreshToken,
       'grant_type': 'refresh_token'
        
    })
      
      return axios
              .post(`${API_BASE_URL}/oauth/token`, payload,{
                headers: { 
                    Accept: 'application/x-www-form-urlencoded',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Basic ' + basicAuth,
                }})
              .then((res) => {
                console.log("hello from the client", res.data.accessToken);
                
                  const refreshToken =res.data.refreshToken
                  const token = JSON.stringify(res.data.accessToken);
                  console.log(token)
                  localStorage.setItem("refreshToken", refreshToken);
                  localStorage.setItem("jwt", token);
                  return axios(originalRequest);
            
              });
        
       
    }
    return Promise.reject(error);
  }
);
export default client;