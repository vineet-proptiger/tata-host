/* formMeta.js - Lodha Devanahalli URL Tracking & First-Touch Cookie Attribution */

export function getParam(name) {
  if (typeof window === 'undefined') return ''
  let val = new URLSearchParams(window.location.search).get(name)
  if (!val && window.location.hash && window.location.hash.includes('?')) {
    const hashPart = window.location.hash.split('?')[1]
    val = new URLSearchParams(hashPart).get(name)
  }
  return val || ''
}

export function setTrackingCookie(name, value, days = 7) {
  if (typeof document === 'undefined') return
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax'
}

export function getTrackingCookie(name) {
  if (typeof document === 'undefined') return null
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export function collectTrackingData() {
  return {
    utm_source:    getParam('utm_source'),
    utm_medium:    getParam('utm_medium'),
    utm_campaign:  getParam('utm_campaign'),
    utm_term:      getParam('utm_term'),
    utm_content:   getParam('utm_content'),
    campaign_name: getParam('campaign_name'),
    adgroup_name:  getParam('adgroup_name'),
    gclid:         getParam('gclid'),
    gbraid:        getParam('gbraid'),
    wbraid:        getParam('wbraid'),
    SourceURL:     typeof window !== 'undefined' ? window.location.href : '',
    landing_page:  typeof window !== 'undefined' ? window.location.href : '',
    referrer:      typeof document !== 'undefined' ? document.referrer : '',
    device:        typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : '',
    ip_address:    '',
    geo_city:      '',
    geo_region:    '',
    geo_postal:    '',
    geo_country:   '',
    website:       '',
  }
}

export function initTrackingCookies() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const existingCookie = getTrackingCookie('rs_lead_tracking_data_lodha')
  const hasAdTracking = Boolean(
    getParam('gclid') || getParam('fbclid') || getParam('gbraid') || getParam('wbraid') || getParam('utm_source')
  )
  if (hasAdTracking) {
    const trackingData = collectTrackingData()
    if (!existingCookie) {
      setTrackingCookie('rs_lead_tracking_data_lodha', encodeURIComponent(JSON.stringify(trackingData)), 7)
    }
  }
}

if (typeof window !== 'undefined') {
  initTrackingCookies()
}

export function buildTrackingFields() {
  initTrackingCookies()
  let finalTrackingData = {}
  const cookieData = getTrackingCookie('rs_lead_tracking_data_lodha')
  if (cookieData) {
    try {
      finalTrackingData = JSON.parse(decodeURIComponent(cookieData))
    } catch (e) {
      finalTrackingData = collectTrackingData()
    }
  } else {
    finalTrackingData = collectTrackingData()
  }
  finalTrackingData.CurrentURL = typeof window !== 'undefined' ? window.location.href : ''
  finalTrackingData.device = typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : ''
  return finalTrackingData
}
