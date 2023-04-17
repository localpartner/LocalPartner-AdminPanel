import React, { useState, useEffect, memo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { padding } from '@mui/system';
//https://www.npmjs.com/package/react-notifications

const { SearchBar } = Search;

const { ExportCSVButton } = CSVExport;

const emptyDataMessage = () => {
  return (<div className="text-center" style={{ color: '#000', padding: '10px' }}>No Data to Display</div>);
}

/*
export const productsGenerator = quantity => {
    const items = [];
    for (let i = 0; i < quantity; i++) {
      items.push({ id: i, name: `Item name ${i}`, price: 2100 + i });
    }
    return items;
};

const products = productsGenerator(50);

const columns = [{
    dataField: 'id',
    text: 'Product ID',
    sort: true
  }, {
    dataField: 'name',
    text: 'Product Name',
    sort: true
  }, {
    dataField: 'price',
    text: 'Product Price'
  }];
  */

const DataTableComponent = (props) => {
  return (
    <ToolkitProvider
      keyField={props.keyField}
      data={props.tableList}
      columns={props.tableHeading}
      search
    >
      {
        props => (
          <div>
            {/*<div className='float-left' style={{marginBottom:'10px'}}>
                        <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                    </div>*/}
            {/* <button className='btn btn-info' style={{float:'right', borderRadius:'8px'}}><i className='fa fa-search'></i></button> */}
            <div  style={{ marginBottom: '10px' ,padding:'10px'}}>
              <SearchBar {...props.searchProps} />
            </div>
            {/* <div  className='float-right' style={{ marginBottom: '10px', padding:'10px'}}>
              <SearchBar {...props.searchProps} />
            </div> */}
            <BootstrapTable
              noDataIndication={emptyDataMessage}
              hover
              condensed
              bordered={false}
              pagination={paginationFactory({ sizePerPage: 10 })}
              {...props.baseProps}
              // selectRow={{
              //   mode: 'checkbox',
              // }}
            />
          </div>
        )
      }
    </ToolkitProvider>
  )
}

export default memo(DataTableComponent);;