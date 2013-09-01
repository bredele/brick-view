
# widget

  Data binding wrapper

## Installation

    $ component install bredele/widget

## API

### Widget#template(tmpl, model)
  
  render template into dom and create binding with model (object or store)

### Widget#place(node, location)

  place the widget dom into the document
  location can be beforebegin, afterbegin, beforeend (default), afterend

### Widget#alive([node])

  apply binding on node (node can be the widget dom or a document node)


## Usage

```js
var Widget = require('widget');
var widget = new Widget();
widget.template('<span>name</span>', {
  name:'bredele'
});
widget.place(document.body);
```
   

## License

  MIT
