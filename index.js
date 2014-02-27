var Store = require('store'),
		binding = require('binding'),
		each = require('each');
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

Lego.prototype.add = function(name, plug) {
	if(typeof name !== 'string') {
		each(name, function(attr, obj) {
			this.add(attr, obj);
		}, this);
	} else {
		this.bindings.add(name, plug);
	}
	return this;
};


Lego.prototype.build = function() {
	//change for mount
	this.bindings.scan(this.dom);
};

Lego.prototype.stack = function() {

};

Lego.prototype.destroy = function() {
	var parent = this.dom.parentElement;
	this.bindings.remove();
	if(parent) {
			//this.emit('removed');
			parent.removeChild(this.dom);
	}
	return this;
};

//partials, directive
