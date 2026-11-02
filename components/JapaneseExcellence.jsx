'use client'
import React from 'react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const ArcIcon = () => (
  <svg
    width="28" height="14" viewBox="0 0 28 14" fill="none"
    style={{ display: 'inline-block', marginRight: '10px', verticalAlign: 'middle', marginBottom: '3px' }}
  >
    <path d="M2 12 Q14 2 26 12" stroke="#684C1B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
)

const CurvedCorners = ({ bg = '#EAE5DC', color = '#D5C2A8' }) => {
  const corners = [
    { top: '-1px', left: '-1px', borderRight: `1px solid ${color}`, borderBottom: `1px solid ${color}`, borderBottomRightRadius: '18px' },
    { top: '-1px', right: '-1px', borderLeft: `1px solid ${color}`, borderBottom: `1px solid ${color}`, borderBottomLeftRadius: '18px' },
    { bottom: '-1px', left: '-1px', borderRight: `1px solid ${color}`, borderTop: `1px solid ${color}`, borderTopRightRadius: '18px' },
    { bottom: '-1px', right: '-1px', borderLeft: `1px solid ${color}`, borderTop: `1px solid ${color}`, borderTopLeftRadius: '18px' },
  ]
  return corners.map((c, i) => (
    <span key={i} style={{ position: 'absolute', ...c, width: '22px', height: '22px', background: bg, display: 'block' }} />
  ))
}

const excellenceItems = [
  "JAPANESE ARCHITECTURAL DESIGNER: NIKKEN SEKKEI, NO. 1 ARCHITECTS IN JAPAN",
  "JAPANESE INTERIOR DESIGNER: A.N.D, NOMURA CO. LTD.",
  "JAPANESE PROJECT MANAGEMENT: NIKKEN SEKKEI CONSTRUCTION MANAGEMENT, INC.",
  "JAPANESE QUALITY CONTROL: NIKKEN SEKKEI CONSTRUCTION MANAGEMENT, INC."
]

const JapaneseExcellence = () => {
  return (
    <section id="japanese-excellence" style={{
      padding: '72px 0',
      background: '#EAE5DC', // Match the beige background
    }}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1100px] relative z-10">

        {/* Section Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }} data-aos="fade-up">
          <h2
            className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900 text-center"
            style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", margin: 0 }}
          >
            CRAFTED BY JAPANESE EXCELLENCE
          </h2>
          <p style={{
            fontFamily: F_SANS,
            fontSize: '15px',
            color: '#6b7280',
            marginTop: '12px',
            marginBottom: '0'
          }}>
            Need we say more?
          </p>
        </div>

        {/* Grid Container */}
        <div data-aos="fade-up" data-aos-delay="100" style={{
          position: 'relative',
          border: '1px solid #D5C2A8',
          margin: '0 auto',
        }}>
          <CurvedCorners color="#D5C2A8" bg="#EAE5DC" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#D5C2A8]">
            {excellenceItems.map((item, idx) => (
              <div key={idx} className="flex flex-col justify-center" style={{
                background: '#EAE5DC',
                padding: '36px 32px',
              }}>
                <h3 style={{
                  fontFamily: F_JOST, fontSize: '12.5px', fontWeight: '600',
                  color: '#958266', letterSpacing: '0.12em', margin: 0,
                  lineHeight: '1.6', textTransform: 'uppercase'
                }}>
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default JapaneseExcellence
