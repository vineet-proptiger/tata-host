// ═══════════════════════════════════════════════════════════════
//  SUBMIT LEAD API ROUTE — Next.js
//  PHP submit-lead.php ka exact replacement
//  POST /api/submit-lead
// ═══════════════════════════════════════════════════════════════

/* ─── CONFIG ─────────────────────────────────────────────────── */
import { SHEET_WEBHOOK, PROPTIGER_URL, CITY_ID, CITY_SLUG } from '../../../lib/config'
/* ────────────────────────────────────────────────────────────── */

function clean(v) {
  return (v ?? '').toString().trim().replace(/<[^>]*>/g, '')
}

function getUserIP(request) {
  const loopback = new Set(['::1', '127.0.0.1', '::ffff:127.0.0.1'])
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const ip = forwarded.split(',')[0].trim()
    if (ip && !loopback.has(ip)) return ip
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp && !loopback.has(realIp)) return realIp
  return ''
}

export async function POST(request) {
  try {
    /* ── Parse form data ── */
    const formData = await request.formData()
    const get = (key) => clean(formData.get(key) || '')

    /* ── Honeypot check ── */
    if (get('website') !== '') {
      return Response.json({ status: false })
    }

    /* ── Required fields ── */
    let phone = get('phone').replace(/\D/g, '')
    if (phone.length > 10) phone = phone.slice(-10)
    if (phone.length > 0 && phone.length < 10) {
      return Response.json({ status: false, msg: 'Invalid phone number' })
    }
    if (phone.length === 10 && !/^[6-9]\d{9}$/.test(phone)) {
      return Response.json({ status: false, msg: 'Phone number must start with 6, 7, 8, or 9' })
    }
    const email = get('email')

    if (phone === '' && email === '') {
      return Response.json({ status: false })
    }

    const projectId = get('projectId')
    if (projectId === '') {
      return Response.json({ status: false })
    }

    /* ── User data ── */
    const fullName = get('fullname')
    const projectName = get('projectName')
    const nameParts = fullName.trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts[1] || firstName

    /* ── Tracking ── */
    const utmSource = get('utm_source') || 'Microsite'
    const utmMedium = get('utm_medium') || 'organic'
    const utmCampaign = get('utm_campaign')
    const utmTerm = get('utm_term')
    const utmContent = get('utm_content')
    const campaignName = get('campaign_name')

    const gclid = get('gclid')
    const gbraid = get('gbraid')
    const wbraid = get('wbraid')

    const landingPage = get('SourceURL') || get('landing_page')
    const userIP = getUserIP(request) || get('ip_address')

    const comments = get('comments')

    /* ── 1. Google Sheet ── */
    const sheetPayload = new URLSearchParams({
      secret: get('secret'),

      projectid: projectId,
      projectname: projectName,

      fullname: fullName || `${firstName} ${lastName}`.trim(),
      firstname: firstName,
      lastname: lastName,
      email: email,
      mobile: phone,
      comments: comments,

      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      campaign_name: campaignName,
      sub_source: get('sub_source'),
      utm_id: get('utm_id'),

      ad_name: get('ad_name'),
      ad_group_name: get('ad_group_name'),
      ad_group_id: get('ad_group_id'),

      gclid: gclid,
      gbraid: gbraid,
      wbraid: wbraid,
      fbclid: get('fbclid'),

      sourceurl: landingPage,
      landing_page: landingPage,

      device: get('device'),
      referrer: get('referrer'),
      ipaddress: userIP,
      formname: get('form_name'),
      projectcity: get('city'),
      sheet_name: get('sheet_name'),
    })

    fetch(SHEET_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: sheetPayload.toString(),
    })
      .then(r => console.log('[Sheet] status:', r.status))
      .catch(e => console.error('[Sheet] error:', e.message))

    /* ── 2. Proptiger CRM ── */
    let ptUrl = `${PROPTIGER_URL}?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}&utm_term=${encodeURIComponent(utmTerm)}&utm_content=${encodeURIComponent(utmContent)}&gclid=${encodeURIComponent(gclid)}&gbraid=${encodeURIComponent(gbraid)}&wbraid=${encodeURIComponent(wbraid)}&campaign_name=${encodeURIComponent(campaignName)}&sourceDomain=Microsite`

    // Append new tracking parameters from the URL
    const newTrackingParams = {
      google_campaign_id: campaignName,
      google_ad_group_id: get('google_ad_group_id'),
      google_ad_group_name: get('google_ad_group_name'),
      google_ad_name: get('google_ad_name'),
      google_ad_id: get('google_ad_id'),
      google_wbraid: get('google_wbraid'),
      google_gbraid: get('google_gbraid'),
      google_keyword: get('google_keyword'),
      google_matchtype: get('google_matchtype'),
      // google_network: get('google_network'),
      google_device: get('google_device'),
      google_gclid: get('google_gclid'),
      utm_campaign_id: get('utm_campaign_id'),
      utm_adgroup: get('utm_adgroup'),
      utm_adgroup_id: get('utm_adgroup_id'),
      utm_ad_id: get('utm_ad_id'),
      utm_keyword: get('utm_keyword'),
      utm_matchtype: get('utm_matchtype'),
      utm_network: get('utm_network'),
      utm_device: get('utm_device'),
      utm_gclid: get('utm_gclid'),
      utm_gbraid: get('utm_gbraid'),
      utm_wbraid: get('utm_wbraid'),
      ip_address: userIP,
      sub_source: get('sub_source'),
      landing_page: landingPage,
      referrer: get('referrer'),
      google_gad_source: get('google_gad_source'),
      google_gad_campaignid: get('google_gad_campaignid'),
      asset_group_id: get('asset_group_id'),
      
      // Meta tracking variables
      meta_campaign_id: get('meta_campaign_id'),
      meta_adset_id: get('meta_adset_id'),
      meta_adset_name: get('meta_adset_name'),
      meta_ad_name: get('meta_ad_name'),
      meta_ad_id: get('meta_ad_id'),
      meta_creative_id: get('meta_creative_id'),
      meta_placement: get('meta_placement'),
      meta_fbclid: get('meta_fbclid'),
      user_agent: get('user_agent'),
    }

    Object.entries(newTrackingParams).forEach(([key, value]) => {
      if (value) {
        ptUrl += `&${key}=${encodeURIComponent(value)}`
      }
    })

    const ptPayload = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      countryId: '1',
      source: utmSource,

      projectId,
      projectName,

      cityId: CITY_ID,
      cityName: CITY_SLUG,

      gaMedium: utmMedium,
      campaign: utmCampaign,
      addgroup: get('adgroup_name'),

      utm_term: utmTerm,
      utm_content: utmContent,

      gclid,
      gbraid,
      wbraid,

      query: comments || 'Please arrange a callback',
      device: get('device'),
      userIP,

      sendOtp: false,
      isTemp: false,
    }

    const ptBodyStr = JSON.stringify(ptPayload)
    console.log('[CRM] payload:', ptBodyStr)

    let ptStatus = null
    let ptBody = null
    try {
      const ptRes = await fetch(ptUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Microsite',
        },
        body: ptBodyStr,
      })
      ptStatus = ptRes.status
      ptBody = await ptRes.text()
      console.log('[CRM] status:', ptStatus, '| body:', ptBody)
    } catch (e) {
      console.error('[CRM] fetch error:', e.message)
    }

    return Response.json({
      status: true,
      crm: ptStatus,
    })

  } catch (err) {
    console.error('submit-lead error:', err)
    return Response.json({ status: false, msg: 'Server error' }, { status: 500 })
  }
}



