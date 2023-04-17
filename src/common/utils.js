export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        console.log("ddshfj", data.accessToken);
        localStorage.setItem('jwt', JSON.stringify(data.accessToken));
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessodule',JSON.stringify(data.user.accessModules));

        localStorage.setItem('type',JSON.stringify(data.user.type));
        localStorage.setItem('userDetails',JSON.stringify(data.user));
        if(data.user.type!=='ADMIN'){
        localStorage.setItem('storeId',JSON.stringify(data.user.storeId));}
        console.log(data,"type")

        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        const accessToken = localStorage.getItem('jwt');
        console.log("local", accessToken.accessToken);

        return JSON.parse(localStorage.getItem('jwt'));

    } if(localStorage.getItem('type')){
        const userType = localStorage.getItem('type');
        return JSON.parse(localStorage.getItem('type'));





    }
    else {
        return false;
    }
};