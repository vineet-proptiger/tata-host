'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Phone, MessageSquare } from 'lucide-react'
import { galleryImages, amenityImages } from '../lib/images'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Overview = dynamic(() => import('../components/Overview'), { ssr: true })
// const Projects = dynamic(() => import('../components/Projects'), { ssr: true })
const Highlights = dynamic(() => import('../components/Highlights'), { ssr: true })
const Amenities = dynamic(() => import('../components/Amenities'), { ssr: true })
const Pricing = dynamic(() => import('../components/Pricing'), { ssr: true })
const Location = dynamic(() => import('../components/Location'), { ssr: true })
const MasterPlan = dynamic(() => import('../components/MasterPlan'), { ssr: true })
// const PaymentPlan = dynamic(() => import('../components/PaymentPlan'), { ssr: true })
const AboutDeveloper = dynamic(() => import('../components/AboutDeveloper'), { ssr: true })
const QuickChat = dynamic(() => import('../components/QuickChat'), { ssr: true })
const Footer = dynamic(() => import('../components/Footer'), { ssr: true })

const Gallery = dynamic(() => import('../components/Gallery'), { ssr: false })
// const VirtualTour = dynamic(() => import('../components/VirtualTour'), { ssr: false })
const CarouselSection = dynamic(() => import('../components/CarouselSection'), { ssr: false })
// const ExclusiveAmenities = dynamic(() => import('../components/ExclusiveAmenities'), { ssr: false })
// const Sustainability = dynamic(() => import('../components/Sustainability'), { ssr: false })
// const JapaneseExcellence = dynamic(() => import('../components/JapaneseExcellence'), { ssr: false })
const EnquireModal = dynamic(() => import('../components/EnquireModal'), { ssr: false })
const AosInit = dynamic(() => import('../components/AosInit'), { ssr: false })

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="relative min-h-screen bg-white">
      <AosInit />
      <Navbar setIsOpen={setIsOpen} />
      <Hero setIsOpen={setIsOpen} />
      <Overview setIsOpen={setIsOpen} />
      {/* <Amenities setIsOpen={setIsOpen} /> */}
      <CarouselSection 
        setIsOpen={setIsOpen} 
        title="Where Every View Tells a Story" 
        id="gallery" 
        images={galleryImages} 
      />
      <CarouselSection 
        setIsOpen={setIsOpen} 
        title="Indulge in a Lifestyle Beyond Ordinary" 
        id="amenities" 
        images={amenityImages} 
      />
      {/* <ExclusiveAmenities /> */}
      <Pricing setIsOpen={setIsOpen} />
      <Highlights setIsOpen={setIsOpen} />
      {/* <Gallery setIsOpen={setIsOpen} /> */}
      {/* <Projects setIsOpen={setIsOpen} /> */}
      <Location />
      {/* <Sustainability /> */}
      {/* <JapaneseExcellence /> */}
      <MasterPlan setIsOpen={setIsOpen} />
      {/* <PaymentPlan setIsOpen={setIsOpen} /> */}
      <AboutDeveloper setIsOpen={setIsOpen} />
      {/* <VirtualTour setIsOpen={setIsOpen} /> */}
      {/* <QuickChat /> */}
      <Footer />
      <EnquireModal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Floating Vertical Enquire Tab — Desktop only */}
      <div 
        className="hidden lg:flex fixed z-50 cursor-pointer text-white uppercase text-[14px] leading-[20px] font-normal tracking-[0.4px] whitespace-nowrap bg-[#000242] items-center justify-center gap-[6px] hover:bg-white hover:text-[#000242] transition-colors duration-300"
        style={{
          top: '50%',
          right: '10px',
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
          borderRadius: '50px',
          padding: '18px 11px', /* Swapped from 11px 18px because of vertical-rl */
          boxShadow: '0 0 12px 0 rgba(0,0,0,0.15)' /* Adjusted shadow for light background visibility */
        }}
        onClick={() => setIsOpen(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(90deg)' }}>
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
        ENQUIRE NOW
      </div>      {/* Mobile Sticky Bottom Bar with Behavioral Micro-Animations */}
      <style jsx global>{`
        @keyframes phoneRingVibe {
          0%, 60%, 100% { transform: rotate(0) scale(1); }
          5%, 15%, 25%, 35%, 45%, 55% { transform: rotate(-18deg) scale(1.18); }
          10%, 20%, 30%, 40%, 50% { transform: rotate(18deg) scale(1.18); }
        }
        .animate-phone-ring {
          animation: phoneRingVibe 2.8s infinite ease-in-out;
          display: inline-block;
          transform-origin: center;
        }
        @keyframes whatsappGlow {
          0% { box-shadow: 0 0 0 0 rgba(44, 211, 111, 0.7); transform: scale(1); }
          40% { box-shadow: 0 0 0 9px rgba(44, 211, 111, 0); transform: scale(1.04); }
          80%, 100% { box-shadow: 0 0 0 0 rgba(44, 211, 111, 0); transform: scale(1); }
        }
        .btn-whatsapp-glow {
          animation: whatsappGlow 2.4s infinite ease-in-out;
        }
        @keyframes enquireFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.12); }
        }
        .animate-enquire-icon {
          animation: enquireFloat 2.2s infinite ease-in-out;
        }
      @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .animate-gentle-pulse {
          animation: gentlePulse 2s infinite ease-in-out;
        }
      `}</style>
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex shadow-[0_-4px_15px_rgba(0,0,0,0.1)] md:hidden">
        {/* WhatsApp - Left */}
        <a 
          href="https://wa.me/919560582493?text=Hi%2C%20I%20am%20interested%20in%20Tata%20Orbis%20Ghansoli" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 bg-[#25D366] text-white py-2.5 flex flex-col items-center justify-center gap-1 hover:bg-[#20bd5a] transition-colors"
        >
          <svg className="animate-gentle-pulse" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-[12px] font-medium tracking-wide">WhatsApp</span>
        </a>

        {/* Enquire Now - Middle */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="flex-1 bg-[#dfb557] text-[#111827] py-2.5 flex flex-col items-center justify-center gap-1 hover:brightness-105 transition-all"
        >
          <MessageSquare size={20} className="text-[#111827] animate-gentle-pulse" />
          <span className="text-[12px] font-bold tracking-wider uppercase">Enquire Now</span>
        </button>

        {/* Call Now - Right */}
        <a 
          href="tel:+919718344024" 
          className="flex-1 bg-[#0096FF] text-white py-2.5 flex flex-col items-center justify-center gap-1 hover:bg-[#0080FF] transition-colors"
        >
          <Phone size={20} className="text-white animate-phone-ring" />
          <span className="text-[12px] font-medium tracking-wide">Call Now</span>
        </a>
      </div>

      <div className="h-10 lg:hidden" />
    </main>
  )
}
