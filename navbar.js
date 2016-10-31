/* navbar.js - Minimal navigation script
 * by dnp_theme
 * Licensed under MIT-License
 */

(function (root,factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory); // AMD. Register as an anonymous module.
  } else if (typeof exports == 'object') {
    module.exports = factory(); // Node, not strict CommonJS
  } else {
    root.Navbar = factory();
  }
}(this, function () {

	var Navbar = function(el) {
		var menu = (typeof el === 'object') ? el : document.querySelector(el), self = this,
			items = menu.getElementsByTagName('LI'), il = items.length,
			isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false,
			events = ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'];

		function addClass(l,c) { // where modern browsers fail, use classList	
			if (l.classList) { l.classList.add(c); } else { l.className += ' '+c; l.offsetWidth; }
		}
		function removeClass(l,c) {
			if (l.classList) { l.classList.remove(c); } else { l.className = l.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
		}

		// handlers
		this.enter = function() {
			var that = this; // this is now the event target, the LI
			clearTimeout(this.timer);
			if ( !/\bopen/.test(this.className) ) {
				this.timer = setTimeout( function() {
					addClass(that,'open'); 
					addClass(that,'open-position');                        
					var s = that.parentNode.childNodes; //all parentNode children
					for ( var h=0; h<s.length; h++ ) {
						if ( s[h] && s[h].className && /open/.test(s[h].className) && s[h] !== that ) {//siblings only
							var _s = s[h];					
							if (!isIE) {
								removeClass(_s,'open'); setTimeout( function() { removeClass(_s,'open-position'); }, 150 ); 
							} else {
								removeClass(_s,'open-position'); removeClass(_s,'open'); 
							}
						}	
					}
				}, 100 );	
			}
		};
		this.leave = function() {
			var that = this;
			clearTimeout(this.timer);
			this.timer = setTimeout( function() {
				if (that && that.className && /open/.test(that.className) ) {
					removeClass(that,'open');
					setTimeout(function(){ removeClass(that,'open-position'); }, (isIE ? 0 : 200))
				}
			}, 500);
		};

		// init
		this.init = function(l) {
			l.addEventListener(events[0], this.enter, false);
			l.addEventListener(events[1], this.leave, false);	
		};

		// initiate
		for ( var i=0; i<il; i++ ) {
			if ( items[i].getElementsByTagName('UL').length !== 0 ) {
				this.init(items[i]);
			}
		}	
	},
	Navbars = document.querySelectorAll('[data-function="navbar"]'), nl = Navbars.length;
	for (var i=0; i<nl; i++){
		new Navbar(Navbars[i])
	}
	return Navbar;
}));	