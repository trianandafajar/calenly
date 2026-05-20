"use client"

import React, { useState } from "react"
import Header from "@/app/(landing-page)/components/header"
import Footer from "@/app/(landing-page)/components/footer"
import toast from "react-hot-toast"

export default function CustomerSupport() {
  const [ticketForm, setTicketForm] = useState({ name: "", email: "", priority: "Medium", issue: "" })
  const [ticketSent, setTicketSent] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    { q: "How do I connect my calendar accounts?", a: "Go to your dashboard, navigate to Settings, then click on 'Calendar Integrations'. You can connect Google Calendar, Outlook, and Apple iCal in one click." },
    { q: "Can I receive real-time scheduling text messages?", a: "Yes! Calenly integrates directly with Twilio. Simply configure SMS reminders inside your booking type template settings." },
    { q: "Is there a limit on monthly scheduler events?", a: "Free tiers support up to 50 active events monthly. Upgrade to Professional or Business suites for unlimited volume access." },
    { q: "Does Calenly support timezone detection?", a: "Absolutely! Calenly automatically detects your guest's timezone and translates your availability slots seamlessly to prevent scheduling conflicts." },
    { q: "Can I embed the booking widget on my own website?", a: "Yes. You can generate custom inline, popup, or button-triggered embedding scripts in your dashboard to integrate Calenly on any HTML/React/WordPress site." }
  ]

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketForm.name || !ticketForm.email || !ticketForm.issue) {
      toast.error("Please complete all required fields.")
      return
    }
    setTicketSent(true)
    toast.success("Support ticket created successfully!")
  }

  return (
    <div className="page-wraper font-sans text-zinc-800 bg-white">
      <Header />
      
      {/* Banner */}
      <div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(/landingpage/images/banner/bnr1.jpg)" }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Customer Support</h1>
            <div className="breadcrumb-row">
              <ul className="list-inline">
                <li><a href="/">Home</a></li>
                <li>Customer Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content bg-white py-12 md:py-16">
        <div className="container max-w-6xl">
          
          {/* Quick Metrics & Info Cards */}
          <div className="row m-b50">
            <div className="col-lg-4 col-md-6 col-sm-12 m-b30">
              <div className="icon-bx-wraper service-box bg-white shadow radius-md">
                <div className="icon-lg icon-bx gradient-one m-b20">
                  <a href="#" onClick={(e)=>e.preventDefault()} className="icon-cell"><i className="fa fa-book"></i></a>
                </div>
                <div className="icon-content">
                  <h2 className="dlab-tilte">Knowledge Base</h2>
                  <p>Browse tutorials, integration guides, and developer documentation.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 m-b30">
              <div className="icon-bx-wraper service-box bg-white shadow radius-md">
                <div className="icon-lg icon-bx gradient-two m-b20">
                  <a href="#" onClick={(e)=>e.preventDefault()} className="icon-cell"><i className="fa fa-check-circle"></i></a>
                </div>
                <div className="icon-content">
                  <h2 className="dlab-tilte">All Systems Operational</h2>
                  <p>Our global booking engine is running perfectly. Response time: &lt;30 mins.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 m-b30">
              <div className="icon-bx-wraper service-box bg-white shadow radius-md">
                <div className="icon-lg icon-bx gradient-three m-b20">
                  <a href="#" onClick={(e)=>e.preventDefault()} className="icon-cell"><i className="fa fa-slack"></i></a>
                </div>
                <div className="icon-content">
                  <h2 className="dlab-tilte">Community Slack</h2>
                  <p>Join other power users and developer advocates to share tips.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            
            {/* Accordion FAQs */}
            <div className="col-lg-7 col-md-12 m-b30">
              <div className="section-head text-left">
                <h2 className="title">Frequently Asked Questions</h2>
                <p>Quick answers to common questions about scheduling, event limits, and sync options.</p>
              </div>
              
              <div className="dlab-accordion faq-1 box-sort-in m-b30" id="accordion1">
                {faqs.map((faq, idx) => (
                  <div className="panel" key={idx}>
                    <div className="acod-head">
                      <h6 className="acod-title">
                        <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === idx ? null : idx); }} 
                          className={openFaq === idx ? "" : "collapsed"}
                        >
                          {faq.q}
                        </a>
                      </h6>
                    </div>
                    <div className={`acod-body collapse ${openFaq === idx ? "show" : ""}`}>
                      <div className="acod-content">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Ticket Submission */}
            <div className="col-lg-5 col-md-12 m-b30">
              {!ticketSent ? (
                <div className="card mb-0 h-auto border-0 rounded-3xl" style={{ backdropFilter: "blur(20px)", background: "rgba(255, 255, 255, 0.96)", boxShadow: "0 20px 50px -15px rgba(136, 108, 192, 0.15), 0 0 0 1px rgba(136, 108, 192, 0.08)" }}>
                  <div className="card-body p-5">
                    <h4 className="text-center font-extrabold text-zinc-900 tracking-tight mb-4">Submit a Ticket</h4>
                    <p className="text-center text-sm text-zinc-500 mb-4">Can't find what you're looking for? Message our team directly.</p>
                    <form onSubmit={handleTicketSubmit}>
                      <div className="form-group mb-4">
                        <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={ticketForm.name}
                          onChange={(e) => setTicketForm(t => ({ ...t, name: e.target.value }))}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm(t => ({ ...t, email: e.target.value }))}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500">Priority Level</label>
                        <select
                          value={ticketForm.priority}
                          onChange={(e) => setTicketForm(t => ({ ...t, priority: e.target.value }))}
                          className="form-control"
                        >
                          <option value="Low">Low (General Query)</option>
                          <option value="Medium">Medium (Bug Report)</option>
                          <option value="High">High (Service Disruption)</option>
                        </select>
                      </div>
                      <div className="form-group mb-4">
                        <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500">Problem Description *</label>
                        <textarea
                          required
                          placeholder="Describe your issue in detail..."
                          value={ticketForm.issue}
                          onChange={(e) => setTicketForm(t => ({ ...t, issue: e.target.value }))}
                          rows={4}
                          className="form-control"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary btn-block w-full py-3.5 flex items-center justify-center gap-2">
                          Send Ticket Request <i className="fa fa-arrow-right text-xs"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="card mb-0 h-auto border-0 rounded-3xl text-center" style={{ backdropFilter: "blur(20px)", background: "rgba(136, 108, 192, 0.05)", boxShadow: "0 20px 50px -15px rgba(136, 108, 192, 0.15), 0 0 0 1px rgba(136, 108, 192, 0.2)" }}>
                  <div className="card-body p-5">
                    <div className="w-16 h-16 rounded-full bg-[#886CC0]/20 text-[#886CC0] flex items-center justify-center text-2xl mx-auto shadow-inner mb-4">
                      <i className="fa fa-envelope-o"></i>
                    </div>
                    <h4 className="font-extrabold text-zinc-900 tracking-tight mb-2">Support Ticket Sent!</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Your ticket has been logged inside our system. We will investigate the problem and reply back to <span className="font-bold text-[#886CC0]">{ticketForm.email}</span> within 24 hours.
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
