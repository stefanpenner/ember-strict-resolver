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

> noramlize is needed, because without it you will get errors related to failing to be able to inject services that were never noramlized in the registry.

```js
// app/resolver.js

import Resolver from 'ember-strict-resolver';

export default class extends Resolver {
  legacyMappings = {
    'service:camelCaseNotSupported': 'service:camel-case-not-supported'
  };

  resolve(_fullName) {
    return super.resolve(this.legacyMappings[_fullName] || _fullName);
  }
  
  normalize(_fullName) {
    return this.legacyMappings[_fullName] || _fullName;
  }
}
```

This will allow you file PRs with libraries that currently do not support the strict resolver in its entirety.

In the event that you have a component that is failing to resolve correctly with the error `Attempted to lookup "helper:nameOfVariable". Use "helper:name-of-variable" instead.` please convert your template to use explicit-this. The template lint can be enabled by turning on [no-implicit-this](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-implicit-this.md).

An example of what this looks like is the following

```hbs
// addon/components/templates/foo.hbs

<div>
  {{fullName}}
</div>
```

This will result in the error, `Attempted to lookup "helper:fullName". Use "helper:full-name" instead.`. The fix for this would be to decide if this is a argument being passed into foo or if this is a local property.

_fullName_ is coming from an invocation of _Foo_ like the following:

```
<Foo
  @fullName="The Teamster"
/>
```

Then the fix for your template would be:

```hbs
// addon/components/templates/foo.hbs

<div>
  {{@fullName}}
</div>
```

If _fullName_ is a property on your component the fix would be:

```hbs
// addon/components/templates/foo.hbs

<div>
  {{this.fullName}}
</div>
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
