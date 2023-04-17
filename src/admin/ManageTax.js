import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteTax, getTaxes, statusTax ,statusChangeTax } from "./apiAdmin";
import { Switch } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import DataTableComponent from "../common/DataTableComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageTax = () => {
    const [values, setValues] = useState({
       error: '',
       redirectToProfile: false,
       success: false
    });
    const { error, success, redirectToProfile } = values;

    const [TaxList, setTax] = useState([]);

    const loadProducts = () => {
        getTaxes().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setTax(data);
            }
        });
    };

    const destroy = taxId => {
        if(window.confirm('Are you sure you want to delete this record?'))
        {
            const tax = {
                deletedAt: new Date(),
            };
            deleteTax(taxId, tax).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    loadProducts();
                    toast.success('Deleted successfully!', {
                        autoClose:600,
                        onClose: () => {
                            setValues({
                                ...values,
                                redirectToProfile: true
                            })
                        }
                    })
                }
            });
        }
    };

    const deleteMessage = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
           <a class="text-center" style={{color:'white'}}> Attribute Deleted </a> 
        </div>  
    );
    
    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/tax" />;
            }
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const getDate = (date) => {
        const newDate = date.split('T')[0];
        const DATE = newDate.split('-');
        return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
    }

    const status = taxId => {
        const tax = {
            taxStatus: 0,
         };
         statusTax(taxId, tax).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
    
    const statusChange = taxId => {
        const tax = {
            taxStatus: 1,
         };
         statusChangeTax(taxId, tax).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

  // Table 
  const columns = [
    {
        dataField: 'id',
        text: 'ID',
        hidden: true
    },
    {
        dataField: 'taxName',
        text: 'Tax Name',
        sort: true
    }, 
    {
        dataField: 'taxValue',
        text: 'Percentage',
        sort: true
    }, 
    {
        dataField: 'taxDescription',
        text: 'Description',
        sort: true
    }, 
    {
        dataField: 'createdAt',
        text: 'Date'
    }, 
    {
        dataField: 'status',
        text: 'Status'
    }, 
    {
        dataField: 'action',
        text: 'Action'
  }];

  const getButtons = (tax) => {
    return (
        <div>
            <Link to={`/admin/tax/update/${tax._id}`}><button className='btn btn-outline btn-info m-5' aria-label='Edit' title="Add Manufacturer"><i className='fa fa-pencil font-15'></i></button></Link>
            <button className='btn btn-outline btn-danger m-5' aria-label='Delete' onClick={() => destroy(tax._id)} title="Soft Delete"><i className='fa fa-trash-o font-15'></i></button> 
        </div>
    )
  };

  const getSwitch = (tax) => {
    return (
        <>
         {tax.status == 1 
            ?(
            <>
            <Switch name="checkedA" checked inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => status(tax._id)} color='primary'/>
            </>
            ):
            <Switch name="checkedA"  inputProps={{ "aria-label": "secondary checkbox","size": "medium","color":"Primary" }} onClick={() => statusChange(tax._id)} color='primary'/>
        }
        </>
    )
  };

  const taxList = [];
  TaxList.forEach((item) => {
    if(!item.deletedAt){
    item['id'] = item._id;
    item['taxValue'] = item.taxValue+'%';
    item['createdAt'] = getDate(item.createdAt);
    item['status'] = getSwitch(item);
    item['action'] = getButtons(item);
    taxList.push(item);
    }
    else{
        console.log("error");
    }
  });
// end table
    return (
            <div className="row">
                {deleteMessage()}
                {redirectUser()}
                <div className="col-md-12">
                    <ToastContainer />
                    <DataTableComponent title="Test" keyField="id" tableHeading={columns} tableList={taxList}/> 
                </div>
            </div>
    );
};

export default ManageTax;
