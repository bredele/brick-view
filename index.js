var Binding = require('data-binding');
var Store = require('store');

//TODO: do our own component
//with just what we need
function domify(tmpl){
  if(tmpl instanceof HTMLElement) return tmpl;
  //may be by applying binding on this node we can have multiple
  //children
  var div = document.createElement('div');
  div.innerHTML = tmpl;
  return div.firstChild;
}

/**
 * Expose 'Widget'
 */

module.exports = Widget;


/**
 * Widget constructor.
 * We keep the constructor clean for override.
 * @api public
 */

function Widget(){
  this.dom = null;
  this.store = null;
  this.binding = new Binding();
}


/**
 * Turn HTML into DOM with data store.
 * The template is either a string or 
 * an existing HTML element.
 * @param  {String|HTMLElement} tmpl  
 * @param  {Object} store can be nothing, an object or a store
 * @api public
 */

Widget.prototype.template = function(tmpl, store, view) {
  //TODO: I would like ideally work on adapter and not store
  this.store = new Store(store);
  //TODO: refactor data-biding, we did that because we can't initialize binding with model
  this.binding.model = this.store;
  this.dom = domify(tmpl);
  return this;
};


Widget.prototype.plugin = function(name, plug) {
  this.binding.add(name, plug);
  return this;
};


/**
 * Place widget in document.
 * @param {HTMLElement} node
 * @param {String} location beforeend|afterend|beforebegin|afterbegin
 * @api public
 */

Widget.prototype.place = function(node, location) {
  this.alive();
  node.insertAdjacentElement(location || 'beforeend', this.dom);
};


/**
 * Apply data-binding on dom.
 * @param {HTMLElement} node widget's dom if undefined
 * @api publi
 */

Widget.prototype.alive = function(node) {
  this.binding.apply(node || this.dom);
};
