"use client"

export default function Footer() {
    return (
        <>
            <footer className="site-footer style2 bg-white">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-6">
                                <div className="widget widget_ftabout">
                                    <div className="footer-logo">
                                        <a href="index.html"><img src="/dashboard/images/lightlogo.png" alt=""/></a>
                                    </div>
                                    <p className="loaction-text"><i className="fa fa-paper-plane"></i>Dhaka, Barisal</p>
                                </div>
                                <div className="footer-social">
                                    <ul>
                                        <li className="wow zoomIn" data-wow-delay="0.1s"><a href="javascript:void(0)"><i className="fa fa-facebook"></i></a></li>
                                        <li className="wow zoomIn" data-wow-delay="0.2s"><a href="javascript:void(0)"><i className="fa fa-linkedin"></i></a></li>
                                        <li className="wow zoomIn" data-wow-delay="0.3s"><a href="javascript:void(0)"><i className="fa fa-dribbble"></i></a></li>
                                        <li className="wow zoomIn" data-wow-delay="0.4s"><a href="javascript:void(0)"><i className="fa fa-twitter"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                <div className="widget widget_getintuch">
                                    <h5 className="footer-title wow fadeInUp" data-wow-delay="0.1s">Contact us</h5>
                                    <ul>
                                        <li className="wow fadeInUp" data-wow-delay="0.2s"><i className="fa fa-map-marker"></i> 21 Maypole Crescent Ilford, L6 2UJ London, BD </li>
                                        <li className="wow fadeInUp" data-wow-delay="0.3s"><i className="fa fa-envelope"></i>info@example.com</li>
                                        <li className="wow fadeInUp" data-wow-delay="0.4s"><i className="fa fa-headphones"></i>+88 01682648101</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                                <div className="widget widget_services border-0">
                                    <h5 className="footer-title wow fadeInUp" data-wow-delay="0.5s">Company</h5>
                                    <ul>
                                        <li className="wow fadeInUp" data-wow-delay="0.6s"><a href="javascript:void(0)">Request a Demo</a></li>
                                        <li className="wow fadeInUp" data-wow-delay="0.7s"><a href="javascript:void(0)">Privacy Policy</a></li>
                                        <li className="wow fadeInUp" data-wow-delay="0.8s"><a href="javascript:void(0)">Terms of Service</a></li>
                                        <li className="wow fadeInUp" data-wow-delay="0.9s"><a href="javascript:void(0)">Partners</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                                <div className="widget widget_services border-0">
                                    <h5 className="footer-title wow fadeInUp" data-wow-delay="1.0s">Features</h5>
                                    <ul>
                                        <li className="wow fadeInUp" data-wow-delay="1.1s"><a href="javascript:void(0)">Customer Support</a></li>
                                        <li className="wow fadeInUp" data-wow-delay="1.2s"><a href="javascript:void(0)">Terms</a></li>
                                        <li className="wow fadeInUp" data-wow-delay="1.3s"><a href="javascript:void(0)">Privacy Policy</a></li>
                                        <li className="wow fadeInUp" data-wow-delay="1.4s"><a href="javascript:void(0)">Careers</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Footer Bottom --> */}
                <div className="container">
                    <div className="footer-bottom">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 text-left"> <span className="copyright">Copyright ©<span className="current-year">2024</span> Dexignlab</span> </div>
                            <div className="col-lg-6 col-md-6 text-right ">
                                <div className="widget-link">
                                    <ul>
                                        <li><a href="javascript:void(0)"><i className="fa fa-apple"></i> IOS</a></li>
                                        <li><a href="javascript:void(0)"><i className="fa fa-play"></i> Android</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Footer END --> */}
            <button className="scroltop fa fa-chevron-up" ></button>
        </>
    )
}
