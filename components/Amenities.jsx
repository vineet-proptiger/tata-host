'use client'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { amenityImages } from '../lib/images'

// Tripled array buffer guarantees React-Slick never runs out of clones and loops forward infinitely without ever rewinding back
const extendedAmenities = [...amenityImages, ...amenityImages, ...amenityImages]
const amenitiesList = extendedAmenities.map(item => ({
  img: item.src || item.img,
  title: item.title || item.label
}))

const Amenities = () => {
  const headingRef = useRef(null)
  const sliderRef = useRef(null)
  const [selectedAmenity, setSelectedAmenity] = useState(null)
  const [isSliderReady, setIsSliderReady] = useState(false)

  useEffect(() => {
    // React-Slick measures its container when it mounts. Rendering it only after
    // hydration prevents a zero-width track in the production mobile build.
    setIsSliderReady(true)

    // Recalculate after hydration and after the browser has established the viewport width.
    // This is important for mobile Safari, where Slick can initialise before its track has a width.
    // Extra late triggers (2.5s, 4s) handle production builds where CSS chunks load asynchronously.
    const t1 = setTimeout(() => {
      if (sliderRef.current) sliderRef.current.slickGoTo(0, true);
      window.dispatchEvent(new Event('resize'));
    }, 100);
    const t2 = setTimeout(() => window.dispatchEvent(new Event('resize')), 600);
    const t3 = setTimeout(() => window.dispatchEvent(new Event('resize')), 1500);
    const t4 = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (sliderRef.current) sliderRef.current.slickGoTo(0, true);
    }, 2500);
    const t5 = setTimeout(() => window.dispatchEvent(new Event('resize')), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  useEffect(() => {
    let frameId = null

    const updateTextFill = () => {
      frameId = null

      if (!headingRef.current) return

      const rect = headingRef.current.getBoundingClientRect()
      const scrollDistance = window.innerHeight * 1.15
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / scrollDistance)
      )

      headingRef.current.style.setProperty(
        '--fill-progress',
        `${progress * 100}%`
      )
    }

    const requestFillUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateTextFill)
      }
    }

    updateTextFill()
    window.addEventListener('scroll', requestFillUpdate, { passive: true })
    window.addEventListener('resize', requestFillUpdate)

    return () => {
      window.removeEventListener('scroll', requestFillUpdate)
      window.removeEventListener('resize', requestFillUpdate)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    if (!selectedAmenity) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedAmenity(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedAmenity])

  const settings = {
    dots: false,
    infinite: true,
    // Every card has a fixed aspect ratio. Letting Slick measure image height during
    // loading can collapse the track on smaller devices.
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 900,
    cssEase: 'cubic-bezier(0.25, 1, 0.5, 1)',
    pauseOnHover: true,
    swipeToSlide: true,
    initialSlide: 0,
    slidesToScroll: 1,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '330px',
    arrows: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          centerPadding: '270px',
        }
      },
      {
        breakpoint: 1450,
        settings: {
          centerPadding: '230px',
        }
      },
      {
        breakpoint: 1200,
        settings: {
          centerPadding: '180px',
        }
      },
      {
        breakpoint: 991,
        settings: {
          centerPadding: '90px',
        }
      },
      {
        breakpoint: 767,
        settings: {
          centerMode: false,
          centerPadding: '0px',
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 420,
        settings: {
          centerMode: false,
          centerPadding: '0px',
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="orizen-amenities-wrap" id="amenities">
      <style jsx global>{`
        .orizen-amenities-wrap {
          background: #f4ebe4;
          padding: 80px 0;
          overflow: hidden;
          font-family: "Poppins", sans-serif;
        }

        .dimension_section {
          text-align: center;
          margin-bottom: 50px;
          overflow: hidden;
          padding: 0 15px;
        }

        .scroll_text {
          font-size: clamp(32px, 7vw, 150px);
          font-weight: 700;
          text-transform: capitalize;
          color: transparent;
          -webkit-text-stroke: 1px #d3be8a;
          margin: 0;
          line-height: 1.2;
          font-family: "Montserrat", sans-serif;
          letter-spacing: -1px;
        }

        .fill_text {
          background: linear-gradient(
            90deg,
            #d3be8a 0%,
            #d3be8a var(--fill-progress, 0%),
            transparent var(--fill-progress, 0%),
            transparent 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .amenities-slider {
          width: 100%;
          margin: 0 auto 36px;
        }

        .amenities-slider .slick-list {
          padding-top: 24px !important;
          padding-bottom: 24px !important;
        }

        .amenities-slider .slick-slide {
          position: relative;
          z-index: 1;
        }

        .amenities-box {
          position: relative !important;
          border-radius: 10px;
          overflow: hidden;
          margin: 0;
          cursor: zoom-in;
          transform: scale(0.8);
          transform-origin: center;
          transition: transform 0.55s ease, opacity 0.55s ease;
          opacity: 0.82;
          width: 100%;
          aspect-ratio: 16/9;
        }

        .amenities-box:focus-visible {
          outline: 3px solid #d3be8a;
          outline-offset: 4px;
        }

        .amenities-slider .slick-slide.slick-center {
          z-index: 2;
        }

        .amenities-slider .slick-center .amenities-box {
          transform: scale(1);
          opacity: 1;
          box-shadow: 0 10px 32px rgba(0,0,0,0.2);
        }

        .amenities-slider .slick-prev,
        .amenities-slider .slick-next {
          z-index: 5;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #d9c28a;
          box-shadow: 0 6px 18px rgba(0, 2, 66, 0.18);
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .amenities-slider .slick-prev {
          left: 24px;
        }

        .amenities-slider .slick-next {
          right: 24px;
        }

        .amenities-slider .slick-prev:before,
        .amenities-slider .slick-next:before {
          color: #000242;
          font-family: Arial, sans-serif;
          font-size: 32px;
          line-height: 1;
          opacity: 1;
          transition: color 0.25s ease;
        }

        .amenities-slider .slick-prev:before {
          content: '‹';
        }

        .amenities-slider .slick-next:before {
          content: '›';
        }

        .amenities-slider .slick-prev:hover,
        .amenities-slider .slick-prev:focus,
        .amenities-slider .slick-next:hover,
        .amenities-slider .slick-next:focus {
          background: #000242;
          transform: translateY(-50%) scale(1.06);
        }

        .amenities-slider .slick-prev:hover:before,
        .amenities-slider .slick-prev:focus:before,
        .amenities-slider .slick-next:hover:before,
        .amenities-slider .slick-next:focus:before {
          color: #d9c28a;
        }

        .amenities-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 10px;
        }

        .amenity_caption {
          position: absolute;
          bottom: 0;
          right: 25px;
          background: transparent;
          color: #fff;
          font-size: 25px;
          padding: 13px 16px;
          z-index: 1;
          border-radius: 8px;
          font-family: "Poppins", sans-serif;
        }

        /* Customize dots */
        .amenities-slider .slick-dots {
          bottom: -30px;
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .amenities-slider .slick-dots li {
          width: 12px;
          height: 12px;
          margin: 0;
        }

        .amenities-slider .slick-dots li button {
          width: 12px;
          height: 12px;
          padding: 0;
        }

        .amenities-slider .slick-dots li button:before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #d9c28a;
          opacity: 1;
        }

        .amenities-slider .slick-dots li.slick-active button:before {
          background: #000242;
          opacity: 1;
        }

        .amenity-lightbox {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(0, 0, 0, 0.92);
          cursor: zoom-out;
        }

        .amenity-lightbox img {
          width: auto;
          height: auto;
          max-width: 94vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
          cursor: default;
        }

        .amenity-lightbox-close {
          position: absolute;
          top: 18px;
          right: 22px;
          z-index: 1;
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          color: #fff;
          font-size: 32px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .amenity-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.28);
        }

        @media (max-width: 990px) {
          .amenities-box {
            transform: scale(0.84);
          }
        }

        @media (max-width: 766px) {
          .amenities-slider .slick-list {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }

          .amenities-slider .slick-prev,
          .amenities-slider .slick-next {
            width: 34px;
            height: 34px;
          }

          .amenities-slider .slick-prev {
            left: 8px;
          }

          .amenities-slider .slick-next {
            right: 8px;
          }

          .amenities-slider .slick-prev:before,
          .amenities-slider .slick-next:before {
            font-size: 25px;
          }

          .amenities-box {
            transform: scale(1) !important;
            opacity: 1 !important;
            width: 100% !important;
            aspect-ratio: 16/9;
          }

          .amenities-box img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
          }

          .amenities-slider .slick-center .amenities-box,
          .amenities-slider .slick-active .amenities-box {
            transform: scale(1) !important;
            opacity: 1 !important;
          }

          .amenities-slider .slick-track {
            display: flex !important;
          }

          .amenities-slider .slick-slide {
            min-height: 1px;
          }
        }

        @media (max-width: 420px) {
          .amenities-slider .slick-list {
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }

          .amenities-box {
            aspect-ratio: 16/9;
            width: 100%;
            transform: scale(1);
            opacity: 1;
          }

          .amenities-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .amenity_caption {
            font-size: 16px;
            padding: 8px 10px;
            right: 10px;
          }
        }
      `}</style>

      <section className="dimension_section" data-aos="zoom-in" data-aos-duration="1000">
        <h2 ref={headingRef} className="scroll_text">
          <span className="fill_text">80+ Lifestyle Amenities</span> 
        </h2>
      </section>
      
      <div style={{ width: '100%', margin: '0 auto', overflow: 'hidden' }} data-aos="fade-up" data-aos-duration="1000">
        <div className="amenities-slider">
          {isSliderReady ? (
            <Slider ref={sliderRef} {...settings}>
              {amenitiesList.map((item, idx) => (
                <div key={idx}>
                  <div
                    className="amenities-box"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${item.title} image`}
                    onClick={() => setSelectedAmenity(item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setSelectedAmenity(item)
                      }
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      onLoad={() => {
                        if (idx < 5) window.dispatchEvent(new Event('resize'))
                      }}
                    />
                    <div className="amenity_caption">{item.title}</div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="amenities-box amenities-slider-fallback">
              <img src={amenitiesList[0].img} alt={amenitiesList[0].title} />
              <div className="amenity_caption">{amenitiesList[0].title}</div>
            </div>
          )}
        </div>
      </div>

      {selectedAmenity && (
        <div
          className="amenity-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedAmenity.title} image preview`}
          onClick={() => setSelectedAmenity(null)}
        >
          <button
            type="button"
            className="amenity-lightbox-close"
            aria-label="Close image preview"
            onClick={() => setSelectedAmenity(null)}
          >
            ×
          </button>
          <img
            src={selectedAmenity.img}
            alt={selectedAmenity.title}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

export default Amenities
