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

const regexBlock = /\s*\/\/\s*Block the specific spam gclid\s*if\s*\(\s*tracking\.gclid\s*&&\s*\(\(Array\.isArray\(BLOCKED_GCLIDS\)\s*&&\s*BLOCKED_GCLIDS\.includes\(tracking\.gclid\)\)\s*\|\|\s*\(typeof BLOCKED_GCLIDS === 'string'\s*&&\s*BLOCKED_GCLIDS === tracking\.gclid\)\)\s*\)\s*\{\s*setSuccess\(true\)\s*setLoading\(false\)\s*return\s*\}/g;

projects.forEach(project => {
  filesToPatch.forEach(file => {
    const filePath = `${project}/${file}`;
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (regexBlock.test(content)) {
        content = content.replace(regexBlock, '');
        fs.writeFileSync(filePath, content);
        console.log(`Successfully REMOVED config block in: ${filePath}`);
      } else {
        console.log(`Config block not found in: ${filePath}`);
      }
    }
  });
});
