import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import AdminLayout from "../../core/AdminLayout";
import { Navbar } from "./Navbar";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAttributes,specifications } from "../../actions";

import {showSpecificationDailogBox,hideSpecificationDailogBox,setEditIndex} from '../../actions/productConfigActions'
import { updateProduct } from '../apiAdmin';
import Table from "react-bootstrap/Table"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles";



export const ModalDialog = (args)=>{
    const dispatch = useDispatch();
    const Componet = args.component;
    const width = args.width ? args.width : "40%"
   
    const onCloseBox = (event, reason) =>{
        if(reason=="escapeKeyDown" || reason=="backdropClick"){
            return false;
        }
        dispatch(setEditIndex(-1))
        dispatch(args.onCloseAction())

    }
    

    const onSaveBox = ()=>{
        args.onSaveAction()
        dispatch(args.onCloseAction())
    }
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
      const classes = useStyles()
      
return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description"
        className={classes.modal}  open={args.isOpen} onClose={onCloseBox} closeAfterTransition
        BackdropComponent={Backdrop} BackdropProps={{timeout: 500}} style={{ borderRadius: "10px" }}  >
        <Fade in={args.isOpen} style={{padding: "40px",width: width}}>
            <div className={classes.paper}>
                <div className="row">                    
                    <h4><b>{args.title}</b></h4>
                    <div> <hr style={{ width: "100%" }} /></div>
                </div>
                <div className="row">
                    <Componet></Componet>                    
                </div>
                <div className="row">
                    <div> <hr style={{ width: "100%" }} /></div>
                    <div className="col-lg-12 float-right ">
                        <button onClick={onCloseBox} className="btn btn-danger btn-md" style={{float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Cancel </button>
                        <button onClick={onSaveBox} className="btn btn-info btn-md" style={{ float: 'right', borderRadius: '7px', "marginRight": "10px" }}>Add</button>
                
                    </div>
                </div>

              
            </div>
        </Fade>
    </Modal>)
}