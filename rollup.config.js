'use strict';
import buble from '@rollup/plugin-buble';
import {terser} from 'rollup-plugin-terser';
import node from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import json from '@rollup/plugin-json';
import * as pkg from "./package.json";

const POLYFILL = process.env.POLYFILL === 'true'
const MIN = process.env.MIN === 'true' || false; // true/false|unset
const FORMAT = process.env.FORMAT; // JS umd|iife|esm

const year = (new Date).getFullYear();

const banner = POLYFILL ? '"use strict";':
`/*!
* Navbar.js v${pkg.version} (${pkg.homepage})
* Copyright 2016-${year} © ${pkg.author}
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/`;

const miniBannerJS = POLYFILL ? banner
: `// Navbar.js v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License`;

const INPUTFILE = POLYFILL ? 'src/js/polyfill.js' : 'src/js/index.js';
const OUTPUTFILE = POLYFILL ? 'dist/js/polyfill'+(MIN?'.min':'')+'.js'  : 'dist/js/navbar'+(FORMAT==='esm'?'.esm':'')+(MIN?'.min':'')+'.js';

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT // or iife
};

const PLUGINS = [ 
  json(), 
  buble(),
  node({mainFields: ['shorter-js', 'module']}) 
];

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBannerJS}}));
} else {
  OUTPUT.banner = banner;
  PLUGINS.push(cleanup());
}

if (FORMAT!=='esm') {
  OUTPUT.name = 'Navbar';
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]