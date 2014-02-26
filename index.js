var Store = require('store'),
		binding = require('binding');
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

function Lego(tmpl, data) {
 if(!(this instanceof Lego)) return new Lego(tmpl, data);
 this.data = data || {};

 //refactor binding
 this.bindings = binding();
 this.bindings.model = this;

 this.formatters = {}; //do we need formatters?
 this.dom = (typeof tmpl === 'string') ? domify(tmpl) : tmpl; //what if tmpl undefined?
}


for (var key in Store.prototype) {
  Lego.prototype[key] = Store.prototype[key];
}

Lego.prototype.build = function() {
	//change for mount
	this.bindings.apply(this.dom);
};

Lego.prototype.destroy = function() {

};

//stack for partials, directive
