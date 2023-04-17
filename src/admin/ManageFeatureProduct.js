import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { getProducts, deleteProduct, statusProducts, statusChangeProducts, statusDeleteProducts, getProduct, updateProduct } from "./apiAdmin";
import DataTableComponent from "../common/DataTableComponent";
import { storeList } from "../store/ApiStore";



const { SearchBar } = Search;
const ManageFeatureProduct = (props) => {
    // const [values, setValues] = useState({
    //     storeName: "",
    //     storeId: "",
    // });


    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    const type = JSON.parse(localStorage.getItem('type'))
    console.log(type, "geting type")
    let storeId = ''
    if (type !== 'ADMIN') {

        storeId = JSON.parse(localStorage.getItem("storeId"));

    }


    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [query,setQuery]=useState("");
  
    // const [checkParams, setCheckParams] = useState(false);


    // let params = useParams();
    // useEffect(() => {
    //     if (params.storeId != undefined) {
    //         // getStoreById();
    //         window.scrollTo(0, 0);
    //         setValues({ storeId: params.storeId });
    //         setCheckParams(true);
    //     } else {
    //         setValues({
    //             storeName: "",
    //             storeId: "",
    //         });
    //         setCheckParams(true);
    //     }
    //     getStoreList();
    // }, [checkParams]);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false)


    const loadProducts = () => {

        getProducts(accessToken, storeId, type).then(data1 => {

            if (data1.error) {
                console.log(data1.error);
            } else {
                setProducts(data1.data.result);

            }

        });
    };


    // const getStoreList = () => {
    //     storeList(accessToken).then((data) => {
    //         setList(data.data.result);
    //     });
    // };


    // const finalData = [...products, ...list];
    // console.log(finalData, "finalData");

    useEffect(() => {
        loadProducts();
    }, [showAll]);

    const status = productId => {
        const product = {
            status: false,
        };
        statusProducts(productId, product).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };



    // const getDate = (date) => {
    //     const newDate = date.toString().split('T')[0];
    //     const DATE = newDate.toString().split('-');
    //     return (
    //         <div style={{ width: '90px' }}>
    //             {DATE[2] + '-' + DATE[1] + '-' + DATE[0]}
    //         </div>
    //     );
    // }
    const columns = [
        {
            dataField: 'id',
            text: 'id',
            hidden: true
        },
        {
            dataField: 'code',
            text: 'code',
            hidden: true
        },
        {
            dataField: "image",
            text: "Image",
        },
        {
            dataField: 'name',
            text: 'Product Name',
            sort: true
        },
        {
            dataField: 'storeName',
            text: 'Store Name',
            sort: true
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: true
        },

        {
            dataField: 'action',
            text: 'Action',

        }


    ];

    console.log(columns, "columns")
    const getImage = (path) => {

        let image = <img src='https://getuikit.com/v2/docs/images/placeholder_200x100.svg' width="50" />
        if (path.images.length !== 0) {
            image = <img src={path.images[0].content} width="50" />
        }


        return (

            <React.Fragment><div style={{ width: "100px" }}>{image}</div></React.Fragment>
        )
    }
   
    const getButtons = (product) => {
      

        console.log("productcode", product.code)
        console.log("storeName", product.storeName)
        console.log("productName", product.name)
       
       

        return (

            <div>
                <div style={{ width: '100px' }}>
                    <Link to={`create/managefeatured`}><button className='btn btn-outline btn-info m-5 btn-sm' aria-label='Edit' title="Manage Product">Manage</button></Link>
                </div>
            </div>
        )

    }





    const getDescription = (description) => {
        return (
            <div style={{ width: "100px" }}>

                {
                    showAll ? (<>  <div dangerouslySetInnerHTML={{ __html: description }} />
                    </>) : (<> <div dangerouslySetInnerHTML={{ __html: description?.substr(0, 40) + '...' }} /></>)}
                {/* (<> <div dangerouslySetInnerHTML={{ __html: description.substr(0, 40) + '...' }} /></>) */}
                {
                    showAll ? <Link to="#" style={{ fontSize: '12px' }} onClick={showLess}> Show less</Link> : <Link to="#" style={{ fontSize: '12px' }} onClick={showMore}> Show more</Link>
                }

            </div>
        )
    }



    let productList = [];
    products.forEach((itm) => {
        if (!itm.deletedAt) {
         
            let item = { ...itm }
            // let dangerouslySetInnerHTML = { __html: item.description }

            item['id'] = item._id;
            item['image'] = getImage(item);
            item['description'] = getDescription(item.description);
            item["storeName"] = item.storeName;
            // item['createdAt'] = getDate(item.createdAt);
            item['action'] = getButtons(item);
             
            productList.push(item);
            // console.log(item.storeName, "productList")
            
        }
        else {
            console.log("error");
        }
    });
    

   
    // productList.filter(productList.storeName);
 
//    let dropdownlist = [];

//    productList.storeName.forEach((item)=>{
//     var filter = item.storeName.length
//     if (filter === ''){
//         console.log("filter", filter)
//     }
//     else{
//         dropdownlist.push(item);
//     }
//     console.log("dropdownlist", dropdownlist)
//    })





  
    // const storeListArray = [];
    // list.forEach((item) => {
    //     storeListArray.push(item);
    //     if (item.isDelete == false) {
    //         item["id"] = item._id;
    //         item["storeName"] = item.storeName;
    //         item["email"] = item.email;
    //         // item['createdAt'] = getDate(item.createdDate)
    //         item["action"] = getButtons(item._id);
    //     }

    // });

    // console.log(products, "products")
    // console.log(storeListArray, "storeListArray")
    //  let  uniquedata = [new Set (item.storename)]
    //  console.log(uniquedata,"uniquedata")
    // console.log(productList,"storeName")

    // const onChange = (event) => {
    //     const value =({ search:event.target.value});
    //      console.log(value)
    //   };
  
    console.log(query,"query")
    return (

        <div id="wrapper">
            <ToastContainer />
          
            <div className="page-wrapper">
                <div className="container-fluid">

                    <div className='row'>
                        <div className='col-md-8'><p id="hedingTitle" style={{ width: '450px' }}>Featured Product</p></div>
                    </div>

                    <div className="white-box">
                        <div className="col-12">
                            <DataTableComponent keyField="name" title="Feature Product" tableHeading={columns} tableList={productList} />
                           
                            <div style={{ marginBottom: '10px', padding: '10px', position: "absolute", top: "169px", marginLeft: "230px", }}>
                               
                                <select className=' form-control border-0 p-0'  onChange={(e) => setQuery(e.target.value)}>
                                    <option style={{ padding: "7px", color: 'red !important' }}  >Search by Store Name...</option>
                                   {Array.from(new Set(productList.map(name => name.storeName))).map(storeName => {
                                     {/* {productList.map((name) => { */}
                                     
                                        // console.log(name.storeName,"storenqme")
                                        return (
                                            <>
                                                <option>{storeName}</option>
                                            </>
                                        )
                                    })
                                    }
                                  
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ManageFeatureProduct;
