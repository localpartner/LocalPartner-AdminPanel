import MUIDataTable from "mui-datatables";
import React, { useState, useEffect, memo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

const TableComponent = (props) => {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("100%");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [printBtn, setPrintBtn] = useState(false);
  const [viewColumnBtn, setViewColumnBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(false);



  const [list, setList] = useState(props.tableList);
  const [check, setCheck] = useState(true);


  useEffect(() => {
    setList(props.tableList);
  }, [props]);

  const getDate = (date) => {
    // const newDate = date.split('T')[0];
    // const dt = newDate.split('-');
    // return dt[2] + '-' + dt[1] + '-' + dt[0];
    return true;
  }

  const columns = [
    { name: "Store Name", options: { filterOptions: { fullWidth: true } } },
    "E-mail",
    "Status",
    "Date",
    "Action"
  ];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 15, 100],
  };
  var listData = [];
  var i = 0;

  const data = [];
  list.map((ele, key) => {
    if (ele.isDelete != true) {
      console.log("ele", ele.storeId.storeName);
      listData[i] = [
        ele.storeId.storeName,
        ele.email,
        <Switch name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox", "size": "medium", "color": "primary" }}
          color='primary'
          onClick={() => setCheck(!check)}
        />,
        getDate(ele.createdDate),
        <div>
          {/* <button className="className='btn btn-outline btn-info m-5'" onClick={props.clickEditData}><i className='fa fa-pencil font-15'></i></button> */}
          <Link to={`/admin/storemanagement/edit/${ele.storeId._id}`} className='btn btn-outline btn-info m-5' aria-label='Edit' onClick={props.onClick} ><i className='fa fa-pencil font-15'></i></Link>
          <Link to={`/admin/storemanagement/delete/${ele.storeId._id}`} className='btn btn-outline btn-info m-5' aria-label='Delete' onClick={props.onClick}><i className='fa fa-trash-o font-15'></i></Link>
          <Link to={`/admin/rolemanagement/${ele.storeId._id}`} className="btn btn-outline btn-info m-5" aria-label="Add role">Add Role</Link>
        </div>
      ]
      data.push(listData[i]);
      i++;
    }
  }
  )

  const getMuiTheme = () => createTheme({
    components: {
      MuiTableHead : {
        MuiTableRow : { 
          MuiTableCell : {
            styleOverrides : {
              head: {
                fontSize : "16px",
                backgroundColor : "black"
              }
            }
          }
        }
      }
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: "16px",
          }
        }
      },
      MuiSvgIcon : {
        styleOverrides : {
          root: {
            fontSize : "20px",
          }
        }
      },
      MuiInput : {
        styleOverrides : {
          input  : {
            fontSize : "16px",
          }
        }
      },
      MuiTablePagination : {
        styleOverrides : {
          displayedRows   : {
            fontSize : "1.825rem" 
          }
        }
      },
      MuiButtonBase : {
        styleOverrides : {
          root : {
            fontSize : "1.875rem" 
          }
        }
      },
      MuiTablePagination : {
        styleOverrides :{
          selectLabel  : {
            fontSize : "1.825rem" 
          }
        }
      }
    }
  })
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={getMuiTheme()}>
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">
            Responsive Option
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={responsive}
            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
            onChange={(e) => setResponsive(e.target.value)}
          >
            <MenuItem value={"vertical"}>vertical</MenuItem>
            <MenuItem value={"standard"}>standard</MenuItem>
            <MenuItem value={"simple"}>simple</MenuItem>

            <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
            <MenuItem value={"scrollMaxHeight"}>
              scrollMaxHeight (deprecated)
            </MenuItem>
            <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">
            Table Body Height
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tableBodyHeight}
            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
            onChange={(e) => setTableBodyHeight(e.target.value)}
          >
            <MenuItem value={""}>[blank]</MenuItem>
            <MenuItem value={"400px"}>400px</MenuItem>
            <MenuItem value={"800px"}>800px</MenuItem>
            <MenuItem value={"100%"}>100%</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">
            Max Table Body Height
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tableBodyMaxHeight}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setTableBodyMaxHeight(e.target.value)}
          >
            <MenuItem value={""}>[blank]</MenuItem>
            <MenuItem value={"400px"}>400px</MenuItem>
            <MenuItem value={"800px"}>800px</MenuItem>
            <MenuItem value={"100%"}>100%</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">Search Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setSearchBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">Download Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={downloadBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setDownloadBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">Print Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={printBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setPrintBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl> */}
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">
            View Column Button
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={viewColumnBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setViewColumnBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setFilterBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl> */}
        <MUIDataTable
          title={props.title}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default memo(TableComponent);