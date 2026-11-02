export function getParam(name) {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get(name) || ''
}

export function buildTrackingFields() {
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
