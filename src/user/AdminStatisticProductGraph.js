import React from 'react';

const AdminStatisticProductGraph = () =>{
    return(
        <>
            <div className="white-box stat-widget">
                <div className="row">
                    <div className="col-md-6 col-sm-6 ">
                    <ul className="fa-pull-left list-inline ">
                            <li>
                                <h6 className="font-15"><i className="fa fa-circle m-r-5 text-success"></i>Product-A</h6>
                            </li>
                            <li>
                                <h6 className="font-15"><i className="fa fa-circle m-r-5 text-primary"></i>Product-B</h6>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <select className="custom-select">
                            <option  value="0">Feb 04 - Mar 03</option>
                            <option value="1">Mar 04 - Apr 03</option>
                            <option value="2">Apr 04 - May 03</option>
                            <option value="3">May 04 - Jun 03</option>
                        </select>
                        
                    </div>
                    <div className="stat chart-pos">
                        <svg width="100%" height="278px" className='ct-chart-line'>
                        <g className="ct-grids">
                        <line x1="30" x2="30" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                        <line x1="151.13125" x2="151.13125" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                        <line x1="272.2625" x2="272.2625" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                        <line x1="393.39374999999995" x2="393.39374999999995" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                        <line x1="514.525" x2="514.525" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                        <line x1="635.65625" x2="635.65625" y1="15" y2="243" className="ct-grid ct-horizontal"></line>
                        </g>
                        {/* <g>
                            <g className="ct-series ct-series-a">
                            <path d="M30,60.6C50.189,83.4,110.754,192.08,151.131,197.4C191.508,202.72,231.885,98.6,272.263,92.52C312.64,86.44,353.017,156.36,393.394,160.92C433.771,165.48,474.148,140.4,514.525,119.88C554.902,99.36,615.468,51.48,635.656,37.8" className="ct-line"></path>
                            <line x1="30" y1="60.599999999999994" x2="30.01" y2="60.599999999999994" className="ct-point" ctvalue="40"></line>
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
                        </g></g> */}
                        <g>
                            <g className="ct-series ct-series-a">
                                <rect fill="#0283cc" x="29" y="40" rx="10" ry="10" width="14.893119999999998" height="200"></rect>
                                <rect fill="#138b1c" x="50" y="90" rx="10" ry="10" width="14.893119999999998" height="150"></rect>
                                <rect fill="#0283cc" x="150" y="40" rx="10" ry="10" width="14.893119999999998" height="200"></rect>
                                <rect fill="#138b1c" x="170" y="90" rx="10" ry="10" width="14.893119999999998" height="150"></rect>
                            </g>
                        </g>
                        <g className="ct-labels">
                        <foreignObject style={{overflow : "visible"}} x="30" y="248" width="121.13125" height="20">
                        <span className="ct-label ct-horizontal ct-end" style={{width: '121px', height: '20px'}} xmlns="http://www.w3.org/2000/xmlns/">0</span>
                        </foreignObject>
                        <foreignObject style={{overflow : "visible"}} x="151.13125" y="248" width="121.13125" height="20">
                        <span className="ct-label ct-horizontal ct-end" style={{width: '121px', height: '20px'}} xmlns="http://www.w3.org/2000/xmlns/">5</span>
                        </foreignObject>
                        <foreignObject style={{overflow : "visible"}} x="272.2625" y="248" width="121.13124999999997" height="20">
                        <span className="ct-label ct-horizontal ct-end" style={{width: '121px', height: '20px'}} xmlns="http://www.w3.org/2000/xmlns/">10</span>
                        </foreignObject>
                        <foreignObject style={{overflow : "visible"}} x="393.39374999999995" y="248" width="121.13125000000002" height="20">
                        <span className="ct-label ct-horizontal ct-end" style={{width: '121px', height: '20px'}} xmlns="http://www.w3.org/2000/xmlns/">15</span>
                        </foreignObject>
                        <foreignObject style={{overflow : "visible"}} x="514.525" y="248" width="121.13125000000002" height="20">
                        <span className="ct-label ct-horizontal ct-end" style={{width: '121px', height: '20px'}} xmlns="http://www.w3.org/2000/xmlns/">20</span>
                        </foreignObject>
                        <foreignObject style={{overflow : "visible"}} x="635.65625" y="248" width="30" height="20">
                        <span className="ct-label ct-horizontal ct-end" style={{width: '30px', height: '20px'}} xmlns="http://www.w3.org/2000/xmlns/">25</span>
                        </foreignObject>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}

    export default AdminStatisticProductGraph;