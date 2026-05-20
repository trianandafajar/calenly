"use client"

import React, { useState } from "react"
import Header from "@/app/(landing-page)/components/header"
import Footer from "@/app/(landing-page)/components/footer"
import toast from "react-hot-toast"

export default function Partners() {
  const [partnerForm, setPartnerForm] = useState({ company: "", contactName: "", email: "", partnerType: "Integration" })
  const [submitted, setSubmitted] = useState(false)

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!partnerForm.company || !partnerForm.contactName || !partnerForm.email) {
      toast.error("Please fill in all details.")
      return
    }
    setSubmitted(true)
    toast.success("Partnership application submitted! We will contact you soon.")
  }

  const partners = [
    { name: "Google Calendar", icon: "fa-google", desc: "Sync and lock schedules to prevent overlapping bookings." },
    { name: "Zoom Video", icon: "fa-video-camera", desc: "Generate automatic, dynamic remote link calls for users." },
    { name: "HubSpot CRM", icon: "fa-refresh", desc: "Sync guest bookings and notes directly to contact histories." },
    { name: "Slack", icon: "fa-slack", desc: "Real-time calendar updates directly into private workspace channels." }
  ]

  return (
    <div className="page-wraper font-sans text-zinc-800 bg-white">
      <Header />

      {/* Banner */}
      <div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(/landingpage/images/banner/bnr1.jpg)" }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Partners & Integrations</h1>
            <div className="breadcrumb-row">
              <ul className="list-inline">
                <li><a href="/">Home</a></li>
                <li>Partners</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content bg-white py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="m-b50">

            {/* Integrations Grid */}
            <div className="row">
              {partners.map(p => (
                <div key={p.name} className="col-lg-6 col-md-6 col-sm-12 m-b30">
                  <div className="icon-bx-wraper service-box bg-white shadow radius-md">
                    <div className="icon-lg icon-bx gradient-one m-b20">
                      <a href="#" onClick={(e)=>e.preventDefault()} className="icon-cell"><i className={`fa ${p.icon}`}></i></a>
                    </div>
                    <div className="icon-content">
                      <h2 className="dlab-tilte">{p.name}</h2>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Section */}
            <div className="p-t30">
              {!submitted ? (
                <div className="card mb-0 h-auto border-0 rounded-3xl" style={{ backdropFilter: "blur(20px)", background: "rgba(255, 255, 255, 0.96)", boxShadow: "0 20px 50px -15px rgba(136, 108, 192, 0.15), 0 0 0 1px rgba(136, 108, 192, 0.08)" }}>
                  <div className="card-body p-5">
                    <h4 className="text-center font-extrabold text-zinc-900 tracking-tight mb-2">Become an Integration or Affiliate Partner</h4>
                    <p className="text-center text-sm text-zinc-500 mb-6">Join us in streamlining global workflows. Fill out the application form below and our team will get in touch.</p>

                    <form onSubmit={handlePartnerSubmit}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group mb-4">
                            <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500">Company Name *</label>
                            <input
                              type="text"
                              placeholder="Company / Org Name"
                              required
                              value={partnerForm.company}
                              onChange={(e) => setPartnerForm(p => ({ ...p, company: e.target.value }))}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group mb-4">
                            <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500">Your Name *</label>
                            <input
                              type="text"
                              placeholder="Your Name"
                              required
                              value={partnerForm.contactName}
                              onChange={(e) => setPartnerForm(p => ({ ...p, contactName: e.target.value }))}
                              className="form-control"
                            />
                          </div>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group mb-4">
                            <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500">Business Email *</label>
                            <input
                              type="email"
                              placeholder="Business Email"
                              required
                              value={partnerForm.email}
                              onChange={(e) => setPartnerForm(p => ({ ...p, email: e.target.value }))}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group mb-4">
                            <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500">Partner Type *</label>
                            <select
                              value={partnerForm.partnerType}
                              onChange={(e) => setPartnerForm(p => ({ ...p, partnerType: e.target.value }))}
                              className="form-control"
                            >
                              <option value="Integration">Integration Partner</option>
                              <option value="Affiliate">Affiliate Partner</option>
                              <option value="Agency">Agency / Consultant</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-2">
                          <button type="submit" className="btn btn-primary btn-block w-full py-3.5 flex items-center justify-center gap-2">
                            Apply for Partnership <i className="fa fa-arrow-right text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="card mb-0 h-auto border-0 rounded-3xl text-center" style={{ backdropFilter: "blur(20px)", background: "rgba(136, 108, 192, 0.05)", boxShadow: "0 20px 50px -15px rgba(136, 108, 192, 0.15), 0 0 0 1px rgba(136, 108, 192, 0.2)" }}>
                  <div className="card-body p-5">
                    <div className="w-16 h-16 rounded-full bg-[#886CC0]/20 text-[#886CC0] flex items-center justify-center text-2xl mx-auto shadow-inner mb-4">
                      <i className="fa fa-check"></i>
                    </div>
                    <h4 className="font-extrabold text-zinc-900 tracking-tight mb-2">Partnership Application Received!</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
                      Thank you for reaching out to build with us. Our partnership director will review your details and connect back via <strong className="text-[#886CC0]">{partnerForm.email}</strong> shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
