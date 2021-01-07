# Navbar.js - Modern Navigation Component
The mobile first menu navigation for today's modern web, developed with native JavaScript and packed with lots of features.

[![NPM Version](https://img.shields.io/npm/v/navbar.js.svg?style=flat-square)](https://www.npmjs.com/package/navbar.js)
[![NPM Downloads](https://img.shields.io/npm/dm/navbar.js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=navbar.js)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/navbar.js/badge)](https://www.jsdelivr.com/package/npm/navbar.js)

# Demo
Download the package and check the demo folder, or check it online [here](http://thednp.github.io/navbar.js/).

# Navbar.js Highlights
* Mobile First Design
* ES6/ES7 sources and powerful build tools
* SCSS sources with powerful mixins and advanced inheritance and automation functionality
* very light footprint, `3kb` in size when minified
* 3 sets of positions top (main), left or right
* provides a set of options for JavaScript initialization
* DATA API allows you to automatically initiate without JS invocation
* modern browsers supported and semi-modern alike with a special polyfill for IE10+ provided

# How It Works
* On mobile
  * uses the default events behavior, it requires some elements to click on
  * shows the `<button class="navbar-toggle">` element for element visibility toggle
  * menu items have a `<i class="parent-toggle">` element that enables visibility of the submenus
  * makes use of the `open-mobile` class to toggle submenus via the `click` handler</li>

* On the desktop
  * hides mobile specific elements and changes event behavior to mouse hover
  * opens submenus on `mouseenter`, by adding `open` and `open-position` classes to the menu item, in rapid succession</li>
  * hides submenus on `mouseleave`, by removing the above classes in a delayed succesion</li>

# Wiki
Head over to the [wiki pages](https://github.com/thednp/navbar.js/wiki) for developer guidelines.

# License
[MIT License](https://github.com/thednp/navbar.js/blob/master/LICENSE)
