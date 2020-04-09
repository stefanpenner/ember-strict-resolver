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

## Migration

Migrating away from use the _ember-resolver/classic_ can be done in piecemeal by supporting a sub-set of the old resolution formats.

```js
// app/resolver.js

import Resolver from 'ember-strict-resolver';

export default class extends Resolver {
  legacyMappings = {
    'service:camelCaseNotSupported': 'service:camel-case-not-supported'
  };

  resolve(_fullName) {
    const fullName = this.legacyMappings[fullName] || fullName;

    return super.resolve(fullName);
  }
}
```

This will allow you file PRs with libraries that currently do not support the strict resolver in its entirety.

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
