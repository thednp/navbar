# Navbar - minimal navigation script
This is a script that most web developers need for a quick site navigation, built with Native Javascript and supported on all major browsers as well as legacy browsers starting with IE8.

# Demo
Download the package and check the demo folder, an online demo will be available later.

# Features
* super light code, 1.4k in size when minified
* opens submenus on `mouseenter`
* hides submenus on `mouseleave`
* cross-browser supported

# Usage
Link the required CSS in your document `<head>` tag
```html
<link href="../dist/navbar.css" rel="stylesheet">
```

Link the required JS in your document  `<body>` tag
```html
<script src="../dist/navbar.js"></script>
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
MIT License
