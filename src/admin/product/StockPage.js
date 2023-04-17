import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setStockData, saveProduct, cancelSaveProduct } from '../../actions/productConfigActions'
import { formatDate, formatDateYYYMMDD } from '../../utils'



export const StockPage = (props) => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    console.log(props, "props.pto")
    let obj = { ...props.productData.stock }
    obj.dateAvailable = obj.dateAvailable ? formatDateYYYMMDD(obj.dateAvailable) : obj.dateAvailable
    const [stockState, setStockState] = useState(obj);
    const dispatch = useDispatch();
    let previousTab = useSelector((state) => { return state && state.product && state.product.previousTab });


    const handleChange = e => {
        const { name, value } = e.target;

        if (name == "substractStock") {

            setStockState(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));

        } else {
            setStockState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }



    };
      
    useEffect(() => {
        if (previousTab == 4)
            dispatch(setStockData(stockState))
    }, [previousTab])


    const clickSubmit = () => {
        dispatch(setStockData(stockState))
        dispatch(saveProduct(true))
    }

    const clickCancel = () => {
        dispatch(cancelSaveProduct(true))
    }
  
    return (

        <div id="stock" class="tab-pane active">

            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="quantity" class="col-sm-2 col-form-label"><h6><b>Quanity</b><span style={{ color: "red" }}>*</span></h6></label>
                <div class="col-sm-4">
                    <input type="number" value={stockState.quantity} onChange={handleChange} name="quantity" class="form-control" id="quantity" />
                </div>
            </div>


            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="dateAvailable" class="col-sm-2 col-form-label"><h6><b>Date Available</b><span style={{ color: "red" }}>*</span></h6></label>
                <div class="col-sm-4">
                    <input type="date" value={stockState.dateAvailable} onChange={handleChange} name="dateAvailable" class="form-control" id="dateAvailable" />
                </div>
            </div>

            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="oos" class="col-sm-2 col-form-label"><h6><b>Out of Stock Status</b></h6></label>
                <div class="col-sm-4">
                    <input type="text" value={stockState.oosMessage} onChange={handleChange} name="oosMessage" class="form-control" id="oos" />
                </div>
            </div>
            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="substract" class="col-sm-2 col-form-label"><h6><b>Substract Stock</b></h6></label>
                <div class="col-sm-4">
                    <input checked={stockState.substractStock} onChange={handleChange} name="substractStock" class="form-check-input" style={{ marginTop: '10px' }} type="checkbox" id="subStract" />
                </div>
            </div>

            <div className="row form-group" style={{ "marginTop": "20px" }}>
                <div className="col-lg-12 float-right ">
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>

                </div>
            </div>


        </div>



    )




}

