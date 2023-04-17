import React, { useState, useEffect } from 'react';
import AdminSidebar from "../../user/AdminSidebar";
import AdminHeader from "../../user/AdminHeader";
import { Link } from 'react-router-dom';
import "quill/dist/quill.snow.css";
import { Navbar } from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { GeneralPage } from './GeneralPage'
import { StockPage } from './StockPage'
import { SpecificationPage } from './SpecificationPage'
import { DiscountPage } from './DiscountPage'
import { OptionPage } from './OptionPage'
import { IdentificationPage } from './IdentificationPage'
import { SpecialPage } from './SpecialPage'
import { ImagePage } from "./ImagePage"
import { LinkPage } from "./LinkPage"
import { createProduct, updateProduct, getProduct, getAllActiveSpecifications, getAllCategory, getManufactureName,   } from './../apiAdmin';
import { saveProduct, setWorkingProduct, setProduct, setNewFlag, saveSpecifications, saveCategory, saveManufactureName, saveAllSubCategory, saveCategoryData, cancelSaveProduct } from '../../actions/productConfigActions'
import {FeaturePage} from './FeaturePage';

const saveProductConfig = async (productData, flag) => {
    console.log(productData, "productData")
    const accessToken = localStorage.getItem('jwt')
    const storeId = JSON.parse(localStorage.getItem('storeId'));

    if (flag == true) {
        return await createProduct(productData,storeId)
    } else {
        return await updateProduct(productData,storeId)
    }


}

export const Layout = () => {

    const currentTab = useSelector((state) => state && state.product && state.product.activeTab);
    const newProduct = useSelector((state) => state && state.product && state.product.newProduct);
    const isSaveProduct = useSelector((state) => state && state.product && state.product.saveProduct);
    const cancelSaveProduct = useSelector((state) => state && state.product && state.product.cancelSaveProduct);
    // const [time,setTime] = useState(switchTab);

    const working = useSelector((state) => { return state && state.product && state.product.workingProduct });
    const product = useSelector((state) => { return state && state.product && state.product.product });

    const dispatch = useDispatch();
    const onCloseToast = async () => {
        let productCode = working.code;
        if(productCode){
            try {
                let response = await getProduct(productCode);
                if (response && response.data && response.data.status == true) {
                    let product = response.data.result;
                    dispatch(setWorkingProduct(product))
                    dispatch(setProduct(product))
                    //dispatch(saveProduct(false))
                    dispatch(setNewFlag(false))
                }
    
            } catch (err) {
                toast.error(err.response.data.message, {
                    autoClose: 500
                })
            }
        }
    
      
    }

    const onCloseErrorToast = () => {

        dispatch(saveProduct(false))
        dispatch(setNewFlag(false))
    }
    useEffect(async () => {
        if (isSaveProduct == true) {
            try {
                let res = await saveProductConfig(working, newProduct);

                toast.success('Product Saved Successfully!', {
                    autoClose: 1000,
                    onClose: onCloseToast
                })

            } catch (e) {
                console.log(e)

                toast.error(e.response.data.message, {
                    autoClose: 1000

                })
            }

            dispatch(saveProduct(false))


        }

    }, [isSaveProduct])

    useEffect(async () => {

        if (cancelSaveProduct == true) {
            console.log(product,"working product")
            dispatch(setWorkingProduct(product))
            
        }

    }, [cancelSaveProduct])
   
    //load specification for first time 
    useEffect(async () => {
        let response = await getAllActiveSpecifications();
        dispatch(saveSpecifications(response.data.result))
    }, [])

    useEffect(async () => {
        let response = await getAllCategory();
        dispatch(saveCategoryData(response.data.result))
    }, [])
     
    useEffect(async () => {
        let response = await getManufactureName();
        dispatch(saveManufactureName(response.data.result))
    }, [])

    return (
        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />

            <div className="page-wrapper">
                <div className="container-fluid">

                    <ToastContainer />

                    <div className='row'>
                        <div className='col-md-8'><h3 className="font-bold" id='hedingTitle'>Product Configuration</h3></div>
                        <div className='col-md-4'><Link to={`/admin/productlist`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i className="fa fa-backward"></i> Back</button></Link></div>
                    </div>
                    <div className="white-box">
                        <div className="row">
                            <div className="col-lg-12">
                                <div class="card ">
                                    <div class="card ">
                                        <Navbar />
                                        {<div style={{ display: currentTab == 1 ? "block" : "none" }}><GeneralPage productData={working}></GeneralPage></div>}
                                        {<div style={{ display: currentTab == 2 ? "block": "none" }}><FeaturePage></FeaturePage></div>}
                                        {<div style={{ display: currentTab == 3 ? "block" : "none" }}><IdentificationPage productData={working}></IdentificationPage></div>}
                                        {<div style={{ display: currentTab == 4 ? "block" : "none" }}><SpecificationPage></SpecificationPage></div>}
                                        {<div style={{ display: currentTab == 5 ? "block" : "none" }}><StockPage productData={working} ></StockPage></div>}
                                        {<div style={{ display: currentTab == 6 ? "block" : "none" }}><OptionPage></OptionPage></div>}
                                        {<div style={{ display: currentTab == 7 ? "block" : "none" }}><DiscountPage></DiscountPage></div>}
                                        {<div style={{ display: currentTab == 8 ? "block" : "none" }}><SpecialPage></SpecialPage></div>}
                                        {<div style={{ display: currentTab == 9 ? "block" : "none" }}><LinkPage productData={working}></LinkPage></div>}
                                        {<div style={{ display: currentTab == 10 ? "block" : "none" }}><ImagePage></ImagePage></div>}
                                       

                                        {/*{currentTab==1 && <GeneralPage></GeneralPage>}
                                            {currentTab==2 && <IdentificationPage></IdentificationPage>}
                                            {currentTab==3 && <SpecificationPage></SpecificationPage>}
                                            {currentTab==4 && <StockPage></StockPage>}
                                            {currentTab==5 && <OptionPage></OptionPage>}
                                            {currentTab==6 && <DiscountPage></DiscountPage>}
                                        {currentTab==7 && <SpecialPage></SpecialPage>}*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}