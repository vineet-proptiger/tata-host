// ═══════════════════════════════════════════════════
//  LODHA-DEVANAHALLI PROJECT CONFIG 
// ═══════════════════════════════════════════════════

export const PROJECT_ID = '3528317'
export const PROJECT_NAME = 'Tata Orbis'
export const CITY_DISPLAY = 'Navi Mumbai'
export const CITY_SLUG = 'navi-mumbai'
export const CITY_ID = '1'
export const SHEET_NAME = ' Chennai'

export const SECRET_KEY = '6c7f9ad8b2a1e0f4d5a8c0b9f6e2a4d10'
export const API_ENDPOINT =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? '/api/submit-lead'
    : '/submit-lead.php'
export const SHEET_WEBHOOK = 'https://script.google.com/macros/s/AKfycbwKsPyw26JGvve0wNMaWUav7wJ27qr5HsMwpXAY_f55TIgOf8Gv2PkxCjeVoRAyPG7v/exec'
export const PROPTIGER_URL = 'https://www.proptiger.com/data/v1/entity/enquiry'
