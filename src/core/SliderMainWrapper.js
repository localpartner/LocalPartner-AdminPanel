import React from "react";

function SliderMainWrapper(){
    return(
    <div className="bz_slider_main_wrapper">
        <div className="row">
            <div className="col-lg-3 col-md-3 col-12 no_padd no_slide">
                <div className="side_img">
                <ul>
                    <li>
                        <div className="slider_add">
                            <img className="img-fluid" src="../assets/images/side_img.jpg" alt="side_img"/>
                            <div className="bluetooth">
                            <a href="#">only this week!</a>
                            <h3>HD Bluetooth Headphone</h3>
                            <h2>$492.00 <span><del>$379.00</del></span> </h2>
                            <a className="buy_now" href="#">Buy now</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slider_add1">
                            <img className="img-fluid" src="../assets/images/side_img1.jpg" alt="side_img"/>
                            <div className="bluetooth1">
                            <a href="#">only this week!</a>
                            <h3>Laptop Core i3</h3>
                            <h2>$492.00 <span><del>$379.00</del></span> </h2>
                            <a className="buy_now" href="#">Buy now</a>
                            </div>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
            <div className="col-lg-9 col-md-12 col-12 no_padd">
                <div className="bz_home_slider">
                <div className="owl-carousel owl-theme">
                    <div className="item">
                        <div className="home_slider_img">
                            <img className="img-fluid" src="../assets/images/slider.png" alt="slider"/>
                            <div className="home-caption">
                            <div className="offer">
                                <p>Only this week !</p>
                                <span>20% Off</span>
                            </div>
                            <h2>Headphones</h2>
                            <div className="color_slide">
                                Color
                                <ul>
                                    <li className="black"><a href="#"></a></li>
                                    <li className="pink"><a href="#"></a></li>
                                    <li className="red"><a href="#"></a></li>
                                    <li className="red"><a href="#"></a></li>
                                </ul>
                            </div>
                            <p>Available for Rose Gold, Silver, Gold, White, Black, Jet Black and Red..</p>
                            <a className="custom_btn" href="#">Buy Now !</a>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="home_slider_img">
                            <img className="img-fluid" src="../assets/images/banner3.png" alt="slider"/>
                            <div className="home-caption">
                            <div className="offer">
                                <p>Only this week !</p>
                                <span>20% Off</span>
                            </div>
                            <h2>Bridal Clothing</h2>
                            <div className="color_slide">
                                Color
                                <ul>
                                    <li className="black"><a href="#"></a></li>
                                    <li className="pink"><a href="#"></a></li>
                                    <li className="red"><a href="#"></a></li>
                                    <li className="red"><a href="#"></a></li>
                                </ul>
                            </div>
                            <p>Available for Bridal Accessory, Bridal Veil, Wedding Clothing..</p>
                            <a className="custom_btn" href="#">Buy Now !</a>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="home_slider_img">
                            <img className="img-fluid" src="../assets/images/banner2.png" alt="slider"/>
                            <div className="home-caption">
                            <div className="offer">
                                <p>Only this week !</p>
                                <span>10% Off</span>
                            </div>
                            <h2>Goggles</h2>
                            <div className="color_slide">
                                Color
                                <ul>
                                    <li className="black"><a href="#"></a></li>
                                    <li className="pink"><a href="#"></a></li>
                                    <li className="red"><a href="#"></a></li>
                                    <li className="red"><a href="#"></a></li>
                                </ul>
                            </div>
                            <p>Available for Sun Glasses, Ulta radiation, Stylish Eye Wear, Stylish Frame,</p>
                            <a className="custom_btn" href="#">Buy Now !</a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export {SliderMainWrapper}