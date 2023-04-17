import React from 'react';
import AdminFooter from './AdminFooter';
import { Link } from 'react-router-dom';


const AdminDashboardContent = () => {
    return (
        <>
            <div className="page-wrapper">
                {/* <!-- ===== Page-Container ===== --> */}
                <div className="container-fluid">
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="daily-select t-a-r p-b-10">
                                <select className="custom-select-daily">
                                    <option value="1">Daily </option>
                                    <option value="2">Weekly </option>
                                    <option value="3">Monthly </option>
                                    <option value="4">Yearly </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="white-box ecom-stat-widget bg-primary">
                                <div className="row">
                                    <div className="col-xs-8">
                                        <span className="font-light"><i className="mdi mdi-cart-outline"></i></span>
                                        <p className="font-bold font-12">New Order</p>
                                    </div>
                                    <div className="col-xs-4">
                                        <span className="font-bold">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="white-box ecom-stat-widget bg-danger">
                                <div className="row">
                                    <div className="col-xs-8">
                                        <span className="font-light">
                                            <i className="mdi mdi-motorbike"></i></span>
                                        <p className="font-bold font-12">Ready To deliver</p>
                                    </div>
                                    <div className="col-xs-4">
                                        <span className="font-bold">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="white-box ecom-stat-widget bg-success">
                                <div className="row bg-success">
                                    <div className="col-xs-6">
                                        <span className="font-light"><i className="mdi mdi-message-text-outline"></i></span>
                                        <p className="font-bold font-12">Completed</p>
                                    </div>
                                    <div className="col-xs-6">
                                        <span className="font-bold">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="white-box ecom-stat-widget bg-warning">
                                <div className="row">
                                    <div className="col-xs-8">
                                        <span className="font-light"> <i className=" mdi mdi-comment-text-outline"></i></span>
                                        <p className="font-bold font-12">Order Received</p>
                                    </div>
                                    <div className="col-xs-4">
                                        <span className="font-bold">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="white-box stat-widget">
                                <div className="row">
                                    <div className="col-md-3 col-sm-3">
                                        <h4 className="box-title">Sales Statistics</h4>
                                    </div>
                                    <div className="col-md-9 col-sm-9">
                                        <select className="custom-select">
                                            <option value="0">Feb 04 - Mar 03</option>
                                            <option value="1">Mar 04 - Apr 03</option>
                                            <option value="2">Apr 04 - May 03</option>
                                            <option value="3">May 04 - Jun 03</option>
                                        </select>
                                        <ul className="list-inline">
                                            <li>
                                                <h6 className="font-15"><i className="fa fa-circle m-r-5 text-success"></i>Product-A</h6>
                                            </li>
                                            <li>
                                                <h6 className="font-15"><i className="fa fa-circle m-r-5 text-primary"></i>Product-B</h6>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="stat chart-pos">
                                        <svg width="100%" height="278px" className='ct-chart-line'>
                                            <g className="ct-grids"><line x1="30" x2="30" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                                                <line x1="151.13125" x2="151.13125" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                                                <line x1="272.2625" x2="272.2625" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                                                <line x1="393.39374999999995" x2="393.39374999999995" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                                                <line x1="514.525" x2="514.525" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                                                <line x1="635.65625" x2="635.65625" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                                            </g>
                                            <g>
                                                <g className="ct-series ct-series-a">
                                                    <path d="M30,60.6C50.189,83.4,110.754,192.08,151.131,197.4C191.508,202.72,231.885,98.6,272.263,92.52C312.64,86.44,353.017,156.36,393.394,160.92C433.771,165.48,474.148,140.4,514.525,119.88C554.902,99.36,615.468,51.48,635.656,37.8" className="ct-line"></path><line x1="30" y1="60.599999999999994" x2="30.01" y2="60.599999999999994" className="ct-point" ctvalue="40"></line>
                                                    <line x1="151.13125" y1="197.4" x2="151.14124999999999" y2="197.4" className="ct-point" ctvalue="10"></line>
                                                    <line x1="272.2625" y1="92.52000000000001" x2="272.2725" y2="92.52000000000001" className="ct-point" ctvalue="33"></line>
                                                    <line x1="393.39374999999995" y1="160.92000000000002" x2="393.40374999999995" y2="160.92000000000002" className="ct-point" ctvalue="18"></line>
                                                    <line x1="514.525" y1="119.88" x2="514.535" y2="119.88" className="ct-point" ctvalue="27"></line>
                                                    <line x1="635.65625" y1="37.80000000000001" x2="635.66625" y2="37.80000000000001" className="ct-point" ctvalue="45"></line></g><g className="ct-series ct-series-b"><path d="M30,197.4C50.189,186.76,110.754,154.08,151.131,133.56C191.508,113.04,231.885,64.4,272.263,74.28C312.64,84.16,353.017,187.52,393.394,192.84C433.771,198.16,474.148,116.84,514.525,106.2C554.902,95.56,615.468,125.2,635.656,129" className="ct-line">
                                                    </path>
                                                    <line x1="30" y1="197.4" x2="30.01" y2="197.4" className="ct-point" ctvalue="10"></line><line x1="151.13125" y1="133.56" x2="151.14124999999999" y2="133.56" className="ct-point" ctvalue="24"></line><line x1="272.2625" y1="74.28" x2="272.2725" y2="74.28" className="ct-point" ctvalue="37"></line>
                                                    <line x1="393.39374999999995" y1="192.84" x2="393.40374999999995" y2="192.84" className="ct-point" ctvalue="11"></line>
                                                    <line x1="514.525" y1="106.19999999999999" x2="514.535" y2="106.19999999999999" className="ct-point" ctvalue="30"></line>
                                                    <line x1="635.65625" y1="129" x2="635.66625" y2="129" className="ct-point" ctvalue="25"></line>
                                                </g></g>
                                            <g className="ct-labels">
                                                <foreignObject style={{ overflow: "visible" }} x="30" y="248" width="121.13125" height="20">
                                                    <span className="ct-label ct-horizontal ct-end" style={{ width: '121px', height: '20px' }} xmlns="http://www.w3.org/2000/xmlns/">0</span>
                                                </foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} x="151.13125" y="248" width="121.13125" height="20">
                                                    <span className="ct-label ct-horizontal ct-end" style={{ width: '121px', height: '20px' }} xmlns="http://www.w3.org/2000/xmlns/">5</span>
                                                </foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} x="272.2625" y="248" width="121.13124999999997" height="20">
                                                    <span className="ct-label ct-horizontal ct-end" style={{ width: '121px', height: '20px' }} xmlns="http://www.w3.org/2000/xmlns/">10</span>
                                                </foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} x="393.39374999999995" y="248" width="121.13125000000002" height="20">
                                                    <span className="ct-label ct-horizontal ct-end" style={{ width: '121px', height: '20px' }} xmlns="http://www.w3.org/2000/xmlns/">15</span>
                                                </foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} x="514.525" y="248" width="121.13125000000002" height="20">
                                                    <span className="ct-label ct-horizontal ct-end" style={{ width: '121px', height: '20px' }} xmlns="http://www.w3.org/2000/xmlns/">20</span>
                                                </foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} x="635.65625" y="248" width="30" height="20">
                                                    <span className="ct-label ct-horizontal ct-end" style={{ width: '30px', height: '20px' }} xmlns="http://www.w3.org/2000/xmlns/">25</span>
                                                </foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="220.2" x="10" height="22.8" width="10">
                                                    <span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">0</span>
                                                </foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="197.39999999999998" x="10" height="22.8" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">5</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="174.6" x="10" height="22.800000000000004" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">10</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="151.8" x="10" height="22.799999999999997" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">15</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="129" x="10" height="22.799999999999997" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">20</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="106.19999999999999" x="10" height="22.80000000000001" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">25</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="83.4" x="10" height="22.799999999999983" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">30</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="60.599999999999994" x="10" height="22.80000000000001" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">35</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="37.80000000000001" x="10" height="22.799999999999983" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">40</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="15" x="10" height="22.80000000000001" width="10"><span className="ct-label ct-vertical ct-start" style={{ height: '23px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">45</span></foreignObject>
                                                <foreignObject style={{ overflow: "visible" }} y="-15" x="10" height="30" width="10">
                                                    <span className="ct-label ct-vertical ct-start" style={{ height: '30px', width: '10px' }} xmlns="http://www.w3.org/2000/xmlns/">50</span>
                                                </foreignObject>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className="white-box order-chart-widget">
                                <h4 className="box-title">Order Status</h4>
                                <div id="order-status-chart" style={{ height: '250px' }}>
                                    <svg height="250" version="1.1" width="269" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ overflow: 'hidden', position: 'relative', left: '-0.328125px', top: '-0.734375px' }}>
                                        <desc style={{ WebkitTapHighlightColor: ' rgba(0, 0, 0, 0)' }}>Created with Raphaël 2.1.2</desc>
                                        <defs style={{ WebkitTapHighlightColor: ' rgba(0, 0, 0, 0)' }}></defs>
                                        <path fill="none" stroke="#0283cc" d="M134.5,201.66666666666669A76.66666666666667,76.66666666666667,0,0,0,137.011593309442,48.37448416600547" strokeWidth="2" opacity="1" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: '1' }}>

                                        </path>
                                        <path fill="#0283cc" stroke="#ffffff" d="M134.5,204.66666666666669A79.66666666666667,79.66666666666667,0,0,0,137.10987304763756,45.37609441597961L138.26738996416302,10.061726249008231A115,115,0,0,1,134.5,240Z" strokeWidth="3" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}></path>
                                        <path fill="none" stroke="#e74a25" d="M137.011593309442,48.37448416600547A76.66666666666667,76.66666666666667,0,0,0,60.61445912715412,104.53772672196955" strokeWidth="2" opacity="0" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: '0' }}></path>
                                        <path fill="#e74a25" stroke="#ffffff" d="M137.10987304763756,45.37609441597961A79.66666666666667,79.66666666666667,0,0,0,57.72328578865145,103.73702907195965L28.490310921568962,95.64108616630413A110,110,0,0,1,138.10359040050375,15.059042499051344Z" strokeWidth="3" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}></path>
                                        <path fill="none" stroke="#2ecc71" d="M60.61445912715412,104.53772672196955A76.66666666666667,76.66666666666667,0,0,0,134.4759144567186,201.66666288331834" strokeWidth="2" opacity="0" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', opacity: 0 }}></path>
                                        <path fill="#2ecc71" stroke="#ffffff" d="M57.72328578865145,103.73702907195965A79.66666666666667,79.66666666666667,0,0,0,134.47497197893804,204.6666627352743L134.4654424813789,234.99999457171762A110,110,0,0,1,28.490310921568962,95.64108616630413Z" strokeWidth="3" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}></path>
                                        <text x="134.5" y="115" textAnchor="middle" fontFamily="&quot;Arial&quot;" fontSize="15px" stroke="none" fill="#000000" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', textAnchor: 'middle', fontFamily: 'Arial', fontSize: '15px', fontWeight: '800' }} fontWeight="800" transform="matrix(1.35,0,0,1.35,-47.0812,-44.1058)" strokeWidth="0.7407155797101449">
                                            <tspan dy="6" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}>Total Orders</tspan>
                                        </text>
                                        <text x="134.5" y="135" textAnchor="middle" fontFamily="&quot;Arial&quot;" fontSize="14px" stroke="none" fill="#000000" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', textAnchor: 'middle', fontFamily: 'Arial', fontSize: '14px' }} transform="matrix(1.5972,0,0,1.5972,-80.39,-75.8472)" strokeWidth="0.6260869565217391">
                                            <tspan dy="5" style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}>0</tspan>
                                        </text>
                                    </svg>
                                </div>
                                <ul className="list-inline m-b-0 m-t-20 t-a-c">
                                    <li>
                                        <h6 className="font-15"><i className="fa fa-circle m-r-5 text-primary"></i>Orders</h6>
                                    </li>
                                    <li>
                                        <h6 className="font-15"><i className="fa fa-circle m-r-5 text-danger"></i>Pending</h6>
                                    </li>
                                    <li>
                                        <h6 className="font-15"><i className="fa fa-circle m-r-5 text-success"></i>Delivered</h6>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-12">
                            <div className="white-box user-table">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h4 className="box-title">Latest order</h4>
                                    </div>
                                    <div className="col-sm-6">
                                        <select className="custom-select">
                                            <option >Sort the list by</option>
                                            <option value="1">Daily orders</option>
                                            <option value="2">Weekly orders</option>
                                            <option value="3">Monthly orders</option>
                                            <option value="4">Yearly orders</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="checkbox checkbox-info">
                                                        <input id="c1" type="checkbox" />
                                                        <label htmlFor="c1"></label>
                                                    </div>
                                                </th>
                                                <th>Items</th>
                                                <th>Quantity</th>
                                                <th>Date</th>
                                                <th>Location</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="checkbox checkbox-info">
                                                        <input id="c2" type="checkbox" />
                                                        <label htmlFor="c2"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/plugins/images/p1.png" alt="product" width="60" height="60" />
                                                    <Link to="#" className="p-l-25 text-link">Mobile</Link>
                                                </td>
                                                <td>Daniel Kristeen</td>
                                                <td>Texas, US</td>
                                                <td>1</td>
                                                <td><span className="label label-success">Complete</span></td>
                                                <td>
                                                    <Link to="#" title='Edit' className="btn btn-block btn-info font-16"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                                                    <Link to="#" title='Delete' className="btn btn-block btn-danger font-16"><i className="fa fa-trash" aria-hidden="true"></i></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="checkbox checkbox-info">
                                                        <input id="c3" type="checkbox" />
                                                        <label htmlFor="c3"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/plugins/images/p2.png" alt="product" width="60" height="60" />
                                                    <Link to="#" className="p-l-25 text-link">Headphone</Link>
                                                </td>
                                                <td>Hanna Gover</td>
                                                <td>Los Angeles, US</td>
                                                <td>2</td>
                                                <td><span className="label label-info">On Hold</span> </td>
                                                <td>
                                                    <Link to="#" type='Edit' className="btn btn-block btn-info font-16"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                                                    <Link to="#" type='Delete' className="btn btn-block btn-danger font-16"><i className="fa fa-trash" aria-hidden="true"></i></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="checkbox checkbox-info">
                                                        <input id="c4" type="checkbox" />
                                                        <label htmlFor="c4"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/plugins/images/p3.png" alt="product" width="60" height="60" />
                                                    <Link to="#" className="p-l-25 text-link">Earphone</Link>
                                                </td>
                                                <td>Jeffery Brown</td>
                                                <td>Houston, US</td>
                                                <td>3</td>
                                                <td><span className="label label-danger">Returned</span> </td>
                                                <td>
                                                    <Link to="#" type='Edit' className="btn btn-block btn-info font-16"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                                                    <Link to="#" type="Delete" className="btn btn-block btn-danger font-16"><i className="fa fa-trash" aria-hidden="true"></i></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="checkbox checkbox-info">
                                                        <input id="c5" type="checkbox" />
                                                        <label htmlFor="c5"></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src="/assets/plugins/images/p4.png" alt="product" width="60" height="60" />
                                                    <Link to="#" className="p-l-25 text-link">Laptop</Link>
                                                </td>
                                                <td>Elliot Dugteren</td>
                                                <td>San Antonio, US</td>
                                                <td>1</td>
                                                <td><span className="label label-warning">Pending</span> </td>
                                                <td>
                                                    <Link to="#" type='Edit' className="btn btn-block btn-info font-16"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                                                    <Link to="#" type='Delete' className="btn btn-block btn-danger font-16"><i className="fa fa-trash" aria-hidden="true"></i></Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <ul className="pagination">
                                    <li><Link>Previous</Link></li>
                                    <li className="active"> <Link to="#">1</Link> </li>
                                    <li> <Link to="#">2</Link> </li>
                                    <li> <Link to="#">3</Link> </li>
                                    <li> <Link to="#">4</Link> </li>
                                    <li> <Link to="#">5</Link> </li>
                                    <li> <Link to="#">Next</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <!-- ===== Page-Container-End ===== --> */}
                <AdminFooter />
            </div>
        </>
    )
}

export default AdminDashboardContent;