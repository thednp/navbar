// Navbar.js | Build Script
// Build script to compile and minify the CSS file from SCSS folder
// Usage: npm run build-scss
// Run node build-scss.js --help for usage instructions

var fs = require('fs');
var sass = require('node-sass');
var pack = require('./package.json');
var version = 'v'+pack.version;
var license = pack.license+'-License';

var variables = fs.readFileSync('SCSS/variables.scss').toString();

console.log('Compiling navbar.scss ' + version + '..');

// Helper Functions:
function sassify(custom, srcPath, writePath, compressType) {
  sass.render({
    data: ( variables + custom + fs.readFileSync(srcPath).toString() ),
    outputStyle: compressType
  }, function(error, result) {
    if (error) {
      console.log(error.status);
      console.log(error.column);
      console.log(error.message);
      console.log(error.line);
    }  else {
      fs.writeFile(writePath, '/* navbar.js ' + version + ' | © dnp_theme | ' + license + '*/\n' + result.css);
      console.log(writePath+' is done.');
    }
  });
}

// Compile CSS and prepare distributions
sassify('','SCSS/navbar.scss', 'navbar.css', 'compact'); // non-minified
sassify('','SCSS/navbar.scss', 'dist/navbar.min.css', 'compressed'); // minified


// prepare demos
sassify('','SCSS/navbar.scss', 'demo/src/css/navbar.min.css', 'compressed'); // main-menu
sassify('$brand_color: #CD3232; $nav_layout: "left-side"; ','SCSS/navbar.scss', 'demo/src/css/navbar-left.min.css', 'compressed'); // left-side
sassify('$brand_color: #8032CD; $nav_layout: "right-side"; ','SCSS/navbar.scss', 'demo/src/css/navbar-right.min.css', 'compressed'); // right-side

