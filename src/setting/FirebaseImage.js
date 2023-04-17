import { uploadBytesResumable ,getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { ref } from '@firebase/storage';
import { render } from "react-dom";
import { storage } from '../firebase/index';

const FirebaseImage = () => {
    const [image , setImage ] =useState(null);
    const handleChange = e =>{
        if(e.target.files[0]){
            console.log(e.target.files[0])
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = (e) => {
      e.preventDefault();
      console.log("image,image",image)
        if(!image)  return;
        const storageRef = ref( storage , `/slider-image/${image.name}` )
        const uploadTask = uploadBytesResumable(storageRef ,image );

        uploadTask.on('state_changed', (snapshot) => {
          console.log(snapshot);
        },
          (err) => console.log('Error', err),
          () =>{
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log("url:",url);
            })
          }
        )  
    }

  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="white-box">
            <div className="row">
              <form
                className="form-horizontal"
                id="myForm"
                autoComplete="false"
              >
                <div className="form-group col-md-6">
                  <div className="col-md-12">
                    <input type="file" name="sliderImg" accept="image/*" onChange={handleChange} />
                    <button onClick={handleUpload}>Upload</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirebaseImage;
