// Navbar.js | Build Script
// Build script to minify the js file in dist/
// Usage: npm run min-js
// Run node build-js.js --help for usage instructions

var fs = require('fs');
var uglify = require('uglify-js');
var pack = require('./package.json');
var version = 'v'+pack.version;
var license = pack.license+'-License';

console.log('Building navbar.js ' + version + '..');

function minifyJS(srcPath, writePath) {
  fs.writeFile(writePath, 
    ('// navbar.js ' + version + ' | © dnp_theme | ' + license + '\n' 
    + uglify.minify(srcPath).code), function (err) {
      if (err) return handleError(err);
      console.log(writePath+' is done.');
    }
  );
}

function handleError(err) {
  console.error(err);
  process.exit(1);
}

// Minify JS
minifyJS('navbar.js', 'dist/navbar.min.js');

// DEMO
minifyJS('navbar.js', 'demo/src/js/navbar.min.js');