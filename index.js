var Binding = require('binding'),
    Store = require('store'),
    each = require('each'), //I would prefer not to use it
    event = require('event');


/**
 * Supportes events
 */

var events = [
  'change',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'blur',
  'focus',
  'input',
  'submit',
  'keydown',
  'keypress',
  'keyup'
];


/**
 * Expose 'View'
 */

module.exports = View;


/**
 * View constructor.
 * We keep the constructor clean for override.
 * @api public
 */

function View(obj){ //we could do a mixin for something clean
  this.dom = null;
  this.store = null;
  this.binding = new Binding();

  //if it worh it, we should do that globally on binding
  
  each(events, function(idx, name) {
    this.binding.attr('on-' + name, function(node, method) {
      event.bind(node, name, function(e) { //don't forget to do off in destroy
        var fn = obj[method];
        if (!fn) throw new Error('method .' + method + '() missing');
        fn(e);
      });
    });
  }, this);
}


/**
 * String to DOM.
 * @api pruvate
 */

function domify(tmpl){
  if(tmpl instanceof HTMLElement) return tmpl;
  //may be by applying binding on this node we can have multiple
  //children
  var div = document.createElement('div');
  //use component insert
  div.innerHTML = tmpl;
  return div.firstChild;
}


/**
 * Turn HTML into DOM with data store.
 * The template is either a string or 
 * an existing HTML element.
 * @param  {String|HTMLElement|Function} tmpl  
 * @param  {Object} store can be nothing, an object or a store
 * @api public
 */

View.prototype.html = function(tmpl, store) { //add mixin obj?
  if(typeof tmpl === 'function') {
    //TODO: use component to array
    this.dom = tmpl.apply(null, [].slice.call(arguments, 1));
  } else {
    this.store = new Store(store);
    this.binding.model = this.store;
    this.dom = domify(tmpl);
  }
  return this;
};


/**
 * Add attribute binding plugin.
 * @param  {String} name 
 * @param  {Object | Function} plug 
 * @return {View}
 * @api public
 */

View.prototype.attr = function(name, plug) {
  this.binding.attr(name, plug);
  return this;
};


/**
 * Add binding plugin.
 * @param  {String} name 
 * @param  {Object | Function} plug 
 * @return {View}
 * @api public
 */

View.prototype.data = function(name, plug) {
  this.binding.data(name, plug);
  return this;
};


/**
 * Place widget in document.
 * @param {HTMLElement} node
 * @api public
 */

View.prototype.insert = function(node) {
  this.alive();
  node.appendChild(this.dom);
};


/**
 * Apply data-binding on dom.
 * @param {HTMLElement} node widget's dom if undefined
 * @api publi
 */

View.prototype.alive = function(node) {
  //do we want to apply multiple times? no
  if(node) this.dom = node;
  this.binding.apply(this.dom);
};


/**
 * Call the destroy method for every registered plugin.
 * 
 * @api public
 */

View.prototype.destroy = function() {
  var plugins = this.binding.plugins,
      parent = this.dom.parentNode;
  //has own properties?
  for(var name in plugins) {
    var plugin = plugins[name];
    plugin.destroy && plugin.destroy();
  }
  if(parent) parent.removeChild(this.dom);

};
