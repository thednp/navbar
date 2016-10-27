# Navbar - minimal navigation script
This is a script that most web developers need for a quick site navigation, built with Native Javascript and supported on all major browsers as well as legacy browsers starting with IE8.

# Demo
Download the package and check the demo folder, or check it online [here](http://thednp.github.io/navbar.js/).


# Features
* opens submenus on mouseenter, by adding `open` and `open-position` classes to the menu item, in rapid succession</li>
* hides submenus on mouseleave, by removing the above classes in a delayed succesion</li>
* super light script, `1.4k` in size when minified
* super light and easy to customize CSS
* 3 sets of positions top (main), left or right
* animations are based on position
* LESS/SCSS sources ready
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
* `$ npm build-scss` - to compile and minify the **navbar.scss**


# To do
* Responsive design CSS
* Responsive design JS
* DATA API

# License
[MIT License](https://github.com/thednp/navbar.js/blob/master/LICENSE)
