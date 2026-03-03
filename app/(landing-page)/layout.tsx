import Script from "next/script";
import RevSliderScripts from "./components/RevSliderScripts";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* CSS */}
      <link rel="stylesheet" type="text/css" href="/landingpage/css/plugins.css" />
      <link rel="stylesheet" type="text/css" href="/landingpage/css/style.css" />
      <link rel="stylesheet" type="text/css" href="/landingpage/css/templete.css" />
      <link className="skin" rel="stylesheet" type="text/css" href="/landingpage/css/skin/skin-2.css" />

      {children}
      <RevSliderScripts />
      {/* JAVASCRIPT FILES ========================================= */}

{/*      
      <Script id="rev-slider-init" strategy="afterInteractive">
        {`
          jQuery(document).ready(function() {
            'use strict';
            if (typeof dz_rev_slider_1 !== 'undefined') {
              dz_rev_slider_1();
            }
          });
        `}
      </Script> */}
    </>
  )
}