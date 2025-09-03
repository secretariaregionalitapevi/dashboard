*This repository is a mirror of the [component](http://component.io) module [component/classes](http://github.com/component/classes). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/component-classes`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*

# classes

  Cross-browser element class manipulation, utilizing the native `.classList` when possible. This is not designed to be a `.classList` polyfill.

## Installation

```
$ component install component/classes
```

## Example

```js
var classes = require('classes');
classes(el)
  .add('foo')
  .toggle('bar')
  .remove(/^item-\d+/);
```

## API

### .add(class)

  Add `class`.

### .remove(class)

  Remove `class` name or all classes matching the given regular expression.

### .toggle(class)

  Toggle `class`.

### .has(class)

  Check if `class` is present.

### .array()

  Return an array of classes.

## Test

```js
npm i -g component-test
component install
component build
component test browser
```

## License

  MIT
