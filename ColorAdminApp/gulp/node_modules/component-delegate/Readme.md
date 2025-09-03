*This repository is a mirror of the [component](http://component.io) module [component/delegate](http://github.com/component/delegate). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/component-delegate`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*

# delegate

  Low-level event delegation component.

## Installation

    $ component install component/delegate

## Example

```js
var delegate = require('delegate');
var ul = document.querySelector('ul');
var n = 0;

var fn = delegate.bind(ul, 'li a', 'click', function(e){
  console.log(e.target);
  console.log(e.delegateTarget); // => "<a>"
  if (++n == 3) {
    console.log('unbind');
    delegate.unbind(ul, 'click', fn, false);
  }
}, false);
```

## API

### .bind(el, selector, type, callback, [capture])

  Bind and return a callback which may be passed to `.unbind()`.

### .unbind(el, type, callback, [capture])

  Unbind.

## License

  MIT
