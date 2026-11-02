'use client'
import React from 'react'
import Image from 'next/image'
import { overviewImage } from '../lib/images'

const Overview = ({ setIsOpen }) => {

  return (
  <section
    id="overview"
    className="about_us about-us-section"
  >
    <style jsx>{`
      .about-us-section {
        box-sizing: border-box;
        padding: 70px 0px;
        position: relative;
        background: #f4ebe4;
        overflow: hidden;
      }
      .logoicon {
        width: 25%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.15;
        z-index: 0;
        pointer-events: none;
      }
      .icon_logo_anim {
        animation: logoAnim 20s linear infinite;
        width: 100%;
        height: auto;
      }
      @keyframes logoAnim {
        100% {
          transform: rotate(360deg);
        }
      }
      .inner-section {
        position: relative;
        z-index: 1;
        padding-right: 30px;
      }
      .heading {
        color: #000242;
        font-family: "Montserrat", sans-serif;
        font-size: 46px;
        font-weight: 500;
        line-height: 56px;
        text-transform: uppercase;
        letter-spacing: .02em;
        margin-bottom: 30px;
      }
      .about-us-section p {
        text-align: left;
        margin-bottom: 25px;
        color: #000242;
        font-family: "Poppins", sans-serif;
        font-size: 17px;
        line-height: 1.8;
      }
      .about-us-section p.boldp {
        margin-top: 35px;
        font-weight: 500;
        font-size: 19px;
        margin-bottom: 25px;
      }
      .about-us-section ul {
        padding-left: 0;
        list-style-type: none;
        margin-bottom: 45px;
        color: #000242;
        font-family: "Poppins", sans-serif;
        font-size: 17px;
        line-height: 1.8;
      }
      .about-us-section ul li {
        position: relative;
        padding-left: 24px;
        margin-bottom: 14px;
      }
      .about-us-section ul li:before {
        content: '';
        position: absolute;
        left: 0;
        top: 12px;
        width: 6px;
        height: 6px;
        background-color: #000242;
        border-radius: 50%;
      }
      .theme_btn1 {
        padding: 15px 32px;
        background: #000242;
        color: #FFF;
        line-height: 1;
        position: relative;
        text-decoration: none;
        font-weight: 600;
        text-transform: uppercase;
        display: inline-block;
        font-size: 15px;
        transition: all 0.3s ease;
        cursor: pointer;
        letter-spacing: 0.5px;
      }
      .theme_btn1:hover {
        background: #d3be8a;
        color: #000242;
      }
      .image_caption_wrap img {
        width: 100%;
        height: auto;
        border-radius: 10px;
      }
      @media (max-width: 991px) {
        .inner-section {
          padding-right: 0;
          margin-bottom: 40px;
        }
        .heading {
          font-size: 32px;
          line-height: 40px;
        }
        .logoicon {
          width: 50%;
        }
      }
    `}</style>

    <div className="container mx-auto px-4 sm:px-8 max-w-[1300px] relative z-10">
      <div className="flex flex-col lg:flex-row items-center">
        
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-7/12 pr-0 lg:pr-8">
          <div className="inner-section" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900" data-aos="fade-up" data-aos-duration="1000" style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", marginBottom: '6px' }}>TATA Orbis</h2>
            {/* Decorative Line */}
            <div className="flex items-center justify-start mt-1 mb-3" data-aos="fade-up" data-aos-duration="1000">
              <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
              <div className="w-2 h-2 rounded-full bg-[#7d9b93] mx-3"></div>
              <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[22px] font-medium tracking-wide text-gray-600" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50" style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", marginBottom: '24px' }}>New Launch in Ghansoli, Navi Mumbai</h3>
            
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" style={{ fontSize: '16px', fontFamily: '"Poppins", sans-serif', color: '#333', textAlign: 'justify', marginBottom: '8px', lineHeight: '1.8' }}>
              TATA Orbis is a thoughtfully planned new launch in Ghansoli, Navi Mumbai, offering a landmark integrated development by Tata. The entire development is BEE 4-Star approved and thoughtfully divided into three distinct components: Residential, Commercial, and Hospitality.
            </p>
            
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="120" style={{ fontSize: '16px', fontFamily: '"Poppins", sans-serif', color: '#333', textAlign: 'justify', marginBottom: '8px', lineHeight: '1.8' }}>
              The residential phase features 7 iconic towers offering luxury 2 BHK, 3 BHK, and Jodi apartments, designed for elevated urban living. The commercial phase comprises 8 iconic towers with expansive office spaces, creating a dynamic business destination. Adding to the development is a premium Taj Hotel, bringing world-class hospitality to the project.
            </p>
            
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="140" style={{ fontSize: '16px', fontFamily: '"Poppins", sans-serif', color: '#333', textAlign: 'justify', marginBottom: '20px', lineHeight: '1.8' }}>
              Exceptionally designed amenities include a 3-level clubhouse, landscaped gardens, Olympic-size swimming pool, children&apos;s play area, gymnasium, indoor games area, multipurpose court, drive pathway, grand entrance lobby, ample parking, high-speed elevators, and more.
            </p>
            
            <p className="boldp" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="160" style={{ fontSize: '16px', fontFamily: '"Poppins", sans-serif', fontWeight: '700', color: '#333', marginBottom: '40px' }}>
              TATA Ghansoli New Launch, Navi Mumbai — Register Your Interest Today to access exclusive offers, new-launch pricing, and priority unit selection.
            </p>
            
            {/* Info Boxes */}
            <div 
              className="flex flex-col md:flex-row border border-[#d3be8a] rounded-2xl overflow-hidden bg-[#faf8f5]" 
              data-aos="fade-up" 
              data-aos-duration="1000" 
              data-aos-delay="200"
            >
              <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-[#d3be8a] flex flex-col justify-start">
                <h4 style={{ color: '#000242', fontSize: '16px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>💳 Priority Allotment EOI Amount</h4>
                <div style={{ color: '#c9a65a', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>2 & 3 BHK: ₹3 Lakhs</div>
                {/* <div style={{ color: '#c9a65a', fontSize: '18px', fontWeight: '700' }}>3 BHK: ₹3 Lakhs</div> */}
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-start">
                <h4 style={{ color: '#000242', fontSize: '16px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>💳 Priority Allotment EOI Amount</h4>
                <div style={{ color: '#c9a65a', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Jodi Residences: ₹5 Lakhs</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-5/12 mt-10 lg:mt-0" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
          <div className="image_caption_wrap relative">
            <img 
              src={overviewImage} 
              alt="Tata Orbis Overview" 
              className="w-full h-auto rounded-xl max-w-[550px] lg:max-w-none mx-auto object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
  )
}

export default Overview
