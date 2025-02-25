# Navbar - Modern Navigation Component
[![Coverage Status](https://coveralls.io/repos/github/thednp/navbar/badge.svg)](https://coveralls.io/github/thednp/navbar)
[![ci](https://github.com/thednp/navbar/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/navbar/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@thednp/navbar.svg)](https://www.npmjs.com/package/@thednp/navbar)
[![NPM Downloads](https://img.shields.io/npm/dm/@thednp/navbar.svg)](http://npm-stat.com/charts.html?package=@thednp/navbar)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/@thednp/navbar/badge)](https://www.jsdelivr.com/package/npm/@thednp/navbar)
[![typescript version](https://img.shields.io/badge/typescript-5.6.3-brightgreen)](https://www.typescriptlang.org/)
[![vitest version](https://img.shields.io/badge/vitest-2.1.5-brightgreen)](https://vitest.dev/)
[![vite version](https://img.shields.io/badge/vite-5.4.11-brightgreen)](https://github.com/vitejs)

The mobile first menu navigation for today's modern web, sourced with Typescript and packed with lots of features.


## Demo
Download the package and check the **docs** folder, or check it online [here](http://thednp.github.io/navbar).

# Navbar Highlights
* Mobile First Design
* Accessibility Focus
* TypeScript sourced and powerful build tools
* SCSS sources with flexible mixins and CSS variables
* very light footprint, `5kb` in size when minified
* 3 sets of positions top (main), left or right
* provides a set of options for JavaScript initialization
* DATA API allows you to automatically initiate without JS invocation
* modern browsers supported


## How It Works
**On mobile**
  * uses the native events behavior, it requires some elements to click on
  * shows the `<button class="navbar-toggle">` element for element visibility toggle
  * menu items have a `<button class="subnav-toggle">` element that enables visibility of the submenus
  * makes use of the `open-mobile` class to toggle submenus via the `click` handler</li>

**On the desktop**
  * hides mobile specific elements and changes event behavior to mouse hover
  * opens submenus on `mouseenter`, by adding `open` and `open-position` classes to the menu item, in rapid succession</li>
  * hides submenus on `mouseleave`, by removing the above classes in a delayed succesion</li>

On both mobile and desktop, Navbar.js allows for full keyboard navigation via the **TAB** and **SPACE** keys. In addition, directional arrows provide navigation on desktop with RTL support.

## Install
```bash
pnpm install -D @thednp/navbar
```

```bash
yarn add -D @thednp/navbar
```

```bash
npm install -D @thednp/navbar
```

```bash
deno add -D npm:@thednp/navbar@latest
```


## Browser Usage
Download the [latest package](https://github.com/thednp/navbar/archive/master.zip). unpack and inspect the contents. You need to copy the `navbar.js` and `navbar.css` or their minified variations to your app `assets` folders as follows.
Link the required CSS in your document `<head>` tag
```html
<link href="../assets/css/navbar.css" rel="stylesheet">
```

Link the required JS in your document  `<body>` tag, though it should work in the `<head>` as well
```html
<script src="../assets/js/navbar.js"></script>
```

Initiate the function for your elements at the end of your `<body>` tag
```html
<script>
var myMenu = new Navbar('selector');
</script>
```

To use the DATA-API, you need to provide the `data-function="navbar"` attribute to your navbar, like so:
```html
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

```html
<div class="sidebar">
  <ul class="nav" data-function="navbar">
    <li><a href="#">Link Title</a></li>
    <li><a href="#">Another Link</a></li>
  </ul>
</div>
```

Other initialization and markup options apply, explained in [the demo](http://thednp.github.io/navbar/).


## Typescript / ES
```ts
import Navbar from '@thednp/navbar'

const myNav = new Navbar('#myNav')
```


## License
Navbar is released under [MIT License](https://github.com/thednp/navbar/blob/master/LICENSE).
