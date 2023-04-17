import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {showImageDailogBox,hideImageDailogBox,addImage,setImage,setImageData,setEditIndex,saveProduct,cancelSaveProduct} from '../../actions/productConfigActions'
import Table from "react-bootstrap/Table"




import {ModalDialog} from './ModalDialog'
const ImageTable = (args) =>{

    let images = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.images  })
    images = images==undefined ? [] : images; 

    const dispatch = useDispatch();
    const openImageBox = ()=>{
        dispatch(showImageDailogBox())
        dispatch(setImageData({primaryImage:false}))

    }
    const deleteImage = (index) =>{
        let array = [...images]
        array.splice(index,1)
        dispatch(setImage(array))

    }
    const editImage = (index) =>{
        dispatch(setEditIndex(index))        
        let array = [...images]        
        dispatch(setImageData(array[index]))
        dispatch(showImageDailogBox())

    }
    
    return (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
               
                <th>
                    <h5><b></b></h5>
                </th>
                <th>
                    <h5><b>Name</b></h5>
                </th>  
                <th>
                    <h5><b>Primary ?</b></h5>
                </th>  
                <th>                  
                </th>             
            </tr>
        </thead>
        <tbody>
            {images.map((item, index) => {
              
                return (
                   
                        <tr key={index}>
                            <td><img src={item.content} height="50px" /></td>
                            <td>{item.name}</td>
                            <td>{item.primaryImage==true ? "Yes" : "No"}</td>
                            <td>
                                <button className="btn btn-info" onClick={()=>editImage(index)} >
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-outline btn-danger" onClick={()=>deleteImage(index)} >
                                    <i className="fa fa-trash-o"></i>
                                </button>
                               
                            </td>                         
                        </tr>
                 
                )
            })}
            <tr>
                <td colSpan={3}></td>
                <td>
                    <div>
                        <button className="btn btn-info" onClick={openImageBox} ><i className="fa fa-plus"></i></button>
                    </div>
                </td>
            </tr>

        </tbody>
    </Table>);
}

const ImageDialogForm = ()=>{


    let imageData = useSelector((state)=>{return state && state.product && state.product.imageData})
    imageData = imageData?imageData : {primaryImage:false }
    const [state, setState] = useState(imageData);
    const [baseImage, setBaseImage] = useState("");
    const dispatch = useDispatch();
    const handleChange = e => {
        const { name, value } = e.target;
        if (name == "primaryImage") {

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
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        setState(prevState => ({
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
    useEffect(() => {
        dispatch(setImageData(state))
    }, [state]);
    
    return (
        
        <div id="ImageDialogForm" class="tab-pane active">
                 
       

        <div class="row mb-3">
            <label for="name" class="col-sm-3 col-form-label"><h6><b>Image Name</b><span style={{ color: "red" }}>*</span></h6></label>
            <div class="col-sm-6">
                <input type="text" onChange={handleChange} name="name" class="form-control" id="name" value={state.name} />
            </div>
        </div>
        <div class="row mb-3" style={{ paddingTop: '20px' }}>
            <label for="substract" class="col-sm-3 col-form-label"><h6><b>Primary Image</b></h6></label>
            <div class="col-sm-6">
                <input onChange={handleChange} checked={state.primaryImage} name="primaryImage" class="form-check-input" style={{ marginTop: '10px' }} type="checkbox" id="primaryImage" />
            </div>
        </div>
        <div class="row mb-3" style={{ paddingTop: '20px' }}>
            <label for="Content" class="col-sm-3 col-form-label"><h6><b>Select</b></h6></label>
            <div class="col-sm-6">
                <input
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                        uploadImage(e);
                    }}
                    id="content"

                />  
                {state.content && <div  style={{"marginTop":"10px"}}>
                <img src={state.content} height="40%" width="40%"/> 
            </div>}              
            </div>
           
        </div>                        
        </div>
    )
   

}

const ImageModalDialog = (args)=>{    
    const imageData = useSelector((state)=>{return state && state.product && state.product.imageData})
    let images = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.images})
    const editIndex = useSelector((state)=>{return state && state.product && state.product.editIndex})
    const dispatch = useDispatch();

    const onSave =()=>{
        
        let data = imageData ? imageData : []
        if(editIndex<0){
            dispatch(addImage(data))
        }else{

            let array = [...images]
            array.splice(editIndex,1,data)       
           
            dispatch(setImage(array))      
            dispatch(setEditIndex(-1))            

        }
        
    }
    return (
        <ModalDialog isOpen={args.isOpen} onSaveAction={onSave} onCloseAction={hideImageDailogBox} title="Add Image" component={ImageDialogForm} />
    );
}


export const ImagePage = (props) => {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state)=>{return state && state.product && state.product.imageDialogBox})
    const imageData = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.images})
    const clickSubmit = ()=>{
        //dispatch(setProductGeneralData(state))
        dispatch(saveProduct(true))
    }

    const clickCancel = ()=>{
        dispatch(cancelSaveProduct(true))        
    }

   
    return (        
        <div id="imagePage" class="tab-pane active">
            <ImageTable tableData={imageData}/>
            <ImageModalDialog isOpen={isDialogOpen}></ImageModalDialog>
            <div className="row form-group">
                <div className="col-lg-12 float-right ">
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                    
                </div>
            </div>
        </div>

    )
}
