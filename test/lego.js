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
	
	describe("Interpolation", function() {

		describe("variable", function() {

			it("should substitute variable with data", function() {
				//refactor binding
				var view = lego('<button>{ label }</button>');
				view.set('label', 'lego');

				assert.equal(view.dom.innerHTML, '{ label }');
				view.build();
				assert.equal(view.dom.innerHTML, 'lego');
			});

			it('should initialize dom with data', function() {
				var view = lego('<button>{ label }</button>', {
					label: 'lego'
				});
				view.build();
				assert.equal(view.dom.innerHTML, 'lego');
			});

			it("should update dom when data changes", function() {
				var view = lego('<button>{ label }</button>');
				view.set('label', 'lego');
				view.build();

				view.set('label', 'bredele');
				assert.equal(view.dom.innerHTML, 'bredele');			
			});
		});

		describe("computed", function() {
			it("should substitute variable with computed property", function() {
				//refactor binding
				var view = lego('<button>{ name }</button>', {
					firstName: 'Olivier',
					lastName : 'Wietrich'
				});

				view.compute('name', function() {
					return this.firstName + ' ' + this.lastName;
				});

				view.build();

				assert.equal(view.dom.innerHTML, 'Olivier Wietrich');
			});

			it("should update dom when data changes", function() {	
				var view = lego('<button>{ name }</button>', {
					firstName: 'Olivier',
					lastName : 'Wietrich'
				});

				view.compute('name', function() {
					return this.firstName + ' ' + this.lastName;
				});

				view.build();

				view.set('firstName', 'Bredele');
				assert.equal(view.dom.innerHTML, 'Bredele Wietrich');
			});
		});

		describe("update", function() {

			it("should update dom when view is reseted", function() {
				//refactor binding
				var view = lego('<a class="{className}" href="{link}">{ github }</a>', {
					github: 'bredele',
					className: 'github'
				});

				view.build();

				view.set({
					github: 'lego',
					link: 'http://github.com/bredele/lego'
				});

				assert.equal(view.dom.innerHTML, 'lego');
				assert.equal(view.dom.className, 'github');
				assert.equal(view.dom.getAttribute('href'), 'http://github.com/bredele/lego');
			});
		});
		
		
		describe("reset", function() {

			it("should update dom when view is reseted", function() {
				//refactor binding
				var view = lego('<a class="{className}" href="{link}">{ github }</a>', {
					github: 'bredele',
					className: 'github'
				});

				view.build();

				view.reset({
					github: 'lego',
					link: 'http://github.com/bredele/lego'
				});

				assert.equal(view.dom.innerHTML, 'lego');
				assert.equal(view.dom.className, '');
				assert.equal(view.dom.getAttribute('href'), 'http://github.com/bredele/lego');
			});

		});

	});


	describe("Plugins/Blocks", function() {
		
	});
	

	// describe("Lifecycle hooks", function() {
		

	// 	it("@ready", function() {
			
	// 	});
		
	// 	it("@inserted", function() {
			
	// 	});

	// 	// it("@destroyed", function() {
			
	// 	// });
	// });

	
});

