'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const CarouselSection = ({ setIsOpen, title = "Glimpses of Masterpiece", subtitle = "", id = "homes-designed", images = [] }) => {
  const [index, setIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)
  const [userInteracted, setUserInteracted] = useState(0)

  const numItems = images?.length || 0;
  const extendedImages = numItems > 0 ? [
    images[numItems - 1],
    ...images,
    images[0],
    images[1] || images[0],
    images[2] || images[0]
  ].filter(Boolean) : [];

  const getRealIndex = (idx) => {
    if (idx === 0) return numItems - 1;
    if (idx >= numItems + 1) return (idx - 1) % numItems;
    return idx - 1;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedImgIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImgIndex(null)
      if (e.key === 'ArrowRight') setSelectedImgIndex((prev) => (prev + 1) % (images?.length || 1))
      if (e.key === 'ArrowLeft') setSelectedImgIndex((prev) => (prev - 1 + (images?.length || 1)) % (images?.length || 1))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImgIndex, images?.length])

  const nextLightboxImg = (e) => {
    e.stopPropagation()
    setSelectedImgIndex((prev) => (prev + 1) % (images?.length || 1))
  }

  const prevLightboxImg = (e) => {
    e.stopPropagation()
    setSelectedImgIndex((prev) => (prev - 1 + (images?.length || 1)) % (images?.length || 1))
  }

  const nextSlide = () => {
    if (!isTransitioning) return;
    setIndex((prev) => {
      if (prev >= numItems + 1) return prev;
      return prev + 1;
    });
    setUserInteracted(Date.now());
  }

  const prevSlide = () => {
    if (!isTransitioning) return;
    setIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
    setUserInteracted(Date.now());
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev >= numItems + 1) return prev;
        return prev + 1;
      });
    }, 4000); // Autoplay every 4s
    return () => clearInterval(timer);
  }, [userInteracted, numItems]);

  // Handle the seamless jump
  useEffect(() => {
    let timeout;
    if (index === 0) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(numItems);
      }, 700);
    } else if (index === numItems + 1) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(1);
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [index, numItems]);

  // Re-enable transition after jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  if (!images || images.length === 0) return null;

  return (
    <section id={id} style={{
      scrollMarginTop: '80px',
      padding: '42px 0 72px 0',
      background: '#f9f9f9',
      color: '#121212',
      fontFamily: '"Montserrat", var(--font-montserrat), sans-serif',
      fontSize: '15px',
      lineHeight: '150%',
      margin: 0,
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progressLine {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .carousel-main-heading {
          color: #000242 !important;
          font-family: "Montserrat", var(--font-montserrat), sans-serif !important;
          font-size: 46px !important;
          font-weight: 500 !important;
          line-height: 56px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.02em !important;
          margin-bottom: 0 !important;
          text-align: center !important;
        }
        @media (max-width: 991px) {
          .carousel-main-heading {
            font-size: 32px !important;
            line-height: 40px !important;
          }
        }
        @media (max-width: 575px) {
          .carousel-main-heading {
            font-size: 24px !important;
            line-height: 32px !important;
          }
        }
        .carousel-sub-heading {
          color: #71717a !important;
          font-family: "Poppins", var(--font-poppins), sans-serif !important;
          font-size: 18px !important;
          text-align: center !important;
          margin-top: 12px !important;
          margin-bottom: 0 !important;
          font-weight: 400 !important;
          letter-spacing: 0.5px !important;
        }
        @media (max-width: 991px) {
          .carousel-sub-heading {
            font-size: 16px !important;
          }
        }
        @media (max-width: 575px) {
          .carousel-sub-heading {
            font-size: 15px !important;
            margin-top: 8px !important;
          }
        }
      `}} />
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">

        <div className="text-center mb-10 md:mb-12" data-aos="fade-up" data-aos-duration="1000">
          <h2
            className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900 mx-auto"
            style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif" }}
          >
            {title}
          </h2>
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-4 mb-3">
            <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
            <div className="w-2 h-2 rounded-full bg-[#7d9b93] mx-3"></div>
            <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
          </div>
        </div>

        {/* ── Main Sliding Track Gallery (Premium & Zero-Flash) ── */}
        <div className="relative w-full overflow-hidden rounded-lg carousel-container">
          <style dangerouslySetInnerHTML={{ __html: `
            .carousel-container { --slide-w: 100%; }
            @media (min-width: 768px) { .carousel-container { --slide-w: 65%; } }
          `}} />
          <div 
            className={`flex w-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ 
              transform: `translateX(calc(-${index} * (var(--slide-w) + 16px)))`,
              willChange: 'transform',
              gap: '16px'
            }}
          >
            {extendedImages.map((img, idx) => (
              <div 
                key={idx} 
                className="relative flex-shrink-0 group overflow-hidden bg-gray-200 cursor-pointer"
                style={{ width: 'var(--slide-w)', aspectRatio: '16/9' }}
                onClick={() => setSelectedImgIndex(getRealIndex(idx))}
              >
                <Image
                  src={img.src || img.img}
                  alt={img.alt || img.title || img.label || `Gallery Image ${idx + 1}`}
                  fill
                  priority={idx === 0 || idx === 1 || Math.abs(idx - index) <= 1} // Preload active and adjacent images for instant rendering
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 900px"
                  className={`object-cover select-none pointer-events-none transition-transform duration-[6000ms] ease-out ${getRealIndex(idx) === getRealIndex(index) ? 'scale-110' : 'scale-100'}`}
                />
                
                {/* Image Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 lg:p-10 pb-5 md:pb-10 flex flex-col justify-end"
                     style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)', minHeight: '40%' }}>
                    <h3 
                      className="text-white text-base md:text-2xl font-bold mb-1 tracking-wide" 
                      style={{ 
                        fontFamily: F_JOST,
                        opacity: getRealIndex(idx) === getRealIndex(index) ? 1 : 0,
                        transform: getRealIndex(idx) === getRealIndex(index) ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.3s'
                      }}
                    >
                      {img.title || img.label}
                    </h3>
                    
                    {/* Progress Bar Container */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-white/20">
                      {getRealIndex(idx) === getRealIndex(index) && (
                        <div 
                          className="h-full bg-white" 
                          style={{
                            width: '100%',
                            animation: 'progressLine 4s linear forwards'
                          }}
                        />
                      )}
                    </div>
                </div>

                {/* Vertical Text */}
                <div 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-xs tracking-widest hidden md:block" 
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  Artistic Impression
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Arrows ── */}
        <div className="flex items-center gap-3 mt-6 ml-2">
          <button onClick={prevSlide} className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-200 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button onClick={nextSlide} className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-200 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

      </div>

      {/* ── Lightbox Modal ── */}
      {selectedImgIndex !== null && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImgIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-[10000] p-2 bg-black/40 rounded-full"
            onClick={() => setSelectedImgIndex(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Left Arrow */}
          <button 
            className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-[10000] p-2 bg-black/40 rounded-full"
            onClick={prevLightboxImg}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Right Arrow */}
          <button 
            className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-[10000] p-2 bg-black/40 rounded-full"
            onClick={nextLightboxImg}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Image Counter */}
          <div 
            className="absolute top-6 left-6 text-white/70 font-medium tracking-widest text-xs p-2 bg-black/40 rounded"
            style={{ fontFamily: F_JOST }}
          >
            {selectedImgIndex + 1} / {images?.length || 0}
          </div>

          {/* Center Content */}
          <div className="relative w-full max-w-[90vw] max-h-[80vh] flex flex-col items-center justify-center">
            <img 
              src={images[selectedImgIndex]?.src || images[selectedImgIndex]?.img} 
              alt={images[selectedImgIndex]?.alt || images[selectedImgIndex]?.title || images[selectedImgIndex]?.label || 'Gallery Preview'} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl transition-all duration-300 rounded"
              onClick={(e) => e.stopPropagation()} 
            />
            {/* Alt Text Caption */}
            <div 
              className="mt-4 text-center text-white/80 text-xs md:text-sm tracking-wide max-w-[80vw]"
              style={{ fontFamily: F_JOST }}
            >
              {images[selectedImgIndex]?.alt || images[selectedImgIndex]?.title || images[selectedImgIndex]?.label}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CarouselSection
