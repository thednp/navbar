'use strict'
import buble from '@rollup/plugin-buble'
import node from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import {terser} from 'rollup-plugin-terser'
import * as pkg from "./package.json";

// set headers
const year = (new Date).getFullYear()
const banner = `/*!
* Navbar.js v${pkg.version} (${pkg.homepage})
* Copyright 2016-${year} © ${pkg.author}
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
"use strict";`

const miniBanner = `// Navbar.js Polyfill v${pkg.version} | ${year} © ${pkg.author} | ${pkg.license}-License
"use strict";`

// set config
const MIN = process.env.MIN === 'true' // true/false|unset
const FORMAT = 'esm' // umd|iife|esm|cjs

const INPUTFILE = 'src/js/polyfill.js'
const OUTPUTFILE = 'dist/js/polyfill'+(MIN?'.min':'')+'.js'

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT, // or iife
}

const PLUGINS = [
  node(),
  json(),
  buble()
]

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBanner}}));
} else {
  OUTPUT.banner = banner;
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]