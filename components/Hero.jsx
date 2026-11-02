'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { heroImages } from '../lib/images'

const slides = [
  { img: heroImages.banner },
  { img: heroImages.banner2 }
]

const Hero = ({ setIsOpen }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-container">
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-container {
          position: relative;
          margin-top: 0px;
          height: auto;
          overflow: hidden;
          background-image: url('/images/hero/banner1.webp');
          background-size: cover;
          background-position: center;
          display: block;
        }

        /* Disable full-screen overlay since gradient is only behind text */
        .hero-overlay {
          display: none;
        }

        /* Content block — sits over the image */
        .hero-content {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 10;
          padding: 100px 80px 72px 44px;
          width: 100%;
          max-width: 800px;
          background: radial-gradient(
            100% 100% at 0% 100%,
            rgba(0,0,0,0.95) 0%,
            rgba(0,0,0,0.7) 55%,
            rgba(0,0,0,0.2) 75%,
            transparent 90%
          );
        }

        /* Main title */
        .hero-title {
          font-family: var(--font-jost), Montserrat, sans-serif;
          font-size: clamp(20px, 3vw, 40px);
          font-weight: 800;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          line-height: 1.08;
          margin: 0 0 6px;
          text-shadow: 0 2px 16px rgba(0,0,0,0.5);
        }

        /* Subtitle */
        .hero-subtitle {
          font-family: var(--font-jost), Montserrat, sans-serif;
          font-size: clamp(11px, 1.4vw, 18px);
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 12px;
          opacity: 0.92;
          text-shadow: 0 1px 8px rgba(0,0,0,0.4);
        }

        /* Price line */
        .hero-price-line {
          font-family: var(--font-sans), Open Sans, sans-serif;
          font-size: clamp(13px, 1.5vw, 18px);
          color: rgba(255,255,255,0.88);
          margin: 0 0 22px;
          line-height: 1.4;
        }

        @keyframes livepulse {
          0%  { box-shadow:0 0 0 0 rgba(212,175,55,0.6); }
          70% { box-shadow:0 0 0 6px rgba(212,175,55,0); }
          100%{ box-shadow:0 0 0 0 rgba(212,175,55,0); }
        }
        @keyframes textBling {
          0% { opacity: 0.7; text-shadow: 0 0 4px rgba(212,175,55,0.5); }
          50% { opacity: 1; text-shadow: 0 0 14px rgba(212,175,55,1); }
          100% { opacity: 0.7; text-shadow: 0 0 4px rgba(212,175,55,0.5); }
        }

        @keyframes heroPriceBlink {
          0%, 75% { 
            opacity: 1; 
            text-shadow: 0 0 8px rgba(255,255,255,0.6); 
          }
          76%, 100% { 
            opacity: 0; 
            text-shadow: none; 
          }
        }

        .hero-price-amt {
          font-family: var(--font-jost), Montserrat, sans-serif;
          font-size: clamp(20px, 3vw, 36px);
          font-weight: 800;
          color: #fff;
          animation: heroPriceBlink 1.4s infinite;
          display: inline-block;
        }

        /* CTA Row */
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Hero buttons use global btn-brand / btn-gold-outline classes */

        /* First button — white text + white border on dark hero bg */
        .hero-btn-one {
          color: #fff !important;
          border-color: rgba(255,255,255,0.9) !important;
          background: transparent !important;
        }
        .hero-btn-one:hover {
          background: var(--color-brand) !important;
          color: #fff !important;
          border-color: var(--color-brand) !important;
        }

        /* RERA text */
        .hero-rera {
          font-family: var(--font-sans), Open Sans, sans-serif;
          font-size: 11.5px;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
        }

        .hero-slider-wrapper {
          width: 100%;
          height: 100%;
        }
        .slide-layer {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          pointer-events: none;
        }
        .slide-layer.active {
          opacity: 1;
          pointer-events: auto;
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
        }

        @keyframes heroZoomInOut {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .desktop-hero-image {
          animation: heroZoomInOut 15s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform;
        }

        /* ─── Global Mobile/Tablet Margin to clear White Header ─── */
        @media (max-width: 991px) {
          .hero-container {
            margin-top: 0px !important;
          }
        }

        /* ─── Desktop & Standard Monitors ─── */
        @media (min-width: 1024px) {
          .hero-container {
            width: 100%;
            height: 100vh;
            min-height: 600px;
            max-height: 1100px;
          }
          .hero-slider-wrapper {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .slide-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 80%;
          }
          .hero-content {
            padding: 80px 80px 32px 48px !important;
          }
        }

        /* ─── Compact Mini Laptops & Ultrabooks (e.g., ASUS VivoBook, 13-inch notebooks) ─── */
        @media (min-width: 1024px) and (max-height: 720px) {
          .hero-content {
            padding: 70px 60px 20px 48px !important;
          }
          .hero-bullets {
            margin-bottom: 14px !important;
            gap: 6px !important;
          }
          .hero-price-line {
            margin-bottom: 16px !important;
          }
        }

        .carousel-dots {
          position: absolute;
          bottom: 24px;
          right: 44px;
          display: flex;
          gap: 8px;
          z-index: 20;
        }
        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: background 0.3s;
        }
        .carousel-dot.active {
          background: #fff;
        }

        /* ─── Tablet ─── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-container {
            width: 100%;
            height: 75vh;
            min-height: 550px;
          }
          .hero-slider-wrapper {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .slide-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 80%;
          }
          .hero-content {
            padding: 0 28px 46px !important;
          }
        }

        /* ─── Mobile ─── */
        @media (max-width: 767px) {
          .hero-container {
            display: flex !important;
            flex-direction: column !important;
            height: auto !important;
            aspect-ratio: auto;
            background: #0F172A !important;
            padding-top: 56px !important;
          }
          .hero-slider-wrapper {
            position: relative;
            width: 100%;
            height: auto;
            aspect-ratio: 16/9;
          }
          .slide-layer {
            position: absolute !important;
            inset: 0 !important;
            width: 100%;
            height: 100%;
          }
          .hero-image {
            height: 100% !important;
            width: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
          }
            .hero-content {
              position: relative !important;
              background: #0F172A !important;
              padding: 24px 20px 28px !important;
              z-index: 1;
            }
            .hero-content::before {
              content: '';
              position: absolute;
              inset: 0;
              background-color: #C9A65A;
              -webkit-mask-image: url('/images/hero/leaf-bg.png');
              mask-image: url('/images/hero/leaf-bg.png');
              -webkit-mask-size: contain;
              mask-size: contain;
              -webkit-mask-position: center center;
              mask-position: center center;
              -webkit-mask-repeat: no-repeat;
              mask-repeat: no-repeat;
              opacity: 1;
              filter: drop-shadow(0 0 1px #C9A65A) drop-shadow(0 0 2px #C9A65A) drop-shadow(0 0 4px #C9A65A) brightness(1.3);
              z-index: -1;
              pointer-events: none;
            }
            .hero-overlay {
              display: none !important;
            }
            .hero-title {
              color: #C9A65A !important;
              text-shadow: none !important;
            }
            .hero-subtitle, .hero-price-line, .hero-price-amt, .hero-bullet-text, .hero-price-digits {
              color: #ffffff !important;
              text-shadow: none !important;
            }
            .hero-subtitle {
              font-size: 16px !important;
            }
            .hero-price-line {
              font-size: 17px !important;
            }
            .hero-subtitle span {
              color: #ffffff !important;
              opacity: 0.9;
            }
            .hero-bullet-item svg {
              background-color: rgba(255,255,255,0.1) !important;
              stroke: #C9A65A !important;
            }
            .hero-cta-row {
              flex-direction: column !important;
              align-items: center !important;
              gap: 12px !important;
              width: 100%;
            }
            .hero-cta-row > button,
            .hero-cta-row > a {
              width: 100% !important;
              justify-content: center !important;
              text-align: center;
              padding: 12px 10px !important;
              font-size: 14px !important;
              white-space: normal !important;
              box-shadow: none !important;
            }
            .hero-cta-row > a.btn-brand,
            .hero-cta-row > button.btn-brand {
              background: #C9A65A !important;
              color: #111827 !important;
              border-color: transparent !important;
              font-weight: 800 !important;
            }
            .hero-cta-row .hero-btn-one {
              color: #ffffff !important;
              border-color: #ffffff !important;
              background: transparent !important;
            }
            .hero-rera {
              font-size: 10px !important;
            }
          }
        `}} />

      {/* ── Responsive Image Carousel (All Devices) ── */}
      <div className="hero-slider-wrapper grid">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide-layer ${index === currentSlide ? 'active' : ''}`}
            style={{ gridArea: '1 / 1 / 2 / 2' }}
          >
            <Image
              src={slide.img}
              alt={`Tata Orbis Banner ${index + 1}`}
              width={1920}
              height={800}
              className="hero-image desktop-hero-image"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* ── Dark overlay for text legibility ── */}
      <div className="hero-overlay" />

      {/* ── Content overlay ── */}
      <div className="hero-content">

        {/* Main Heading */}
        <h1 className="hero-title">
         TATA ORBIS GHANSOLI
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          <span style={{ fontSize: '0.9em', fontWeight: 600, textTransform: 'none', color: '#fff' }}>New Launch At Ghansoli, Navi Mumbai.</span>
        </p>
        
        {/* Bullet Points */}
        <div className="hero-bullets" style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            '47.5 Acres Landmark Integrated Development',
            'Luxury 2, 3 BHK & Jodi In G+36 Floors Towers',
            'BEE 4-Star Approved Residential & Commercial',
            'Proposed Taj Hotel Within Township',
            'Olympic-Size Pool & Grand Entrance Lobby'
          ].map((text, i) => (
          <div key={i} className="hero-bullet-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand, #C9A96E)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, backgroundColor: '#fff', borderRadius: '50%', padding: '2px' }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="hero-bullet-text" style={{ color: '#fff', fontFamily: 'var(--font-sans), Open Sans, sans-serif', fontSize: 'clamp(13px, 1.5vw, 18px)', fontWeight: '500', letterSpacing: '0.02em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              {text}
            </span>
          </div>
          ))}
        </div>

        {/* Priority EOI Highlight Box */}
        <div className="flex items-start sm:items-center gap-2 px-3 sm:px-4 py-2 mt-2 mb-6 rounded-lg border border-red-500/60 bg-red-800/40 backdrop-blur-md shadow-[0_4px_20px_rgba(220,38,38,0.25)] w-fit" style={{ transform: 'translateY(0)' }}>
          <span className="text-[16px] sm:text-[18px] mt-[3px] sm:mt-0">💳</span>
          <div className="text-white font-medium text-[13px] sm:text-[15px] tracking-wide flex flex-wrap items-center gap-x-1" style={{ fontFamily: 'var(--font-jost), Montserrat, sans-serif' }}>
            <span>Priority Allotment EOI Amount:</span>
            <span style={{ animation: 'heroPriceBlink 1.4s infinite' }} className="flex items-center gap-1 mt-0.5 sm:mt-0">
              <strong className="text-[#ffd700] whitespace-nowrap">₹3 Lakhs</strong>
              <span className="text-white/90 font-normal text-[11px] sm:text-[13px] whitespace-nowrap">(2 & 3 BHK)</span>
            </span>
          </div>
        </div>

        {/* Price Line */}
        <p className="hero-price-line" style={{ marginBottom: '0px' }}>
          Luxury 2, 3 BHK Residences
          <span style={{ marginLeft: '6px', marginRight: '6px' }}>
            Price Starts
          </span>
          <span className="hero-price-amt" style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '1', verticalAlign: 'baseline' }}>
            ₹ 1.99 Cr*
          </span>
        </p>

        {/* CTA Row */}
        <style jsx>{`
          .hero-btn-pill {
            border-radius: 50px !important;
            -webkit-mask: none !important;
            mask: none !important;
          }
        `}</style>
        <div className="hero-cta-row" style={{ marginTop: '16px' }}>

          <button
            onClick={() => setIsOpen(true)}
            className="btn-gold-outline hero-btn-one hero-btn-pill"
            style={{ fontSize: '14px', padding: '11px 24px', fontWeight: '700', textTransform: 'none', cursor: 'pointer', display: 'inline-block' }}
          >
            Download Brochure
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="btn-brand hero-btn-pill"
            style={{ fontSize: '12px', padding: '11px 22px', textTransform: 'uppercase' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Schedule Site Visit
          </button>

        </div>

      </div>
    </section>
  )
}

export default Hero

