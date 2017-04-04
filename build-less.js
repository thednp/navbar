// Navbar.js | Build Script
// Build script to compile and minify the CSS file from LESS folder
// Usage: npm run build-less
// Run node build-less.js --help for usage instructions

// in node you can also run these
// lessc LESS/navbar.less navbar.css
// lessc -x LESS/navbar.less dist/navbar.min.css

// or add these in package.json > scripts 
// "compile-less": "lessc LESS/navbar.less navbar.css",
// "minify-less": "lessc -x LESS/navbar.less dist/navbar.min.css"

var fs = require('fs');
var less = require('less');
var pack = require('./package.json');
var version = 'v'+pack.version;
var license = pack.license+'-License';

var style = fs.readFileSync('LESS/navbar.less').toString();
var variables = fs.readFileSync('LESS/variables.less').toString();
var bsnav = fs.readFileSync('LESS/bootstrap.less').toString();

console.log('Compiling navbar.less ' + version + '..');

// Helper Functions:
function lessify(custom, writePath, compress) {
  less.render((style + variables + custom), {compress:compress})
    .then( function (output) {
      fs.writeFileSync(writePath, '/* navbar.js ' + version + ' | © dnp_theme | ' + license + '*/\n' + output.css);
      console.log(writePath+' is done.');
    }, function(err) {
      console.error(err);
      process.exit(1);
    });
}

// Compile CSS and prepare distributions
lessify('', 'navbar.css', false); // non-minified
lessify('','dist/navbar.min.css', true); // minified

// prepare demos
lessify('','demo/src/css/navbar.min.css', true); // main-menu
lessify('@nav_layout: "left-side"; @brand_color: #CD3232;','demo/src/css/navbar-left.min.css', true); // left-side
lessify('@nav_layout: "right-side"; @brand_color: #8032CD;','demo/src/css/navbar-right.min.css', true); // right-side

// bootstrap
lessify(bsnav,'demo/src/css/navbar-bootstrap.min.css', true); // bootstrap

