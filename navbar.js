/* navbar.js - Minimal navigation script
 * by dnp_theme
 * Licensed under MIT-License
 
var Navbar = function(el) {
	var menu = (typeof el === 'object') ? el : queryElement(el), self = this,
		items = menu.getElementsByTagName('LI'), il = items.length;
	
	// methods
	this.init = function(l) {
		l.addEventListener("mouseenter", this.enter, false);
		l.addEventListener("mouseleave", this.leave, false);	
	},
	this.enter = function() {
		if (/in/.test(menu.parentNode.className)) {return;} 
          
          var that = this; // this is now the event target, the LI
		clearTimeout(this.getAttribute('data-timer'));
		if ( !/open/.test(this.className) ) {
			self.timer = setTimeout( function() {

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
			this.setAttribute('data-timer',self.timer);
		}
	},

	this.leave = function() {
		if (/in/.test(menu.parentNode.className)) {return;}
          var that = this;
		clearTimeout(this.getAttribute('data-timer'));
		self.timer = setTimeout( function() {
			if (that && that.className && /open/.test(that.className) && that.querySelector('.form-control') !== document.activeElement ) {
				removeClass(that,'open');
				setTimeout(function(){ removeClass(that,'open-position'); }, (isIE ? 0 : 200))
			}
		}, 500);
		this.setAttribute('data-timer',self.timer);	
	},
	this.timer = null;

	for ( var i=0; i<il; i++ ) {
		this.init(items[i]);
	}	

};
