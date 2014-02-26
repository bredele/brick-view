var Lego = require('lego'),
		assert = require('assert');

describe("Constructor", function() {

	it("#new", function() {
		var view = new Lego();
		assert.equal(typeof view.use, 'function');	
		assert.equal(typeof view.build, 'function');
		assert.equal(typeof view.destroy, 'function');			

	});

	it("#emitter", function() {
		var view = new Lego();
		assert.equal(typeof view.on, 'function');	
		assert.equal(typeof view.emit, 'function');
		assert.equal(typeof view.off, 'function');	
	});
	

	it("#inherit");
	
});

describe("Build", function() {
	describe("Basic", function() {
		it("should render regular html", function() {
			//NOTE: may be we should do lego() and lego.extend 
			var view =  new Lego('<button>lego</lego>');
			view.build();

			assert.equal(view.dom instanceof Element, true);
			assert.equal(view.dom.innerHTML, 'lego');
			assert.equal(view.dom.nodeName, 'BUTTON');
		});
		
	});
	
});

