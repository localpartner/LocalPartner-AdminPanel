import React from "react";
import axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import AdminLayout from "../core/AdminLayout";

export const Transaction = () => {
    const [page, setPagin] = useState(true);

    const [hide, setHide] = useState(false);
    const [data, setData] = useState([]);


    useEffect(() => {
        getData();
    }, []);
    const getData = () => {
        axios("https://jsonplaceholder.typicode.com/comments").then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    };
    const { SearchBar } = Search;


    const emptyDataMessage = () => {
        setHide(true);

        return (
            <div className="text-center" style={{ color: "#000", padding: "10px" }}>
                No Data to Display
            </div>
        );
    };




    const columns = [
        {
            dataField: "email",
            text: "email",
            headerClasses: {hide}, 

            
        },
        {
            dataField: "name",
            text: "name",
            headerClasses: {hide}, 

        },
        {
            dataField: "postId",
            text: "Product ID   ",
            headerClasses: {hide}, 
        },
    ];



    var dataLength = data.length;


    return (

        <>
            <AdminLayout />




            {dataLength === 0 ? (<><h1 className="text-center">No Data to Display</h1>



            </>) : (


                <ToolkitProvider keyField="id" data={data} columns={columns} search>
                    {(props) => (
                        <div id="wrapper">
                            <div className="page-wrapper">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p id="hedingTitle">Transaction Management</p>
                                        </div>
                                    </div>
                                    <div className="white-box">
                                        <div className="row">
                                            <div className="col-lg-12 ">
                                                <div
                                                    className="float-right"
                                                    style={{ marginBottom: "10px" }}
                                                >
                                                    <SearchBar {...props.searchProps} />
                                                </div>

                                                <hr />

                                                <BootstrapTable
                                                    {...props.baseProps}
                                                    pagination={paginationFactory()}
                                                    bordered={false}
                                                    noDataIndication={emptyDataMessage}



                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </ToolkitProvider>

            )}


























            {/* <div id="wrapper">
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-8'><p id="hedingTitle">Transaction Management</p></div>
                        </div>

                        <div className="white-box">
                            <div className="row">
                                
                                <div className="col-lg-12 " >
                                     <BootstrapTable
                                        keyField='id'
                                        data={data}
                                        columns={columns}
                                        bordered={false}


                                        pagination={paginationFactory()}

                                    /> 
                                    

                                </div>
                            </div>
                        </div>
                    </div>


                </div>




            </div> */}
        </>
    );
};
