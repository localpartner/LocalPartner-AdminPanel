import { TrainRounded } from "@mui/icons-material";
import React, { useState,useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { setCurrentTab,setPreviousTab } from "../../actions/productConfigActions";
import {useSelector, useDispatch} from 'react-redux'
export const Navbar = () => {

    const [activeTab, setActiveTab] = useState(1);
    const [rerender, setReRender] = useState(true);
    const dispatch = useDispatch();

    const onMenuClick = (tab)=>{
       // alert(tab)
        let previousTab = activeTab;       
        dispatch(setPreviousTab(previousTab));
        setActiveTab(tab);

        dispatch(setCurrentTab(tab))
    } 

    useEffect (()=>{

    },[])


    

    return (
        <div class="card text-center">
            {activeTab > 0 && <ul className="nav nav-tabs card-header-tabs">
                <li class="nav-item ">
                    <NavLink  to="#"   isActive={() =>  activeTab==1}  activeClassName="navbar__link--active"  className="navbar__link navbarr" data-toggle="tab" onClick={()=>onMenuClick(1)} >General</NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink to="#"   isActive={() =>  activeTab==2}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(2)} >Feature & Highlight</NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink to="#"   isActive={() =>  activeTab==3}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(3)} >Identification</NavLink>
                    {/*<NavLink to="#" activeClassName="navbar__link--active"  className="navbar__link navbarr" data-toggle="tab" onClick={()=>onMenuClick(2)} >Stock</NavLink>*/}
                </li>
                <li class="nav-item ">
                    <NavLink to="#"   isActive={() =>  activeTab==4}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(4)} >Specifications</NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink to="#"   isActive={() =>  activeTab==5}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(5)} >Stock</NavLink>
                    {/*<NavLink to="#" activeClassName="navbar__link--active"  className="navbar__link navbarr" data-toggle="tab" onClick={()=>onMenuClick(2)} >Stock</NavLink>*/}
                </li>
                <li class="nav-item ">
                    <NavLink to="#"   isActive={() =>  activeTab==6}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(6)} >Option</NavLink>
                </li>
               
                <li class="nav-item ">
                    <NavLink to="#"  isActive={() =>  activeTab==7}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(7)} >Discount</NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink to="#"   isActive={() =>  activeTab==8}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(8)} >Specials</NavLink>
                    {/*<NavLink to="#" activeClassName="navbar__link--active"  className="navbar__link navbarr" data-toggle="tab" onClick={()=>onMenuClick(2)} >Stock</NavLink>*/}
                </li>
                <li class="nav-item ">
                    <NavLink to="#"   isActive={() =>  activeTab==9}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(9)} >Links</NavLink>
                </li>
                <li class="nav-item ">
                    <NavLink to="#"   isActive={() =>  activeTab==10}  activeClassName="navbar__link--active"  className="navbar__link navbarr"  data-toggle="tab" onClick={()=>onMenuClick(10)} >Images</NavLink>
                </li>
                
                
             </ul>}
        </div>



    )
}