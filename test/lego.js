var lego = require('..'),
		assert = require('assert');


describe("Constructor", function() {

	it("#new", function() {
		var view = lego();
		assert.equal(typeof view.add, 'function');	
		assert.equal(typeof view.build, 'function');
		assert.equal(typeof view.remove, 'function');			

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
		
		
		// describe("reset", function() {

		// 	it("should update dom when view is reseted", function() {
		// 		//refactor binding
		// 		var view = lego('<a class="{{className}}" href="{{link}}">{{ github }}</a>', {
		// 			github: 'bredele',
		// 			className: 'github'
		// 		});

		// 		view.build();

		// 		view.reset({
		// 			github: 'lego',
		// 			link: 'http://github.com/bredele/lego'
		// 		});

		// 		assert.equal(view.el.innerHTML, 'lego');
		// 		assert.equal(view.el.className, '');
		// 		assert.equal(view.el.getAttribute('href'), 'http://github.com/bredele/lego');
		// 	});

		// });

	});

});

describe("Build", function() {
	it('should only apply attribute binding', function() {
		var view = lego('<a data-href="link">{{link}}</a>', {link: 'github'});
		//TODO: we should pass view
		view.add('data-href', function(node, str) {
			node.setAttribute('href', str);
		});
		//NOTE: get better api, what if parent undefined?
		view.build(document.createElement('div'), true);
		assert.equal(view.el.innerHTML, '{{link}}');
		assert.equal(view.el.getAttribute('href'), 'link');
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

describe("Bricks (aka plugins)", function() {

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

describe('Remove', function() {

	it('should remove from parent element if exists', function() {
		var parent = document.createElement('div');

		var view = lego('<button>maple</button>');
		view.build(parent);
		view.remove();
		assert.equal(parent.innerHTML, '');
	});

  //use spy
	it('should remove bindings');

	//view.el still exist, memory leaks?

});

describe("Lifecycle hooks", function() {

	describe("@rendered", function() {
		it("emits 'rendered' when el is rendered", function(done) {
			var view = lego();
			view.on('rendered', function() {
				done();
			});
			view.dom('<span>lego</span>');
		});
		
	});
	

	describe("@inserted", function() {
		
		it("emits 'before inserted' everytine on build only if el is defined", function() {
			var view = lego(),
					defined = false;
			//TODO: should we test the arguments?
			view.on('before inserted', function() {
				defined = true;
			});

			//el null
			view.build();
			assert.equal(defined, false);

			//el span
			view.dom('<span>lego</span>');
			view.build();
			assert.equal(defined, true);
		});
		
		it("emits 'inserted' on build only if parent is defined", function(done) {
			var view = lego('<span>lego</span>');

			view.on('inserted', function() {
				done();
			});

			view.build(document.createElement('div'));	
		});
	});

	describe("@ready", function() {

		it("emits 'before ready' just before compilation", function(done) {
			var view = lego('<span>{{lego}}</span>');
			view.on('before ready', function() {
				if(view.el.innerHTML === '{{lego}}') done();
			});
			view.build();
		});

		it("emits 'ready' on build only once", function() {
			var view = lego('<span>lego</span>'),
					idx = 0;

			view.on('ready', function() {
				idx++;
			});

			view.build(document.createElement('div'));
			view.build(document.createElement('div'));
			assert.equal(idx, 1);
		});
	});

	describe("@removed", function() {
		it("emits 'before removed' before removing el", function(done) {
			var view = lego('<span>lego</span>');
			view.on('before removed', function() {
				if(view.el.parentElement) done();
			});
			view.remove();
		});

		it("emits 'removed' on remove", function(done) {
			var view = lego('<span>lego</span>');
			view.on('removed', function() {
				done();
			});
			view.remove();
		});
		
	});
});