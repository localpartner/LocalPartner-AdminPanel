import React from "react"
import { Link } from "react-router-dom"

export default function Footer(){
    return(
        <div className="bz_bottom_footer_main_wrapper float_left">
            <Link to="javascript:" id="return-to-top"><i className="fa fa-angle-up"></i></Link>
            <div className="container custom_container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                    <div className="footer_links-list">
                        <div className="footer_logo">
                            <img className="img-fluid" src="../assets/images/footer_logo.png" alt="footer-logo" />
                            <p>Various versions have evolved over an the years, sometimes a accident, sometimes on purpose .</p>
                        </div>
                        <div className="information">
                            <ul>
                                <li>
                                <Link to="#"> <span><i className="fa fa-map-marker-alt"></i></span> Electronic Store United States Location Sometimes.</Link>
                                </li>
                                <li><Link to="tel:1234567890"> <span><i className="fas fa-phone"></i></span>Helpline: +123-456-7890</Link></li>
                                <li> <Link to="mailto:bazooka@example.com" target="_top"><span><i className="fas fa-envelope"></i></span>bazooka@example.com</Link></li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-12">
                    <div className="footer_links-list">
                        <h3>Products</h3>
                        <ul>
                            <li><Link to="#">Prices Drop</Link></li>
                            <li><Link to="#">New Product</Link></li>
                            <li><Link to="#">Best Sales</Link></li>
                            <li><Link to="#">Hot Deals</Link></li>
                            <li><Link to="#">Stores</Link></li>
                            <li><Link to="#">Login</Link></li>
                            <li><Link to="#">My Account</Link></li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-12">
                    <div className="footer_links-list">
                        <h3>Our Company</h3>
                        <ul>
                            <li><Link to="#">Delivery</Link></li>
                            <li><Link to="#">Legal Notice</Link></li>
                            <li><Link to="#">Terms & Conditions</Link></li>
                            <li><Link to="#">About Us</Link></li>
                            <li><Link to="#">Secure Payment</Link></li>
                            <li><Link to="#">Contact Us</Link></li>
                            <li><Link to="#">Sitemap</Link></li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-12">
                    <div className="footer_links-list">
                        <h3>Your Account</h3>
                        <ul>
                            <li><Link to="#">Personal Information</Link></li>
                            <li><Link to="#">Orders</Link></li>
                            <li><Link to="#">Credit Slips</Link></li>
                            <li><Link to="#">Addresses</Link></li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-12">
                    <div className="footer_links-list">
                        <h3>News Letter</h3>
                        <p>Wants to get latest updates! Sign up a for free. get started with store.</p>
                        <div className="social_icon">
                            <div className="footer_search">
                                <input type="text" placeholder="Your email address"/>
                                <button className="search_btn"><i className="fas fa-share"></i></button>
                            </div>
                            <ul>
                                <li>
                                <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                                <Link to="#"><i className="fab fa-twitter"></i></Link>
                                <Link to="#"><i className="fab fa-instagram"></i></Link>
                                <Link to="#"><i className="fab fa-youtube"></i></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                       
                </div>
                <div className="copy_right_footer"> 
                    <div>© Copyright 2021-22 - Design By Webstrot</div>
                </div> 
                {/* <div className="bz_bottom_footer_main_wrapper float_left">
                    <div className="copy_right">
                    <p> © Copyright 2021-22 - Design By Webstrot</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}