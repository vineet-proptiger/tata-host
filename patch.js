const fs = require('fs');

const path = '/Users/mac/Desktop/tata-ghansoli';

// 1. config.js
const configPath = `${path}/lib/config.js`;
let config = fs.readFileSync(configPath, 'utf8');
if (!config.includes('BLOCKED_GCLIDS')) {
  config += `
// Spam Prevention
export const BLOCKED_GCLIDS = [
  'CjwKCAjwqc_UBhBKEiwAWbl25lN0Bj_nfzp6Cb-DOGpOJQkWucJ-ruTI8-1aDVZV-uepdQxJWrqlthoCQfcQAvD_BwE'
]
`;
  fs.writeFileSync(configPath, config);
}

// 2. LeadForm.jsx
const leadFormPath = `${path}/components/LeadForm.jsx`;
let leadForm = fs.readFileSync(leadFormPath, 'utf8');
if (!leadForm.includes('BLOCKED_GCLIDS')) {
  leadForm = leadForm.replace(
    `import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'`,
    `import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY, BLOCKED_GCLIDS } from '../lib/config'`
  );
  leadForm = leadForm.replace(
    `    const payload = new FormData()`,
    `    // Block the specific spam gclid
    if (
      tracking.gclid && 
      ((Array.isArray(BLOCKED_GCLIDS) && BLOCKED_GCLIDS.includes(tracking.gclid)) || 
      (typeof BLOCKED_GCLIDS === 'string' && BLOCKED_GCLIDS === tracking.gclid))
    ) {
      setSuccess(true)
      setLoading(false)
      return
    }

    const payload = new FormData()`
  );
  fs.writeFileSync(leadFormPath, leadForm);
}

// 3. ContactCTA.jsx
const ctaPath = `${path}/components/ContactCTA.jsx`;
let cta = fs.readFileSync(ctaPath, 'utf8');
if (!cta.includes('BLOCKED_GCLIDS')) {
  cta = cta.replace(
    `import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'`,
    `import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY, BLOCKED_GCLIDS } from '../lib/config'`
  );
  cta = cta.replace(
    `    const payload = new FormData()`,
    `    // Block the specific spam gclid
    if (
      tracking.gclid && 
      ((Array.isArray(BLOCKED_GCLIDS) && BLOCKED_GCLIDS.includes(tracking.gclid)) || 
      (typeof BLOCKED_GCLIDS === 'string' && BLOCKED_GCLIDS === tracking.gclid))
    ) {
      setSuccess(true)
      setLoading(false)
      return
    }

    const payload = new FormData()`
  );
  fs.writeFileSync(ctaPath, cta);
}

// 4. AboutDeveloper.jsx
const aboutPath = `${path}/components/AboutDeveloper.jsx`;
let about = fs.readFileSync(aboutPath, 'utf8');
if (!about.includes('BLOCKED_GCLIDS')) {
  about = about.replace(
    `import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'`,
    `import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY, BLOCKED_GCLIDS } from '../lib/config'`
  );
  about = about.replace(
    `    const payload = new FormData()`,
    `    // Block the specific spam gclid
    if (
      tracking.gclid && 
      ((Array.isArray(BLOCKED_GCLIDS) && BLOCKED_GCLIDS.includes(tracking.gclid)) || 
      (typeof BLOCKED_GCLIDS === 'string' && BLOCKED_GCLIDS === tracking.gclid))
    ) {
      setSuccess(true)
      setLoading(false)
      return
    }

    const payload = new FormData()`
  );
  fs.writeFileSync(aboutPath, about);
}
console.log('Successfully applied changes to tata-ghansoli!');
