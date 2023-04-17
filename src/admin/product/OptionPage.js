import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {showOptionDailogBox,hideOptionDailogBox,addOption,setOptionData,setOption,setEditIndex,saveProduct,cancelSaveProduct} from '../../actions/productConfigActions'
import Table from "react-bootstrap/Table"
import {ModalDialog} from './ModalDialog'
import {formatDate,formatDateYYYMMDD} from '../../utils'

const OptionTable = (args) =>{
    let options = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.options})
    options = options==undefined ? [] : options;
    const dispatch = useDispatch();
    const openOptionBox = ()=>{
        dispatch(setOptionData({}))
        dispatch(showOptionDailogBox())

    }

    const deleteOption = (index) =>{
        let array = [...options]
        array.splice(index,1)
        dispatch(setOption(array))

    }
    const editOption = (index) =>{
        dispatch(setEditIndex(index))        
        let array = [...options]        
        dispatch(setOptionData(array[index]))
        dispatch(showOptionDailogBox())

    }
    return (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>
                    <h5><b>Display Name</b></h5>
                </th>
                <th>
                    <h5><b>Type</b></h5>
                </th>
                <th>
                    <h5><b>Values</b></h5>
                </th>                  
                <th>                  
                </th>             
            </tr>
        </thead>
        <tbody>
            {args.tableData.map((item, index) => {
                
                let valueArray = item.data?.map((item)=>{
                    return item.value
                })
                return (
                   
                        <tr key={index}>
                            <td>{item.displayName}</td>
                            <td>{item.type}</td>
                            <td>{valueArray?.toString()}</td>
                            
                            
                            <td>
                                <button className="btn btn-info" onClick={()=>editOption(index)} >
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-outline btn-danger" onClick={()=>deleteOption(index)} >
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
                        <button className="btn btn-info" onClick={openOptionBox} ><i className="fa fa-plus"></i></button>
                    </div>
                </td>
            </tr>

        </tbody>
    </Table>);
}

const OptionDataTable = (args) =>{
    const dispatch = useDispatch();
    const [newRow,setNewRow] = useState(false)
    const [editRowNumber,setEditRowNumber] = useState(-1);
    let data  =  args.tableData ? args.tableData :[]
    const [tableData,addTableData] = useState(data)
    const [state, setState] = useState({ });
    const handleChange = e => {
        const { name, value } = e.target;
        if(name=="substractStock"){
            console.log(e.target.checked)
            setState(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));

        }else{
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
       
       
    };
   
    const newEntry = ()=>{
        //dispatch(showOptionDailogBox())
        setNewRow(true);
        setState({substractStock:false})

    }
    const addEntry = ()=>{
        //dispatch(showOptionDailogBox())
        if(editRowNumber<0){
            let arr1 =[];
            arr1.push({...state});
            let array = [...tableData,...arr1]
            addTableData(array)
            setNewRow(false);
            setState({substractStock:false})
            args.callback(array)
        }else{
            let editedData = {...state}
            let array = [...tableData]
            array.splice(editRowNumber,1,editedData)
            addTableData(array)
            args.callback(array)
            setNewRow(false);
            setState({substractStock:false})
            setEditRowNumber(-1);

        }
        

    }
    const  cancelEntry = ()=>{
        //dispatch(showOptionDailogBox())
        setNewRow(false);
        setEditRowNumber(-1);


    }
    const deleteRow = (index)=>{
        let array = [...tableData]
        array.splice(index,1)
        addTableData(array)
        args.callback(array)

    }
    const editRow = (index)=>{
        let array = [...tableData]
        let obj = {...array[index], dateAvailable:formatDateYYYMMDD(array[index].dateAvailable)}
        setState(obj);
        setEditRowNumber(index)
        //array.splice(index,1)
        //addTableData(array)
        setNewRow(true);

    }
    return (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th width="18%">
                    <h5><b>Value</b></h5>
                </th>
                <th width="18%">
                    <h5><b>Quantity</b></h5>
                </th>
                <th width="18%">
                    <h5><b>Price</b></h5>
                </th>
                <th width="18%">
                    <h5><b>Date Available</b></h5>
                </th>   
                <th width="18%" >
                    <h5><b>Substract Stock</b></h5>
                </th>                     
                <th width="10%">                  
                </th>             
            </tr>
        </thead>
        <tbody>
            {tableData.map((item, index) => {
              
                return (
                   
                        <tr key={{index}}>
                            <td>{item.value}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{formatDate(item.dateAvailable)}</td>
                            <td>{item.substractStock==true ? "Yes" : "No"}</td>
                            {editRowNumber != index && <td>
                                <button className="btn btn-xs btn-warning" onClick={()=>{editRow(index)}}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button style={{"marginLeft":"10px"}} className="btn btn-xs  btn-danger" onClick={()=>{deleteRow(index)}} >
                                    <i className="fa fa-trash-o"></i>
                                </button>
                               
                            </td>}      
                            {editRowNumber == index && <td>
                                <span><i className="fa fa-solid fa-arrow-left"></i></span>
                               
                            </td>} 

                        </tr>
                 
                )
            })}
            {newRow ==true && <tr>
                <td><input type="text" value={state.value} onChange={handleChange} name="value" className="form-control"></input></td>
                <td><input type="number" value={state.quantity} onChange={handleChange} name="quantity" className="form-control"></input></td>
                <td><input type="number" value={state.price} onChange={handleChange} name="price" className="form-control"></input></td>
                <td><input type="date"  value={state.dateAvailable} onChange={handleChange} name="dateAvailable" className="form-control"></input></td>
                <td><input type="checkbox" checked={state.substractStock} onChange={handleChange} name="substractStock" class="form-check-input"></input></td>
                <td>
                    <div>
                        <button className="btn btn-xs btn-success" onClick={addEntry} ><i className="fa fa-check"></i></button>
                        <button style={{"marginLeft":"10px"}} className="btn btn-xs btn-danger" onClick={cancelEntry} ><i className="fa fa-close"></i></button>
                    </div>
                </td>
            </tr>}
            <tr>
                <td colSpan={5}></td>
                <td>
                    <div>
                        <button disabled = {newEntry==true} className="btn btn-info" onClick={newEntry} ><i className="fa fa-plus"></i></button>
                    </div>
                </td>
            </tr>



        </tbody>
    </Table>);
}

const OptionDialogForm = (args)=>{
    let optionsData = useSelector((state)=>{return state && state.product && state.product.optionsData})
    optionsData = optionsData? optionsData : { type:'',displayName:'', data:[]}
    const [state, setState] = useState(optionsData);    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setOptionData(state))
    }, [state]);

    const handleChange = e => {
        const { name, value } = e.target;
     
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
       
    };

    const callback = (newData)=>{
        
        setState(prevState => ({
            ...prevState,
            'data': newData
        }));

    }

    return (
        <div id="OptionDialogForm" class="tab-pane active">

                <div class="row g-3" >
                    <div class="col-md-6" >
                        <label for="displayName" class="form-label"> <h6><b>Display Name</b><span style={{ color: "red" }}>*</span></h6></label>
                        <input type="text" value={state.displayName} onChange={handleChange} name="displayName" class="form-control" id="displayName" />
                    </div>
                    <div class="col-md-6">
                        <label for="type" class="form-label"><h6><b>Type</b><span style={{ color: "red" }}>*</span></h6></label>
                        <input type="text" name="type" value={state.type} onChange={handleChange} class="form-control" id="type" />
                    </div> 
                    <div class="col-md-12" style={{"paddingTop":"10px"}}>
                        <OptionDataTable tableData= {state.data} callback={callback}></OptionDataTable>
                    </div>                  
                </div>
       
                                     
        </div>
    )

}
const OptionModalDialog = (args)=>{    
    
    const optionsData = useSelector((state)=>{return state && state.product && state.product.optionsData})
    let options = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.options})
    const editIndex = useSelector((state)=>{return state && state.product && state.product.editIndex})
    const dispatch = useDispatch();

    const onSave =()=>{
        
        let data = optionsData ? optionsData : []
        if(editIndex<0){
            dispatch(addOption(data))
        }else{

            let array = [...options]
            array.splice(editIndex,1,data)       
           
            dispatch(setOption(array))      
            dispatch(setEditIndex(-1))            

        }
        
    }
    return (
        <ModalDialog isOpen={args.isOpen} onSaveAction={onSave} onCloseAction={hideOptionDailogBox} 
                        title="Add Option" component={OptionDialogForm} width="60%"/>
    );
}


export const OptionPage = (props) => {
    const [values, setValues] = useState({
        code: "",
        value: ''

    });
   
    const [errormessage, setErrorMessage] = useState();
    const handleChange = (name) => (event) => {

        setValues({ ...values, error: false, [name]: event.target.value });

    };
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((state)=>{return state && state.product && state.product.optionDialogBox})
    const optionsData = useSelector((state)=>{return state && state.product && state.product.workingProduct && state.product.workingProduct.options})
    const clickSubmit = ()=>{
        //dispatch(setProductGeneralData(state))
        dispatch(saveProduct(true))
    }

    const clickCancel = ()=>{
        dispatch(cancelSaveProduct(true)) 
    }



    return (        
        <div id="stock" class="tab-pane active">
            <OptionTable tableData={optionsData}/>
            <OptionModalDialog isOpen={isDialogOpen}></OptionModalDialog>
            <div className="row form-group">
                <div className="col-lg-12 float-right ">
                    <button onClick={clickCancel} className="btn btn-danger btn-md" style={{float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                    <button onClick={clickSubmit} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Save</button>
                    
                </div>
            </div>
        </div>

    )
}
