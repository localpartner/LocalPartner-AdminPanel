import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { showFeatureDailogBox, hideFeatureDailogBox, addFeature, setFeature, setFeatureData, setEditIndex, saveProduct, cancelSaveProduct,
 showHighlightDailogBox, hideHighlightDailogBox, addHighlight, setHighlight, setHighlightData,} from '../../actions/productConfigActions'
import Table from "react-bootstrap/Table"

import { ModalDialog } from './ModalDialog'

const HighlightTable = (args1) => {

    let highlights = useSelector((state) => { return state && state.product && state.product.workingProduct && state.product.workingProduct.highlights })
    highlights = highlights == undefined ? [] : highlights;
     
    console.log("highlights", args1)
   
    const dispatch = useDispatch();
    const openHighlightBox = () => {
        dispatch(showHighlightDailogBox())
        dispatch(setHighlightData())

    }
    const deleteImage = (index) => {
        let array = [...highlights]
        array.splice(index, 1)
        dispatch(setHighlight(array))

    }
    const editImage = (index) => {
        dispatch(setEditIndex(index))
        let array = [...highlights]
        dispatch(setHighlightData(array[index]))
        dispatch(showHighlightDailogBox())

    }
 
    
    return (
        <Table striped bordered hover size="sm">
             <caption style={{fontSize:"15px", paddingTop:"30px", color:"#0000009e", letterSpacing:"2px"}}><b>Add Highlights</b></caption>
            <thead>
                <tr>
                   {/* <th style={{width:"80%"}}><b>Highlight</b></th> */}
                   <h5 style={{ paddingLeft:"8px"}}><b>Description</b></h5>
                </tr>
            </thead>
            <tbody>
                {highlights.map((item, index) => {

                    return (

                        <tr key={index}>
                              <td style={{width:"80%"}}>{item}</td>
                             
                            <td style={{width:"20%"}}>
                                <button className="btn btn-info" onClick={() => editImage(index)} >
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-outline btn-danger" onClick={() => deleteImage(index)} >
                                    <i className="fa fa-trash-o"></i>
                                </button>

                            </td>
                        </tr>

                    )
                })}
                <tr>
                    <td  style={{width:"20%"}}></td>
                    <td>
                        <div>
                            <button className="btn btn-info" onClick={openHighlightBox} ><i className="fa fa-plus"></i></button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </Table>);
}



const HighlightDialogForm = () => {

    let highlightData = useSelector((state) => { return state && state.product && state.product.highlightData })
    highlightData = highlightData ? highlightData : []
    const [state, setState] = useState(highlightData);

    const dispatch = useDispatch();
    
    const handleChange = event => {
        setState(event.target.value);
        console.log('value is:', event.target.value);
      };
     
    useEffect(() => {
        dispatch(setHighlightData(state))
    }, [state]);
    console.log("state",(state))
    return (
        <div id="ImageDialogForm" class="tab-pane active">
            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="substract" class="col-sm-3 col-form-label"><h6><b>Description</b></h6></label>
                <div class="col-sm-6">
                    <textarea value={state} rows="4" onChange={handleChange}  class="form-control" />
                </div>
            </div>
        </div>
    )
             
    
}

const HighlightModalDialog = (args) => {
    const highlightData = useSelector((state) => { return state && state.product && state.product.highlightData })
    let highlights = useSelector((state) => { return state && state.product && state.product.workingProduct && state.product.workingProduct.highlights })
    const editIndex = useSelector((state) => { return state && state.product && state.product.editIndex })
    const dispatch = useDispatch();

    const onSave = () => {

        let data = highlightData ? highlightData : []
        if (editIndex < 0) {
            dispatch(addHighlight(data))
        } else {

            let array = [...highlights]
            array.splice(editIndex, 1, data)

            dispatch(setHighlight(array))
            dispatch(setEditIndex(-1))

        }

    }
    return (
       <ModalDialog isOpen={args.isOpen} onSaveAction={onSave} onCloseAction={hideHighlightDailogBox} title="Add Highlight" component={HighlightDialogForm} />
    );
}


