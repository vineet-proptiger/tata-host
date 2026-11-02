/* formMeta.js - URL Parameter Tracking & First-Touch Cookie Attribution */

// Helper to get parameters from URL (Query string + Hash support)
export function getParam(name) {
  if (typeof window === 'undefined') return ''
  let val = new URLSearchParams(window.location.search).get(name)
  if (!val && window.location.hash && window.location.hash.includes('?')) {
    const hashPart = window.location.hash.split('?')[1]
    val = new URLSearchParams(hashPart).get(name)
  }
  return val || ''
}

// Cookie Helper Functions (7 Days attribution / SameSite=Lax)
export function setTrackingCookie(name, value, days = 7) {
  if (typeof document === 'undefined') return
  let expires = ''
  const validDays = days !== undefined ? days : 7
  if (validDays) {
    const date = new Date()
    date.setTime(date.getTime() + (validDays * 24 * 60 * 60 * 1000))
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

// Function to collect raw tracking data from current URL
export function collectTrackingData() {
  return {
    // Google sheet fields
    utm_source:    getParam('utm_source'),
    sub_source:    getParam('sub_source'),
    utm_medium:    getParam('utm_medium'), 
    utm_campaign:  getParam('utm_campaign'),
    utm_id:        getParam('utm_id'), // Google campaign name
    ad_group_id:   getParam('ad_group_id') || getParam('asset_group_id'),
    utm_content:   getParam('utm_content'), // Ad id
    campaign_name: getParam('campaign_name'),
    ad_group_name: getParam('ad_group_name') || getParam('asset_group_name'),
    ad_name:       getParam('ad_name'),
    utm_term:      getParam('utm_term'),

    gclid:         getParam('gclid'),
    gbraid:        getParam('gbraid'),
    wbraid:        getParam('wbraid'),
    fbclid:        getParam('fbclid'),

    // New Google Parameters
    google_campaign_id:   getParam('utm_id'),
    google_ad_group_id:   getParam('ad_group_id'),
    google_ad_group_name: getParam('ad_group_name'),
    google_ad_name:       getParam('ad_name'),
    google_ad_id:         getParam('utm_content'),
    google_wbraid:        getParam('google_wbraid'),
    google_gbraid:        getParam('google_gbraid'),
    google_keyword:       getParam('google_keyword'),
    google_matchtype:     getParam('matchtype'),
    google_device:        getParam('google_device'),
    google_gclid:         getParam('google_gclid'),
    google_gad_source:    getParam('gad_source'),
    google_gad_campaignid:getParam('gad_campaignid'),
    asset_group_id:       getParam('asset_group_id'),

    // Meta variables
    meta_campaign_id: getParam('meta_campaign_id'),
    meta_adset_id:    getParam('meta_adset_id'),
    meta_adset_name:  getParam('meta_adset_name'),
    meta_ad_name:     getParam('meta_ad_name'),
    meta_ad_id:       getParam('utm_content') || getParam('meta_ad_id'),
    meta_creative_id: getParam('meta_creative_id'),
    meta_placement:   getParam('meta_placement'),
    meta_fbclid:      getParam('fbclid'),
    user_agent:       getParam('user_agent'),

    // New UTM Parameters
    utm_campaign_id:  getParam('utm_campaign_id'),
    utm_adgroup:      getParam('utm_adgroup'),
    utm_adgroup_id:   getParam('utm_adgroup_id'),
    utm_ad_id:        getParam('utm_ad_id'),
    utm_keyword:      getParam('utm_keyword'),
    utm_matchtype:    getParam('utm_matchtype'),
    utm_network:      getParam('utm_network'),
    utm_device:       getParam('utm_device'),
    utm_gclid:        getParam('utm_gclid'),
    utm_gbraid:       getParam('utm_gbraid'),
    utm_wbraid:       getParam('utm_wbraid'),

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

// Helper function to check if URL has any ad parameters (supports query & hash)
export function hasTrackingParams() {
  if (typeof window === 'undefined') return false
  const check = (params) => {
    return params.has('utm_source') || params.has('gclid') || params.has('fbclid') || 
           params.has('utm_medium') || params.has('utm_campaign') || params.has('wbraid') || 
           params.has('gbraid') || params.has('sub_source') || params.has('utm_id') || params.has('gad_source')
  }
  let params = new URLSearchParams(window.location.search)
  if (check(params)) return true
  if (window.location.hash && window.location.hash.includes('?')) {
    let hashParams = new URLSearchParams(window.location.hash.split('?')[1])
    if (check(hashParams)) return true
  }
  return false
}

// Accept only a real HTTP(S) page URL with a hostname before saving attribution
export function hasValidTrackingDomain() {
  if (typeof window === 'undefined' || !window.location) return false
  try {
    const url = new URL(window.location.href)
    return (url.protocol === 'http:' || url.protocol === 'https:') && !!url.hostname
  } catch (e) {
    return false
  }
}

// Helper to check for test/debug mode (test=submit, test=true, debug=test across query & hash)
export function isTestMode() {
  if (typeof window === 'undefined') return false
  const testVal = getParam('test')
  const debugVal = getParam('debug')
  return testVal.toLowerCase() === 'submit' || testVal.toLowerCase() === 'true' || debugVal.toLowerCase() === 'test'
}

// Save the first valid tracked landing URL for 7 days (Google Ads GCLID/GBRAID/WBRAID, Meta FBCLID, and UTMs).
// Plain domain visits without campaign identifiers and test/debug URLs never create or replace it.
export function initTrackingCookies() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const existingCookie = getTrackingCookie('rs_lead_tracking_data')
  const hasAdTracking = Boolean(
    getParam('gclid') ||
    getParam('fbclid') ||
    getParam('gbraid') ||
    getParam('wbraid') ||
    hasTrackingParams()
  )

  if (hasValidTrackingDomain() && hasAdTracking && !isTestMode()) {
    const trackingData = collectTrackingData()
    const currentDomain = window.location.hostname.toLowerCase()
    trackingData.tracking_domain = currentDomain

    let existingData = null
    if (existingCookie) {
      try { existingData = JSON.parse(decodeURIComponent(existingCookie)) } catch (e) {}
    }

    // A valid, unexpired cookie from this domain is the first-touch record.
    const savedDomain = existingData && existingData.tracking_domain
      ? String(existingData.tracking_domain).toLowerCase()
      : currentDomain

    if (!existingData || savedDomain !== currentDomain) {
      setTrackingCookie('rs_lead_tracking_data', encodeURIComponent(JSON.stringify(trackingData)), 7)
    }
  }
}

// Auto-run immediately when loaded in browser
if (typeof window !== 'undefined') {
  initTrackingCookies()
  window.getParam = getParam
  window.setTrackingCookie = setTrackingCookie
  window.getTrackingCookie = getTrackingCookie
  window.collectTrackingData = collectTrackingData
  window.hasTrackingParams = hasTrackingParams
  window.hasValidTrackingDomain = hasValidTrackingDomain
  window.isTestMode = isTestMode
}

// Function called by all lead forms on submit
export function buildTrackingFields() {
  initTrackingCookies()

  let finalTrackingData = {}
  
  // Load data from cookie (First-click attribution)
  const cookieData = getTrackingCookie('rs_lead_tracking_data')
  if (cookieData) {
    try {
      finalTrackingData = JSON.parse(decodeURIComponent(cookieData))
    } catch (e) {
      finalTrackingData = collectTrackingData() // fallback
    }
  } else {
    // Fallback if cookie was missing or blocked
    finalTrackingData = collectTrackingData()
    // Do not attribute a test/debug or invalid-domain submission to its URL
    if (isTestMode() || !hasValidTrackingDomain()) {
      finalTrackingData.SourceURL = ''
      finalTrackingData.landing_page = ''
    }
  }

  // Update dynamic values for the specific submission
  finalTrackingData.CurrentURL = typeof window !== 'undefined' ? window.location.href : ''
  finalTrackingData.device = typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : ''
  
  return finalTrackingData
}
