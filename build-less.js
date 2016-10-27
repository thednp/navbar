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

console.log('Building navbar.css ' + version + '..');

// Helper Functions:
function lessify(custom, srcPath, writePath, compress) {
  less.render((fs.readFileSync(srcPath).toString() + custom), {compress:compress})
    .then( function (output) {
      output.imports = ['LESS/variables.less'];
      fs.writeFile(writePath, '/* navbar.js ' + version + ' | © dnp_theme | ' + license + '*/\n' + output.css);
      console.log(writePath+' is done.');
    }, function(err) {
      console.error(err);
      process.exit(1);
    });
}

// Compile CSS
lessify('','LESS/navbar.less', 'navbar.css', false); // non-minified
lessify('','LESS/navbar.less', 'dist/navbar.min.css', true); // minified

// demos
lessify('','LESS/navbar.less', 'demo/src/css/navbar.min.css', true); // main-menu
lessify('@nav_layout: "left-side";','LESS/navbar.less', 'demo/src/css/navbar-left.min.css', true); // left-side
lessify('@nav_layout: "right-side";','LESS/navbar.less', 'demo/src/css/navbar-right.min.css', true); // right-side

