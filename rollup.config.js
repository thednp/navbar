'use strict';
import buble from '@rollup/plugin-buble';
import {terser} from 'rollup-plugin-terser';
import node from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import * as pkg from "./package.json";

const ES = process.env.ES; // es6|es5
const MIN = process.env.MIN === 'true' || false; // true/false|unset
const FORMAT = process.env.FORMAT; // JS umd|iife|esm

const year = (new Date).getFullYear();

const banner =
`/*!
* Navbar.js v${pkg.version} (${pkg.homepage})
* Copyright 2016-${year} © ${pkg.author}
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/`;

const miniBannerJS = `// Navbar.js v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License`;

const INPUTFILE = 'src/js/index.js';
const OUTPUTFILE = 'dist/js/navbar'+(FORMAT!=='umd'?'.'+FORMAT:'')+(ES?`.${ES}`:'')+(MIN?'.min':'')+'.js';

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT // or iife
};

const PLUGINS = [ 
  json(),
  node({mainFields: ['jsnext', 'module']}) 
];

if (ES === 'es5'){
  PLUGINS.push(buble({objectAssign: 'Object.assign'}));
}

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBannerJS}}));
} else {
  OUTPUT.banner = banner;
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