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

// bootstrap
var bootstrap = '';
// match colors, heights and spacing
bootstrap += '$brand_color: #337ab7;'; 
bootstrap += '$item_line_height: 20px;'; 
bootstrap += '$root_item_padding: 15px 15px;';
bootstrap += '$submenu_item_padding: 3px 20px;';
bootstrap += '$submenu_background: #fff;';
bootstrap += '$submenu_item_background: transparent;';
bootstrap += '$submenu_item_hover_color: #262626;';
bootstrap += '$submenu_item_hover_background: #f5f5f5;';
// adjustments for animation and colors
bootstrap += '.nav > li.active > a { color: #fff !important; background-color: $brand_color !important;}'; // force active root items to use these colors
bootstrap += '.nav { > li.open:not(.active), > li:hover:not(.active) { > a .parent-icon > * { fill: #262626 !important; } } }'; // set svg icons color
bootstrap += '.nav li ul {display: block !important};'; // this enables animation for submenus
bootstrap += '.nav li li.open-position > ul { margin-left: 2px; margin-top: -6px;}'; // adjust the position of level 2 submenus

sassify(bootstrap,'demo/src/css/navbar-bootstrap.min.css', 'compressed'); // bootstrap
