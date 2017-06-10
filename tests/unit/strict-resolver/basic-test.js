/* globals define, requirejs */

import Ember from 'ember';
import { module, test } from 'ember-qunit';
import Resolver from 'ember-strict-resolver';

let originalRegistryEntries, resolver;

function setupResolver(options) {
  if (!options) {
    options = { namespace: { modulePrefix: 'dummy' } };
  }

  resolver = Resolver.create(options);
}

function resetRegistry() {
  requirejs.clear();
  Ember.merge(requirejs.entries, originalRegistryEntries);
}

module('ember-strict-resolver', {
  beforeEach() {
    originalRegistryEntries = Ember.merge({}, requirejs.entries);

    setupResolver();
  },

  afterEach() {
    resetRegistry();
  }
});

test('does not require `namespace` to exist at `init` time', function(assert) {
  assert.expect(0);

  Resolver.create();
});

test('moduleNameForFullName', function(assert) {

  const testPairs = [
    ['route:application', 'dummy/routes/application'],
    ['route:application/index', 'dummy/routes/application/index'],
    ['application:main', 'dummy/application'],
    ['route:foo.bar.baz.index', 'dummy/routes/foo/bar/baz/index']
  ];

  assert.expect(testPairs.length);

  testPairs.forEach(pair => {
    assert.equal(resolver.moduleNameForFullName(pair[0]),
      pair[1],
      `fullName was not resolved correctly for ${pair[0]}`)
  })
});

test("can lookup something", function(assert){
  assert.expect(2);

  define('dummy/adapters/post', [], function(){
    assert.ok(true, "adapter was invoked properly");

    return {};
  });

  var adapter = resolver.resolve('adapter:post');

  assert.ok(adapter, 'adapter was returned');
});

test("can lookup something in another namespace", function(assert){
  assert.expect(3);

  let expected = {};

  define('other/adapters/post', [], function(){
    assert.ok(true, "adapter was invoked properly");

    return {
      default: expected
    };
  });

  var adapter = resolver.resolve('other@adapter:post');

  assert.ok(adapter, 'adapter was returned');
  assert.equal(adapter, expected, 'default export was returned');
});

test("can lookup something with an @ sign", function(assert){
  assert.expect(3);

  let expected = {};
  define('dummy/helpers/@content-helper', [], function(){
    assert.ok(true, "helper was invoked properly");

    return { default: expected };
  });

  var helper = resolver.resolve('helper:@content-helper');

  assert.ok(helper, 'helper was returned');
  assert.equal(helper, expected, 'default export was returned');
});

test("can lookup something in another namespace with different syntax", function(assert){
  assert.expect(3);

  let expected = {};
  define('other/adapters/post', [], function(){
    assert.ok(true, "adapter was invoked properly");

    return { default: expected };
  });

  var adapter = resolver.resolve('adapter:other@post');

  assert.ok(adapter, 'adapter was returned');
  assert.equal(adapter, expected, 'default export was returned');
});

test("can lookup a view in another namespace", function(assert) {
  assert.expect(3);

  let expected = { isViewFactory: true };
  define('other/views/post', [], function(){
    assert.ok(true, "view was invoked properly");

    return { default: expected };
  });

  var view = resolver.resolve('other@view:post');

  assert.ok(view, 'view was returned');
  assert.equal(view, expected, 'default export was returned');
});

test("can lookup a view in another namespace with different syntax", function(assert) {
  assert.expect(3);

  let expected = { isViewFactory: true };
  define('other/views/post', [], function(){
    assert.ok(true, "view was invoked properly");

    return { default: expected };
  });

  var view = resolver.resolve('view:other@post');

  assert.ok(view, 'view was returned');
  assert.equal(view, expected, 'default export was returned');
});
