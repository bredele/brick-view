  - [View()](#view)
  - [View.template()](#viewtemplatetmplstringhtmlelementstoreobject)
  - [View.plugin()](#viewpluginnamestringobject)
  - [View.insert()](#viewinsertnodehtmlelement)
  - [View.alive()](#viewalivenodehtmlelement)

## View()

  View constructor.
  We keep the constructor clean for override.

## View.template(tmpl:String|HTMLElement, store:Object)

  Turn HTML into DOM with data store.
  The template is either a string or 
  an existing HTML element.

## View.plugin(name:String, |:Object)

  Add binding plugin.

## View.insert(node:HTMLElement)

  Place widget in document.

## View.alive(node:HTMLElement)

  Apply data-binding on dom.
