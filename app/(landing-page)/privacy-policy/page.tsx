"use client"

import React from "react"
import Header from "@/app/(landing-page)/components/header"
import Footer from "@/app/(landing-page)/components/footer"

export default function PrivacyPolicy() {
  return (
    <div className="page-wraper font-sans text-zinc-800 bg-white">
      <Header />

      {/* Banner */}
      <div className="dlab-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: "url(/landingpage/images/banner/bnr1.jpg)" }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Privacy Policy</h1>
            <div className="breadcrumb-row">
              <ul className="list-inline">
                <li><a href="/">Home</a></li>
                <li>Privacy Policy</li>
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
                1. Introduction
              </h2>
              <p>
                Welcome to Calenly. We are highly committed to protecting your personal data and respecting your privacy.
                This Privacy Policy explains how we collect, process, and protect your data when you visit our website, use our SaaS scheduling platform, and interact with our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                2. Data We Collect
              </h2>
              <p>We collect information to deliver a smooth and efficient scheduling experience:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                <li><strong>Account Data:</strong> Contact information, name, email, credentials, and profile settings.</li>
                <li><strong>Calendar & Event Details:</strong> Access tokens to sync your external calendars, meeting topics, times, and guest lists.</li>
                <li><strong>Usage Statistics:</strong> Information on how you interact with the software, browser type, operating system, and crash logs.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                3. How We Use Your Data
              </h2>
              <p>We process personal data for specific reasons including:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                <li>Providing and maintaining the Calenly scheduling service.</li>
                <li>Fulfilling bookings and issuing email notifications, calendar reminders, and video links.</li>
                <li>Improving system stability, analytics, and building new scheduler products.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                4. Data Sharing & Security
              </h2>
              <p>
                We strictly do not sell your personal data. We only share data with trust-verified integration providers (e.g. Google Calendar API, Zoom, Slack) solely to execute requested workflows.
                We use end-to-end industry standard AES-256 encryption for database columns and SSL connection layers to safeguard all packets.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#886CC0] block"></span>
                5. Your Legal Rights
              </h2>
              <p>
                Depending on your location (e.g. GDPR, CCPA), you hold absolute rights to access, rectify, delete, or limit the processing of your stored data. Feel free to contact our Support Desk to initiate these processes.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
