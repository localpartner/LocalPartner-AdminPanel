import { API,API_BASE_URL } from '../config';

export const adminsignin = admin => {
    return fetch(`${API}/usersignin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify(admin)
    })
        // .then(response => {
        //     return response.json();
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        
}

export const getToken = (data)=>{
    const basicAuth = Buffer.from("FE_WEB" + ":" + "secret").toString('base64');
    
    const requestObj =  {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + basicAuth,
          'X-Portal' :'user'
        },    
        body: new URLSearchParams({
            'username': data.email,
            'password': data.password,
            'grant_type': 'password'
            
        })
    };

    return fetch(`${API_BASE_URL}/oauth/token`,requestObj).then(responce => {
        return responce.json();
    }).catch(error => 
        console.log("Error :" ,error));

    
}

export const addUserRole = admin => {
    return fetch(`${API}/addUserRole`, {
        method : 'POST',
        headers : {
            Accept : 'application/json',
            'Content-Type' :'application/json'
        },
        body: JSON.stringify(admin)
    }).then(response => {
            return response.json();
        }).catch(err => {
                console.log(err);
            });
}


