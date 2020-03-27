# ember-strict-resolver

[![Build Status](https://travis-ci.org/stefanpenner/ember-strict-resolver.svg?branch=master)](https://travis-ci.org/stefanpenner/ember-strict-resolver)

Fast, concise, zero fun resolver for ember apps.

## installation
```
ember install ember-strict-resolver
```

## Usage

in app/resolver.js
```js
export { default } from 'ember-strict-resolver';
```

_For additional improvements when fully using the ember-strict-resolver monkey patching the registry to no longer cache and simply returning the values passed like the following can be produce extra performance._

```js
// disable the normalization cache as we no longer normalize, the cache has become a bottle neck.
Ember.Registry.prototype.normalize = function (i) { return i; }
```


# Development of the addon

* `git clone <repository-url>` this repository
* `cd strict-resolver`
* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
