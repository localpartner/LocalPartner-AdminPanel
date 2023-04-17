import React, { Fragment } from "react";
import { Link ,withRouter } from "react-router-dom";
import Search from "./Search";
import { signout, isAuthenticated } from "../auth";
import Menu from "./Menu"
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

export default function Header({ history }){
    console.log(isAuthenticated())
    return(
        <div className="pd_header_main_wrapper float_left">
            <div className="container">
                <div className="pd_top_header_wrapper">
                    {/* <div className="baz_top_header"> */}
                    {/* <div className="row">
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="left_side">
                                <ul>
                                <li className="res_hidden">
                                    <Link to="#"> <span><i className="fas fa-phone"></i></span>Helpline: +1234567890 </Link>
                                </li>
                                <li className="language">
                                    <Link to="#">Eng <i className="fas fa-angle-down"></i></Link>
                                    <div className="submenu">
                                        <Link to="#"> <span><img src="../assets/images/usa.png" alt="flag" /></span> English</Link>
                                        <Link to="#"> <span><img src="../assets/images/india.png" alt="flag" /></span> Hindi</Link>
                                    </div>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-12">
                            <div className="right_side">
                                <Menu/>
                            </div>
                        </div>
                    </div> */}
                    {/* </div> */}
                    <div className="middle_header float_left">
                    <div className="row">
                        <div className="col-md-2 col-12">
                            <div className="logo">
                                <Link to="index.html">
                                <img className="img-fluid" src="../assets/images/logo.png" alt="logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-7 col-12">
                            <Search/>
                        </div>
                        <div  className="col-md-1 col-12">
                            <Menu/>
                        </div>
                        <div className="col-md-2 col-12">
                            <div className="cart_shop">
                                <Link to="#">
                               
                                <span>Your Cart <small>$3590</small> </span>
                                </Link>
                                <div className="cart_details">
                                <div className="total-count">
                                    <span>1 ITEM</span>
                                    <Link to="#">VIEW CART</Link>
                                </div>
                                <div className="cart_list">
                                    <div className="select_cart">
                                        <Link to="#">Brow Backpack</Link>
                                        <span>1 x $258.00</span>
                                    </div>
                                    <div className="select_img">
                                        <img alt="" src="../assets/images/car1.jpg"/>
                                        <div className="close_btn">
                                            <i className="fa fa-times"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="sub_total">
                                    <p>Sub Total:<span>$ 289.00</span></p>
                                </div>
                                <div className="cart_btn">
                                    <Link to="#"><i className="fas fa-shopping-cart"></i>&nbsp; View Cart</Link>
                                    <Link to="#"><i className="fas fa-share"></i>&nbsp; Checkout</Link>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* <!-- responsive menu start--> */}
                <div id="sidebar" className="d-block d-sm-block d-md-block d-lg-none d-xl-none">
                    <div className="pd_toggle_logo">
                    {/* <Link to="index.html">
                        <img src="../assets/images/logo.png" alt="img"/>
                    </Link> */}
                    <h1>Admin</h1>
                    </div>
                    <div id="toggle_close">&times;</div>
                    <div id='cssmenu'>
                    <ul>
                        <li>
                            <input type="text" placeholder="Search categories"/>
                        </li>
                        <li>
                            <Link to="index.html"> Home</Link>
                        </li>
                        <li className='has-sub'>
                            <Link to='#'> Pages</Link>
                            <ul>
                                <li><Link to="checkout.html">Checkout</Link></li>
                                <li><Link to="compare.html">Compare</Link></li>
                                <li><Link to="shoping_cart.html">Shoping Cart</Link></li>
                                <li><Link to="order_tracking.html">Order Tracking</Link></li>
                                <li><Link to="coming_soon.html">Coming Soon</Link></li>
                                <li><Link to="coming_soon_update.html">Coming Soon</Link></li>
                                <li><Link to="error.html">404 Error</Link></li>
                            </ul>
                        </li>
                        <li className='has-sub'>
                            <Link to='#'>Shop</Link>
                            <ul>
                                <li><Link to="product-grid-view.html">Product Grid View</Link></li>
                                <li><Link to="single-product.html">Product Single 1</Link></li>
                                <li><Link to="single-product1.html">Product Single 2</Link></li>
                                <li><Link to="single-product2.html">Product Single 3</Link></li>
                                <li><Link to="single-product3.html">Product Single 4</Link></li>
                                <li><Link to="single-product4.html">Product Single 5</Link></li>
                            </ul>
                        </li>
                        <li className='has-sub'>
                            <Link to='#'>Blog</Link>
                            <ul>
                                <li><Link to="blog.html">Blog</Link>
                                </li>
                                <li><Link to="blog_full_width.html">Blog Full Width</Link>
                                </li>
                                <li><Link to="blog_grid.html">Blog Grid</Link>
                                </li>
                                <li><Link to="blog_list.html">Blog List</Link>
                                </li>
                                <li><Link to="blog_single_sidebar.html">Blog Single</Link></li>
                            </ul>
                        </li>
                        <li><Link to="contact_us.html"> Contact</Link></li>
                        <li><Link to="#">My Account</Link></li>
                        <li><Link to="#">About Us</Link></li>
                        <li><Link to="#">Cart</Link></li>
                        <li><Link to="#">Login</Link></li>
                    </ul>
                    <div className="share_link">
                        <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                        <Link to="#"><i className="fab fa-twitter"></i></Link>
                        <Link to="#"><i className="fab fa-instagram"></i></Link>
                    </div>
                    </div>
                </div>
            </div>
            {/* <!-- responsive menu End--> */}
            <div className="pd_navigation_wrapper">
                <div className="container custom_container">
                    <div className="pd_responsive_logo d-block d-sm-block d-md-block d-lg-none d-xl-none">
                    <div className="response_top_header">
                        <p>
                            <Link to="#"> <span><i className="fas fa-phone"></i></span>Helpline: +1234567890 </Link>
                        </p>
                        <ul>
                            <li className="language">
                                <Link to="#">Eng <i className="fas fa-angle-down"></i></Link>
                                <div className="submenu">
                                <Link to="#"> <span><img src="../assets/images/usa.png" alt="flag" /></span> English</Link>
                                <Link to="#"> <span><img src="../assets/images/india.png" alt="flag" /></span> Hindi</Link>
                                </div>
                            </li>
                            <li><Link to="#"><span><i className="fas fa-mobile-alt"></i></span></Link></li>
                            <li><Link to="#"><span>&rlarr;</span></Link></li>
                            <li><Link to="#"><span><i className="fas fa-info-circle"></i></span></Link></li>
                        </ul>
                    </div>
                    <div className="res_logo">
                        <Link to="index.html">
                            <img className="img-fluid" src="../assets/images/logo.png" alt="img"/>
                        </Link>
                    </div>
                    <div className="search_filter">
                        <select className="select_dropdown">
                            <option value="">All Categories</option>
                            <option value="1">Electronice</option>
                            <option value="0">Fashion</option>
                        </select>
                        <input type="text" placeholder="Search Product"/>
                        <button className="search_btn"><i className="fas fa-search"></i></button>
                    </div>
                    <div className="inner_icon">
                        <ul>
                            <li>
                                <Link to="login.html">
                                <span>
                                    {/* <svg version="1.1" id="Capa_11" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                        <g>
                                            <g>
                                            <path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
                                                C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
                                                c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
                                                h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
                                                c59.551,0,108,48.448,108,108S315.551,256,256,256z"></path>
                                            </g>
                                        </g>
                                    </svg> */}
                                </span>
                                </Link>
                            </li>
                            <li className="cart_shop1">
                                <Link to="#">
                                <span>
                                    {/* <svg height="512pt" viewBox="0 -31 512.00026 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0"></path>
                                        <path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"></path>
                                        <path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"></path>
                                    </svg> */}
                                </span>
                                </Link>
                                <div className="cart_details">
                                <div className="total-count">
                                    <span>1 ITEM</span>
                                    <Link to="#">VIEW CART</Link>
                                </div>
                                <div className="cart_list">
                                    <div className="select_cart">
                                        <Link to="#">Brow Backpack</Link>
                                        <span>1 x $258.00</span>
                                    </div>
                                    <div className="select_img">
                                        <img alt="" src="../assets/images/car1.jpg"/>
                                    </div>
                                </div>
                                <div className="sub_total">
                                    <p>Sub Total:<span>$ 289.00</span></p>
                                </div>
                                <div className="cart_btn">
                                    <Link to="#"><i className="fas fa-shopping-cart"></i>&nbsp; View Cart</Link>
                                    <Link to="#"><i className="fas fa-share"></i>&nbsp; Checkout</Link>
                                </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="toggle" className="d-block d-sm-block d-md-block d-lg-none d-xl-none">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 31.177 31.177" style="enable-background:new 0 0 31.177 31.177;" xml:space="preserve" width="25px" height="25px">
                            <g>
                                <g>
                                <path className="menubar" d="M30.23,1.775H0.946c-0.489,0-0.887-0.398-0.887-0.888S0.457,0,0.946,0H30.23    c0.49,0,0.888,0.398,0.888,0.888S30.72,1.775,30.23,1.775z" fill="#fff" />
                                </g>
                                <g>
                                <path className="menubar" d="M30.23,9.126H12.069c-0.49,0-0.888-0.398-0.888-0.888c0-0.49,0.398-0.888,0.888-0.888H30.23    c0.49,0,0.888,0.397,0.888,0.888C31.118,8.729,30.72,9.126,30.23,9.126z" fill="#fff" />
                                </g>
                                <g>
                                <path className="menubar" d="M30.23,16.477H0.946c-0.489,0-0.887-0.398-0.887-0.888c0-0.49,0.398-0.888,0.887-0.888H30.23    c0.49,0,0.888,0.397,0.888,0.888C31.118,16.079,30.72,16.477,30.23,16.477z" fill="#fff" />
                                </g>
                                <g>
                                <path className="menubar" d="M30.23,23.826H12.069c-0.49,0-0.888-0.396-0.888-0.887c0-0.49,0.398-0.888,0.888-0.888H30.23    c0.49,0,0.888,0.397,0.888,0.888C31.118,23.43,30.72,23.826,30.23,23.826z" fill="#fff" />
                                </g>
                                <g>
                                <path className="menubar" d="M30.23,31.177H0.946c-0.489,0-0.887-0.396-0.887-0.887c0-0.49,0.398-0.888,0.887-0.888H30.23    c0.49,0,0.888,0.398,0.888,0.888C31.118,30.78,30.72,31.177,30.23,31.177z" fill="#fff" />
                                </g>
                            </g>
                        </svg> */}
                    </div>
                    </div>
                    <div className="pd_inner_navigation_wrapper">
                    <div className="baz_categories">
                        <ul>
                            <li>
                                <Link to="#">
                                {/* <span>
                                    <svg height="384pt" viewBox="0 -53 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                                        <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                                        <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                                    </svg>
                                </span> */}
                                Categories
                                </Link>
                                <ul className="cat_sub_menu">
                                <li className="category_a">
                                    <p>Woment Dress</p>
                                    <div className="cat_links">
                                        <Link to="#">Sheath Dresses</Link>
                                        <Link to="#">Blouson Dresses</Link>
                                        <Link to="#">Tunic Dresses</Link>
                                        <Link to="#">Pencil Dresses</Link>
                                        <Link to="#">Asymmetric Dresses</Link>
                                    </div>
                                </li>
                                <li className="category_a">
                                    <p>Men's Dress</p>
                                    <div className="cat_links">
                                        <Link to="#">Jodhpuri suit</Link>
                                        <Link to="#">Kurta</Link>
                                        <Link to="#">Sherwani</Link>
                                        <Link to="#">Jeans</Link>
                                        <Link to="#">T-Shirts</Link>
                                    </div>
                                </li>
                                <li className="category_a">
                                    <div className="dat_img">
                                        <img className="img-fluid" src="../assets/images/menu-banner.jpg" alt="" />
                                    </div>
                                </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ul>
                        <li>
                            <Link to="index.html"> Home</Link>
                        </li>
                        <li><Link to="#">Laptops <span className="badge">Hot</span></Link>
                        </li>
                        <li><Link to="#">Dekstops</Link>
                        </li>
                        <li>
                            <Link to="#">Cameras &nbsp;<i className="fas fa-angle-down"></i> <span className="badge new">New</span></Link>
                            <ul>
                                <li><Link to="#">Digital Camera</Link>
                                </li>
                                <li><Link to="#">CyberShot Camera</Link>
                                </li>
                                <li><Link to="#">PowerShot Camera</Link>
                                </li>
                                <li><Link to="#">Dual Lens Camera</Link>
                                </li>
                            </ul>
                        </li>
                        <li><Link to="#">Mobile</Link>
                        </li>
                        <li>
                            <Link to="#">Pages &nbsp;<i className="fas fa-angle-down"></i></Link>
                            <ul>
                                <li><Link to="checkout.html">Checkout</Link></li>
                                <li><Link to="compare.html">Compare</Link></li>
                                <li><Link to="shoping_cart.html">Shoping Cart</Link></li>
                                <li><Link to="order_tracking.html">Order Tracking</Link></li>
                                <li><Link to="coming_soon.html">Coming Soon 1</Link></li>
                                <li><Link to="coming_soon_update.html">Coming Soon 2</Link></li>
                                <li><Link to="error.html">404 Error</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#">Shop &nbsp;<i className="fas fa-angle-down"></i></Link>
                            <ul>
                                <li><Link to="product-grid-view.html">Product Grid View</Link></li>
                                <li><Link to="single-product.html">Product Single 1</Link></li>
                                <li><Link to="single-product1.html">Product Single 2</Link></li>
                                <li><Link to="single-product2.html">Product Single 3</Link></li>
                                <li><Link to="single-product3.html">Product Single 4</Link></li>
                                <li><Link to="single-product4.html">Product Single 5</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#">Blog  &nbsp;<i className="fas fa-angle-down"></i></Link>
                            <ul>
                                <li><Link to="blog.html">Blog</Link>
                                </li>
                                <li><Link to="blog_full_width.html">Blog Full Width</Link>
                                </li>
                                <li><Link to="blog_grid.html">Blog Grid</Link>
                                </li>
                                <li><Link to="blog_list.html">Blog List</Link>
                                </li>
                                <li><Link to="blog_single_sidebar.html">Blog Single</Link></li>
                            </ul>
                        </li>
                        <li><Link to="contact_us.html">Contact</Link>
                        </li>
                    </ul>
                    <div className="today">
                        <Link to="#">Today's Deals</Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}