const FeatureTable = (args) => {

    let features = useSelector((state) => { return state && state.product && state.product.workingProduct && state.product.workingProduct.features })
    features = features==undefined ? [] : features;

  

    console.log("features", args.tableData)

    const dispatch = useDispatch();
    const openFeatureBox = () => {
        dispatch(showFeatureDailogBox())
        dispatch(setFeatureData({}))

    }
    const deleteImage = (index) => {
        let array = [...features]
        array.splice(index, 1)
        dispatch(setFeature(array))

    }
    const editImage = (index) => {
        dispatch(setEditIndex(index))
        let array = [...features]
        dispatch(setFeatureData(array[index]))
        dispatch(showFeatureDailogBox())

    }
      console.log(features,"features-resp")
    return (
        <Table striped bordered hover size="sm">
             <caption style={{fontSize:"15px", paddingTop:"30px", color:"#0000009e", letterSpacing:"2px"}}><b>Add Features</b></caption>
            <thead>
                <tr>
                    <th>
                        <h5><b>Title</b></h5>
                    </th>
                    <th>
                        <h5><b>Description</b></h5>
                    </th>
                    <th>
                    <h5><b>Image</b></h5>
                    </th>
                </tr>
            </thead>
            <tbody>
                {features.map((feature, index) => {
                    
                    
                   
                    return (

                        <tr key={index}>
                              <td>{feature.title}</td>
                              <td>{feature.description}</td>
                            <td><img src={feature.data} height="50px" /></td>
                           
                            <td>
                                <button className="btn btn-info" onClick={() => editImage(index)} >
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-outline btn-danger" onClick={() => deleteImage(index)} >
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
                            <button className="btn btn-info" onClick={openFeatureBox} ><i className="fa fa-plus"></i></button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </Table>);

        
}

const FeatureDialogForm = () => {


    let featureData = useSelector((state) => { return state && state.product && state.product.featureData })
    featureData = featureData ? featureData : { primaryImage: false }
    const [state, setState] = useState(featureData);
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
            "data": base64
        }));   
    };
  
   
    const convertBase64 = (file) => {
        console.log(file, "file")
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
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = async () => {
    //     const base64 = reader.result;
    //     console.log(base64, "base64")
    //     setState(prevState => ({
    //         "data": base64
    // }))

    useEffect(() => {
        dispatch(setFeatureData(state))
    }, [state]);

 
    return (
        <div id="ImageDialogForm" class="tab-pane active">
            <div class="row mb-3">
                <label for="title" class="col-sm-3 col-form-label"><h6><b>Title</b><span style={{ color: "red" }}>*</span></h6></label>
                <div class="col-sm-6">
                    <input type="text" onChange={handleChange} name="title" class="form-control" id="title" value={state.title} />
                </div>
            </div>
            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="substract" class="col-sm-3 col-form-label"><h6><b>Description</b></h6></label>
                <div class="col-sm-6">
                    <textarea value={state.description} rows="4" onChange={handleChange} id="description" name="description" class="form-control" />
                </div>
            </div>
            <div class="row mb-3" style={{ paddingTop: '20px' }}>
                <label for="Content" class="col-sm-3 col-form-label"><h6><b>Image</b></h6></label>
                <div class="col-sm-6">
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e) => {
                            uploadImage(e);
                        }}
                    />
                    {state.data && <div style={{ "marginTop": "10px" }}>
                        <img src={state.data} height="40%" width="40%" />
                    </div>}
                </div>
            </div>
        </div>
    )
             
    
}


const FeatureModalDialog = (args) => {

    const featureData = useSelector((state) => { return state && state.product && state.product.featureData })
    let features = useSelector((state) => { return state && state.product && state.product.workingProduct && state.product.workingProduct.features })
    const editIndex = useSelector((state) => { return state && state.product && state.product.editIndex })
    const dispatch = useDispatch();

    const onSave = () => {

        let data = featureData ? featureData : []
        if (editIndex < 0) {
            dispatch(addFeature(data))
        } else {

            let array = [...features]
            array.splice(editIndex, 1, data)

            dispatch(setFeature(array))
            dispatch(setEditIndex(-1))

        }


        

    }
    return (
        <ModalDialog isOpen={args.isOpen} onSaveAction={onSave} onCloseAction={hideFeatureDailogBox} title="Add Feature" component={FeatureDialogForm} />
      //  <ModalDialog isOpen={args.isOpen} onSaveAction={onSave} onCloseAction={hideHighlightDailogBox} title="Add Feature" component={DialogForm} />
    );
}





export const FeaturePage = (props) => {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state) => { return state && state.product && state.product.featureDialogBox })
    const isDialogOpen2 = useSelector((state) => { return state && state.product && state.product.highlightDialogBox })
    const featureData = useSelector((state) => { return state && state.product && state.product.workingProduct && state.product.workingProduct.features })
    const highlightData = useSelector((state) => { return state && state.product && state.product.workingProduct && state.product.workingProduct.highlights })
    const clickSubmit = () => {
        //dispatch(setProductGeneralData(state))
        dispatch(saveProduct(true))
    }

    const clickCancel = () => {
        dispatch(cancelSaveProduct(true))
    }

    

    return (
        <div id="imagePage" class="tab-pane active">
            <FeatureTable tableData={featureData} />
            <FeatureModalDialog isOpen={isDialogOpen}></FeatureModalDialog>
            <HighlightTable tableData={highlightData} />
            <HighlightModalDialog isOpen={isDialogOpen2}></HighlightModalDialog>
            <div className="row form-group">
                <div className="col-lg-12 float-right ">
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>

                </div>
            </div>
        </div>

    )
}
