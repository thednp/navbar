# Navbar - minimal navigation script
This is a script that most web developers need for a quick site navigation, built with Native Javascript and supported on all major browsers as well as legacy browsers starting with IE8.

[![NPM Version](https://img.shields.io/npm/v/navbar.js.svg?style=flat-square)](https://www.npmjs.com/package/navbar.js)
[![NPM Downloads](https://img.shields.io/npm/dm/navbar.js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=navbar.js)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/navbar.js/badge)](https://www.jsdelivr.com/package/npm/navbar.js)
[![CDNJS](https://img.shields.io/cdnjs/v/navbar.js.svg?style=flat-square)](https://cdnjs.com/libraries/navbar.js)

# Demo
Download the package and check the demo folder, or check it online [here](http://thednp.github.io/navbar.js/).


# Features
* opens submenus on mouseenter, by adding `open` and `open-position` classes to the menu item, in rapid succession</li>
* hides submenus on mouseleave, by removing the above classes in a delayed succesion</li>
* super light script, `1.2k` in size when minified
* responsive design ready
* super light and easy to customize CSS
* 3 sets of positions top (main), left or right
* animations are based on position
* LESS/SCSS sources ready
* DATA API allows you to automatically initiate without JS invocation
* cross-browser supported

# NPM/Bower
You can install this through NPM or bower respectively:

```
$ npm install navbar.js
# or
$ bower install navbar.js
```

# Browser Usage
Download the [latest package](https://github.com/thednp/navbar.js/archive/master.zip). unpack and inspect the contents. You need to copy the `navbar.js` and `navbar.css` or their minified variations to your app `assets` folders as follows.
Link the required CSS in your document `<head>` tag
```html
<link href="../assets/css/navbar.css" rel="stylesheet">
```

Link the required JS in your document  `<body>` tag
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

Legacy browsers need `classList` polyfill, so give them <a href="https://github.com/thednp/minifill">minifill</a>.

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

* `$ npm run min-js` - to minify the **navbar.js**
* `$ npm run build-less` - to compile and minify the **navbar.less**
* `$ npm run build-scss` - to compile and minify the **navbar.scss**

# License
[MIT License](https://github.com/thednp/navbar.js/blob/master/LICENSE)
