import fs from 'fs';
import path from 'path';

const files = [
  "AzerbaijanContact", "DubaiContact", "IstanbulContact",
  "SaudiContact", "UKContact", "USAContact"
];

for (const dir of files) {
  const filePath = path.join('src/app/api1', dir, 'route.js');
  if(!fs.existsSync(filePath)) {
      console.log(`Skipping ${dir}`);
      continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to find: <h2 style="margin:0; font-size:20px; color:#000;">Date: ${startdate}–${enddate} ${month}, ${year}</h2>
  // We will replace the whole Date string with a conditionally evaluated JS expression block inside the template literal.
  const regex = /Date:\s*\$\{startdate\}[^\$]*\$\{enddate\}[^\$]*\$\{month\}[^\$]*\$\{year\}/g;
  const replacement = "Date: ${startdate === 'Coming Soon' ? 'Coming Soon' : `${startdate}–${enddate} ${month}, ${year}`}";
  
  content = content.replace(regex, replacement);

  // Also in some files maybe it uses "Date : " or similar. Let's make it more general just in case.
  const regex2 = /Date:\s*\$\{startdate\}\s*–\s*\$\{enddate\}\s*\$\{month\},\s*\$\{year\}/g;
  content = content.replace(regex2, replacement);
  
  // also check if any other places have it
  const regex3 = /\$\{startdate\}–\$\{enddate\} \$\{month\}, \$\{year\}/g;
  content = content.replace(regex3, "${startdate === 'Coming Soon' ? 'Coming Soon' : `${startdate}–${enddate} ${month}, ${year}`}");

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated dates in ${dir}`);
}
