# View

<!-- Remember where you were young, how simple it was to stack few blocks of Lego to create your dream house? -->


## Installation

    $ component install bredele/lego

## Usage

```js
var view = lego('<span>{{name}}</span>', {
	name: 'bredele'
});

view.build(document.body);
```

## License

  MIT
