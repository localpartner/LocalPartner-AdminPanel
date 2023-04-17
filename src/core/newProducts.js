import React from "react";

function NewProducts(){
    return(
        <div className="upperPadding">
            <div class="bz_newproduct_main_wrapper float_left">
                <div class="container custom_container">
                    <div class="row">
                        <div class="col-md-12 col-12">
                        <div class="new_product_tabs">
                            <div class="justify-content-end">
                                <h3 class="title"> <span><i class="fas fa-gift"></i></span> New Product</h3>
                                <ul class="nav nav-tabs justify-content-end" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="menu1-tab" data-toggle="tab" href="#menu1" role="tab" aria-controls="menu1" aria-selected="false">Laptop</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="menu2-tab" data-toggle="tab" href="#menu2" role="tab" aria-controls="menu2" aria-selected="false">Mobile</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="menu3-tab" data-toggle="tab" href="#menu3" role="tab" aria-controls="menu3" aria-selected="false">Speakers</a>
                                </li>
                                </ul>
                            </div>
                            <div class="tab-content" id="myTabContent">
                                <div id="home" class="tab-pane active show" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="product_slider">
                                    <div class="owl-carousel owl-theme">
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product1.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Headphones</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">Supre Extra Base Sound.</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/related4.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p>hot</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Earphones</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">Blue, Wireles in the ear.</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$350.00 <span> <del>$379.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product3.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Ultra HD Laptop</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">4GB/TB HDD/Window 10</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$500.00 <span> <del>$550.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product4.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">HD Camera</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">20.1 MP Optical Zoom</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$450.00 <span> <del>$500.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div id="menu1" class="tab-pane" role="tabpanel" aria-labelledby="menu1-tab">
                                    <div class="product_slider">
                                    <div class="owl-carousel owl-theme">
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product1.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Headphones</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">Supre Extra Base Sound.</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/related4.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p>hot</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Earphones</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">Blue, Wireles in the ear.</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$350.00 <span> <del>$379.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product3.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Ultra HD Laptop</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">4GB/TB HDD/Window 10</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$500.00 <span> <del>$550.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product4.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">HD Camera</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">20.1 MP Optical Zoom</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$450.00 <span> <del>$500.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div id="menu2" class="tab-pane" role="tabpanel" aria-labelledby="menu1-tab">
                                    <div class="product_slider">
                                    <div class="owl-carousel owl-theme">
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product1.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Headphones</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">Supre Extra Base Sound.</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/related4.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p>hot</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Earphones</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">Blue, Wireles in the ear.</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$350.00 <span> <del>$379.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product3.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Ultra HD Laptop</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">4GB/TB HDD/Window 10</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$500.00 <span> <del>$550.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product4.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">HD Camera</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">20.1 MP Optical Zoom</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$450.00 <span> <del>$500.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div id="menu3" class="tab-pane">
                                    <div class="product_slider">
                                    <div class="owl-carousel owl-theme">
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product1.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Headphones</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">Supre Extra Base Sound.</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/related4.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p>hot</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Earphones</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">Blue, Wireles in the ear.</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$350.00 <span> <del>$379.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product3.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">Ultra HD Laptop</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">4GB/TB HDD/Window 10</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$500.00 <span> <del>$550.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="product_box">
                                                <div class="product_img">
                                                <img class="img-fluid" src="images/product4.png" alt="product img"/>
                                                <div class="top_icon">
                                                    <p class="new">new</p>
                                                    <span><i class="far fa-heart"></i></span>
                                                </div>
                                                <div class="product_overlay">
                                                    <div class="search_icon">
                                                        <a href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class="product_content">
                                                <span class="category-list">HD Camera</span>
                                                <a href="mobile_single_product.html">
                                                    <h3 class="woocommerce-loop-product__title">20.1 MP Optical Zoom</h3>
                                                </a>
                                                <ul class="star">
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$450.00 <span> <del>$500.00</del> </span> </h4>
                                                <a class="add_btn custom_btn" href="javascript:;">Add to Cart</a>
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
                {/* <!-- The Modal --> */}
                <div class="modal" id="myModal">
                    <div class="modal-dialog product_modal">
                        <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-12">
                                    <div class="sell_slider">
                                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img class="d-block w-100" src="images/pop_slider_img.jpeg" alt="First slide"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="images/pop_slider_img1.jpeg" alt="Second slide"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="images/pop_slider_img2.jpeg" alt="Third slide"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="images/pop_slider_img3.jpeg" alt="Third slide"/>
                                            </div>
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                        </a>
                                        <div class="container pt-4 pb-5 small_slider">
                                            <div class="row carousel-indicators">
                                                <div class="item">
                                                <img src="images/pop_slider_img.jpeg" class="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="0"/>
                                                </div>
                                                <div class="item">
                                                <img src="images/pop_slider_img1.jpeg" class="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="1"/>
                                                </div>
                                                <div class="item">
                                                <img src="images/pop_slider_img2.jpeg" class="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="2"/>
                                                </div>
                                                <div class="item">
                                                <img src="images/pop_slider_img3.jpeg" class="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="3"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-lg-7 col-md-7 col-12">
                                    <div class="b_product_sell_details_wrapper float_left">
                                    <div class="bz_product_heading float_left">
                                        <h3>Boat Rockerz 450 Bluetooth Headset</h3>
                                        <ul class="review">
                                            <li>
                                                <ul class="star">
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">1 customer review</a></li>
                                            <li><a href="#">Add a review</a></li>
                                        </ul>
                                        <h3>$492.00 <span><del>$379.00</del></span> </h3>
                                        <p>Set your mind ablaze with the slick sound and expansive design that has culminated into the boAt Rockerz 450, adding luxury to your sound. Propelled by crystal clear 40mm dynamic drivers, slip into an alternate HD Immersive Audio reality. The soft cornered matte black finish allows for a comfortable fit, propagated by plush foam in an adaptive and adjustable design. Choose your mode, go wireless with Bluetooth V4.2 or connect an aux wire that cause any drain on the 300mAh Rechargeable Lithium Battery.</p>
                                    </div>
                                    <div class="color_code float_left">
                                        <label>Color :</label>
                                        <ul class="color_change">
                                            <li class="black-co"><a href="#"></a></li>
                                            <li class="grey-co"><a href="#"></a></li>
                                            <li class="pink-co"><a href="#"></a></li>
                                            <li class="pink-co"><a href="#"></a></li>
                                        </ul>
                                        <p>Categories: <span><a href="#">Electronic</a></span></p>
                                        <p>Tag: <span><a href="#">Electronic,</a> <a href="#">Mobile,</a> <a href="#">Fashion cloth</a></span></p>
                                    </div>
                                    <div class="number_pluse float_left">
                                        <input type="number" value="1"/>
                                        <a href="#" class="cart_btn">Add To Cart</a>
                                    </div>
                                    <div class="share_icon float_left">
                                        <p>Share:</p>
                                        <ul>
                                            <li>
                                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                                <a href="#"><i class="fab fa-twitter"></i></a>
                                                <a href="#"><i class="fab fa-instagram"></i></a>
                                                <a href="#"><i class="fab fa-youtube"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                        </div>
                    </div>
                </div>
                {/* <!-- The Modal --> */}
                <div class="modal" id="myModal1">
                    <div class="modal-dialog product_modal">
                        <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-12">
                                    <div class="sell_slider">
                                    <div id="carouselExampleIndicators1" class="carousel slide" data-ride="carousel">
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img class="d-block w-100" src="images/pop_slider_img4.jpeg" alt="First slide"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="images/pop_slider_img5.jpeg" alt="Second slide"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="images/pop_slider_img6.jpeg" alt="Third slide"/>
                                            </div>
                                            <div class="carousel-item">
                                                <img class="d-block w-100" src="images/pop_slider_img7.jpeg" alt="Third slide"/>
                                            </div>
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleIndicators1" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleIndicators1" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                        </a>
                                        <div class="container pt-4 pb-5 small_slider">
                                            <div class="row carousel-indicators">
                                                <div class="item">
                                                <img src="images/pop_slider_img4.jpeg" class="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="0"/>
                                                </div>
                                                <div class="item">
                                                <img src="images/pop_slider_img5.jpeg" class="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="1"/>
                                                </div>
                                                <div class="item">
                                                <img src="images/pop_slider_img6.jpeg" class="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="2"/>
                                                </div>
                                                <div class="item">
                                                <img src="images/pop_slider_img7.jpeg" class="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="3"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-lg-7 col-md-7 col-12">
                                    <div class="b_product_sell_details_wrapper float_left">
                                    <div class="bz_product_heading float_left">
                                        <h3>Window 10 I3 4rth Generation  </h3>
                                        <ul class="review">
                                            <li>
                                                <ul class="star">
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                <li><a href="#"><i class="fas fa-star"></i></a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">1 customer review</a></li>
                                            <li><a href="#">Add a review</a></li>
                                        </ul>
                                        <h3>$800.00 <span><del>$850.00</del></span> </h3>
                                        <p>For on-the-go fast computing, easy multitasking, and reliable performance, you need the 14Q laptop that features multiple impressive features. This laptop has a 256 GB SSD to store music, videos, and much more. Also, it has a 3 cell 41 WHr Li-ion fast-charge battery and the Windows 10 OS to perform a number of tasks uninterruptedly and effortlessly.</p>
                                    </div>
                                    <div class="color_code float_left">
                                        <label>Color :</label>
                                        <ul class="color_change">
                                            <li class="black-co"><a href="#"></a></li>
                                            <li class="grey-co"><a href="#"></a></li>
                                            <li class="pink-co"><a href="#"></a></li>
                                            <li class="pink-co"><a href="#"></a></li>
                                        </ul>
                                        <p>Categories: <span><a href="#">Electronic</a></span></p>
                                        <p>Tag: <span><a href="#">Electronic,</a> <a href="#">Mobile,</a> <a href="#">Fashion cloth</a></span></p>
                                    </div>
                                    <div class="number_pluse float_left">
                                        <input type="number" value="1"/>
                                        <a href="#" class="cart_btn">Add To Cart</a>
                                    </div>
                                    <div class="share_icon float_left">
                                        <p>Share:</p>
                                        <ul>
                                            <li>
                                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                                <a href="#"><i class="fab fa-twitter"></i></a>
                                                <a href="#"><i class="fab fa-instagram"></i></a>
                                                <a href="#"><i class="fab fa-youtube"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export {NewProducts}