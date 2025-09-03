*This repository is a mirror of the [component](http://component.io) module [component/event](http://github.com/component/event). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/component-event`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*

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

  Bind to `el`'s event `type` with `callback`,
  returns the `callback` passed.

### .unbind(el, type, callback, [capture])

  Unbind `el`'s event `type` `callback`,
  returns the `callback` passed.

## License

  MIT
