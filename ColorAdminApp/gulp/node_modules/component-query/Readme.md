*This repository is a mirror of the [component](http://component.io) module [component/query](http://github.com/component/query). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/component-query`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# query

  Query the DOM with selector engine fallback support. This abstraction
  allows all other components that require dom querying to indirectly support
  old browsers, without explicitly adding support for them.

## Installation

    $ component install component/query

## API

### query(selector, [el])

  Query `selector` against the document or `el`
  and return a single match.

```js
query('ul > li');
query('ul > li', articles);
```

### query.all(selector, [el])

  Query `selector` against the document or `el`
  and return all matches.

```js
query.all('ul > li');
query.all('ul > li', articles);
```

## Fallback engines

  Currently supported:

  - [query-zest](https://github.com/component/query-zest)
  - [query-qwery](https://github.com/jamischarles/query-qwery)

## License

  MIT
