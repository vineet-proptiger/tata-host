'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { galleryImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const ArcIcon = () => (
  <svg width="28" height="14" viewBox="0 0 28 14" fill="none"
    style={{ display: 'inline-block', marginRight: '10px', verticalAlign: 'middle', marginBottom: '3px' }}>
    <path d="M2 12 Q14 2 26 12" stroke="#684C1B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
)

const Gallery = ({ setIsOpen }) => {
  const [showAll, setShowAll] = useState(false)
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedImgIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImgIndex(null)
      if (e.key === 'ArrowRight') setSelectedImgIndex((prev) => (prev + 1) % galleryImages.length)
      if (e.key === 'ArrowLeft') setSelectedImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImgIndex])

  const openLightbox = (imgSrc) => {
    const idx = galleryImages.findIndex(img => img.src === imgSrc)
    setSelectedImgIndex(idx !== -1 ? idx : 0)
  }

  const nextLightboxImg = (e) => {
    e.stopPropagation()
    setSelectedImgIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevLightboxImg = (e) => {
    e.stopPropagation()
    setSelectedImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Show first 8 images initially, show all 14 if showAll is true
  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 8)

  return (
    <section id="gallery" style={{
      padding: '72px 0',
      background: '#fff',
    }}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">

        {/* ── Header Row ── */}
        <div className="flex flex-col items-center justify-center mb-10" data-aos="fade-down" data-aos-duration="1000">
          <div className="flex items-center justify-center">
            <h2
              className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900 text-center"
              style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", margin: 0 }}
            >
              TATA ORBIS GALLERY
            </h2>
          </div>
        </div>

        {/* ── Image Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-500 ease-in-out">
          {visibleImages.map((img, idx) => (
            <div 
              key={idx}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay={(idx % 4) * 150}
              className="relative w-full cursor-pointer group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300" 
              style={{ aspectRatio: '16/9', background: '#eee' }}
              onClick={() => openLightbox(img.src)}
            >
              <Image 
                src={img.src} 
                alt={img.alt || 'Gallery Image'} 
                fill 
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              {/* Premium hover overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-5"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                }}
              >
                <span 
                  className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  style={{ 
                    color: '#fff', 
                    fontFamily: F_JOST, 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    letterSpacing: '0.08em', 
                    textTransform: 'uppercase' 
                  }}
                >
                  {img.alt ? img.alt.replace('Tata Orbis - ', '') : 'VIEW PREVIEW'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Show More / Less Button ── */}
        {galleryImages.length > 8 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                fontFamily: F_JOST,
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                color: '#684C1B',
                border: '1px solid #D5C2A8',
                padding: '14px 36px',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#684C1B'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#684C1B'
              }}
            >
              {showAll ? 'SHOW LESS' : 'VIEW ALL GALLERY'}
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}
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
            {selectedImgIndex + 1} / {galleryImages.length}
          </div>

          {/* Center Content */}
          <div className="relative w-full max-w-[90vw] max-h-[80vh] flex flex-col items-center justify-center">
            <img 
              src={galleryImages[selectedImgIndex].src} 
              alt={galleryImages[selectedImgIndex].alt || 'Gallery Preview'} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl transition-all duration-300 rounded"
              onClick={(e) => e.stopPropagation()} 
            />
            {/* Alt Text Caption */}
            <div 
              className="mt-4 text-center text-white/80 text-xs md:text-sm tracking-wide max-w-[80vw]"
              style={{ fontFamily: F_JOST }}
            >
              {galleryImages[selectedImgIndex].alt}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
