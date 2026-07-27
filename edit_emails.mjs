import fs from 'fs';
import path from 'path';

const files = [
  "AzerbaijanContact", "DubaiContact", "IstanbulContact",
  "SaudiContact", "UKContact", "USAContact"
];

for (const dir of files) {
  const filePath = path.join('src/app/api1', dir, 'route.js');
  if(!fs.existsSync(filePath)) {
      console.log(`Skipping \${dir}`);
      continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Add type to extraction
  content = content.replace(
    /const \{\s*name,\s*email,\s*destination(.*?),\s*startdate,\s*enddate,\s*month,\s*year\s*\} = await request\.json\(\);/,
    "const { name, email, destination$1, startdate, enddate, month, year, type } = await request.json();"
  );

  // Update Name in first template
  content = content.replace(
    /<p style="margin:20px 0 0; font-size:22px; color: white;">\(\$\{name\}\)<\/p>/g,
    `<p style="margin:20px 0 0; font-size:22px; color: white;">(\${type === 'group' ? 'Head of Delegate: ' : ''}\${name})</p>`
  );

  // Update Name in second template
  content = content.replace(
    /(\n\s*)\$\{name\}<\/p>/g,
    `$1\${type === 'group' ? 'Head of Delegate: ' : ''}\${name}</p>`
  );

  const ctaRegex = /(<!-- CTA BUTTON -->\s*<tr>[\s\S]*?<\/tr>)/g;
  content = content.replace(ctaRegex, (match) => `\${type === 'group' ? '' : \`${match}\`}`);

  const paymentTableRegex = /(<table[^>]*>\s*<tr>\s*<td[^>]*>Payment[\s\n]*<\/td>[\s\S]*?<\/table>)/ig;
  content = content.replace(paymentTableRegex, (match) => `\${type === 'group' ? '' : \`${match}\`}`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed \${dir}`);
}
