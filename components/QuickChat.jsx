'use client'
import React from 'react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'


export default function QuickChat() {
  return (
    <section className="py-8 md:py-16 px-0 bg-white">
      <div className="container mx-auto px-1 sm:px-4 md:px-8 max-w-[1200px]">
        {/* Section Header */}
        <div className="px-4" style={{ marginBottom: '40px', textAlign: 'center' }} data-aos="fade-up">
          <span style={{
            display: "inline-block", padding: "4px 16px",
            background: "var(--color-gold-bg)", borderRadius: "50px",
            fontSize: "11px", fontWeight: "700", color: "var(--color-gold)",
            fontFamily: "var(--font-jost), Montserrat, sans-serif",
            letterSpacing: "0.1em", textTransform: "uppercase",
            border: "1px solid var(--color-gold-light)", marginBottom: "14px",
          }}>
            QUICK CONNECT
          </span>
          <h2
            className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900 text-center flex items-center justify-center flex-wrap"
            style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", margin: 0 }}
          >
            Reply in one tap — get it on WhatsApp
          </h2>
        </div>

        <div 
          className="max-w-[680px] mx-auto w-full transition-all duration-700 opacity-100 translate-y-0"
          style={{ fontFamily: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
          data-aos="fade-up" data-aos-delay="100"
        >
        <div className="bg-[#e7e1d5] rounded-2xl overflow-hidden shadow-lg border border-black/5">
          {/* Header */}
          <div className="bg-[#005B4F] text-white px-3 py-2.5 sm:px-4 sm:py-3 flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#A17A43] flex items-center justify-center text-[#151515] font-semibold text-lg shrink-0">
              T
            </div>
            <div className="ml-3 flex flex-col">
              <strong className="text-[14px] sm:text-[15px] font-semibold leading-tight">Tata Orbis</strong>
              <div className="flex items-center text-[10px] sm:text-[11px] text-white/80 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] mr-1.5"></span>
                typically replies in &lt;5 min
              </div>
            </div>
            <div className="ml-auto shrink-0">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.55 4.13 1.6 5.93L2 22l4.34-1.14a9.9 9.9 0 0 0 5.7 1.81c5.46 0 9.91-4.45 9.91-9.91A9.83 9.83 0 0 0 19 4.91 9.83 9.83 0 0 0 12.04 2zm5.83 14.04c-.24.66-1.43 1.27-1.98 1.31-.5.04-1.13.21-1.91-.12-3.81-1.55-6.28-5.34-6.47-5.59-.19-.25-1.55-2.06-1.55-3.93s.98-2.79 1.33-3.17c.34-.38.75-.48 1.01-.48s.49.01.7.02c.23.01.54-.09.84.64.31.74 1.04 2.56 1.13 2.75.09.19.15.41.03.66-.12.25-.18.41-.36.62-.19.21-.39.46-.56.62-.19.19-.39.39-.17.77.22.38 1 1.65 2.15 2.67 1.47 1.3 2.71 1.71 3.09 1.9.38.19.6.16.82-.09.22-.25.94-1.1 1.19-1.48.25-.38.5-.32.84-.19.34.13 2.17 1.02 2.55 1.21.37.19.62.28.71.44.09.16.09.92-.15 1.58z"></path>
              </svg>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-3 sm:p-5 flex flex-col gap-3 sm:gap-4">
            <div className="bg-white text-[#151515] text-[13px] sm:text-[14px] px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl rounded-tl-sm w-fit shadow-sm max-w-[85%] self-start">
              Hi 👋 What would you like to know about Tata Orbis?
            </div>
            
            <div className="flex flex-wrap justify-start gap-1.5 sm:gap-2.5">
              {[
                {text: "💰 Current price band", link: "https://wa.me/919718344024?text=Hi%2C%20I%20want%20the%20current%20price%20band%20for%20Tata%20Orbis%20Ghansoli."},
                {text: "📄 2, 3 BHK & Jodi floor plans", link: "https://wa.me/919718344024?text=Hi%2C%20please%20send%20me%20the%202%2C%203%20BHK%20and%20Jodi%20floor%20plans%20for%20Tata%20Orbis."},
                {text: "🚗 Book a site visit", link: "https://wa.me/919718344024?text=Hi%2C%20I%20want%20to%20book%20a%20site%20visit%20for%20Tata%20Orbis%20Ghansoli."},
                {text: "🌍 NRI investment guide", link: "https://wa.me/919718344024?text=Hi%2C%20I%20am%20an%20NRI%20buyer%20%E2%80%94%20please%20share%20the%20Tata%20Orbis%20NRI%20investment%20guide."},
                {text: "📐 Payment plan", link: "https://wa.me/919718344024?text=Hi%2C%20please%20share%20the%20Tata%20Orbis%20payment%20plan%20and%20installment%20schedule."},
                {text: "📄 Send brochure (PDF)", link: "https://wa.me/919718344024?text=Hi%2C%20please%20share%20the%20Tata%20Orbis%20brochure%20and%20official%20PDF."},
                {text: "📞 Request a callback", link: "https://wa.me/919718344024?text=Hi%2C%20please%20schedule%20a%20callback%20for%20Tata%20Orbis%20Ghansoli."}
              ].map((pill, i) => (
                <a key={i} href={pill.link} target="_blank" rel="noopener noreferrer" 
                   className="bg-white text-[#005B4F] text-[10.5px] sm:text-[13px] font-medium px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full border border-[#25D366] shadow-sm hover:bg-[#005B4F] hover:text-white hover:border-[#005B4F] hover:shadow-md transition-all duration-300 whitespace-nowrap">
                  {pill.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
