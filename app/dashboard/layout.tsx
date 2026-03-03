"use client"

import Script from "next/script"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import Footer from "./components/footer"
import { useEffect } from "react"
import SidebarAutoClose from "./sidebarAutoClose"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    useEffect(() => {
        document.title = "Calenly - SaaS Dashboard";

        const session = localStorage.getItem("session")

        if (!session) {
            router.push("/auth/login")
        }

        setTimeout(() => {
            const preloader = document.getElementById("preloader")
            const main = document.getElementById("main-wrapper")

            if (preloader) preloader.remove()
            if (main) main.classList.add("show")
        }, 800)
    }, [])

    return (

        <>
            {/* <head> */}
            {/* <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="shortcut icon" href="/dashboard/images/favicon.png" /> */}

            {/* CSS */}
            <link
                href="/dashboard/vendor/bootstrap-select/css/bootstrap-select.min.css"
                rel="stylesheet"
            />

            <link
                href="/dashboard/vendor/owl-carousel/owl.carousel.css"
                rel="stylesheet"
            />
            <link
                href="/dashboard/vendor/nouislider/nouislider.min.css"
                rel="stylesheet"
            />
            <link href="/dashboard/vendor/fullcalendar/css/main.min.css" rel="stylesheet" />

            <link rel="stylesheet" href="/dashboard/vendor/select2/css/select2.min.css" />

            <link href="/dashboard/vendor/bootstrap-datepicker-master/css/bootstrap-datepicker.min.css" rel="stylesheet" />

            <link href="/dashboard/css/style.css" rel="stylesheet" />
            {/* </head> */}

            {/* <body> */}
            {/* <!--*******************
            Preloader start
            ********************--> */}
            <SidebarAutoClose />
            <div id="preloader">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
            {/* <!--*******************
            Preloader end
            ********************--> */}

            <div id="main-wrapper">
                <Header />
                <Sidebar />
                <div className="content-body default-height">
                    {children}
                </div>
                <Footer />
            </div>

            {/* Required Vendors */}
            <Script
                src="/dashboard/vendor/global/global.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="/dashboard/vendor/bootstrap-select/js/bootstrap-select.min.js"
                strategy="afterInteractive"
                onLoad={() => {
                    window.dispatchEvent(new Event("selectpicker-ready"))
                }}
            />

            <Script
                src="/dashboard/vendor/metismenu/js/metisMenu.min.js"
                strategy="afterInteractive"
            />

            <Script
                src="/dashboard/vendor/counter/counter.min.js"
                strategy="afterInteractive"
            />
            <Script
                src="/dashboard/vendor/counter/waypoint.min.js"
                strategy="afterInteractive"
            />

            <Script
                src="/dashboard/vendor/apexchart/apexchart.js"
                strategy="afterInteractive"
            />
            <Script
                src="/dashboard/vendor/chart-js/chart.bundle.min.js"
                strategy="afterInteractive"
            />

            <Script
                src="/dashboard/vendor/peity/jquery.peity.min.js"
                strategy="afterInteractive"
            />

            <Script
                src="/dashboard/vendor/owl-carousel/owl.carousel.js"
                strategy="afterInteractive"
            />

            <Script
                src="/dashboard/js/dashboard/dashboard-1.js"
                strategy="afterInteractive"
            />
            <Script
                src="/dashboard/js/custom.min.js"
                strategy="afterInteractive"
            />
            <Script
                src="/dashboard/js/dlabnav-init.js"
                strategy="afterInteractive"
            />

            <Script src="/dashboard/vendor/draggable/draggable.js"
                strategy="afterInteractive"
            />

            <Script src="/dashboard/vendor/moment/moment.min.js"
                strategy="afterInteractive"
            />
            <Script
                src="/dashboard/vendor/fullcalendar/js/main.min.js"
                strategy="afterInteractive"
                onLoad={() => {
                    window.dispatchEvent(new Event("fullcalendar-ready"))
                }}
            />


            <Script src="/dashboard/vendor/select2/js/select2.full.min.js"
                strategy="afterInteractive"
            />
            <Script src="/dashboard/vendor/bootstrap-datepicker-master/js/bootstrap-datepicker.min.js"
                strategy="afterInteractive"
            />

            <Script src="/dashboard/js/plugins-init/select2-init.js"
                strategy="afterInteractive"
            />

            {/* Inline Owl Init */}
            <Script id="owl-init" strategy="afterInteractive">
                {`
            function cardsCenter(){
              jQuery('.card-slider').owlCarousel({
                loop:true,
                margin:0,
                nav:true,
                slideSpeed:3000,
                paginationSpeed:3000,
                dots:true,
                navText:[
                  '<i class="fas fa-arrow-left"></i>',
                  '<i class="fas fa-arrow-right"></i>'
                ],
                responsive:{
                  0:{items:1},
                  576:{items:1},
                  800:{items:1},
                  991:{items:1},
                  1200:{items:1},
                  1600:{items:1}
                }
              });
            }

            window.addEventListener("load", function(){
              setTimeout(cardsCenter, 1000);
            });
          `}
            </Script>
            {/* </body> */}
        </>
    )
}
