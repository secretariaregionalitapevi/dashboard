*This repository is a mirror of the [component](http://component.io) module [ui-component/mouse](http://github.com/ui-component/mouse). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/ui-component-mouse`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*

# mouse

  mouse events.

## Installation

    $ component install ui-component/mouse

## API

### mouse(el[, obj])

  if object is given `onmousedown`, `onmouseup`, `onmousemove` will
  be called.

### mouse.bind()

  bind all mouse events on `el`.

### mouse.unbind()

  unbind all mouse events on `el`.

### events:

  * `down`, emitted when the mouse is down.
  * `move`, emitted when the mouse is moved.
  * `up`, emitted when the mouse is up.

## License

  MIT
