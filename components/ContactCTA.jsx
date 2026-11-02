'use client'
import React, { useState } from 'react'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY, BLOCKED_GCLIDS } from '../lib/config'
import { buildTrackingFields } from '../lib/formMeta'

const GOLD = 'var(--color-gold)'
const GOLD_DARK = 'var(--color-gold-dark)'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const ContactCTA = () => {
  const [form, setForm] = useState({ fullname: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handle = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'phone' ? value.replace(/\D/g, '') : value })
  }

  const submit = async (e) => {
    e.preventDefault()
    if (form.phone.length !== 10) { setError('Enter valid 10-digit number'); return }
    if (!/^[6-9]\d{9}$/.test(form.phone)) { setError('Phone number must start with 6, 7, 8, or 9'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields()


    
    // --- GCLID-SPECIFIC BROWSER LIMIT (Max 3 submissions per GCLID / 30 days) ---
    let currentCount = 0;
    let safeGclid = '';
    
    if (tracking.gclid) {
      safeGclid = tracking.gclid; // Use full GCLID for cookie name to prevent collision
      
      const cookieRegex = new RegExp(`(?:^|; )lead_trk_${PROJECT_ID}_${safeGclid}=([^;]*)`);
      const cookieMatch = document.cookie.match(cookieRegex);
      const cookieCount = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;
      
      let lsCount = 0;
      const lsKey = `lead_trk_data_${PROJECT_ID}`;
      const lsDataStr = localStorage.getItem(lsKey);
      
      if (lsDataStr) {
        try {
          const lsData = JSON.parse(lsDataStr);
          const gclidRecord = lsData[tracking.gclid];
          
          if (gclidRecord) {
            if (Date.now() - gclidRecord.firstSeen < 2592000000) { // 30 days
              lsCount = gclidRecord.count || 0;
            } else {
              delete lsData[tracking.gclid];
              localStorage.setItem(lsKey, JSON.stringify(lsData));
            }
          }
        } catch (e) {}
      }
      
      currentCount = Math.max(cookieCount, lsCount);
      
      if (currentCount >= 3) {
        setSuccess(true);
        setLoading(false);
        return;
      }
    }
    // -------------------------------------------------------------

const payload = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('phone', form.phone)
    payload.append('email', form.email || '')
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Contact CTA Form')
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
            if (data.status) {
        // --- SAVE GCLID TRACKING ON SUCCESS ---
        if (tracking.gclid) {
          const newCount = currentCount + 1;
          if (typeof document !== 'undefined') document.cookie = `lead_trk_${PROJECT_ID}_${safeGclid}=${newCount}; max-age=2592000; path=/`;
          
          if (typeof localStorage !== 'undefined') {
            const lsKey = `lead_trk_data_${PROJECT_ID}`;
            let lsData = {};
            try {
              const existing = localStorage.getItem(lsKey);
              if (existing) lsData = JSON.parse(existing);
            } catch(e) {}
            
            lsData[tracking.gclid] = {
              count: newCount,
              firstSeen: (lsData[tracking.gclid] && lsData[tracking.gclid].firstSeen) ? lsData[tracking.gclid].firstSeen : Date.now()
            };
            try { localStorage.setItem(lsKey, JSON.stringify(lsData)); } catch(e) {}
          }
        }
        // --------------------------------------
        // if (typeof window !== 'undefined') localStorage.setItem('_lsub_done', '1')
        setSuccess(true)
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          const nameParts = form.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: 'Contact CTA Form',
            user_data: {
              email: form.email.trim() || undefined, phone: `+91${form.phone}`,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || ''
            }
          })
        }
      }
      else setError(data.msg || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <section id="contact" className="relative py-20 bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(/images/Enquiry/enquiry.webp)' }}>
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white" data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-white mb-6" style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif" }}>
              Get In Touch
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed max-w-md" style={{ fontFamily: F_SANS }}>
              Let’s connect and bring your ideas to life. Reach out today for expert guidance, quick responses, and solutions tailored perfectly to your needs.
            </p>
          </div>

          {/* Right Form Card */}
          <div className="bg-[#e9e3dc] p-8 md:p-10 rounded-2xl shadow-2xl max-w-[500px] w-full ml-auto" data-aos="fade-left" data-aos-duration="1000">
            <h3 className="text-[#000242] text-2xl font-semibold mb-8 uppercase tracking-wide" style={{ fontFamily: F_JOST }}>
              Enquire Now
            </h3>
            
            {success ? (
              <div style={{ padding: '32px 0', textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
                }}>
                  <svg width="28" height="28" fill="none" stroke={GOLD_DARK} strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p style={{ fontWeight: '700', fontSize: '18px', color: 'var(--color-text)', fontFamily: F_SANS }}>Thank You!</p>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '6px', fontFamily: F_SANS }}>Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-6">
                
                {/* Name */}
                <div>
                  <input name="fullname" required value={form.fullname} onChange={handle} placeholder="Name"
                    className="w-full bg-transparent border-0 border-b border-gray-400 py-2 px-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#000242] transition-colors" 
                    style={{ fontFamily: F_SANS }} />
                </div>

                {/* Email */}
                <div>
                  <input name="email" value={form.email} onChange={handle} placeholder="Email"
                    className="w-full bg-transparent border-0 border-b border-gray-400 py-2 px-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#000242] transition-colors" 
                    style={{ fontFamily: F_SANS }} />
                </div>

                {/* Phone */}
                <div className="relative">
                  <span className="absolute left-1 top-2 text-gray-500" style={{ fontFamily: F_SANS }}>+91</span>
                  <input name="phone" required value={form.phone} onChange={handle}
                    placeholder="Phone Number" maxLength={10}
                    className="w-full bg-transparent border-0 border-b border-gray-400 py-2 pl-10 pr-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#000242] transition-colors" 
                    style={{ fontFamily: F_SANS }} />
                </div>

                {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', textAlign: 'left', marginTop: '4px' }}>
                  <input type="checkbox" required defaultChecked style={{ accentColor: GOLD, marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: '#666', fontFamily: F_SANS, lineHeight: 1.5 }}>
                    I authorize the developer &amp; its representatives to contact me via Email / SMS / WhatsApp / Call.
                  </span>
                </label>

                <button type="submit" disabled={loading}
                  className="w-full py-4 mt-2 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-lg bg-[#000242] text-white hover:bg-[#000242]/90"
                  style={{ fontFamily: F_SANS }}>
                  {loading ? 'Submitting...' : 'Send'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
