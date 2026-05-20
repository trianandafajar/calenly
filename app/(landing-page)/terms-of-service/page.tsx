"use client"

import React from "react"
import Header from "@/app/(landing-page)/components/header"
import Footer from "@/app/(landing-page)/components/footer"

export default function TermsOfService() {
  return (
    <div className="page-wraper font-sans text-zinc-800 bg-white">
      <Header />

      {/* Banner */}
      <div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(/landingpage/images/banner/bnr1.jpg)" }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Terms of Service</h1>
            <div className="breadcrumb-row">
              <ul className="list-inline">
                <li><a href="/">Home</a></li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content bg-white py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="space-y-8 text-zinc-700 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                1. Acceptance of Terms
              </h2>
              <p>
                By creating a Calenly account, subscribing to any pricing model, or using our scheduling features, you legally agree to be bound by these Terms of Service.
                If you disagree with these terms, you must terminate account usage immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                2. User Account Responsibilities
              </h2>
              <p>
                You are fully accountable for preserving account credential confidentiality. You must report any suspected breach or unauthorized access immediately.
                Calenly is not responsible for any losses arising from negligence in maintaining password integrity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                3. Fair Use & Restrictive Policies
              </h2>
              <p>You agree not to exploit or abuse the scheduler features. Prohibited behavior includes:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                <li>Faking high-volume spam bookings via automated scripts or bots.</li>
                <li>Uploading malware or hosting malicious scripts through customer-facing appointment portals.</li>
                <li>Infringing copyright, privacy, or trade secrets of third parties using booking text entries.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                4. Fees, Billing, & Refunds
              </h2>
              <p>
                Some aspects of Calenly are offered as paid subscription modules. Fees are billed strictly in advance on a recurring monthly or annual basis.
                All billing amounts are non-refundable unless specified under our formal trial agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                5. Termination & Liability Boundaries
              </h2>
              <p>
                We reserve the right to suspend or block any account with or without prior notice if we detect persistent violations of these terms.
                Calenly's entire liability is strictly bounded up to the absolute sum paid by the user during the immediate 6-month period preceding the claim.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
