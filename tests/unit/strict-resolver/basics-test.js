import { module, test } from 'ember-qunit';
import Resolver from 'ember-strict-resolver';

module('ember-strict-resolver');

test('does not require `namespace` to exist at `init` time', function(assert) {
  assert.expect(0);

  Resolver.create();
});
