var Store = require('store');
/**
 * Expose 'Lego'
 */

module.exports = Lego;


function domify(html) {
	var div = document.createElement('div');
	div.insertAdjacentHTML('beforeend', html);
	return div.firstChild;
}


/**
 * Lego constructor.
 * @api public
 */

function Lego(tmpl) {
 if(!(this instanceof Lego)) return new Lego(tmpl);
 this.data = {};
 this.formatters = {}; //do we need formatters?
 //what if tmpl undefined?
 this.dom = (typeof tmpl === 'string') ? domify(tmpl) : tmpl;
}


for (var key in Store.prototype) {
  Lego.prototype[key] = Store.prototype[key];
}

Lego.prototype.build = function() {
	
};

Lego.prototype.destroy = function() {

};
