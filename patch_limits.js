const fs = require('fs');

const projects = [
  '/Users/mac/Desktop/tata-ghansoli-new-domain',
  '/Users/mac/Desktop/tata-ghansoli'
];

const filesToPatch = [
  'components/LeadForm.jsx',
  'components/ContactCTA.jsx',
  'components/AboutDeveloper.jsx'
];

const injectionCode = `
    // --- UNIVERSAL BROWSER LIMIT (Max 3 submissions / 30 days) ---
    let currentCount = 0;
    const cookieRegex = new RegExp(\`(?:^|; )lead_trk_count_\${PROJECT_ID}=([^;]*)\`);
    const cookieMatch = document.cookie.match(cookieRegex);
    const cookieCount = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;
    
    let lsCount = 0;
    const lsKey = \`lead_trk_data_\${PROJECT_ID}\`;
    const lsDataStr = localStorage.getItem(lsKey);
    let firstSeen = Date.now();
    
    if (lsDataStr) {
      try {
        const lsData = JSON.parse(lsDataStr);
        if (Date.now() - lsData.firstSeen < 2592000000) { // 30 days in ms
          lsCount = lsData.count || 0;
          firstSeen = lsData.firstSeen;
        } else {
          localStorage.removeItem(lsKey);
        }
      } catch (e) {}
    }
    
    currentCount = Math.max(cookieCount, lsCount);
    
    if (currentCount >= 3) {
      setSuccess(true);
      setLoading(false);
      return;
    }
    // -------------------------------------------------------------

    const payload = new FormData()`;

    // Note: To complete the implementation in target files, you need to add the increment logic inside `if (data.status) { ... }`:
    // const newCount = currentCount + 1;
    // if (typeof document !== 'undefined') document.cookie = \`lead_trk_count_\${PROJECT_ID}=\${newCount}; max-age=2592000; path=/\`;
    // if (typeof localStorage !== 'undefined') localStorage.setItem(\`lead_trk_data_\${PROJECT_ID}\`, JSON.stringify({ count: newCount, firstSeen }));

const searchString = `    const payload = new FormData()`;

projects.forEach(project => {
  filesToPatch.forEach(file => {
    const filePath = `${project}/${file}`;
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Only patch if not already patched
      if (!content.includes('UNIVERSAL BROWSER LIMIT')) {
        content = content.replace(searchString, injectionCode);
        fs.writeFileSync(filePath, content);
        console.log(`Patched: ${filePath}`);
      } else {
        console.log(`Already patched: ${filePath}`);
      }
    } else {
      console.log(`File not found: ${filePath}`);
    }
  });
});

console.log('All done!');
