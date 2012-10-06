
# event

  Element event binding component.

## Installation

    $ component install component/event

## Example

```js
var events = require('event');
var a = document.querySelector('a');

function onclick(e) {
  e.preventDefault();
  console.log(e.target);
  events.unbind(a, 'click', onclick);
}

events.bind(a, 'click', onclick);
```

## API

### .bind(el, type, callback, [capture])

  Bind to `el`'s event `type` with `callback`.

### .unbind(el, type, callback, [capture])

  Unbind `el`'s event `type` `callback`.

## License

  MIT
