import React, { useEffect, useState } from 'react';
import AdminHeader from "../user/AdminHeader";
import AdminSidebar from "../user/AdminSidebar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../actions/productConfigActions'
import { ToastContainer, toast } from 'react-toastify';
import Table from "react-bootstrap/Table"
import 'react-toastify/dist/ReactToastify.css';
import { getStoreName, getProductName, updateSpecialProducts, getSpecialandFeaturedProducts, deleteProduct, statusProducts, statusChangeProducts, statusDeleteProducts, getProduct, updateProduct } from "./apiAdmin";
import { ModalDialog } from './product/ModalDialog'




const ManageTable = (args) => {
    const [SpecialStoreName, setSpecialStoreName] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        getSpecialandFeaturedProducts().then((data) => {
            console.log(data && data.data.result, "dataResult")
            setSpecialStoreName(data && data.data.result);
            if(data && data.data && data.data.result && data.data.result){
                dispatch(Actions.setSpecialProduct(data.data.result));
            }else{
            dispatch(Actions.setSpecialProduct([]));
            }

        });
    }, []);

    let manages = useSelector((state) => { return state && state.featured && state.featured.specialProducts })
    console.log("manages", manages)
    manages = manages == undefined ? [] : manages;

   
    const openManageBox = () => {
        dispatch(Actions.showSpecialProductDailogBox())
        dispatch(Actions.setSpecialProductData({ isSpecial: false, isFeatured: false }))


    }
    const deleteSpecial = (index) => {
        let array = [...manages]
        array.splice(index, 1)
        dispatch(Actions.setSpecialProduct(array))

    }
    const editSpecial = (index) => {
        dispatch(Actions.setEditIndex(index))
        let array = [...manages]
        console.log("arr", array)
        dispatch(Actions.setSpecialProductData(array[index]))
        dispatch(Actions.showSpecialProductDailogBox())
    }




    return (
        <div id="wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-md-8'><h3 className="font-bold"> Product Details</h3></div>
                        {/* <div className='col-md-4'><Link to={`/admin/featureproduct`}><button type="submit" className="btn btn-outline btn-info fa-pull-right" id="addButton"><i class="fa fa-backward"></i> Back</button></Link></div> */}
                    </div>
                    <div className="white-box">
                        <div className="row">
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>
                                            <h5><b>Store Name</b></h5>
                                        </th>
                                        <th>
                                            <h5><b>Product Code</b></h5>
                                        </th>
                                        <th>
                                            <h5><b>Name</b></h5>
                                        </th>
                                        <th>
                                            <h5><b>Favourite</b></h5>
                                        </th>
                                        <th>
                                            <h5><b>Special</b></h5>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {manages.map((item, index) => {
                                        console.log("item", item)
                                        return (

                                            <tr key={index}>
                                                <td>{item.storeName}</td>
                                                <td>{item.code}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.isFeatured == true ? "Yes" : "No"}</td>
                                                <td>{item.isSpecial == true ? "Yes" : "No"}</td>
                                                <td>
                                                    <button className="btn btn-info" onClick={() => editSpecial(index)} >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-outline btn-danger" onClick={() => deleteSpecial(index)} >
                                                        <i className="fa fa-trash-o"></i>
                                                    </button>

                                                </td>
                                            </tr>

                                        )
                                    })}


                                    <tr>
                                        <td colSpan={5}></td>
                                        <td>
                                            <div>
                                                <button className="btn btn-info" onClick={openManageBox}><i className="fa fa-plus"></i></button>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


