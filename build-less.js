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
var bootstrap = '';
// match colors, heights and spacing
bootstrap += '@brand_color: #337ab7;';
bootstrap += '@item_line_height: 20px;'; 
bootstrap += '@root_item_padding: 15px 15px;';
bootstrap += '@submenu_item_padding: 3px 20px;';
bootstrap += '@submenu_background: #fff;';
bootstrap += '@submenu_item_background: transparent;';
bootstrap += '@submenu_item_hover_color: #262626;';
bootstrap += '@submenu_item_hover_background: #f5f5f5;';
// adjustments for animation and colors
bootstrap += '.nav > li.active > a { color: #fff !important; background-color: @brand_color !important;}'; // force active root items to use these colors
bootstrap += '.nav { > li.open:not(.active), > li:not(.active):hover { > a .parent-icon > * { fill: #262626; } } }'; // set svg icons color
bootstrap += '.nav li ul {display: block !important};'; // this enables animation for submenus
bootstrap += '.nav li li.open-position > ul { margin-left: 2px; margin-top: -6px;}'; // adjust the position of level 2 submenus

lessify(bootstrap,'demo/src/css/navbar-bootstrap.min.css', true); // bootstrap

