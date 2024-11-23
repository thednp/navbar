export default function getMarkup() {
  const markup = `
<header class="container" style="padding: 3rem">
  <nav class="navbar" data-function="navbar" aria-label="Main">
    <a class="brand" href="https://github.com/thednp/navbar" title="Navbar on Github">Navbar</a>
    <button class="navbar-toggle" aria-label="Toogle Main Navigation" aria-haspopup="true" aria-expanded="false">
      <svg class="menu-icon" aria-hidden="true" viewBox="0 0 1024 1024">
        <path d="M896.876 319.65h-768.751c-14.152 0-25.625-11.473-25.625-25.625s11.473-25.625 25.625-25.625h768.751c14.153 0 25.625 11.473 25.625 25.625s-11.472 25.625-25.625 25.625z m0 256.25h-768.751c-14.152 0-25.625-11.472-25.625-25.625s11.473-25.625 25.625-25.625h768.751c14.153 0 25.625 11.472 25.625 25.625s-11.472 25.625-25.625 25.625z m0 256.25h-768.751c-14.152 0-25.625-11.472-25.625-25.625s11.473-25.625 25.625-25.625h768.751c14.153 0 25.625 11.472 25.625 25.625s-11.472 25.625-25.625 25.625z" />
      </svg>
    </button>
    <div>
      <ul class="nav">
        <li class="active">
          <a href="#" aria-haspopup="true" aria-expanded="false">Explore
            <svg class="parent-icon" aria-hidden="true" viewBox="0 0 1024 1024">
              <path d="M316 334l196 196 196-196 60 60-256 256-256-256z" />
            </svg>
          </a>
          <button class="subnav-toggle" aria-label="Toogle Submenu" aria-haspopup="true" aria-expanded="false">
            <svg class="menu-icon" aria-hidden="true" viewBox="0 0 1024 1024">
              <path d="M316 334l196 196 196-196 60 60-256 256-256-256z" />
            </svg>
          </button>
          <ul class="subnav">
            <li class="active">
              <a href="#">Demos
                <svg aria-hidden="true" class="parent-icon" viewBox="0 0 1024 1024">
                  <path d="M366 698l196-196-196-196 60-60 256 256-256 256z"></path>
                </svg>
              </a>
              <button class="subnav-toggle" aria-label="Toogle Submenu" aria-haspopup="true" aria-expanded="false">
                <svg class="menu-icon" aria-hidden="true" viewBox="0 0 1024 1024">
                  <path d="M316 334l196 196 196-196 60 60-256 256-256-256z" />
                </svg>
              </button>                  
              <ul class="subnav">
                <li class="active"><a href="index.html" aria-current="page">Main Demo</a></li>
                <li><a href="left.html">Left Side</a></li>
                <li><a href="left-menu.html">Left Menu</a></li>
                <li><a href="right.html">Right Side</a></li>
                <li><a href="combo.html">Combo</a></li>
                <li><a href="bootstrap.html">Bootstrap</a></li>
                <li><a href="bootstrap-extended.html">Bootstrap XT</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Documentation
                <svg aria-hidden="true" class="parent-icon" viewBox="0 0 1024 1024">
                  <path d="M366 698l196-196-196-196 60-60 256 256-256 256z"></path>
                </svg>
              </a>
              <button class="subnav-toggle" aria-label="Toogle Submenu" aria-haspopup="true" aria-expanded="false">
                <svg class="menu-icon" aria-hidden="true" viewBox="0 0 1024 1024">
                  <path d="M316 334l196 196 196-196 60 60-256 256-256-256z" />
                </svg>
              </button>                  
              <ul class="subnav">
                <li><a href="markup.html">Markup</a></li>
                <li><a href="data-api.html">DATA API</a></li>
                <li><a href="js-api.html">JavaScript API</a></li>
                <li><a href="megamenu.html">Mega Menu</a></li>
                <li><a href="scss.html">SCSS Source</a></li>
                <li><a href="rtl.html">RTL Languages</a></li>
                <li><a href="accessibility.html">Accessibility</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" aria-haspopup="true" aria-expanded="false">More</a>
        </li>
      </ul>
      <div class="copy navbar-content">
        <span><a target="_blank" href="https://github.com/thednp">thednp</a> &copy; 2022</span>
      </div>
    </div>
  </nav>
</header>  
  `;

  const container = document.createElement('div');
  container.innerHTML = markup;

  return container;
}
