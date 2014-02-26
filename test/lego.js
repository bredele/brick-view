var lego = require('lego'),
		assert = require('assert');

describe("Constructor", function() {

	it("#new", function() {
		var view = lego();
		assert.equal(typeof view.use, 'function');	
		assert.equal(typeof view.build, 'function');
		assert.equal(typeof view.destroy, 'function');			

	});

	//TODO: and inversion of controls?
	it("#store", function() {
		var view = lego();
		assert.equal(typeof view.set, 'function');	
		assert.equal(typeof view.get, 'function');
		assert.equal(typeof view.reset, 'function');	
		assert.equal(typeof view.compute, 'function');
		assert.equal(typeof view.use, 'function');
		//formatters?
	});

	it("#emitter", function() {
		var view = lego();
		assert.equal(typeof view.on, 'function');	
		assert.equal(typeof view.emit, 'function');
		assert.equal(typeof view.off, 'function');	
	});

	it("#inherit");
	
});

describe("Store", function() {
	it('should behave as a store', function() {
		var view = lego();
		view.set('github', 'bredele');

		var val = view.get('github');
		assert.equal(val, 'bredele');
	});

	it("should behave as an emitter", function(done) {
		var view = lego();
		view.on('lifecycle', function(val) {
			if(val === 'hook') done();
		});

		view.emit('lifecycle', 'hook');
	});
});


describe("Render", function() {
	describe("Basic", function() {
		it("should render regular html", function() {
			//NOTE: may be we should do lego() and lego.extend 
			var view =  lego('<button>lego</lego>');
			assert.equal(view.dom instanceof Element, true);
			assert.equal(view.dom.innerHTML, 'lego');
			assert.equal(view.dom.nodeName, 'BUTTON');
		});

		it("should set existing dom element", function() {
			var div = document.createElement('div');
			assert.equal(lego(div).dom, div);
		});

		// it("should place into document", function() {
		// 	var anchor = document.createElement('div');
		// 	var view = lego('<button>lego</button>');
		// 	view.build(anchor);
		// });
	});
	
});

