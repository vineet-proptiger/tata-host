'use client'
import React from 'react'
import Image from 'next/image'
import { heroImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const VirtualTour = ({ setIsOpen }) => {
  return (
    <section id="virtual-tour" className="relative w-full h-[60vh] min-h-[400px] md:min-h-[550px] flex items-center justify-center cursor-pointer overflow-hidden group" onClick={() => setIsOpen(true)}>

      <style>{`
        .ripple-btn {
          position: relative;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          z-index: 10;
          transition: transform 0.3s ease;
        }
        @media (min-width: 768px) {
          .ripple-btn {
            width: 90px;
            height: 90px;
          }
        }
        .ripple-btn:hover {
          transform: scale(1.05);
        }
        .ripple-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          pointer-events: none;
        }
        .ripple-ring:nth-child(2) {
          animation-delay: 0.8s;
        }
        .ripple-ring:nth-child(3) {
          animation-delay: 1.6s;
        }
        @keyframes pulse-ring {
          0% {
            width: 100%;
            height: 100%;
            opacity: 1;
          }
          100% {
            width: 180%;
            height: 180%;
            opacity: 0;
          }
        }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 transition-transform duration-700">
        <Image src={heroImages.banner} alt="Virtual Tour" fill className="object-cover" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10 text-center text-white flex flex-col items-center">

        {/* Play Icon Circle */}
        <div className="relative mb-10 flex items-center justify-center">
          <div className="ripple-btn">
            <svg className="w-6 h-6 md:w-8 md:h-8 ml-1 md:ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div className="ripple-ring"></div>
          <div className="ripple-ring"></div>
          <div className="ripple-ring"></div>
        </div>

        {/* Text */}
        <h2
          className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-white drop-shadow-md"
          style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", margin: 0 }}
        >
          STEP INTO YOUR FUTURE HOME
        </h2>
      </div>
    </section>
  )
}

export default VirtualTour
