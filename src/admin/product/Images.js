import React, { useState, useEffect } from 'react';
import { setImagesData, saveProduct, cancelSaveProduct } from '../../actions/productConfigActions'
import { useSelector, useDispatch } from 'react-redux'
export const ImageData = (props) => {
    const dispatch = useDispatch();
    let previousTab = useSelector((state) => { return state && state.product && state.product.previousTab });
    let finalObj = {};
    if (props.productData.images) {
        for (let i = 0; i < props.productData.images.length; i++) {
            Object.assign(finalObj, props.productData.images[i]);
        }
    }
    const [imageState, setImagState] = useState(finalObj);
    const [baseImage, setBaseImage] = useState("");
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        setImagState(prevState => ({
            ...prevState,
            "content": base64
        }));
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleChange = e => {
        const { name, value } = e.target;

        if (name == "primaryImage") {

            setImagState(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));

        }

        else {
            setImagState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    useEffect(() => {
        if (previousTab == 8)
            dispatch(setImagesData(imageState));
        setBaseImage(imageState.content)
    }, [previousTab]);

    const clickSubmit = () => {
        dispatch(setImagesData(imageState))
        dispatch(saveProduct(true))
    }
    const clickCancel = () => {
        dispatch(cancelSaveProduct(true))
    }
    console.log(imageState, "setImagesData");
    return (

        <div id="images" class="tab-pane active">

            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="name" class="col-sm-2 col-form-label"><h6><b>Image Name</b><span style={{ color: "red" }}>*</span></h6></label>
                <div class="col-sm-4">
                    <input type="text" onChange={handleChange} name="name" class="form-control" id="name" value={imageState.name} />
                </div>
            </div>
            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="substract" class="col-sm-2 col-form-label"><h6><b>Primary Image</b></h6></label>
                <div class="col-sm-4">
                    <input onChange={handleChange} checked={imageState.primaryImage} name="primaryImage" class="form-check-input" style={{ marginTop: '10px' }} type="checkbox" id="primaryImage" />
                </div>
            </div>
            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="Content" class="col-sm-2 col-form-label"><h6><b>Content</b></h6></label>
                <div class="col-sm-4">
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e) => {
                            uploadImage(e);
                        }}
                        id="content"

                    />
                    <img src={baseImage} height="200px" />
                </div>
            </div>

            <div className="row form-group" style={{ "marginTop": "20px" }}>
                <div className="col-lg-12 float-right ">
                    <button className="btn btn-info btn-md" onClick={clickSubmit} style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>

                </div>
            </div>


        </div>



    )
}