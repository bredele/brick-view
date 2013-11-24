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
    assert((view.dom instanceof HTMLElement) === true);
  });

  it('should accept HTML Element', function(){
    view.html(body);
    assert((view.dom instanceof HTMLElement) === true);
    assert(view.dom === body);
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
    assert(view.dom.innerText === 'leafs');
  });

  describe('store live-binding', function() {
    it('should update view\'s dom when store change', function() {
      var store = new Store({
        github:'leafs'
      });
      view.html('<span>{github}</span>', store);
      view.insert(body);
      assert(view.dom.innerText === 'leafs');
      store.set('github', 'petrofeed');
      assert(view.dom.innerText === 'petrofeed');
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
  
});
