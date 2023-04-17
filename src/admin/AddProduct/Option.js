import React, { useEffect, useState } from "react"
import AdminLayout from "../../core/AdminLayout"
import { Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import Table from "react-bootstrap/Table"
import "react-calendar/dist/Calendar.css"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { addOption } from "../../actions"
import { updateProduct } from "../apiAdmin"
import { ToastContainer, toast } from "react-toastify"
import "react-calendar/dist/Calendar.css"
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5]
    // padding: theme.spacing(2, 4, 3),
  }
}))

const Option = props => {
  const accessToken = JSON.parse(localStorage.getItem("jwt"));

  const [radio, setRadio] = useState([])

  const [values, setValues] = useState({
    type: "radio",
    displayName: "",
    value: "",
    qunatity: "",
    dateAvailable: "",
    price: "",
    substrackStock: ""
  })
  const [dateState, setDateState] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [errormessage, setErrorMessage] = useState()
  console.log(dateState.toLocaleDateString(), "date")
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const changeDate = e => {
    setDateState(e.toLocaleDateString())
  }
  const arr = ["Check box", "Date", "Date & time", "Delivery Date", "File"]
  const [options, setOptions] = useState([])

  const Option = e => {
    setOptions([...options, e.target.value])
  }
  const Pop = index => {
    const list = [...options]
    list.splice(index, 1)
    setOptions(list)
  }

  console.log(values, "hello values")

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    })
  }
  let payload = {}
  let option = []
  let data = []

  const clickSave = event => {
    event.preventDefault()

    for (let i = 0; i < props.optionData.length; i++) {
      data.push({
        value: props.optionData[i].type.value,
        quantity: props.optionData[i].type.qunatity,
        substractStock: props.optionData[i].type.substrackStock,
        dateAvailable: props.optionData[i].type.dateAvailable,
        price: props.optionData[i].type.price
      })
    }
    option.push({
      type: props.optionData[0].type.type,
      displayName: props.optionData[0].type.displayName,
      data: data
    })
    payload = {
      name: props.gerneralData[0].productName.name,

      price: props.gerneralData[0].productName.price,

      options: option
    }
    updateProduct(payload, props.gerneralData[0].productName.code, accessToken).then(
      data => {
        if (data.error) {
          toast.error('Fill All Fields', {
            autoClose: 600,
            onClose: () => {
              setValues({
                ...values,
                redirectToProfile: true
              })
            }
          })
        } else {
          setValues({})
          toast.success('Added successfully!', {
            autoClose: 600,
            onClose: () => {
              setValues({
                ...values,
                redirectToProfile: true
              })
            }
          })
        }
      }
    )
  }

  const clickSubmit = event => {
    event.preventDefault()
    if (
      values.displayName == "" ||
      values.value == "" ||
      values.qunatity == "" ||
      values.dateAvailable == "" ||
      values.price == "" ||
      values.substrackStock == ""
    ) {
      // setErrorMessage("Fill All Fields")
      toast.error("Fill All Fields", {
        autoClose: 600,
        onClose: () => {
          setValues({
            ...values,
            redirectToProfile: true
          })
        }
      })
    } else {
      setErrorMessage("")
      setValues({ ...values, error: false })

      props.dispatch(addOption({ values }))
    }
  }
  useEffect(() => {
    setRadio(props.optionData)
  }, [props.optionData])
  return (
    <>
      <AdminLayout>
        <div id="wrapper">
          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8">
                  <h3 className="font-bold" id="hedingTitle">
                    {" "}
                    Add Product
                  </h3>
                </div>
                <div className="col-md-4">
                  <Link to={`/admin/productlist`}>
                    <button
                      type="submit"
                      className="btn btn-outline btn-info fa-pull-right"
                      id="addButton"
                    >
                      <i className="fa fa-backward"></i> Back
                    </button>
                  </Link>
                </div>
              </div>
              <div className="white-box">
                <div className="row">
                  <ToastContainer />
                  <div className="col-lg-12">
                    <div>
                      <div id="wrapper">
                        <div>
                          <div>
                            <div>
                              <div className="col-12">
                                <div class="card text-center">
                                  <div class="card text-center">
                                    <Navbar />
                                  </div>
                                  <div>
                                    <div>
                                      <div className="row form-group">
                                        <div className="col-lg-1 ">
                                          <h2
                                            style={{
                                              marginBottom: "10px"
                                            }}
                                          >
                                            <b>RADIO</b>
                                          </h2>
                                        </div>
                                        <div className="col-lg-9 "></div>

                                        <div
                                          className="col-lg-12 container-fluide White-box"
                                          style={{ padding: "10px" }}
                                        ></div>

                                        <div className="row form-group">
                                          <div className="col-lg-2">
                                            <h6>
                                              <b> Display Name </b>
                                              <span style={{ color: "red" }}>
                                                *
                                              </span>
                                            </h6>
                                          </div>
                                          <div className="col-lg-10">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter Name"
                                              onChange={handleChange(
                                                "displayName"
                                              )}
                                            />
                                          </div>
                                        </div>

                                        <Table striped bordered hover size="sm">
                                          <thead>
                                            <tr>
                                              <th className="text-center">
                                                <h6
                                                  className="text-center"
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    alignContent: "center"
                                                  }}
                                                >
                                                  <b>Type</b>
                                                </h6>
                                              </th>
                                              <th>
                                                <h6>
                                                  <b>Display Name</b>
                                                </h6>
                                              </th>
                                              <th>
                                                <h6>
                                                  <b> Value</b>
                                                </h6>
                                              </th>
                                              <th>
                                                <h6>
                                                  <b>Quantity</b>
                                                </h6>
                                              </th>
                                              <th>
                                                <h6>
                                                  <b>Subtract Stock</b>
                                                </h6>
                                              </th>
                                              <th>
                                                <h6>
                                                  <b>Date Available</b>
                                                </h6>
                                              </th>

                                              <th>
                                                <h6>
                                                  <b>Price</b>
                                                </h6>
                                              </th>
                                            </tr>
                                          </thead>

                                          <tbody>
                                            {radio.map((item, index) => {
                                              console.log(
                                                item.type.dateAvailable,
                                                "lll"
                                              )
                                              return (
                                                <>
                                                  <tr>
                                                    <td>{item.type.type}</td>
                                                    <td>
                                                      {item.type.displayName}
                                                    </td>
                                                    <td>{item.type.value}</td>
                                                    <td>
                                                      {item.type.qunatity}
                                                    </td>
                                                    <td>
                                                      {item.type.substrackStock}
                                                    </td>
                                                    <td>
                                                      {item.type.dateAvailable}
                                                    </td>
                                                    <td>{item.type.price}</td>
                                                  </tr>
                                                </>
                                              )
                                            })}
                                            <tr>
                                              <td colSpan={7}></td>
                                              <td>
                                                <div>
                                                  {
                                                    <button
                                                      className="btn btn-info"
                                                      onClick={handleOpen}
                                                    >
                                                      <i className="fa fa-plus"></i>
                                                    </button>
                                                  }
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>
                                  <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                      timeout: 500
                                    }}
                                    style={{ borderRadius: "10px" }}
                                  >
                                    <Fade
                                      in={open}
                                      style={{
                                        padding: "40px",
                                        width: "40%"
                                      }}
                                    >
                                      <div className={classes.paper}>
                                        <div className="row">
                                          <div className="row">
                                            <div
                                              className="col-lg-1"
                                              style={{
                                                display: "flex",
                                                alignItem: "center",
                                                justifyContent: "center",
                                                paddingTop: "10px"
                                              }}
                                            >
                                              <b>
                                                <i
                                                  className="fa fa-pencil"
                                                  style={{ marginLeft: "35px" }}
                                                ></i>
                                              </b>
                                            </div>
                                            <div className="col-lg-4">
                                              {" "}
                                              <h6>
                                                <b>Option Value</b>
                                              </h6>
                                            </div>
                                          </div>
                                          <div>
                                            {" "}
                                            <hr style={{ width: "100%" }} />
                                          </div>
                                          <div className="col-lg-12">
                                            {" "}
                                            <h6>
                                              {" "}
                                              <b>Date Available</b>
                                              <span style={{ color: "red" }}>
                                                *
                                              </span>
                                            </h6>
                                          </div>

                                          <div className="col-lg-12">
                                            <input
                                              type="date"
                                              className="form-control"

                                              onChange={handleChange("dateAvailable")}

                                            />
                                          </div>

                                        </div>
                                        <div className="row">
                                          <div className="col-lg-12">
                                            <h6>
                                              {" "}
                                              <b>Value</b>
                                              <span style={{ color: "red" }}>
                                                *
                                              </span>
                                            </h6>
                                          </div>
                                          <div className="d-flex">
                                            <div className="col-lg-12">
                                              <input
                                                type="text"
                                                placeholder="Enter Value"
                                                className="form-control"
                                                onChange={handleChange("value")}
                                              ></input>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="col-lg-12">
                                            <h6>
                                              {" "}
                                              <b>Quantity</b>
                                              <span style={{ color: "red" }}>
                                                *
                                              </span>
                                            </h6>
                                          </div>

                                          <div className="d-flex">
                                            <div className="col-lg-12">
                                              <input
                                                type="number"
                                                placeholder="Enter Quantity"
                                                className="form-control"
                                                onChange={handleChange(
                                                  "qunatity"
                                                )}
                                              ></input>
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <div className="row">
                                            <div className="col-lg-12">
                                              {" "}
                                              <h6>
                                                {" "}
                                                <b>Price</b>
                                                <span style={{ color: "red" }}>
                                                  *
                                                </span>
                                              </h6>
                                            </div>

                                            <div className="d-flex">
                                              <div className="col-lg-12">
                                                <input
                                                  type="number"
                                                  placeholder="Enter Price"
                                                  className="form-control"
                                                  onChange={handleChange(
                                                    "price"
                                                  )}
                                                ></input>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="row  d-flex form-group">
                                            <div className="col-lg-12">
                                              {" "}
                                              <h6>
                                                {" "}
                                                <b>Substrack Stock</b>
                                                <span style={{ color: "red" }}>
                                                  *
                                                </span>
                                              </h6>
                                            </div>

                                            <div className="d-flex">
                                              <div className="col-lg-12">
                                                <select
                                                  onChange={handleChange(
                                                    "substrackStock"
                                                  )}
                                                  className="form-control"
                                                >
                                                  <option>Select Option</option>

                                                  <option value={true}>
                                                    Yes
                                                  </option>
                                                  <option value={false}>
                                                    No
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-lg-7">
                                          <button
                                            className="btn btn-info btn-md"
                                            onClick={clickSubmit}
                                            style={{
                                              float: "right",
                                              borderRadius: "7px"
                                            }}
                                          >

                                            Save
                                          </button>
                                        </div>
                                        <span className="text-danger">
                                          {errormessage}
                                        </span>
                                      </div>
                                    </Fade>
                                  </Modal>

                                  <button
                                    className="btn btn-info btn-md"

                                    onClick={clickSave}
                                    style={{
                                      float: "right",
                                      borderRadius: "7px"
                                    }}
                                  >
                                    Submit

                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}
const mapStateToProps = state => ({
  gerneralData: state.general.General,
  optionData: state.option.Option,
  stockData: state.stock.Stock,
  imageData: state.image.Image,
  specialData: state.special.Special,
  linksData: state.links.Link,
  specificationData: state.specification.Specification,
  discountData: state.discount.Discount
})

export default connect(mapStateToProps)(Option)
