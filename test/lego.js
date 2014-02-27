var lego = require('lego'),
		assert = require('assert');


describe("Constructor", function() {

	it("#new", function() {
		var view = lego();
		assert.equal(typeof view.add, 'function');	
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
		view.set('color', 'red');

		assert.equal(view.get('color'), 'red');
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
			assert.equal(view.el instanceof Element, true);
			assert.equal(view.el.innerHTML, 'lego');
			assert.equal(view.el.nodeName, 'BUTTON');
		});

		it("should set existing dom element", function() {
			var div = document.createElement('div');
			assert.equal(lego(div).el, div);
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
				var view = lego('<button>{{ label }}</button>');
				view.set('label', 'lego');

				assert.equal(view.el.innerHTML, '{{ label }}');
				view.build();
				assert.equal(view.el.innerHTML, 'lego');
			});

			it('should initialize dom with data', function() {
				var view = lego('<button>{{ label }}</button>', {
					label: 'lego'
				});
				view.build();
				assert.equal(view.el.innerHTML, 'lego');
			});

			it("should update dom when data changes", function() {
				var view = lego('<button>{{ label }}</button>');
				view.set('label', 'lego');
				view.build();

				view.set('label', 'bredele');
				assert.equal(view.el.innerHTML, 'bredele');			
			});
		});

		describe("computed", function() {
			it("should substitute variable with computed property", function() {
				//refactor binding
				var view = lego('<button>{{ name }}</button>', {
					firstName: 'Olivier',
					lastName : 'Wietrich'
				});

				view.compute('name', function() {
					return this.firstName + ' ' + this.lastName;
				});

				view.build();

				assert.equal(view.el.innerHTML, 'Olivier Wietrich');
			});

			it("should update dom when data changes", function() {	
				var view = lego('<button>{{ name }}</button>', {
					firstName: 'Olivier',
					lastName : 'Wietrich'
				});

				view.compute('name', function() {
					return this.firstName + ' ' + this.lastName;
				});

				view.build();

				view.set('firstName', 'Bredele');
				assert.equal(view.el.innerHTML, 'Bredele Wietrich');
			});
		});

		describe("update", function() {

			it("should update dom when view is reseted", function() {
				//refactor binding
				var view = lego('<a class="{{className}}" href="{{link}}">{{ github }}</a>', {
					github: 'bredele',
					className: 'github'
				});

				view.build();

				view.set({
					github: 'lego',
					link: 'http://github.com/bredele/lego'
				});

				assert.equal(view.el.innerHTML, 'lego');
				assert.equal(view.el.className, 'github');
				assert.equal(view.el.getAttribute('href'), 'http://github.com/bredele/lego');
			});
		});
		
		
		describe("reset", function() {

			it("should update dom when view is reseted", function() {
				//refactor binding
				var view = lego('<a class="{{className}}" href="{{link}}">{{ github }}</a>', {
					github: 'bredele',
					className: 'github'
				});

				view.build();

				view.reset({
					github: 'lego',
					link: 'http://github.com/bredele/lego'
				});

				assert.equal(view.el.innerHTML, 'lego');
				assert.equal(view.el.className, '');
				assert.equal(view.el.getAttribute('href'), 'http://github.com/bredele/lego');
			});

		});

	});
});

describe("Insert", function() {

	it('should insert into parent element (if exists)', function() {
				var parent = document.createElement('div');

				var view = lego('<span>maple</span>');
				view.build();
				//it's the div
				//assert.equal(view.el.parentElement, null);

	      //parent dom element
				view.build(parent);
				assert.equal(parent.childNodes[0], view.el);
			});
});


describe("Blocks (aka plugins)", function() {

	it("should add plugin", function() {
		var plugin = function() {};
		var view = lego().add('class', plugin);
		assert.equal(view.bindings.plugins['class'], plugin);
	});

	it("should add multiple binding's plugins", function() {
		var view = lego().add({
			"class" : function(){},
			"other" : function(){}
		});

		assert.notEqual(view.bindings.plugins['class'],undefined);
		assert.notEqual(view.bindings.plugins['other'],undefined);		

	});
});

describe('Destroy', function() {

	it('should remove from parent element if exists', function() {
		var parent = document.createElement('div');

		var view = lego('<button>maple</button>');
		view.build(parent);
		view.destroy();
		assert.equal(parent.innerHTML, '');
	});

  //use spy
	it('should destroy bindings');

	//view.el still exist, memory leaks?

});


describe("Lifecycle hooks", function() {
	
	it("emits 'inserted' on build only if el defined", function() {
		var view = lego(),
				parent = document.createElement('div'),
				defined = false;

		view.on('inserted', function() {
			defined = true;
		});

		view.build(parent);
		assert.equal(defined, false);
		debugger
		view.dom('<span>lego</span>');
		view.build(parent);
		assert.equal(defined, true);		
	});

	it("emits 'compiled' on build only once", function() {
		var view = lego('<span>lego</span>'),
				idx = 0;

		view.on('compiled', function() {
			idx++;
		});

		view.build(document.createElement('div'));
		view.build(document.createElement('div'));
		assert.equal(idx, 1);
	});

	// it("@destroyed", function() {
		
	// });
	
	// 	it("should emit a removed event", function() {
	// 	var view = new View(),
	// 	    removed = false;

	// 	view.html('<button>maple</button>');
	// 	view.el();
	// 	view.on('removed', function() {
	// 		removed = true;
	// 	});
	// 	view.remove();
	// 	assert.equal(removed, true);
	// });
});

// function olivier(tmpl, data) {

// 	var test = function(){
// 		return test.build();
// 	}

// 	test.add = function() {
// 		console.log('add', this);
// 		return test;
// 	};

// 	test.build = function() {
// 		console.log('build with ', tmpl, data);
// 		return test;
// 	};

// 	return test;
// }

