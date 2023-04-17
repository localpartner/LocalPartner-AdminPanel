import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct, statusProducts, statusChangeProducts, statusDeleteProducts, getProduct, updateProduct } from "./apiAdmin";
import DataTableComponent from "../common/DataTableComponent";
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';

import { saveProduct, setWorkingProduct, setProduct, setNewFlag, setCurrentTab } from '../actions/productConfigActions'

const ManageProducts = () => {
    const accessToken = JSON.parse(localStorage.getItem("jwt"));
    const type= JSON.parse(localStorage.getItem('type'))
    console.log(type,"geting type")
    
    let storeId=''
    if(type!=='ADMIN'){
        
     storeId = JSON.parse(localStorage.getItem("storeId"));
     
    }
    
    useEffect(() => {
        
        if(type =='ADMIN'){
        const hideaddbutton = document.getElementById( 'addButton2');
        hideaddbutton.style.display = 'none';
      
        }
      
    }, []);


   
    const dispatch = useDispatch();
    const history = useHistory();

    const [products, setProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false)

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        
        getProducts(accessToken,storeId,type).then(data => {

            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data.data.result);

            }

        });
    };




    const destroys = (code) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            // const product = {
            //     statusVlaue: new Date(),
            // };
            statusDeleteProducts(code, accessToken).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    toast.success('Deleted successfully!', {
                        autoClose: 500,
                        onClose: () => {

                        }
                    })
                    //NotificationManager.success('Specification has been deleted successfully!','',2000);
                    loadProducts();
                }
            });
        }
    };

    useEffect(() => {
        loadProducts();
    }, [showAll]);

    const status = productId => {
        const product= {
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

    const statusChange = productId => {
        const product={
            status: true,
        };
        statusChangeProducts(productId, product).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const setProductStatus = async (product, value) => {
        let obj = products.find(itm => itm.code == product.code)
        obj = { ...obj, status: value }
        await updateProduct(obj);
        product['status'] = getSwitch(obj);

    }

    // const getDate = (date) => {
    //     const newDate = date.toString().split('T')[0];
    //     const DATE = newDate.toString().split('-');
    //     return (
    //         <div style={{ width: '90px' }}>
    //             {DATE[2] + '-' + DATE[1] + '-' + DATE[0]}
    //         </div>
    //     );
    // }
    const [action, setAction] = useState(false)

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },
        {
            dataField: "image",
            text: "Image",
        },
        {
            dataField: 'name',
            text: 'Product Name',
            sort: true,
            // headerStyle: (colum, colIndex) => {
            //     return { width: '50%', };
            //   }
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: true
        },

        {
            dataField: 'status',
            text: 'Status'
        },
        
        type !== 'ADMIN' ?
        {
            dataField: 'action',
            text: 'Action',
          
        }
        :
        {

        }
    ];
    
   
 
    

    const getImage = (path) => {

        let image = <img src='https://getuikit.com/v2/docs/images/placeholder_200x100.svg' width="50" />
        if (path.images.length !== 0) {
            image = <img src={path.images[0].content} width="50" />
        }

        return (
            <React.Fragment>{image}</React.Fragment>
        )
    }

    const getProductDetail = async (e, product) => {

        try {
            e.preventDefault();
            let response = await getProduct(product.code);
            if (response && response.data && response.data.status == true) {
                let prod = response.data.result;
                dispatch(setWorkingProduct(prod))
                dispatch(setProduct(prod))
                dispatch(setNewFlag(false))
                dispatch(setCurrentTab(1));
                history.push("/admin/create/product");
            }
        } catch (err) {

        }

    }
    const onAddClick = (e) => {
        e.preventDefault();
        dispatch(setWorkingProduct({ status: false, options: [], discount: [], specials: [], identification: {}, stock: {}, specifications: [], features: []}))
        history.push("/admin/create/product");
    }

    const getButtons = (product) => {
        console.log("products", product.code)
        
        return (
            
            <div>
                <div style={{ width: '100px' }}>
                    <Link  to={`/admin/create/product`} onClick={async (e) => getProductDetail(e, product)}><button   className='btn btn-outline btn-info m-5 btn-sm' aria-label='Edit' title="Add Manufacturer"><i  className='fa fa-pencil font-15'></i></button></Link>
                    <button id="delete" className='btn btn-outline btn-danger m-5 btn-sm' aria-label='Delete' onClick={() => destroys(product.code)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button>
                </div>
            </div>
        )
   
}
    const getSwitch = (product) => {
      
        if (product.status == true) {
            return (
                <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => status(product.code)} color='primary' />
            )
        } else {
            return (
                <Switch name="checkedA" inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => statusChange(product.code)} color='primary' />
            )

        }

        /*return (
            <>
                {product.status == 1
                    ? (
                        <>
                            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "Primary" }} onClick={() => status(product._id)} color='primary' />
                        </>
                    ) :
                    
                }
            </>
        )*/
    };

    const getDescription = (description) => {
        let desc = description? description : ''
        return (
            <div>
                        
                {
                    showAll ? (<>  <div dangerouslySetInnerHTML={{ __html: desc }} />
                    </>) : (<> <div dangerouslySetInnerHTML={{ __html: desc?.substr(0, 40) + '...' }} /></>)}
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
            // item['createdAt'] = getDate(item.createdAt);
            item['status'] = getSwitch(item);
            item['action'] = getButtons(item);
            productList.push(item);
        }
        else {
            console.log("error");
        }
    });
console.log(columns[5].text,"columns")


    return (

        <div id="wrapper">
            <ToastContainer />

            <div className="page-wrapper">
                <div className="container-fluid">

                    <div className='row'>
                        <div className='col-md-8'><p id="hedingTitle"> Product Management </p></div>
                         
                        <div className='col-md-4'><Link to={`/admin/create/product`}><button type="submit" onClick={(e) => onAddClick(e)} className="btn  btn-outline btn-info fa-pull-right" id="addButton2" style={{ float: 'right' }} >Add product</button></Link></div>
                  
                    </div>
                   
                    <div className="white-box">
                        <div className="col-12">
                            <DataTableComponent keyField="name" title="Product Specification" tableHeading={columns} tableList={productList} />
                        </div>
                    </div>

                </div>
            </div>
        </div>


    );
};

export default ManageProducts;
