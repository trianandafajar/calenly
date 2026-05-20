"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
    const pathname = usePathname()
    const isHome = pathname === "/"

    const getLink = (hash: string) => {
        return isHome ? hash : `/${hash}`
    }

    const renderSectionLink = (hash: string, label: string) => {
        const href = getLink(hash)
        if (isHome) {
            return <Link href={href}>{label}</Link>
        }
        return <a href={href}>{label}</a>
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .site-footer {
                    background-color: #ffffff !important;
                    border-top: 1px solid #f4f4f7 !important;
                }
                .site-footer a, 
                .site-footer li, 
                .site-footer p, 
                .site-footer span, 
                .site-footer li a {
                    color: #52525b !important;
                    transition: all 0.2s ease !important;
                }
                .site-footer a:hover, 
                .site-footer li a:hover {
                    color: #886CC0 !important;
                }
                .site-footer .footer-title, 
                .site-footer .footer-title a, 
                .site-footer .footer-title h5 {
                    color: #18181b !important;
                    font-weight: 700 !important;
                }
                .site-footer .footer-title:after {
                    background-color: #886CC0 !important;
                }
                .widget_getintuch li i,
                .widget_ftabout i {
                    color: #886CC0 !important;
                }
                .footer-social ul li a {
                    background-color: #f4f4f7 !important;
                    color: #52525b !important;
                    border: 1px solid #e4e4e7 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                .footer-social ul li a:hover {
                    background-color: #886CC0 !important;
                    color: #ffffff !important;
                    border-color: #886CC0 !important;
                    box-shadow: 0 4px 10px rgba(136, 108, 192, 0.3) !important;
                }
                .widget-link ul li a {
                    background-color: #f4f4f7 !important;
                    color: #52525b !important;
                    border: 1px solid #e4e4e7 !important;
                    border-radius: 8px !important;
                    padding: 6px 12px !important;
                    font-size: 12px !important;
                    font-weight: 600 !important;
                }
                .widget-link ul li a:hover {
                    background-color: #886CC0 !important;
                    color: #ffffff !important;
                    border-color: #886CC0 !important;
                }
                .scroltop {
                    background: linear-gradient(135deg, #886CC0 0%, #6f56b8 100%) !important;
                    box-shadow: 0 8px 22px rgba(111, 86, 184, 0.45) !important;
                    border: 0 !important;
                    color: #ffffff !important;
                    z-index: 9999 !important;
                }
                .scroltop:hover {
                    background: linear-gradient(135deg, #9a82d6 0%, #7c63c6 100%) !important;
                    color: #ffffff !important;
                    transform: translateY(-3px) !important;
                }
            `}} />
            <footer className="site-footer style2 bg-white">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-6">
                                <div className="widget widget_ftabout">
                                    <div className="footer-logo">
                                        <Link href="/"><img src="/dashboard/images/lightlogo.png" alt="" /></Link>
                                    </div>
                                    <p className="loaction-text"><i className="fa fa-paper-plane"></i>Dhaka, Barisal</p>
                                </div>
                                <div className="footer-social">
                                    <ul>
                                        <li className="wow zoomIn" data-wow-delay="0.1s"><a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-facebook"></i></a></li>
                                        <li className="wow zoomIn" data-wow-delay="0.2s"><a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-linkedin"></i></a></li>
                                        <li className="wow zoomIn" data-wow-delay="0.3s"><a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-dribbble"></i></a></li>
                                        <li className="wow zoomIn" data-wow-delay="0.4s"><a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-twitter"></i></a></li>
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
                                        <li className="wow fadeInUp" data-wow-delay="0.6s"><Link href="/privacy-policy">Privacy Policy</Link></li>
                                        <li className="wow fadeInUp" data-wow-delay="0.7s"><Link href="/terms-of-service">Terms of Service</Link></li>
                                        <li className="wow fadeInUp" data-wow-delay="0.8s"><Link href="/partners">Partners</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                                <div className="widget widget_services border-0">
                                    <h5 className="footer-title wow fadeInUp" data-wow-delay="1.0s">{renderSectionLink("#features", "Features")}</h5>
                                    <ul>
                                        <li className="wow fadeInUp" data-wow-delay="1.1s"><Link href="/customer-support">Customer Support</Link></li>
                                        <li className="wow fadeInUp" data-wow-delay="1.2s">{renderSectionLink("#features", "Custom Fields")}</li>
                                        <li className="wow fadeInUp" data-wow-delay="1.3s">{renderSectionLink("#experience", "Calendar Sync")}</li>
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
                            <div className="col-lg-6 col-md-6 text-left"> <span className="copyright">Copyright ©<span className="current-year">2026</span> Dexignlab</span> </div>
                            <div className="col-lg-6 col-md-6 text-right ">
                                <div className="widget-link">
                                    <ul>
                                        <li><a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-apple"></i> IOS</a></li>
                                        <li><a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-play"></i> Android</a></li>
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
