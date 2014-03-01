# Brick

[![Build Status](https://travis-ci.org/bredele/lego.png?branch=master)](https://travis-ci.org/bredele/lego)  [![Selenium Test Status](https://saucelabs.com/buildstatus/bredele)](https://saucelabs.com/u/bredele)
<!-- Remember where you were young, how simple it was to stack few blocks of Lego to create your dream house? -->


## Installation

  with [component](http://github.com/component/component):

    $ component install bredele/brick

  with [nodejs](http://nodejs.org):

    $ npm install brick-component

## 10 seconds example

```js
var view = brick('<span>{{name}}</span>', {
	name: 'bredele'
});

view.build(document.body);
```

## Browser support

brick is fully tested and supports all mainstream browsers from IE8+.

[![Selenium Test Status](https://saucelabs.com/browser-matrix/bredele.svg)](https://saucelabs.com/u/bredele)

IE7 requires the use of JSON and querySelector polyfill.

## Concept

## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich <olivier.wietrich@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
