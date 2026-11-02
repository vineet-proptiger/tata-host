'use client'

const Highlights = () => {
  return (
    <section id="highlights" className="highlight_section">
      <style jsx>{`
        .highlight_section {
          position: relative;
          padding: 0;
          overflow: hidden;
        }
        
        .highlight_section .parallax {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-image: url('/images/highlights/highlight.webp');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
        }

        .highlight_section .container-fluid {
          position: relative;
          z-index: 2;
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
          margin: 0 auto;
        }

        .highlight_section .heading {
          color: #d3be8a;
          font-family: "Montserrat", sans-serif;
          font-size: 46px;
          font-weight: 500;
          line-height: 56px;
          text-transform: uppercase;
          letter-spacing: .02em;
          margin-bottom: 50px; /* Increased from 30px */
        }

        .highlight_section ul {
          padding-left: 0;
          list-style: none;
          margin: 0;
        }

        .highlight_section ul li {
          letter-spacing: 1px;
          font-weight: 400;
          font-size: 18px;
          line-height: 32px; /* Increased from 28px */
          margin-bottom: 28px; /* Increased from 20px */
          color: #f4ebe4;
          font-family: "Poppins", sans-serif;
          position: relative;
          padding-left: 50px; /* Increased from 44px */
        }

        .highlight_section ul li:before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 0;
          color: #f4ebe4;
          font-size: 20px;
          font-weight: 300;
        }

        .box_left, .box_right {
          padding: 8% 8%; /* Increased top/bottom from 5% to 8% */
        }

        .box_right {
          border-left: 1px solid #ffffff3b;
        }

        @media (max-width: 991px) {
          .highlight_section .heading {
            font-size: 32px;
            line-height: 40px;
          }
          .box_left, .box_right {
            padding: 40px 20px;
          }
          .box_right {
            border-left: none;
            border-top: 1px solid #ffffff3b;
          }
          .highlight_section ul li {
            font-size: 16px;
            line-height: 26px;
          }
        }
      `}</style>

      {/* Parallax Background with fixed attachment for layer effect */}
      <div className="parallax"></div>

      <div className="container-fluid max-w-[1300px] mx-auto relative z-10 py-[70px]">
        <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-[#d3be8a] text-center" data-aos="fade-up" data-aos-duration="1000" style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", marginBottom: '10px' }}>
          PROJECT HIGHLIGHTS & USPS
        </h2>
        {/* Decorative Line */}
        <div className="flex items-center justify-center mt-3 mb-8" data-aos="fade-up" data-aos-duration="1000">
          <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
          <div className="w-2 h-2 rounded-full bg-[#7d9b93] mx-3"></div>
          <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/20 rounded-[20px] mt-10" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" style={{ position: 'relative' }}>
          
          {/* Corner Accents */}
          <div style={{ position: 'absolute', top: -1, left: -1, width: '24px', height: '24px', borderTop: '1.5px solid #d3be8a', borderLeft: '1.5px solid #d3be8a', borderTopLeftRadius: '20px' }}></div>
          <div style={{ position: 'absolute', top: -1, right: -1, width: '24px', height: '24px', borderTop: '1.5px solid #d3be8a', borderRight: '1.5px solid #d3be8a', borderTopRightRadius: '20px' }}></div>
          <div style={{ position: 'absolute', bottom: -1, left: -1, width: '24px', height: '24px', borderBottom: '1.5px solid #d3be8a', borderLeft: '1.5px solid #d3be8a', borderBottomLeftRadius: '20px' }}></div>
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: '24px', height: '24px', borderBottom: '1.5px solid #d3be8a', borderRight: '1.5px solid #d3be8a', borderBottomRightRadius: '20px' }}></div>          {/* Item 1 */}
          <div className="p-10 border-b lg:border-b border-white/20 lg:border-r flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#d3be8a' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-6"></path>
                <path d="M17 8C17 4.5 14.5 2 12 2S7 4.5 7 8c-2.5 0-4.5 2-4.5 4.5 0 2 1.5 3.5 3.5 3.5h12c2 0 3.5-1.5 3.5-3.5C21.5 10 19.5 8 17 8z"></path>
              </svg>
            </div>
            <h3 className="text-[#d3be8a] font-bold text-[15px] uppercase tracking-wider mb-3">47.5-ACRES DEVELOPMENT</h3>
            <p className="text-white/80 text-[14px] leading-relaxed">Thoughtfully Planned Landmark Development Spread Over 47.5 Acres</p>
          </div>

          {/* Item 2 */}
          <div className="p-10 border-b lg:border-b border-white/20 lg:border-r flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#d3be8a' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="9" y1="22" x2="15" y2="22"></line>
                <line x1="8" y1="6" x2="8" y2="6"></line>
                <line x1="16" y1="6" x2="16" y2="6"></line>
                <line x1="12" y1="6" x2="12" y2="6"></line>
                <line x1="8" y1="10" x2="8" y2="10"></line>
                <line x1="16" y1="10" x2="16" y2="10"></line>
                <line x1="12" y1="10" x2="12" y2="10"></line>
                <line x1="8" y1="14" x2="8" y2="14"></line>
                <line x1="16" y1="14" x2="16" y2="14"></line>
                <line x1="12" y1="14" x2="12" y2="14"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
              </svg>
            </div>
            <h3 className="text-[#d3be8a] font-bold text-[15px] uppercase tracking-wider mb-3">2, 3 BHK &amp; JODI HOMES</h3>
            <p className="text-white/80 text-[14px] leading-relaxed">Luxury 2 BHK, 3 BHK, And Jodi Apartments Across 7 Iconic G+36 Towers</p>
          </div>

          {/* Item 3 */}
          <div className="p-10 border-b lg:border-b border-white/20 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#d3be8a' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <h3 className="text-[#d3be8a] font-bold text-[15px] uppercase tracking-wider mb-3">3-LEVEL CLUBHOUSE</h3>
            <p className="text-white/80 text-[14px] leading-relaxed">Exceptionally Designed 3-Level Clubhouse With Curated Amenities</p>
          </div>

          {/* Item 4 */}
          <div className="p-10 border-b md:border-b-0 lg:border-r border-white/20 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#d3be8a' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M8 11l4-3 4 3v4h-8v-4z"></path>
              </svg>
            </div>
            <h3 className="text-[#d3be8a] font-bold text-[15px] uppercase tracking-wider mb-3">BEE 4-STAR APPROVED</h3>
            <p className="text-white/80 text-[14px] leading-relaxed">Entire Development Is BEE 4-Star Approved For Sustainable Living</p>
          </div>

          {/* Item 5 */}
          <div className="p-10 border-b md:border-b-0 lg:border-r border-white/20 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#d3be8a' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <h3 className="text-[#d3be8a] font-bold text-[15px] uppercase tracking-wider mb-3">TAJ HOTEL HOSPITALITY</h3>
            <p className="text-white/80 text-[14px] leading-relaxed">Exclusive Hospitality Project Introducing The Luxurious Taj Hotel</p>
          </div>

          {/* Item 6 */}
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#d3be8a' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
                <path d="M12 14v4"></path>
                <path d="M10 16h4"></path>
              </svg>
            </div>
            <h3 className="text-[#d3be8a] font-bold text-[15px] uppercase tracking-wider mb-3">OLYMPIC-SIZE POOL &amp; MORE</h3>
            <p className="text-white/80 text-[14px] leading-relaxed">Olympic-Size Pool, Gymnasium, Multipurpose Court &amp; Grand Entrance Lobby</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Highlights
