"use client"

import Script from "next/script"

export default function RevSliderScripts() {
    return (
        <>
            <Script src="/landingpage/js/jquery.min.js" strategy="beforeInteractive" />
            <Script src="/landingpage/plugins/wow/wow.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/bootstrap/js/popper.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/bootstrap/js/bootstrap.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/bootstrap-select/bootstrap-select.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/bootstrap-touchspin/jquery.bootstrap-touchspin.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/magnific-popup/magnific-popup.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/counter/waypoints-min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/counter/counterup.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/imagesloaded/imagesloaded.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/masonry/masonry-3.1.4.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/masonry/masonry.filter.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/owl-carousel/owl.carousel.js" strategy="afterInteractive" />
            <Script src="/landingpage/js/custom.js" strategy="afterInteractive" />
            <Script src="/landingpage/js/dz.carousel.js" strategy="afterInteractive" />
            <Script src="/landingpage/js/dz.ajax.js" strategy="afterInteractive" />

            {/* REVOLUTION JS */}
            <Script src="/landingpage/plugins/revolution/revolution/js/jquery.themepunch.tools.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/jquery.themepunch.revolution.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/extensions/revolution.extension.actions.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/extensions/revolution.extension.carousel.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/extensions/revolution.extension.kenburn.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/extensions/revolution.extension.layeranimation.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/extensions/revolution.extension.navigation.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/extensions/revolution.extension.parallax.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/extensions/revolution.extension.slideanims.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/plugins/revolution/revolution/js/extensions/revolution.extension.video.min.js" strategy="afterInteractive" />
            <Script src="/landingpage/js/rev.slider.js" strategy="afterInteractive" />

            <Script
                id="rev-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                                __html: `
                jQuery(document).ready(function() {
                    if (typeof dz_rev_slider_1 === "function") {
                    dz_rev_slider_1();
                    }
                });
                `,
                }}
            />
        </>
    )
}