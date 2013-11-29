# View

  > Data binding wrapper

## Installation

    $ component install bredele/view

## API

### .html(tmpl, model)
  
  render template into dom and create binding with model (object or store)

### .insert(node, location)

  place the view dom into the document
  location can be beforebegin, afterbegin, beforeend (default), afterend

### .alive([node])

  apply binding on node (node can be the view dom or a document node)

### .destroy()

  Remove view's dom and bindings.

## Usage

```js
var View = require('view');
var view = new View();
view.html('<span>{name}</span>', {
  name:'bredele'
});
view.insert(document.body);
```

## License

  MIT
