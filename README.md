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
* LESS sources `coming soon`
* cross-browser supported

# Usage
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

# To do
* Responsive design CSS
* Responsive design JS
* LESS/SASS sources
* npm/Bower and Require/CommonJS

# License
[MIT License](https://github.com/thednp/navbar.js/LICENSE)
