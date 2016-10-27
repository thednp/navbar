// Navbar.js | Build Script
// Build script to compile and minify the CSS file from SCSS folder
// Usage: npm run build-scss
// Run node build-scss.js --help for usage instructions

var sass = require('node-sass');
var pack = require('./package.json');
var version = 'v'+pack.version;
var license = pack.license+'-License';

console.log('Building navbar.css ' + version + '..');

// Helper Functions:
function sassify(custom, srcPath, writePath, compress) {
  sass.render({
    file: srcPath,
    outputStyle: compress,
    outFile: writePath,
    data: custom
  }, function(error, result) {
    if (error) {
      console.log(error.status);
      console.log(error.column);
      console.log(error.message);
      console.log(error.line);
    }  else {
      console.log(writePath+' is done.');
    }
  });
}

// Compile CSS
sassify('','SCSS/navbar.scss', 'navbar.css', 'compact'); // non-minified
sassify('','SCSS/navbar.scss', 'dist/navbar.min.css', 'compressed'); // minified


// DEMOS
sassify('','SCSS/navbar.scss', 'demo/src/css/navbar.min.css', 'compressed'); // main-menu
sassify('$nav_layout: "left-side";','SCSS/navbar.scss', 'demo/src/css/navbar-left.min.css', 'compressed'); // left-side
sassify('$nav_layout: "right-side";','SCSS/navbar.scss', 'demo/src/css/navbar-right.min.css', 'compressed'); // right-side

