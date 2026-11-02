import './globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Open_Sans, Montserrat, Cormorant_Garamond, Poppins } from 'next/font/google'
import { CITY_DISPLAY } from '../lib/config'
import localFont from 'next/font/local'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const nephilm = localFont({
  src: '../public/fonts/Nephilm.otf',
  variable: '--font-nephilm',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://tataorbisghansoliproject.co.in'),
  title: 'Tata Orbis | Luxury 2, 3 BHK & Jodi Homes in Ghansoli, Navi Mumbai',
  description: "Tata Orbis — A thoughtfully planned 47.5-acre landmark development in Ghansoli, Navi Mumbai by Tata Housing. Luxury 2 BHK, 3 BHK, and Jodi apartments in iconic G+36 towers.",
  alternates: {
    canonical: 'https://tataorbisghansoliproject.co.in/',
  },
  openGraph: {
    title: 'Tata Orbis | Luxury Integrated Development in Ghansoli',
    description: "Discover luxury 2, 3 BHK & Jodi apartments at Tata Orbis, an integrated 47.5-acre landmark development in Ghansoli, Navi Mumbai.",
    url: 'https://tataorbisghansoliproject.co.in/',
    siteName: 'Tata Orbis',
    images: [
      {
        url: '/projects/iris-tower.jpg',
        width: 1200,
        height: 630,
        alt: 'Tata Orbis Ghansoli Navi Mumbai',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tata Orbis | Luxury 2, 3 BHK & Jodi Homes in Ghansoli',
    description: "A thoughtfully planned 47.5-acre landmark development in Ghansoli, Navi Mumbai by Tata Housing.",
    images: ['/projects/iris-tower.jpg'],
  },
  icons: {
    icon: '/images/favicon/fav.webp',
  },
}

import SmoothScroll from '../components/SmoothScroll'

export default function RootLayout({ children }) {  
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-575H8R87" />
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Tata Orbis Ghansoli",
              "url": "https://tataorbisghansoliproject.co.in/",
              "logo": "https://tataorbisghansoliproject.co.in/projects/iris-tower.jpg",
              "image": "https://tataorbisghansoliproject.co.in/projects/iris-tower.jpg",
              "description": "Tata Orbis, Navi Mumbai's premier luxury integrated development in Ghansoli offering 2, 3 BHK & Jodi luxury residences.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ghansoli",
                "addressLocality": "Navi Mumbai",
                "addressRegion": "Maharashtra",
                "postalCode": "400701",
                "addressCountry": "IN"
              },
              "telephone": "+919718344024",
              "priceRange": "₹ 1.99 Cr Onwards",
              "sameAs": [
                "https://tataorbisghansoliproject.co.in"
              ]
            })
          }}
        />
      </head>
      <body className={`${openSans.variable} ${montserrat.variable} ${cormorant.variable} ${nephilm.variable} ${poppins.variable} font-sans text-dark antialiased`}>
        <Script id="gtag-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ 'city': '${CITY_DISPLAY}' });
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`} 
        </Script>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
