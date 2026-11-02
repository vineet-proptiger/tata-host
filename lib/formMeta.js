export function getParam(name) {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get(name) || ''
}

export function buildTrackingFields() {
  return {
    // google sheet fields
    utm_source:    getParam('utm_source'),
    sub_source:       getParam('sub_source'),
    utm_medium:    getParam('utm_medium'), //
    utm_id:        getParam('utm_id'), // google campaign name
    ad_group_id:  getParam('ad_group_id') || getParam('asset_group_id'),
    utm_content:   getParam('utm_content'),// yhi  addId h
    campaign_name: getParam('campaign_name'),
    ad_group_name: getParam('ad_group_name') || getParam('asset_group_name'),
    ad_name: getParam('ad_name'),
    utm_term:      getParam('utm_term'),

    gclid:         getParam('gclid'),
    gbraid:        getParam('gbraid'),
    wbraid:        getParam('wbraid'),
    fbclid :     getParam('fbclid'),

    // New Google Parameters
    google_campaign_id:   getParam('utm_id'),
    google_ad_group_id:   getParam('ad_group_id'),
    google_ad_group_name: getParam('ad_group_name'),
    google_ad_name: getParam('ad_name'),
    google_ad_id:         getParam('utm_content'),
    google_wbraid:        getParam('google_wbraid'),
    google_gbraid:        getParam('google_gbraid'),
    google_keyword:       getParam('google_keyword'),
    google_matchtype:     getParam('matchtype'),
    google_device:        getParam('google_device'),
    google_gclid:         getParam('google_gclid'),
    google_gad_source:    getParam('gad_source'),
    google_gad_campaignid:getParam('gad_campaignid'),
    sub_source:           getParam('sub_source'),
    asset_group_id:       getParam('asset_group_id'),

    //Meta variables
    meta_campaign_id: getParam('meta_campaign_id'),
    meta_adset_id:   getParam('meta_adset_id'),
    meta_adset_name: getParam('meta_adset_name'),
    meta_ad_name: getParam('meta_ad_name'),
    meta_ad_id:         getParam('utm_content') || getParam('meta_ad_id'),
    meta_creative_id:    getParam('meta_creative_id'),
    meta_placement:        getParam('meta_placement'),
    
    meta_fbclid :     getParam('fbclid'),
    user_agent: getParam('user_agent'),

    // New UTM Parameters
    utm_campaign_id:      getParam('utm_campaign_id'),
    utm_adgroup:          getParam('utm_adgroup'),
    utm_adgroup_id:       getParam('utm_adgroup_id'),
    utm_ad_id:            getParam('utm_ad_id'),
    utm_keyword:          getParam('utm_keyword'),
    utm_matchtype:        getParam('utm_matchtype'),
    utm_network:          getParam('utm_network'),
    utm_device:           getParam('utm_device'),
    utm_gclid:            getParam('utm_gclid'),
    utm_gbraid:           getParam('utm_gbraid'),
    utm_wbraid:           getParam('utm_wbraid'),

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
