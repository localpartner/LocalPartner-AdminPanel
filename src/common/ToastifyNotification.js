import React from 'react';
  import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
/*
toast.configure();
const notify = ()=>{
    // Set to 10sec
    toast.warning('Danger', {autoClose:10000})
    // Set to 3sec
    toast.success('successful', {autoClose:3000})
    // User have to close it
    toast.info('GeeksForGeeks', {autoClose:false})
    toast.error('Runtime error', {
     // Set to 15sec
     position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
    toast('Hello Geeks')// Default
      
}
*/
const ToastifyNotification = (props) => {
    return (
        <div>
            <ToastContainer />
        </div>
    );
}
 export default ToastifyNotification;
