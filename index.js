var Store = require('store'),
		binding = require('binding'),
		each = require('each');


/**
 * Expose 'Lego'
 */

module.exports = Brick;


/**
 * Brick constructor.
 * example:
 * 
 *   var lego = require('lego');
 *   
 *   lego('<span>lego</span>');
 *   lego('<span>{{ label }}</span>', {
 *     label: 'lego'
 *   });
 *
 * @event 'before ready'
 * @event 'ready' 
 * @api public
 */

function Brick(tmpl, data) {
 if(!(this instanceof Brick)) return new Brick(tmpl, data);
 this.data = data || {};

 //refactor binding
 this.bindings = binding();
 this.bindings.model = this;

 this.formatters = {}; //do we need formatters?
 this.el = null;
 this.dom(tmpl);
 this.once('before inserted', function(bool) {
 	this.emit('before ready');
 	this.bindings.scan(this.el, bool);
 	this.emit('ready');
 }, this);
}


//mixin

for (var key in Store.prototype) {
  Brick.prototype[key] = Store.prototype[key];
}


/**
 * Add attribure binding.
 * example:
 *
 *   view.add('on', event(obj));
 *   view.add({
 *     'on' : event(obj).
 *     'repeat' : repeat()
 *   });
 *   
 * @param {String|Object} name
 * @param {Function} plug 
 * @return {Brick}
 * @api public
 */

Brick.prototype.add = function(name, plug) {
	if(typeof name !== 'string') {
		each(name, this.add, this);
	} else {
		this.bindings.add(name, plug);
		if(plug.init) plug.init(this);
	}
	return this;
};


/**
 * Render template into dom.
 * example:
 *
 *   view.dom('<span>lego</span>');
 *   view.dom(dom);
 *   
 * @param  {String|Element} tmpl
 * @return {Brick}
 * @event 'rendered' 
 * @api public
 */

Brick.prototype.dom = function(tmpl) {
	if(typeof tmpl === 'string') {
		var div = document.createElement('div');
		div.insertAdjacentHTML('beforeend', tmpl);
		this.el = div.firstChild;
	} else {
		this.el = tmpl;
	}
	this.emit('rendered');
	return this;
};


/**
 * Substitute variable and apply
 * attribute bindings.
 * example:
 *
 *    view.build();
 *    view.build(el);
 *
 *    //only apply attribute bindings
 *    view.build)(el, true);
 *    
 * @param  {Element} parent
 * @param {Boolean} query
 * @return {Brick}
 * @event 'before inserted'
 * @event 'inserted' 
 * @api public
 */

Brick.prototype.build = function(parent, query) {
	if(this.el) {
		this.emit('before inserted', query); //should we pass parent?
		if(parent) {
			parent.appendChild(this.el); //use cross browser insertAdjacentElement
			this.emit('inserted');
		}
	}
	return this;
};


/**
 * Remove attribute bindings, store
 * listeners and remove dom.
 * 
 * @return {Brick}
 * @event 'before removed'
 * @event 'removed' 
 * @api public
 */

Brick.prototype.remove = function() {
	var parent = this.el.parentElement;
	this.emit('before removed');
	this.bindings.remove();
	if(parent) {
			//this.emit('removed');
			parent.removeChild(this.el);
	}
	this.emit('removed');
	return this;
};

//partials, directive
