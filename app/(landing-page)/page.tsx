"use client"

import Footer from "@/app/(landing-page)/components/footer";
import Header from "@/app/(landing-page)/components/header";

import SliderBanner from "@/app/(landing-page)/components/sliderBanner";
import bcrypt from "bcryptjs";
import { useEffect } from "react";

export default function page() {

    useEffect(() => {
        const payload = {
            id: "U-" + String(Date.now()).slice(-9),
            username: "admin",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("password"),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        localStorage.setItem("users", JSON.stringify(payload))
    }, [])

    return (
        <div className="page-wraper">
            <Header />
            <div className="page-content bg-white">
                {/* <!-- Slider Banner --> */}
                <SliderBanner />

                {/* <!-- Slider Banner --> */}
                < div className="content-block" >
                    {/* <!-- featured box --> */}
                    < div className="section-full bg-white content-inner-1 text-center" style={{
                        backgroundImage: "url('/landingpage/images/background/bg3.png')",
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                    >
                        <div id='about' className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-12 m-b30 wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="icon-bx-wraper service-box bg-white shadow radius-md">
                                        <div className="icon-lg icon-bx gradient-one m-b20">
                                            <a href="javascript:void(0)" className="icon-cell"><i className="fa fa-mobile"></i></a>
                                        </div>
                                        <div className="icon-content">
                                            <h2 className="dlab-tilte">Team Management</h2>
                                            <p>Our creativity is driven by data in an effort to give you the best possible result and position your brand for success.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 m-b30 wow fadeInUp" data-wow-delay="0.4s">
                                    <div className="icon-bx-wraper service-box bg-white shadow radius-md">
                                        <div className="icon-lg icon-bx gradient-two m-b20">
                                            <a href="javascript:void(0)" className="icon-cell"><i className="fa fa-diamond"></i></a>
                                        </div>
                                        <div className="icon-content">
                                            <h2 className="dlab-tilte">Ease of use</h2>
                                            <p>Our creativity is driven by data in an effort to give you the best possible result and position your brand for success.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 m-b30 wow fadeInUp" data-wow-delay="0.6s">
                                    <div className="icon-bx-wraper service-box bg-white shadow radius-md">
                                        <div className="icon-lg icon-bx gradient-three m-b20">
                                            <a href="javascript:void(0)" className="icon-cell"><i className="fa fa-wrench"></i></a>
                                        </div>
                                        <div className="icon-content">
                                            <h2 className="dlab-tilte">Customizable</h2>
                                            <p>Our creativity is driven by data in an effort to give you the best possible result and position your brand for success.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    {/* <!-- featured box End --> */}
                    {/* <!-- about us --> */}
                    <div className="section-full bg-white about-area3 content-inner">
                        <div className="container">
                            <div className="video-content-bx text-center">
                                <a href="https://www.youtube.com/watch?v=_FRZVScwggM" className="popup-youtube video gradient-five play-btn wow zoomIn" data-wow-delay="0.6s"><i className="fa fa-play"></i></a>
                                <h2 className="title wow fadeInUp" data-wow-delay="0.3s">Different teams need different things at different times so flexibility is key. Manage any workflow or process </h2>
                                <p className="wow fadeInUp" data-wow-delay="0.6s">There’s a template out there for every use case. Start with the one that best fits you. This is just a starting point, you can customize it to fit your exact workflow and needs. Use as many templates as you'd like to address all your different workflows.</p>
                            </div>
                            <div className="row align-items-center about-bx3">
                                <div className="col-lg-6 m-b30">
                                    <div className="about-content gradient-six text-white wow fadeInLeft" data-wow-delay="0.3s">
                                        <h2 className="title">We create unique digital experiences</h2>
                                        <p>We build unique digital products that help brands grow, attract new customers, and reach new markets with outstanding graphic design and experience through the digital transformation of various aspects of their businesses.</p>
                                        <a href="about-1.html" className="btn text-uppercase btn-lg white radius-lg btn-aware">One click import <span></span></a>
                                    </div>
                                </div>
                                <div className="col-lg-6 m-b30 wow fadeInRight" data-wow-delay="0.6s">
                                    <div className="dlab-media thum-shadow">
                                        <img src="/landingpage/images/about/about-2.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- about us end --> */}
                    {/* <!-- Brand experience --> */}
                    <div id='experience' className="section-full brand-experience content-inner">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-7 col-md-6 m-b30 wow fadeInLeft" data-wow-delay="0.3s">
                                    <span className="sub-title text-secondry">Brand Experience</span>
                                    <h2 className="title"><a href="#">The Proof. The Experiences That Engage.</a></h2>
                                    <p>We’re on a mission to start a conversation with your customers in this fast connected world. Let’s discover, build and grow your digital business. Challenging work stimulates us. Building engaging digital experiences, using the latest trends, is at heart of all the web design services</p>
                                    <p>We’re on a mission to start a conversation with your customers in this fast connected world. Let’s discover, build and grow your digital business. </p>
                                </div>
                                <div className="col-lg-5 col-md-6 m-b30">
                                    <div className="exp-media">
                                        <div className="thum-one img-move">
                                            <img src="/landingpage/images/about/pic1.jpg" alt="" className="wow fadeInRight" data-wow-delay="0.3s" />
                                        </div>
                                        <div className="thum-two">
                                            <img src="/landingpage/images/about/pic2.jpg" alt="" className="wow fadeInRight" data-wow-delay="0.9s" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Brand experience end --> */}
                    {/* <!-- overview box --> */}
                    <div id='features' className="section-full bg-white content-inner-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="overview-box style2">
                                        <div className="overview-media out-img-left wow fadeInLeft img-move2" data-wow-delay="0.3s">
                                            <img src="/landingpage/images/overview/pic6.png" alt="" />
                                        </div>
                                        <div className="overview-info wow fadeInRight" data-wow-delay="0.6s">
                                            <span className="sub-title text-primary">Custom Field Builder</span>
                                            <h2 className="title"><a href="#">Add as many fields as you need with different </a></h2>
                                            <p>We’re on a mission to start a conversation with your customers in this fast connected world. Let’s discover, build and grow your digital business. Challenging work stimulates us. Building engaging digital experiences, using the latest trends, is at heart of all the web design services we render</p>
                                            <a href="#" className="btn outline  text-uppercase radius-xl btn-lg btn-aware">Inquary more<span></span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- overview box end --> */}
                    {/* <!-- overview box --> */}
                    <div className="section-full bg-white content-inner-2" style={{
                        backgroundImage: "url('/landingpage/images/background/bg4.png')",
                        backgroundPosition: "right center",
                        backgroundRepeat: "no-repeat",
                    }}
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="overview-box style2">
                                        <div className="overview-info wow fadeInLeft" data-wow-delay="0.3s">
                                            <span className="sub-title text-primary">Free Business Analytics</span>
                                            <h2 className="title"><a href="#">The Ultimate Business Recruitment Plugin </a></h2>
                                            <p>Across the board, our clients have incredible offerings – but they need a way to stand out and differentiate themselves from the crowd. We are inspired to help people think differently about who they are, and the people they engage – reaching their story to their audiences constantly.</p>
                                            <a href="#" className="btn outline text-uppercase radius-xl btn-lg btn-aware">Inquary more<span></span></a>
                                        </div>
                                        <div className="overview-media out-img-right wow fadeInRight img-move" data-wow-delay="0.6s">
                                            <img src="/landingpage/images/overview/pic7.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- overview box end --> */}
                    {/* <!-- testimonials --> */}
                    <div id='testimonials' className="section-full best-client-box content-inner-2" style={{
                        backgroundImage: "url('/landingpage/images/background/bg1.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    >
                        <img src="/landingpage/images/background/bg-top.png" className="bg-top" alt="" />
                        <img src="/landingpage/images/background/bg-bottom.png" className="bg-bottom" alt="" />
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="testimonial-two owl-carousel owl-theme testimonial-area3 owl-dots-none owl-btn-2">
                                        <div className="item">
                                            <div className="testimonial-3 wow fadeInUp" data-wow-delay="0.2s">
                                                <div className="testimonial-detail clearfix quote-right">
                                                    <h5 className="testimonial-name">Mahfuz Riad</h5>
                                                    <span>Ux & Product Designer</span>
                                                </div>
                                                <div className="testimonial-text">
                                                    <p>We’re on a mission to start a conversation with your customers in this fast connected world. Let’s discover, build and grow your digital business.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="testimonial-3 wow fadeInUp" data-wow-delay="0.4s">
                                                <div className="testimonial-detail clearfix quote-right">
                                                    <h5 className="testimonial-name m-t0 m-b5">Mahfuz Riad</h5>
                                                    <span>Ux & Product Designer</span>
                                                </div>
                                                <div className="testimonial-text">
                                                    <p>We’re on a mission to start a conversation with your customers in this fast connected world. Let’s discover, build and grow your digital business.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="testimonial-3 wow fadeInUp" data-wow-delay="0.6s">
                                                <div className="testimonial-detail clearfix quote-right">
                                                    <h5 className="testimonial-name m-t0 m-b5">Mahfuz Riad</h5>
                                                    <span>Ux & Product Designer</span>
                                                </div>
                                                <div className="testimonial-text">
                                                    <p>We’re on a mission to start a conversation with your customers in this fast connected world. Let’s discover, build and grow your digital business.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- testimonials end --> */}
                    {/* <!-- projects box --> */}
                    <div id='projects' className="section-full bg-white content-inner-1" style={{
                        backgroundImage: "url('/landingpage/images/background/bg5.png')",
                        backgroundPosition: "left center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="container">
                            <div className="row align-items-center projects-area1">
                                <div className="col-lg-6">
                                    <div className="out-box-left">
                                        <div className="row sp20 align-items-end">
                                            <div className="col-lg-6 col-md-6 col-sm-6 m-b20 wow fadeInUp" data-wow-delay="0.2s">
                                                <div className="project-box1 img-move">
                                                    <div className="dlab-media">
                                                        <img src="/landingpage/images/portfolio/pic1.jpg" alt="" />
                                                        <div className="overlay-bx">
                                                            <a href="portfolio-details.html" className="icon-bx"><i className="ti-arrow-top-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 m-b20 wow fadeInUp" data-wow-delay="0.4s">
                                                <div className="project-box1 img-move2">
                                                    <div className="dlab-media">
                                                        <img src="/landingpage/images/portfolio/pic3.jpg" alt="" />
                                                        <div className="overlay-bx">
                                                            <a href="portfolio-details.html" className="icon-bx"><i className="ti-arrow-top-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row sp20 align-items-start">
                                            <div className="col-lg-6 col-md-6 col-sm-6 m-b20 wow fadeInUp" data-wow-delay="0.6s">
                                                <div className="project-box1 img-move2">
                                                    <div className="dlab-media">
                                                        <img src="/landingpage/images/portfolio/pic2.jpg" alt="" />
                                                        <div className="overlay-bx">
                                                            <a href="portfolio-details.html" className="icon-bx"><i className="ti-arrow-top-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 m-b20 wow fadeInUp" data-wow-delay="0.8s">
                                                <div className="project-box1 img-move">
                                                    <div className="dlab-media">
                                                        <img src="/landingpage/images/portfolio/pic4.jpg" alt="" />
                                                        <div className="overlay-bx">
                                                            <a href="portfolio-details.html" className="icon-bx"><i className="ti-arrow-top-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.6s">
                                    <div className="p-l30">
                                        <span className="sub-title text-primary">Best Project</span>
                                        <h2 className="title"><a href="#">Here’s how our recent work looks like:</a></h2>
                                        <p>Create and deliver eye-catching emails that drive real business results with our easy-to-use design, personalization, and automation tools.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- projects box end --> */}
                    {/* <!-- blog --> */}
                    <div id='announcements' className="section-full bg-white content-inner-2" style={{
                        backgroundImage: "url('/landingpage/images/background/bg2.png')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    >
                        <div className="container">
                            <div className="section-head text-center">
                                <h2 className="title">Announcements</h2>
                                <p>Latest headlines and updates on news from around the world.Find breaking stories, upcoming events and expert opinion.</p>
                            </div>
                            <div className="blog-carousel owl-carousel owl-none">
                                <div className="item">
                                    <div className="blog-post blog-grid text-center bg-white shadow wow fadeInUp" data-wow-delay="0.2s">
                                        <div className="dlab-post-media dlab-img-effect">
                                            <a href="#"><img src="/landingpage/images/blog/grid/pic1.jpg" alt="Snowman Crochet Pattern" /></a>
                                        </div>
                                        <div className="dlab-info">
                                            <div className="dlab-post-title">
                                                <h4 className="post-title">
                                                    <a href="#">Melting Snowman Doll – Crochet Pattern</a>
                                                </h4>
                                            </div>
                                            <div className="dlab-post-text">
                                                <p>
                                                    Discover a fun and creative crochet pattern for making a cute melting snowman doll.
                                                    Perfect for winter decorations or handmade gifts.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="blog-post blog-grid text-center bg-white shadow wow fadeInUp" data-wow-delay="0.4s">
                                        <div className="dlab-post-media dlab-img-effect">
                                            <a href="#"><img src="/landingpage/images/blog/grid/pic2.jpg" alt="Improve Productivity" /></a>
                                        </div>
                                        <div className="dlab-info">
                                            <div className="dlab-post-title">
                                                <h4 className="post-title">
                                                    <a href="#">Multiplying the Effectiveness of Your Work</a>
                                                </h4>
                                            </div>
                                            <div className="dlab-post-text">
                                                <p>
                                                    Learn practical strategies to improve productivity and get better results
                                                    by managing your time and tasks more effectively.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="blog-post blog-grid text-center bg-white shadow wow fadeInUp" data-wow-delay="0.6s">
                                        <div className="dlab-post-media dlab-img-effect">
                                            <a href="#"><img src="/landingpage/images/blog/grid/pic3.jpg" alt="Content Quality" /></a>
                                        </div>
                                        <div className="dlab-info">
                                            <div className="dlab-post-title">
                                                <h4 className="post-title">
                                                    <a href="#">When Is Medium-Quality Content the Right Choice?</a>
                                                </h4>
                                            </div>
                                            <div className="dlab-post-text">
                                                <p>
                                                    Not every project requires perfect content. Explore when medium-quality
                                                    content can still provide value and meet your goals efficiently.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- pricing table end --> */}
                </div>
            </div >
            <Footer />
        </div >
    )
}
