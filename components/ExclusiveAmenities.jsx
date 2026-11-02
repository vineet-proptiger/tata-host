'use client'
import React from 'react'
import { Dumbbell, Waves, Utensils } from 'lucide-react'

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

const CurvedCorners = ({ bg = '#F4F0E6', color = '#dcdfe4' }) => {
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

const exclusiveItems = [
  { icon: Dumbbell, title: 'GYM', desc: 'Stay fit at the gym with modern equipment and energizing vibes.' },
  { icon: Waves, title: 'LAP POOL', desc: 'A sleek lap pool designed for uninterrupted, refreshing swims.' },
  { icon: Utensils, title: 'PDR DINING', desc: 'Private Dining Room for intimate, exclusive dining.' },
]

const ExclusiveAmenities = () => {
  return (
    <section id="exclusive-amenities" style={{
      padding: '72px 0',
      background: '#F4F0E6',
    }}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1100px]">

        {/* Section Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }} data-aos="fade-up">
          <h2
            className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900 text-center"
            style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", margin: 0 }}
          >
            EXCLUSIVE TO FOREST RESERVE
          </h2>
        </div>

        {/* Grid Container */}
        <div data-aos="fade-up" data-aos-delay="100" style={{
          position: 'relative',
          border: '1px solid #dcdfe4',
          margin: '0 auto',
        }}>
          <CurvedCorners color="#dcdfe4" bg="#F4F0E6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#dcdfe4]">
            {exclusiveItems.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group" style={{
                background: '#F4F0E6',
                padding: '56px 24px',
                textAlign: 'center',
              }}>
                {/* Icon */}
                <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-105 transition-transform duration-300" style={{ background: '#C9A96E' }}>
                  <item.icon size={36} strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 style={{
                  fontFamily: F_JOST, fontSize: '15px', fontWeight: '600',
                  color: '#684C1B', letterSpacing: '0.12em', margin: '0 0 12px'
                }}>
                  {item.title}
                </h3>
                
                {/* Description */}
                <p style={{
                  fontFamily: F_SANS, fontSize: '13px', color: '#6b7280',
                  lineHeight: 1.6, margin: 0,
                  maxWidth: '260px'
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default ExclusiveAmenities
