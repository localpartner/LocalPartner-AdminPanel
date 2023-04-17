import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Parser from "html-react-parser"
import { setProductGeneralData, saveProduct, cancelSaveProduct } from '../../actions/productConfigActions'
// import { useNavigate } from "react-router-dom";



export const GeneralPage = (props) => {

    const [Check, setCheck] = useState(false);
    // const [value, setValue] = useState();
    // console.log(value,"just checking")

    const addvalue = (e) => {
        let value = e;
        Parser(value)
        console.log(value)
        setState(prevState => ({
            ...prevState,
            'description': value
        }));
    }
    const accessToken = JSON.parse(localStorage.getItem("jwt"));

    const { code, price, name, tags, description } = props.productData;
    let obj = { code, price, name, tags, description }
    console.log("General Data :  ", obj)
    const [state, setState] = useState(obj);
    const dispatch = useDispatch();
    let previousTab = useSelector((state) => { return state && state.product && state.product.previousTab });


    const handleChange = e => {
        const { name, value } = e.target;
         
        if (name == "isRental") {

            setState(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));

        }else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
     

    };
    console.log(state)
    useEffect(() => {
        if (previousTab == 1)
            dispatch(setProductGeneralData(state))
    }, [previousTab])


    const clickSubmit = () => {
        dispatch(setProductGeneralData(state))
        dispatch(saveProduct(true))
    }

    const clickCancel = () => {
    
        dispatch(cancelSaveProduct(true))
       

    }

    return (


        <div id="general" >

            <div class="row g-3" style={{ 'paddingTop': '20Px' }} >
                <div class="col-md-3" >
                    <label for="productName" class="form-label"> <h6><b>Product Name</b><span style={{ color: "red" }}>*</span></h6></label>
                    <input type="text" value={state.name} onChange={handleChange} name="name" class="form-control" id="productName" />
                </div>
                <div class="col-md-3">
                    <label for="productCode" class="form-label"><h6><b>Product Code</b><span style={{ color: "red" }}>*</span></h6></label>
                    <input type="text" value={state.code} onChange={handleChange} name="code" class="form-control" id="productCode" />
                </div>
                <div class="col-md-3">
                    <label for="productPrice" class="form-label"><h6><b>Product Price</b><span style={{ color: "red" }}>*</span></h6></label>
                    <input type="number" value={state.price} onChange={handleChange} name="price" class="form-control" id="productPrice" />
                </div>
                <div class="col-md-3">
                    <label for="tags" class="form-label"><h6><b>Tags</b></h6></label>
                    <input type="text" value={state.tags} onChange={handleChange} name="tags" class="form-control" id="tags" />
                </div>
                {/* <div>
                    <h1>{Check ? 'Checked' : 'Not checked'}</h1>
                    <input type="checkbox" onChange={(e) => setCheck(e.target.checked)} />
                </div> */}
                <div class="col-md-3" style={{ marginTop: '20px' }}>
                    <label for="Rental" class="col-sm-2 col-form-label"><h6><b>Rental</b></h6></label>
                    <div class="col-sm-4" style={{ paddingLeft: '35PX' }}>
                        <input checked={state.isRental} onChange={handleChange} name="isRental" class="form-check-input" style={{ marginTop: '10px' }} type="checkbox" id="isRental" />
                    </div>
                </div>
            </div>
            {/* <div class="row g-3" >
                <div class="col-md-12" style={{ 'paddingTop': '20Px' }}>
                    <label for="productDescription" class="form-label"><h6><b>Product Highlight</b><span style={{ color: "red" }}>*</span></h6></label>
                    <textarea rows="3" id="productDescription"  onChange={handleChange} name="description" className="form-control" type="text"   />
                    
                </div>
            </div> */}
            <div class="row g-3" >
                <div class="col-md-12" style={{ 'paddingTop': '20Px' }}>
                    <label for="productDescription" class="form-label"><h6><b>Product Description</b><span style={{ color: "red" }}>*</span></h6></label>
                    {/* <textarea rows="8" id="productDescription" value={state.description} onChange={handleChange} name="description" className="form-control" type="text" placeholder="Product Description"  /> */}
                    <ReactQuill

                        style={{

                            color: "black",
                            height: "110px"
                        }}
                        name="description"
                        id="productDescription"
                        theme="snow"

                        value={state.description}
                        onChange={addvalue}

                    />
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="row form-group" style={{ "marginTop": "20px" }}>
                <div className="col-lg-12 float-right ">
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>

                </div>
            </div>
            {/* <div class="col-md-8">
                    <label class="form-label"><h5><b>Need To Fill One Or More Tab With General Tab For Creating Products </b></h5></label>
                </div> */}



        </div>
    )




}

