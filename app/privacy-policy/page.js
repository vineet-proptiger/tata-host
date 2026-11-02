'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { logoImages } from '../../lib/images'
import AosInit from '../../components/AosInit'

const GOLD = 'var(--color-gold)'
const GOLD_DARK = 'var(--color-gold-dark)'

export default function PrivacyPolicy() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <AosInit />

      {/* ── Navbar (Sticky/Fixed) ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        {/* Top Teal Accent Line */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, var(--color-gold), var(--color-gold-light), var(--color-gold))` }}></div>

        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-[80px]">
          <Link href="/" className="flex items-center">
            <style>{`
              .privacy-logo { height: 48px; width: auto; display: block; object-fit: contain; transform-origin: left center; }
              @media(max-width: 768px) {
                .privacy-logo { height: 40px; transform-origin: left center; }
              }
            `}</style>
            <img src={logoImages.tarc} alt="Tata Orbis" className="privacy-logo" />
          </Link>
          <Link
            href="/"
            className="btn-gold shadow-lg !text-[11px] !px-3 !py-2 sm:!text-sm sm:!px-6 sm:!py-3"
          >
            <span className="hidden sm:inline">BACK TO HOME</span><span className="sm:hidden">HOME</span>
          </Link>
        </div>
      </nav>

      {/* Spacer for Fixed Nav */}
      <div className="h-[80px]"></div>

      {/* ── Hero Banner ── */}
      <section
        className="relative flex items-center justify-center text-center min-h-[140px] sm:min-h-[200px]"
        style={{
          backgroundImage: 'url(/images/hero/banner.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.7)' }}></div>

        <div className="relative z-10 px-4 py-10 sm:py-16" data-aos="fade-up">
          <h1
            className="text-white font-bold mb-4"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontFamily: 'var(--font-jost), Jost, sans-serif',
              letterSpacing: '1px',
            }}
          >
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
            <Link href="/" className="hover:text-white transition-colors" style={{ color: 'var(--color-gold)' }}>Home</Link>
            <span>›</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-8 sm:py-16 bg-[#f9f9f9]">
        <div
          className="container mx-auto px-4 md:px-8"
          style={{ maxWidth: '900px' }}
          data-aos="fade-up"
        >
          <div
            className="bg-white rounded-lg shadow-md"
            style={{ padding: 'clamp(24px, 5vw, 56px)', border: '1px solid #f0f0f0' }}
          >

            {/* Intro */}
            <p className="mb-6 sm:mb-8 text-sm sm:text-base" style={{ lineHeight: 1.8, color: '#444', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
              At{' '}
              <Link
                href="/"
                style={{ color: 'var(--color-gold-dark)', fontWeight: '600' }}
              >
                tatarealtyghansoli.co.in
              </Link>{' '}
              (Authorized Marketing Partner), we respect your privacy and are committed to safeguarding your personal data. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website.
            </p>

            {/* ── Section 1 ── */}
            <div className="mb-10" data-aos="fade-up">
              <h2 className="flex items-center gap-2 sm:gap-3 mb-4 text-lg sm:text-[22px]" style={{ fontWeight: '700', color: 'var(--color-text)', fontFamily: 'Roboto, sans-serif' }}>
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: GOLD, color: '#fff' }}>1</span>
                Updates to This Policy
              </h2>
              <p className="text-sm sm:text-[15px]" style={{ lineHeight: 1.8, color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif', paddingLeft: '44px' }}>
                This Privacy Policy may be updated from time to time without prior notice. We encourage you to review this page periodically to stay informed about any changes.
              </p>
            </div>

            {/* ── Section 2 ── */}
            <div className="mb-10" data-aos="fade-up">
              <h2 className="flex items-center gap-2 sm:gap-3 mb-4 text-lg sm:text-[22px]" style={{ fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: GOLD, color: '#fff' }}>2</span>
                Information We Collect
              </h2>
              <div style={{ paddingLeft: '44px' }}>
                <p className="mb-4" style={{ fontSize: '15px', lineHeight: 1.8, color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                  When you visit or interact with our website, we may collect the following information:
                </p>
                <ul className="space-y-2 mb-4" style={{ paddingLeft: '20px' }}>
                  {[
                    'Personal details you voluntarily provide (e.g., name, phone number, email address)',
                    'Technical and tracking data, such as:',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: '15px', color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif', lineHeight: 1.8 }}>
                      <span style={{ color: GOLD_DARK, fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1 mb-4" style={{ paddingLeft: '40px' }}>
                  {[
                    'Click IDs (GCLID, FBCLID, etc.)',
                    'IP address',
                    'Device type and model',
                    'Browser type and version',
                    'Operating system',
                    'Date and time of access',
                    'Pages visited and referring URLs',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontSize: '14px', color: '#666', fontFamily: 'var(--font-jost), Jost, sans-serif', lineHeight: 1.8 }}>
                      <span style={{ color: GOLD, flexShrink: 0, marginTop: '2px' }}>–</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#777', fontFamily: 'var(--font-jost), Jost, sans-serif', fontStyle: 'italic' }}>
                  This data is collected via form submissions, cookies, pixels, and other tracking technologies for analytics, personalization, and advertising purposes.
                </p>
              </div>
            </div>

            {/* ── Section 3 ── */}
            <div className="mb-10" data-aos="fade-up">
              <h2 className="flex items-center gap-2 sm:gap-3 mb-4 text-lg sm:text-[22px]" style={{ fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: GOLD, color: '#fff' }}>3</span>
                Purpose of Data Collection
              </h2>
              <ul className="space-y-2" style={{ paddingLeft: '44px' }}>
                {[
                  'Respond to your inquiries and service requests',
                  'Provide relevant product and project updates',
                  'Improve website performance and user experience',
                  'Run marketing campaigns and track conversions using tools like Google Ads Enhanced Conversions, Meta Pixel, and Google Analytics',
                  'Analyze visitor behavior to optimize communication and targeting strategies',
                  'Facilitate remarketing campaigns to show relevant ads across platforms',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ fontSize: '15px', color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif', lineHeight: 1.8 }}>
                    <span style={{ color: GOLD_DARK, fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4" style={{ fontSize: '14px', color: '#777', paddingLeft: '44px', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                You may opt out of promotional communications at any time.
              </p>
            </div>

            {/* ── Section 4 ── */}
            <div className="mb-10" data-aos="fade-up">
              <h2 className="flex items-center gap-2 sm:gap-3 mb-4 text-lg sm:text-[22px]" style={{ fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: GOLD, color: '#fff' }}>4</span>
                Use of Cookies and Tracking Technologies
              </h2>
              <ul className="space-y-2" style={{ paddingLeft: '44px' }}>
                {[
                  'Session continuity and site security',
                  'Personalized user experiences',
                  'Behavioral tracking for marketing and remarketing',
                  'Enhanced conversion tracking and ad performance measurement',
                  'Google Analytics tracking to analyze user behavior and site performance',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ fontSize: '15px', color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif', lineHeight: 1.8 }}>
                    <span style={{ color: GOLD_DARK, fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4" style={{ fontSize: '14px', color: '#777', paddingLeft: '44px', fontFamily: 'var(--font-jost), Jost, sans-serif', fontStyle: 'italic' }}>
                By continuing to use our site, you consent to the use of these technologies. You can manage or disable cookies via your browser settings, but this may impact website functionality.
              </p>
            </div>

            {/* ── Section 5 ── */}
            <div className="mb-10" data-aos="fade-up">
              <h2 className="flex items-center gap-2 sm:gap-3 mb-4 text-lg sm:text-[22px]" style={{ fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: GOLD, color: '#fff' }}>5</span>
                Google Analytics and Remarketing
              </h2>
              <div style={{ paddingLeft: '44px' }}>
                <p className="mb-4" style={{ fontSize: '15px', lineHeight: 1.8, color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                  We use Google Analytics, a web analysis service provided by Google, to better understand user behavior and improve site experience. Google Analytics uses cookies to collect anonymous traffic data, which may be shared with Google for analysis purposes.
                </p>
                <p className="mb-4" style={{ fontSize: '15px', lineHeight: 1.8, color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                  We also use Google Ads Remarketing, allowing us to display targeted ads across the internet to users who have previously visited our site. Google and other third-party vendors may use cookies and identifiers (e.g., GCLID) to serve ads based on your past visits to this site.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: GOLD, color: '#fff' }}
                  >
                    Google Ads Settings →
                  </a>
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all hover:opacity-80"
                    style={{ borderColor: GOLD, color: GOLD_DARK }}
                  >
                    Google Analytics Opt-Out →
                  </a>
                </div>
              </div>
            </div>

            {/* ── Section 6 ── */}
            <div className="mb-10" data-aos="fade-up">
              <h2 className="flex items-center gap-2 sm:gap-3 mb-4 text-lg sm:text-[22px]" style={{ fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: GOLD, color: '#fff' }}>6</span>
                Data Security
              </h2>
              <ul className="space-y-2" style={{ paddingLeft: '44px' }}>
                {[
                  'SSL encryption for secure transmission',
                  'Restricted internal access to personal data',
                  'Strict policies to ensure confidentiality and prevent misuse',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ fontSize: '15px', color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif', lineHeight: 1.8 }}>
                    <span style={{ color: '#25D366', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>🔒</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Section 7 ── */}
            <div className="mb-10" data-aos="fade-up">
              <h2 className="flex items-center gap-2 sm:gap-3 mb-4 text-lg sm:text-[22px]" style={{ fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: GOLD, color: '#fff' }}>7</span>
                Third-Party Disclosure
              </h2>
              <p className="text-sm sm:text-[15px]" style={{ lineHeight: 1.8, color: '#555', fontFamily: 'var(--font-jost), Jost, sans-serif', paddingLeft: '44px' }}>
                We do not sell or share your personal data with unaffiliated third parties. However, anonymized or encrypted data may be used with our trusted marketing and analytics partners (e.g., Google, Meta) solely for tracking and optimization purposes.
              </p>
            </div>

            {/* ── Section 8 — Contact ── */}
            <div data-aos="fade-up">
              <h2 className="flex items-center gap-2 sm:gap-3 mb-4 text-lg sm:text-[22px]" style={{ fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                <span className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: GOLD, color: '#fff' }}>8</span>
                Contact Us
              </h2>
              <div
                className="rounded-lg p-6"
                style={{ background: 'var(--color-gold-bg)', border: `1px solid var(--color-gold)`, marginLeft: '0' }}
              >
                <p className="mb-2" style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
                  Authorized Marketing Partner
                </p>

                <a
                  href="tel:9718344024"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: GOLD, color: '#fff' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  9718344024
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer (mini) ── */}
      <footer style={{ background: 'var(--color-dark)', color: '#fff', padding: '24px', textAlign: 'center', borderTop: '1px solid #333' }}>
        <p style={{ fontSize: '13px', color: '#888', fontFamily: 'var(--font-sans)' }}>
          &copy; 2026 Tata Orbis. All rights reserved |{' '}
          <Link href="/" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Back to Home</Link>
        </p>
      </footer>
    </main>
  )
}
