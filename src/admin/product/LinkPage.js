import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {setLinkData, cancelSaveProduct, saveProduct,} from '../../actions/productConfigActions'

export const LinkPage = (props) => {

   
    let manufacturename = useSelector((state) => { return state && state.product && state.product.manufacture })
    manufacturename = manufacturename == undefined ? [] : manufacturename;
    let categoryList = useSelector((state) => { return state && state.product && state.product.category })
    categoryList = categoryList == undefined ? [] : categoryList;
    let [selectedCategory,setSelectedCategory] = useState({})
    let [linkState,setLinkState] = useState({brand:"",category:[],relatedProducts:[]})
     
    let link = { ...props.productData.links }
    
    console.log("links",link)

    const brandName = props.productData && props.productData.links ? props.productData.links.category: "";
    // const [CategoryData, setCategoryData] = useState();
    console.log("brandName",brandName)
    let links = [];
    console.log("links",links)

    categoryList.forEach(element => {
      
        if (element.subcategories && element.subcategories.length != 0) {
            element.subcategories.forEach(sub => {
                let name = element.name + " / " + sub.name
                let code = element.code + " / " + sub.code
             
                links.push({ "name": name,  "code": element.code, "subCode": sub.code,value:code,}); 
               
            })
        } else {
            links.push({ "name": element.name, "code": element.code, value: element.name, });
            // var new_array_second = links.slice(element.name);
            // console.log("new_array_second",new_array_second)
        }
       
    });

  

    const handleCategoryCode = (e)=>{
       
        let selectedItem = links.find((ele)=>{
            return e.target.value === ele.value
           
        })

        const {name,value} = e.target;
        console.log(selectedItem);
        setSelectedCategory(selectedItem);
        setLinkState(prevState => ({
            ...prevState,
             name: value,
             name: name,
            category: selectedItem
            
        }));
        console.log("selectedItem",selectedItem)
    }

 
    
    const dispatch = useDispatch();

    const handleChange = e => {
        const {value} = e.target;
        setLinkState(prevState => ({
                ...prevState,
                brand: value
            }));
    };
    
   
    

    const clickSubmit = () => {
       
        dispatch(setLinkData(linkState))
        dispatch(saveProduct(true))

    }

    const clickCancel = () => {
       
        dispatch(cancelSaveProduct(true))
        
    }
   
  
    
    return (
        <div id="link" class="tab-pane active">
            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="quantity" class="col-sm-2 col-form-label"><h6><b>Manufacture Name</b><span style={{ color: "red" }}>*</span></h6></label>
                <div class="col-sm-4">
                    <select value={link.brand} className=' form-control border-0 p-0' onChange={handleChange}>
                        <option> Select Type</option>
                        {manufacturename.map((mfc) => {
                            return (
                                <option value={mfc.name}>{mfc.name}</option>
                            )
                        })
                        }
                    </select>
                </div>
            </div>
             <br></br>
            <div class="row mb-3" >
                <label for="link" class="col-sm-2 col-form-label"><h6><b>Category</b><span style={{ color: "red" }}>*</span></h6></label>
                <div class="col-sm-4">
                    <select  value={link.name} className=' form-control border-0 p-0' onChange={handleCategoryCode}>
                        <option> Select Type</option>
                        {links.map((ctgry) => {
                            return (
                                <>  
                                <option value={ctgry.value}>{ctgry.name}</option>
                                </>
                            )
                        })
                        }
                    </select>
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