const ManageDialogForm = () => {
    let manageData = useSelector((state) => { return state && state.featured && state.featured.workingData })
    manageData = manageData ? manageData : { isFeatured: false, isSpecial: false }
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    const [product, setProducts] = useState([]);
    const [storeNames, setStoreName] = useState([]);
    const [query, setQuery] = useState("");
    const [storeId, setStoreId] = useState("")
    const [state, setState] = useState(manageData);
    const dispatch = useDispatch();
    // const [manageState,setManageState] = useState(manageData);
    // manageData = manageData? {...manageData,startDate:formatDateYYYMMDD(specialData.startDate),endDate:formatDateYYYMMDD(specialData.endDate)} : { }
    // const [state, setState] = useState(manageData);
    // const dispatch = useDispatch();
    // const handleChange = e => {
    //     const { name, value } = e.target;
    //         setState(prevState => ({
    //             ...prevState,
    //             [name]: value
    //         }));
    // };

    // useEffect(() => {
    //     dispatch(setManageData(state))
    // }, [state]);

    const handleChange = e => {
        const { name, value } = e.target;
         if (name == "isFeatured" || name == "isSpecial") {

            setState(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));

        }

        else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }; console.log("state", state)

    const onProductChange = (e) => {
        let code = e.target.value
        let productName = e.target.options[e.target.selectedIndex].text
        setState(prevState => ({
            ...prevState,
            "code": code, "productName": productName
        }));
    }

    const onChangeHandler = (e) => {

        //localStorage.setItem('storeid', e.target.value,)
        let storeid = e.target.value
        let storeName = e.target.options[e.target.selectedIndex].text


        setState(prevState => ({
            ...prevState,
            "storeId": storeid, "storeName": storeName
        }));

        // setStoreId(storeid)
        let id = storeid
        console.log("store", id)
        getProductName(id).then(data1 => {


            if (data1.error) {
                console.log(data1.error);
            } else {
                setProducts(data1 && data1.data.result);
                console.log(data1.data.result, "products")


            }

        });
    }


    const StoreName = () => {

        getStoreName().then((data) => {
            console.log(data && data.data.result, "dataResult")
            setStoreName(data && data.data.result);
            console.log("storename",data && data.data.result )
            
            // need to get the actual store data and call product api.... 
            if(state.storeId){
                getProductName(state.storeId).then(data1 => {
                    if (data1.error) {
                        console.log(data1.error);
                    } else {
                        setProducts(data1 && data1.data.result);
                        console.log(data1.data.result, "products")
        
        
                    }
        
                });
            }
            

        });
    };


    useEffect(() => {
        dispatch(Actions.setSpecialProductData(state))
    }, [state]);

    useEffect(() => {
        StoreName();

    }, []);

   console.log("states",state)
    return (
        <div id="DiscountDialogForm" class="tab-pane active">


            <div class="row mb-3" >
                <label for="specification" class="col-sm-3 col-form-label"><h6><b>Store Name</b><span style={{ color: "red" }}></span></h6></label>
                <div class="col-sm-6">

                    <select value = {state.storeId} className=' form-control border-0 p-0' name="Tarang" onChange={onChangeHandler}>
                        <option style={{ padding: "7px", color: 'red !important' }}  >Select Type</option>
                        {/* {Array.from(new Set(storeNames.map(name => name.storeName))).map(storeName => { */}
                        {/* {productList.map((name) => { */}

                        {

                            storeNames.map((data) => {
                                
                                return (
                                    <>

                                        <option value={data._id}>{data.storeName}</option>
                                    </>
                                )
                            })}
                        {/* })
                                    } */}

                    </select>

                </div>
            </div>


            <br></br>

            <div class="row mb-3" >
                <label for="specification" class="col-sm-3 col-form-label"><h6><b>Product</b><span style={{ color: "red" }}></span></h6></label>
                <div class="col-sm-6">
                    <select value = {state.code} className='form-control border-0 p-0' id="specification" name="productName" onChange={onProductChange} >
                        <option> Select Type</option>

                        {/* return (
                        <option ></option>
                        ) */}
                        {

                            product.map((data) => {
                                console.log("Tarang Data : "+JSON.stringify(data))
                                return (
                                    <>

                                        <option value={data.code}>{data.name}</option>
                                    </>
                                )
                            })}

                    </select>

                </div>
            </div>
            <br></br>
            <div class="row mb-3" >
                <label for="specification" class="col-sm-3 col-form-label"><h6><b>Add To Special</b><span style={{ color: "red" }}></span></h6></label>
                <div class="col-sm-6">
                    <input onChange={handleChange} name="isSpecial"  checked={state.isSpecial} class="form-check-input" style={{ marginTop: '10px' }} type="checkbox" id="isSpecial" />
                </div>
            </div>

            <div class="row mb-3" >
                <label for="specification" class="col-sm-3 col-form-label"><h6><b>Add To Favourite</b><span style={{ color: "red" }}></span></h6></label>
                <div class="col-sm-6">

                    <input onChange={handleChange} name="isFeatured" checked={state.isFeatured} class="form-check-input" style={{ marginTop: '10px' }} type="checkbox" id="isFeatured"  />
                </div>
            </div>
        </div>
    )

}

const ManageModalDialog = (args) => {
    const manageData = useSelector((state) => { return state && state.featured && state.featured.workingData })
    console.log("manageData",manageData)

    let specialProducts = useSelector((state) => { return state && state.featured && state.featured.specialProducts })

    const editIndex = useSelector((state) => { return state && state.featured && state.featured.editIndex })
    console.log("editIndex",editIndex)
    const dispatch = useDispatch();

    const onSave = () => {
       if(manageData.isFeatured == false && manageData.isSpecial == false){
        alert("Please Check atleast one checkbox")
        return(false)
       } 
        let data = manageData ? manageData : {}
        if (editIndex < 0) {
            dispatch(Actions.addSpecialProduct(data))
        } else {

            let array = [...specialProducts]
            console.log("special", array)
            array.splice(editIndex, 1, data)

            dispatch(Actions.setSpecialProduct(array))
            dispatch(Actions.setEditIndex(-1))

        }

    }
    return (
        <ModalDialog isOpen={args.isOpen} onSaveAction={onSave} onCloseAction={Actions.hideSpecialProductDailogBox} title="Add Features & Specials Product" component={ManageDialogForm} />
    );
}


export const ManageFeatured = (props) => {

    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state) => { return state && state.featured && state.featured.manageDialogBox })
    const manageData = useSelector((state) => { return state && state.featured && state.featured.specialProducts })
   
    const clickSubmit = () => {
        console.log("manageData",manageData)
        //dispatch(setProductGeneralData(state))
        //    dispatch(Actions.saveProduct(true))

        updateSpecialProducts(manageData).then(response => {
            console.log(response, "response.status")

            if (manageData == false) {
                alert(
                    "Error occured "
                );
            } else {
                alert(" Successfully ");
            }
        })

    }

    const clickCancel = () => {
        dispatch(Actions.setSpecialProductData({ isSpecial: false, isFeatured: false }))
    }

    //

    useEffect(() => {
        // call fetch api
        let data = [];
        // dispatch(set(state))
    }, []);


    return (
        <div id="discountPage" class="tab-pane active">
            <ManageTable tableData={manageData} />
            <ManageModalDialog isOpen={isDialogOpen}></ManageModalDialog>
            <div className="row form-group">
                <div className="col-lg-12 float-right " style={{marginTop:"-50px"}}>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                </div>
            </div>
        </div>

    )

}