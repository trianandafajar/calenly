"use client"
import Script from "next/script"
import type { Metadata } from "next"
import { useEffect } from "react"

// export const metadata: Metadata = {
//     icons: {
//         icon: "/dashboard/images/favicon.png",
//     },
// }

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
     useEffect(() => {    
            setTimeout(() => {
                const preloader = document.getElementById("preloader")
                const main = document.getElementById("main-wrapper")
    
                if (preloader) preloader.remove()
                if (main) main.classList.add("show")
            }, 800)
        }, [])
    return (
        <>
            {/* CSS */}
            <link
                href="/dashboard/vendor/bootstrap-select/css/bootstrap-select.min.css"
                rel="stylesheet"
            />
            <link href="/dashboard/css/style.css" rel="stylesheet" />

            {/* <body> */}
            {/* <!--*******************
            Preloader start
    ********************--> */}
            <div id="preloader">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
            {/* <!--*******************
            Preloader end
    ********************--> */}

            {children}

            {/* Required Vendors */}
            <Script
                src="/dashboard/vendor/global/global.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="/dashboard/vendor/bootstrap-select/js/bootstrap-select.min.js"
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
            {/* </body> */}
        </>
    )
}
