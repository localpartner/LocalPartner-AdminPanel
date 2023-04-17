import React from 'react';
import { Link } from 'react-router-dom';

const AdminNotification = () =>{
    return(
        <>
             <ul className="dropdown-menu mailbox animated bounceInDown">
                    <li>
                        <div className="drop-title">You have 4 new messages</div>
                    </li>
                    <li>
                        <div className="message-center">
                            <Link to='#'>
                                <div className="user-img">
                                    <img src="/assets/plugins/images/users/1.jpg" alt="user" className="img-circle" />
                                    <span className="profile-status online pull-right" ></span>
                                </div>
                                <div className="mail-contnet">
                                    <h5>Pavan kumar</h5>
                                    <span className="mail-desc">Just see the my admin!</span>
                                    <span className="time">9:30 AM</span>
                                </div>
                            </Link>
                            <Link to='#'>
                                <div className="user-img">
                                    <img src="/assets/plugins/images/users/2.jpg" alt="user" className="img-circle" />
                                    <span className="profile-status busy pull-right"></span>
                                </div>
                                <div className="mail-contnet">
                                    <h5>Sonu Nigam</h5>
                                    <span className="mail-desc">I've sung a song! See you at</span>
                                    <span className="time">9:10 AM</span>
                                </div>
                            </Link>
                            <Link to='#'>
                                <div className="user-img">
                                    <img src="/assets/plugins/images/users/3.jpg" alt="user" className="img-circle" /><span className="profile-status away pull-right"></span>
                                </div>
                                <div className="mail-contnet">
                                    <h5>Arijit Sinh</h5>
                                    <span className="mail-desc">I am a singer!</span>
                                    <span className="time">9:08 AM</span>
                                </div>
                            </Link>
                            <Link to='#'>
                                <div className="user-img">
                                    <img src="/assets/plugins/images/users/4.jpg" alt="user" className="img-circle" />
                                    <span className="profile-status offline pull-right"></span>
                                </div>
                                <div className="mail-contnet">
                                    <h5>Pavan kumar</h5>
                                    <span className="mail-desc">Just see the my admin!</span>
                                    <span className="time">9:02 AM</span>
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <Link className="text-center" to='#'>
                            <strong>See all notifications</strong>
                            <i className="fa fa-angle-right"></i>
                        </Link>
                    </li>
                </ul>
        </>
    )
}

export default AdminNotification;