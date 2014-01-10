var View = require('view');
var assert = require('component-assert');
var Store = require('store');


describe('Template', function() {
  var view = null,
      body = null;
  beforeEach(function() {
    view = new View();
    body = document.createElement('div');
    body.className = "body";
  });

  it('should render simple string html', function() {
    view.html('<button>template</button>');
    view.insert(body);
    assert((view.dom instanceof Element) === true);
  });

  it('should accept HTML Element', function(){
    view.html(body);
    assert((view.dom instanceof Element) === true);
    assert(view.dom === body);
  });

  it('should accept other template engine', function(){
    view.html(function(obj){
      var div = document.createElement('div');
      div.className = obj.className;
      return div;
    }, {className: 'bredele'});
    assert.equal(view.dom.tagName,'DIV');
    assert.equal(view.dom.className,'bredele');
  });
});

describe('Template binding', function() {
  var view = null,
      body = null;
  beforeEach(function() {
    view = new View();
    body = document.createElement('div');
  });

  it('should render template from object', function() { 
    view.html('<span>{github}</span>', {
      github:'leafs'
    });
    view.insert(body);
    assert(view.dom.innerHTML === 'leafs');
  });

  describe('store live-binding', function() {
    it('should update view\'s dom when store change', function() {

      var store = new Store({
        github:'leafs'
      });
      view.html('<span>{github}</span>', store);
      view.insert(body);
      assert(view.dom.innerHTML === 'leafs');
      store.set('github', 'petrofeed');
      assert(view.dom.innerHTML === 'petrofeed');
    });
  });
});


describe('fragment', function() {
  var view = null,
      body = null;
  beforeEach(function() {
    view = new View();
    body = document.createElement('div');
  });


  it('should add attribute binding', function(){

  });



});

describe('plugin', function() {
  var view = null,
      body = null;
  beforeEach(function() {
    view = new View();
    body = document.createElement('div');
  });


  it('should add attribute binding', function(){
    var plugin = {};
    view.attr('class', plugin);
    assert(view.binding.plugins['class'] === plugin);
  });

  it('should add data attribute binding', function() {
    var plugin = {};
    view.data('test', plugin);
    assert(view.binding.plugins['data-test'] === plugin);
  });

});

describe('insert', function() {
  var view = null,
      body = null;
  beforeEach(function() {
    view = new View();
    body = document.createElement('div');
  });

  it('should insert view\'s dom', function() {
    view.html('<span>template</span>');
    view.insert(body);

    assert(body.firstChild === view.dom);
  });
});


describe('destroy', function() {
  it('should call the destroy function of every regstered plugin', function(){
    var view = new View(),
        idx = 0,
        destroy = function() {
          ++idx;
        };
    view.attr('test', {
      destroy: destroy
    });
    view.attr('other', {
      destroy: destroy
    });
    view.data('another', {});
    view.alive(document.createElement('div'));
    view.destroy();
    assert(idx === 2);
  });
});
