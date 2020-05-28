# Navbar.js - Modern Navigation Component
The mobile first menu navigation for today's modern web, developed with native JavaScript and packed with lots of features.

[![NPM Version](https://img.shields.io/npm/v/navbar.js.svg?style=flat-square)](https://www.npmjs.com/package/navbar.js)
[![NPM Downloads](https://img.shields.io/npm/dm/navbar.js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=navbar.js)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/navbar.js/badge)](https://www.jsdelivr.com/package/npm/navbar.js)

<div style="width:60%; margin:0 auto; max-width: 100%">
[![NAVBAR Preview](./demo/assets/img/navbar.png)](./demo/assets/img/navbar.png)
</div>

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
* modern browser supported and semi-modern alike with a special polyfill for IE10+ provided

# How It Works
* opens submenus on `mouseenter`, by adding `open` and `open-position` classes to the menu item, in rapid succession</li>
* hides submenus on `mouseleave`, by removing the above classes in a delayed succesion</li>
* on mobile devices it makes use of the `open-mobile` class to toggle submenus and a `click` handler associated</li>

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

To use the DATA-API, you need to provide the `data-function="navbar"` attribute to your menu, like so:
```markup
<ul class="nav" data-function="navbar">
  <li><a href="#">Link Title</a></li>
  <li><a href="#">Another Link Title</a></li>
</ul>
```
Other initialization options apply, explained in the demo.


# Node
On node.js environments
```javascript
// get and store it
var Navbar = require("navbar.js");

// initialize it
var myMenu = new Navbar('selector');
```

# Build Tools
You have 3 build tools for building custom builds

* `$ npm run build` - to compile and minify the ES6/ES7 source **navbar.js** and **navbar.min.js**
* `$ npm run compile` - to compile and minify the **navbar.less** and other demo related sources
* `$ npm run bundle` - to execute both the above in paralel

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
