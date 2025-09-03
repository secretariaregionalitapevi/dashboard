*This repository is a mirror of the [component](http://component.io) module [component/emitter](http://github.com/component/emitter). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/component-emitter`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# Emitter [![Build Status](https://travis-ci.org/component/emitter.png)](https://travis-ci.org/component/emitter)

  Event emitter component.

## Installation

```
$ component install component/emitter
```

## API

### Emitter(obj)

  The `Emitter` may also be used as a mixin. For example
  a "plain" object may become an emitter, or you may
  extend an existing prototype.

  As an `Emitter` instance:

```js
var Emitter = require('emitter');
var emitter = new Emitter;
emitter.emit('something');
```

  As a mixin:

```js
var Emitter = require('emitter');
var user = { name: 'tobi' };
Emitter(user);

user.emit('im a user');
```

  As a prototype mixin:

```js
var Emitter = require('emitter');
Emitter(User.prototype);
```

### Emitter#on(event, fn)

  Register an `event` handler `fn`.

### Emitter#once(event, fn)

  Register a single-shot `event` handler `fn`,
  removed immediately after it is invoked the
  first time.

### Emitter#off(event, fn)

  * Pass `event` and `fn` to remove a listener.
  * Pass `event` to remove all listeners on that event.
  * Pass nothing to remove all listeners on all events.

### Emitter#emit(event, ...)

  Emit an `event` with variable option args.

### Emitter#listeners(event)

  Return an array of callbacks, or an empty array.

### Emitter#hasListeners(event)

  Check if this emitter has `event` handlers.

## License

MIT
