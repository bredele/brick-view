var Store = require('store');
/**
 * Expose 'Lego'
 */

module.exports = Lego;


/**
 * Lego constructor.
 * @api public
 */

function Lego(tmpl) {
 if(!(this instanceof Lego)) return new Lego();
 this.data = {};
 this.formatters = {}; //do we need formatters?
}


for (var key in Store.prototype) {
  Lego.prototype[key] = Store.prototype[key];
}


function domify() {

}


Lego.prototype.build = function() {
	
};

Lego.prototype.destroy = function() {

};
