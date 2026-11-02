'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { logoImages } from '../lib/images'

const Navbar = ({ setIsOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navState, setNavState] = useState('top') // 'top', 'collapsed', 'expanded'
  const [isOverDark, setIsOverDark] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 50) {
        setNavState('top')
      } else if (Math.abs(currentScrollY - lastScrollY) > 4) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down -> collapse to hanging logo tab
          setNavState('collapsed')
        } else {
          // Scrolling up -> bring back the full 1st navbar with links
          setNavState('expanded')
        }
      }

      // Automatically detect if navbar is currently over a blue/dark section
      const darkSections = document.querySelectorAll('#highlights, #location, #developer, .hero-container, footer');
      let overDarkSection = false;
      const navY = 80;
      darkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= navY && rect.bottom >= navY) {
          overDarkSection = true;
        }
      });
      setIsOverDark(overDarkSection);

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --secondary_font: var(--font-jost), Montserrat, sans-serif;
        }

        .header_style2 {
          position: fixed;
          top: 4px;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: top 0.4s ease;
        }

        .header_style2.sticky {
          top: 4px;
        }

        .header_style2 .container-fluid {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 0 15px;
        }

        .header_style2 .header_navigation2,
        .header_style2.scrolled-up-expanded .header_navigation2 {
          display: flex;
          justify-content: space-between !important;
          align-items: center;
          list-style-type: none;
          width: 96% !important;
          max-width: 1550px !important;
          height: 64px !important;
          padding: 0 40px !important;
          margin: 0 auto;
          background: rgba(15, 23, 42, 0.38) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 50px !important;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.25) !important;
          transition: width 0.55s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-radius 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s ease,
                      box-shadow 0.4s ease;
        }

        .header_style2.sticky .header_navigation2 {
          width: 260px !important;
          height: 62px !important;
          border-radius: 12px !important;
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 auto;
          justify-content: center !important;
          overflow: hidden !important;
          transition: width 0.55s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-radius 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s ease;
        }

        .header_style2 .header_navigation2 li.nav-item,
        .header_style2.scrolled-up-expanded .header_navigation2 li.nav-item {
          flex: 1 1 0% !important;
          max-width: 350px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden !important;
          opacity: 1 !important;
          visibility: visible;
          padding: 0 4px !important;
          transition: max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, flex 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, opacity 0.4s ease 0.12s, padding 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
        }

        .header_style2 .header_navigation2 li.nav-item:first-child,
        .header_style2 .header_navigation2 li.nav-item:last-child,
        .header_style2.scrolled-up-expanded .header_navigation2 li.nav-item:first-child,
        .header_style2.scrolled-up-expanded .header_navigation2 li.nav-item:last-child {
          flex: 1.5 1 0% !important;
          max-width: 450px !important;
        }

        .header_style2.sticky .header_navigation2 li.nav-item,
        .header_style2.sticky .header_navigation2 li.nav-item:first-child,
        .header_style2.sticky .header_navigation2 li.nav-item:last-child {
          flex: 0 1 0% !important;
          max-width: 0px !important;
          opacity: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          pointer-events: none;
          visibility: hidden;
          overflow: hidden !important;
          transition: opacity 0.2s ease 0s, max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s, flex 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s, padding 0.3s ease 0s;
        }

        .header_style2 .header_navigation2 li.navbar-logo,
        .header_style2.sticky .header_navigation2 li.navbar-logo,
        .header_style2.scrolled-up-expanded .header_navigation2 li.navbar-logo {
          animation: none !important;
          opacity: 1 !important;
          flex: 0 0 auto !important;
          flex-shrink: 0 !important;
          min-width: 200px !important;
          background-color: #fff !important;
          padding: 2px 18px !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1) !important;
          margin: 0 !important;
          transition: box-shadow 0.3s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transform: translateZ(0) !important;
          z-index: 20;
        }

        .header_style2 .header_navigation2 li a,
        .header_style2.scrolled-up-expanded .header_navigation2 li a {
          color: #ffffff !important;
          font-size: 13.5px !important;
          padding: 0px 10px !important;
          line-height: 1.5em;
          text-decoration: none;
          font-family: var(--secondary_font);
          font-weight: 500 !important;
          letter-spacing: 1.2px !important;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        
        .header_style2 .header_navigation2 li a:hover,
        .header_style2.scrolled-up-expanded .header_navigation2 li a:hover {
          color: #C9A96E !important;
        }

        /* Phone Button styling in Nav */
        .header_style2 .header_navigation2 li a.phone-btn,
        .header_style2.scrolled-up-expanded .header_navigation2 li a.phone-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent !important;
          padding: 6px 15px !important;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.35) !important;
          color: #ffffff !important;
          font-size: 13.5px !important;
          box-shadow: none !important;
        }

        .header_style2 .header_navigation2 li a.phone-btn:hover,
        .header_style2.scrolled-up-expanded .header_navigation2 li a.phone-btn:hover {
          background: rgba(201, 169, 110, 0.95) !important;
          color: #ffffff !important;
          border-color: rgba(201, 169, 110, 0.95) !important;
        }

        .nav-logo,
        .header_style2.sticky .nav-logo,
        .header_style2.scrolled-up-expanded .nav-logo {
          height: 52px !important;
          min-height: 52px !important;
          width: auto !important;
          flex-shrink: 0 !important;
          display: block;
          object-fit: contain;
          transform: none !important;
          transition: none !important;
        }

        /* Responsive Safe-Zone for Standard Laptops (992px - 1280px) */
        @media (min-width: 992px) and (max-width: 1280px) {
          .header_style2 .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            width: 98% !important;
            padding: 0 30px !important;
          }
          .header_style2 .header_navigation2 li a,
          .header_style2.scrolled-up-expanded .header_navigation2 li a {
            font-size: 12px !important;
            padding: 0px 6px !important;
            letter-spacing: 0.8px !important;
          }
          .header_style2 .header_navigation2 li a.phone-btn,
          .header_style2.scrolled-up-expanded .header_navigation2 li a.phone-btn {
            padding: 6px 12px !important;
            font-size: 12px !important;
          }
          .header_style2 .header_navigation2 li.navbar-logo,
          .header_style2.sticky .header_navigation2 li.navbar-logo,
          .header_style2.scrolled-up-expanded .header_navigation2 li.navbar-logo {
            min-width: 180px !important;
            padding: 2px 14px !important;
          }
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 48px !important;
            min-height: 48px !important;
          }
        }

        /* Responsive Scaling for Large Screens (1400px to 1679px) */
        @media (min-width: 1400px) and (max-width: 1679px) {
          .header_style2 .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            max-width: 1620px !important;
            height: 70px !important;
            padding: 0 45px !important;
          }
          .header_style2 .header_navigation2 li a,
          .header_style2.scrolled-up-expanded .header_navigation2 li a {
            font-size: 15px !important;
            padding: 0px 14px !important;
            letter-spacing: 1.4px !important;
          }
          .header_style2 .header_navigation2 li a.phone-btn,
          .header_style2.scrolled-up-expanded .header_navigation2 li a.phone-btn {
            padding: 8px 18px !important;
            font-size: 15px !important;
          }
          .header_style2 .header_navigation2 li.navbar-logo,
          .header_style2.sticky .header_navigation2 li.navbar-logo,
          .header_style2.scrolled-up-expanded .header_navigation2 li.navbar-logo {
            min-width: 220px !important;
            padding: 3px 22px !important;
          }
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 56px !important;
            min-height: 56px !important;
          }
        }

        /* Responsive Scaling for Ultra-Wide / 4K Screens (1680px and above) */
        @media (min-width: 1680px) {
          .header_style2 .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            max-width: 1840px !important;
            height: 76px !important;
            padding: 0 52px !important;
          }
          .header_style2 .header_navigation2 li a,
          .header_style2.scrolled-up-expanded .header_navigation2 li a {
            font-size: 16.5px !important;
            padding: 0px 18px !important;
            letter-spacing: 1.6px !important;
          }
          .header_style2 .header_navigation2 li a.phone-btn,
          .header_style2.scrolled-up-expanded .header_navigation2 li a.phone-btn {
            padding: 9px 22px !important;
            font-size: 16.5px !important;
          }
          .header_style2 .header_navigation2 li.navbar-logo,
          .header_style2.sticky .header_navigation2 li.navbar-logo,
          .header_style2.scrolled-up-expanded .header_navigation2 li.navbar-logo {
            min-width: 250px !important;
            padding: 4px 26px !important;
          }
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 62px !important;
            min-height: 62px !important;
          }
        }

        /* Reappear Full Navbar on Scroll Up (Smart Sticky Navbar) */
        .header_style2.scrolled-up-expanded {
          top: 4px;
          background: transparent !important;
          box-shadow: none !important;
        }

        .mob_nav_trigger {
          display: none;
        }

        @media (max-width: 991px) {
          .header_style2,
          .header_style2.sticky,
          .header_style2.scrolled-up-expanded {
            top: 0 !important;
            padding: 12px 0 !important;
            background: #fff !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
            transition: none !important;
          }
          
          .header_style2 .container-fluid {
            justify-content: flex-start !important;
            padding: 0 16px !important;
            margin: 0 !important;
            width: 100% !important;
          }

          .header_style2 .header_navigation2 li.nav-item,
          .header_style2.sticky .header_navigation2 li.nav-item,
          .header_style2.scrolled-up-expanded .header_navigation2 li.nav-item {
            display: none !important;
            flex: 0 0 0% !important;
            max-width: 0px !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
          
          .header_style2 .header_navigation2,
          .header_style2.sticky .header_navigation2,
          .header_style2.scrolled-up-expanded .header_navigation2 {
            width: 100% !important;
            height: auto !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            justify-content: flex-start !important;
            align-items: center !important;
            margin: 0 !important;
            padding: 0 !important;
            transition: none !important;
          }
          
          .header_style2 .header_navigation2 li.navbar-logo,
          .header_style2.sticky .header_navigation2 li.navbar-logo,
          .header_style2.scrolled-up-expanded .header_navigation2 li.navbar-logo {
            display: flex !important;
            justify-content: flex-start !important;
            align-items: center !important;
            opacity: 1 !important;
            visibility: visible !important;
            padding: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
            margin: 0 !important;
            border-radius: 0 !important;
            min-width: unset !important;
            flex: 0 0 auto !important;
            transition: none !important;
            transform: none !important;
          }
          
          .nav-logo,
          .header_style2.sticky .nav-logo,
          .header_style2.scrolled-up-expanded .nav-logo {
            height: 50px !important;
            min-height: 50px !important;
            width: auto !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            margin-left: 0 !important;
            transition: none !important;
            transform: none !important;
          }
          
          .mob_nav_trigger {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #111;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 60;
            transition: all 0.3s ease;
            background: transparent;
            border-radius: 0;
          }
          
          .header_style2.sticky .mob_nav_trigger,
          .header_style2.scrolled-up-expanded .mob_nav_trigger {
            background: #c9a65a;
            color: #000242;
          }
        }

        /* Fullscreen Popup Menu */
        .popup_menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          visibility: hidden;
          opacity: 0;
          transition: all 0.4s ease;
        }
        .popup_menu.open {
          visibility: visible;
          opacity: 1;
        }
        .popup_menu .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
        }
        .popup_menu .menu_container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
        }
        .popup_menu .close_btn {
          position: absolute;
          top: 30px;
          right: 40px;
          color: #fff;
          font-size: 16px;
          font-family: var(--secondary_font);
          text-transform: uppercase;
          cursor: pointer;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .popup_menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .popup_menu ul li {
          margin: 20px 0;
        }
        .popup_menu ul li a {
          color: #fff;
          font-size: 28px;
          font-family: var(--secondary_font);
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 2px;
          transition: color 0.3s;
        }
        .popup_menu ul li a:hover {
          color: #C9A96E;
        }

        @keyframes Navbar_scale-in {
          0% { flex-basis: 7%; opacity: 0; }
          100% { flex-basis: 14%; opacity: 1; }
        }
        
        @keyframes Navbar_scale-out {
          0% { flex-basis: 14%; opacity: 1; }
          100% { flex-basis: 0; opacity: 0; margin: 0; padding: 0; }
        }
      `}} />

      {/* Main Navbar */}
      <div className={`header_style2 ${navState === 'collapsed' ? 'sticky' : navState === 'expanded' ? 'scrolled-up-expanded' : ''} ${isOverDark ? 'nav-over-dark' : 'nav-over-light'}`}>
        <div className="container-fluid">
          <ul className="header_navigation2">
            <li className="nav-item"><a href="#overview">Overview</a></li>
            <li className="nav-item"><a href="#highlights">Highlights</a></li>
            <li className="nav-item"><a href="#gallery">Gallery</a></li>
            <li className="nav-item"><a href="#amenities">Amenities</a></li>
            
            <li className="navbar-logo">
              <a href="#" className="navbar-brand">
                <img src={logoImages.tarc} alt="Tata Orbis" className="nav-logo" />
              </a>
            </li>
            
            {/* <li className="nav-item"><a href="#projects">Projects</a></li> */}
            <li className="nav-item"><a href="#pricing">Pricing</a></li>
            <li className="nav-item"><a href="#masterplan">Floor Plan</a></li>
            <li className="nav-item"><a href="#location">Location</a></li>
            <li className="nav-item"><a href="tel:9718344024" className="phone-btn"><Phone size={14}/> 9718344024</a></li>
          </ul>
        </div>

        {/* Hamburger Menu Trigger */}
        <div 
          className={`mob_nav_trigger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} />
        </div>
      </div>

      {/* Fullscreen Popup Menu (for mobile or sticky state) */}
      <div className={`popup_menu ${mobileOpen ? 'open' : ''}`}>
        <div className="overlay" onClick={() => setMobileOpen(false)}></div>
        <div className="close_btn" onClick={() => setMobileOpen(false)}>
          <span>Close</span> <X size={24} />
        </div>
        <div className="menu_container">
          <ul>
            <li><a href="#overview" onClick={() => setMobileOpen(false)}>Overview</a></li>
            <li><a href="#highlights" onClick={() => setMobileOpen(false)}>Highlights</a></li>
            <li><a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a></li>
            <li><a href="#amenities" onClick={() => setMobileOpen(false)}>Amenities</a></li>
            {/* <li><a href="#projects" onClick={() => setMobileOpen(false)}>Projects</a></li> */}
            <li><a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a></li>
            <li><a href="#masterplan" onClick={() => setMobileOpen(false)}>Floor Plan</a></li>
            <li><a href="#location" onClick={() => setMobileOpen(false)}>Location</a></li>
            <li style={{ marginTop: '40px' }}>
              <a href="tel:9718344024" style={{ color: '#C9A96E', fontSize: '20px' }}>
                <Phone size={20} style={{ display: 'inline', marginRight: '8px' }}/> 9718344024
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
