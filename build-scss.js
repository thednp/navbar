// Navbar.js | Build Script
// Build script to compile and minify the CSS file from SCSS folder
// Usage: npm run build-scss
// Run node build-scss.js --help for usage instructions

var fs = require('fs');
var sass = require('sass.js');
var pack = require('./package.json');
var version = 'v'+pack.version;
var license = pack.license+'-License';

var variables = fs.readFileSync('SCSS/variables.scss').toString();
var style = fs.readFileSync('SCSS/navbar.scss').toString();

console.log('Compiling navbar.scss ' + version + '..');

// Helper Functions:
function sassify(custom, writePath, compressType) {
  sass.compile(( custom + variables + style ), {
    style: sass.style[compressType]
  }, function callback(result) {
    if (result.status === 0) {
      fs.writeFile(writePath, '/* navbar.js ' + version + ' | © dnp_theme | ' + license + '*/\n' + result.text);
      console.log(writePath+' is done.');
    } else {
      console.log(result.status);
      console.log(result.column);
      console.log(result.message);
      console.log(result.line);
    }
  });
}

// Compile CSS and prepare distributions
sassify('', 'navbar.css', 'compact'); // non-minified
sassify('', 'dist/navbar.min.css', 'compressed'); // minified


// prepare demos
sassify('', 'demo/src/css/navbar.min.css', 'compressed'); // main-menu
sassify('$brand_color: #CD3232; $nav_layout: "left-side";', 'demo/src/css/navbar-left.min.css', 'compressed'); // left-side
sassify('$brand_color: #8032CD; $nav_layout: "right-side";', 'demo/src/css/navbar-right.min.css', 'compressed'); // right-side

