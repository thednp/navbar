// Navbar.js | Compile SCSS Script
// Build script to compile and minify the CSS file from SCSS folder
// Usage: npm run compile-scss

const fs = require('fs');
const writeFileSync = fs.writeFileSync;
const sass = require('sass');
const pkg = require('./package.json');
const year = (new Date).getFullYear();
const args = {};

process.argv.map((x) => {const [name, value] = x.split(':'); args[name] = value; });

let banner = args.MIN === 'true'
? `/* Navbar.js v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License */`
: `/*!
* Navbar.js v${pkg.version} (${pkg.homepage})
* Copyright 2016-${year} © ${pkg.author}
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/`;

let INPUTFILE = args.INPUTFILE ? args.INPUTFILE : './src/scss/navbar.scss'
let OUTPUTFILE = args.OUTPUTFILE ? args.OUTPUTFILE : `./dist/css/navbar${(args.MIN?'.min':'')}.css`
let COMPRESS = args.MIN === 'true' ? 'compressed' : 'expanded'
let COPY = args.COPY === 'true' || false

// Helper Functions
function compile(inputPath, writePath, compressType) {
  let result = sass.renderSync({
    file: inputPath,
    // sourceMap: true,
    outFile: writePath,
    outputStyle: compressType,
    includePaths: ["src/scss"]
  })
  writeFileSync(writePath, `${banner}\n` + result.css.toString())
  console.log(`✅ Compiled ${inputPath} - ${pkg.version} to ${writePath}.`)
}
function copy(input,output) {
  fs.copyFile(input, output, (err) => {
    if (err) throw err;
    console.log(`✅ Copied ${input} to ${output}`);
  });
}

if (COPY) {
  copy(INPUTFILE, OUTPUTFILE)
} else {
  compile(INPUTFILE,OUTPUTFILE,COMPRESS)
}