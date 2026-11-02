'use client'
import React, { useState } from 'react'
import { masterplanImages } from '../lib/images'

const plans = [
  { 
    label: '2 BHK Residence', 
    img: masterplanImages.bhk2,
    details: {
        // size: '1100 Sq.Ft',
        carpet: '751-770 SqFt'
    }
  },
  /*
  { 
    label: '3 BHK Type 1 (Comfort)', 
    img: masterplanImages.bhk3,
    details: {
        carpet: '1,040 Sq. Ft. (96.61 Sq. Mtr.)',
        apartment: '1,260 Sq. Ft. (117.05 Sq. Mtr.)',
        super: '1,450.00 Sq. Ft. (134.70 Sq. Mtr.)'
    }
  },
  */
  { 
    label: '3 BHK Residence', 
    img: masterplanImages.bhk45,
    details: {
        // size: '2210 Sq.Ft',
        carpet: '970-1165 SqFt'
    }
  },
]

const MasterPlan = ({ setIsOpen }) => {
  const [activeTab, setActiveTab] = useState('master')

  return (
    <section id="masterplan" className="relative py-20 bg-[#f4ebe4] overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center" data-aos="fade-up" data-aos-duration="1000">
          <h2
            className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif" }}
          >
            Site & Floor Plans
          </h2>
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-2 mb-8">
            <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
            <div className="w-2 h-2 rounded-full bg-[#7d9b93] mx-3"></div>
            <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center items-center">
            <button 
              onClick={() => setActiveTab('master')}
              className={`px-8 py-3 text-[17px] font-medium transition-all border border-[#000242] ${activeTab === 'master' ? 'bg-[#000242] text-white' : 'bg-transparent text-[#000242]'}`}
            >
              Master Plan
            </button>
            <button 
              onClick={() => setActiveTab('floor')}
              className={`px-8 py-3 text-[17px] font-medium transition-all border border-l-0 border-[#000242] ${activeTab === 'floor' ? 'bg-[#000242] text-white' : 'bg-transparent text-[#000242]'}`}
            >
              Floor Plan
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-[1100px] mx-auto">
          {activeTab === 'master' && (
            <div className="w-full max-w-[820px] mx-auto bg-white rounded-md overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.1)] p-4" data-aos="zoom-in" data-aos-duration="1000">
              <a onClick={() => setIsOpen && setIsOpen(true)} className="cursor-pointer block relative overflow-hidden group bg-[#fdfbf7]">
                <img 
                  src={masterplanImages.masterPlan} 
                  alt="Master Plan" 
                  className="w-full h-auto mx-auto filter blur-[6px] group-hover:blur-[3px] transition-all duration-300" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                  <span className="bg-[#000242] text-white px-7 py-4 text-[14px] sm:text-[15px] leading-snug font-semibold uppercase tracking-wider text-center shadow-md">
                    Download<br/>Master Plan
                  </span>
                </div>
              </a>
            </div>
          )}

          {activeTab === 'floor' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[820px] mx-auto">
              {plans.map((plan, idx) => (
                <div key={idx} className="bg-white rounded-md overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={idx * 100}>
                  <a onClick={() => setIsOpen && setIsOpen(true)} className="cursor-pointer block relative h-[260px] overflow-hidden group bg-[#fdfbf7] flex items-center justify-center p-4">
                    <img 
                      src={plan.img} 
                      alt={plan.label} 
                      className="w-full h-full object-contain filter blur-[6px] group-hover:blur-[3px] transition-all duration-300" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                      <span className="bg-[#000242] text-white px-5 py-3 text-[13px] leading-snug font-semibold uppercase tracking-wider text-center">
                        Download<br/>Floor Plans
                      </span>
                    </div>
                  </a>
                  <div className="p-6 text-center border-t border-gray-100 bg-white">
                    <h4 className="text-[22px] text-[#000242] font-semibold mb-4">{plan.label}</h4>
                    <p className="text-[15px] text-gray-600"><span className="font-semibold text-gray-800">Carpet Area </span>: {plan.details.carpet}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MasterPlan

