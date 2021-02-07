# Navbar.js - Modern Navigation Component
The mobile first menu navigation for today's modern web, developed with native JavaScript and packed with lots of features.

[![NPM Version](https://img.shields.io/npm/v/navbar.js.svg?style=flat-square)](https://www.npmjs.com/package/navbar.js)
[![NPM Downloads](https://img.shields.io/npm/dm/navbar.js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=navbar.js)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/navbar.js/badge)](https://www.jsdelivr.com/package/npm/navbar.js)

# Demo
Download the package and check the demo folder, or check it online [here](http://thednp.github.io/navbar.js/).

# Navbar.js Highlights
* Mobile First Design
* ES6+ sources and powerful build tools
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

# NPM
You can install this through NPM:

```
$ npm install navbar.js
```

# Browser Usage
Download the [latest package](https://github.com/thednp/navbar.js/archive/master.zip). unpack and inspect the contents. You need to copy the `navbar.js` and `navbar.css` or their minified variations to your app `assets` folders as follows.
Link the required CSS in your document `<head>` tag
```html
<link href="../assets/css/navbar.css" rel="stylesheet">
```

Link the required JS in your document  `<body>` tag, though it should work in the `<head>` as well
```html
<script src="../assets/js/navbar.js"></script>
```

Initiate the function for your elements at the end of your `<body>` tag
```javascript
<script>
var myMenu = new Navbar('selector');
</script>
```

To use the DATA-API, you need to provide the `data-function="navbar"` attribute to your navbar, like so:
```markup
<nav class="navbar" data-function="navbar">
  <a href="#" title="App Name">Brand Name</a>
  <button class="navbar-toggle">
    <i class="menu-icon"></i>
  </button>
  <div>
    <ul class="nav">
      <li><a href="#">Link Title</a></li>
      <li><a href="#">Another Link Title</a></li>
    </ul>
  </div>
</nav>
```

Alternatively you can use only the menu itself and use the specific attribute:

```markup
<div class="sidebar">
  <ul class="nav" data-function="navbar">
    <li><a href="#">Link Title</a></li>
    <li><a href="#">Another Link Title</a></li>
  </ul>
</div>
```

Other initialization and markup options apply, explained in [the demo](http://thednp.github.io/navbar.js/).


# ES6+
```javascript
import Navbar from 'navbar.js'

let myNav = new Navbar('#myNav')
```

# Node
```javascript
// get and store it
var Navbar = require("navbar.js");

// initialize it
var myMenu = new Navbar('#myNav');
```


# Build Tools
You have 3 build tools for building custom builds

* `$ npm run build` - to compile and minify the ES6/ES7 source **navbar.js** and **navbar.min.js**
* `$ npm run compile` - to compile and minify the **navbar.less** and other demo related sources
* `$ npm run bundle` - to execute both the above in paralel
* `$ npm run polyfill` - to build the polyfill

# Custom CSS Builds
You can create your own custom styling, here's a quickie:
* create a new file for instance `src/scss/my-navbar.scss`, 
* include the mixins and variables' values you need (check out the demos for more)
* run the below script

```
node compile.js INPUTFILE:src/scss/my-navbar.scss OUTPUTFILE:path-to/src/css/my-navbar.min.css MIN:true
```

# License
[MIT License](https://github.com/thednp/navbar.js/blob/master/LICENSE)
