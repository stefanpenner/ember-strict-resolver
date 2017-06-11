import require from 'require';
import Ember from 'ember';

// disable the normalization cache as we no longer normalize, the cache has
// become a bottle neck.
Ember.Registry.prototype.normalize = function(i) { return i; }

export default class Resolver {
  constructor(attrs) {
    if (attrs) {
      this.namespace = attrs.namespace;
    }
  }

  static create(args) {
    return new this(args);
  }

  moduleNameForFullName(fullName) {
    // TODO: development assertion or warning if not already normalized
    let prefix, type, name, moduleName;

    const fullNameParts = fullName.split('@');

    if (fullNameParts.length === 2) {
      const prefixParts = fullNameParts[0].split(':');

      if (prefixParts.length === 2) {
        prefix = prefixParts[1];
        type = prefixParts[0];
        name = fullNameParts[1];
      } else {
        const typeNameParts = fullNameParts[1].split(':');
        prefix = fullNameParts[0];
        type = typeNameParts[0];
        name = typeNameParts[1];
      }
    } else {
      const typeNameParts = fullName.split(':');
      prefix = this.namespace.modulePrefix;
      type = typeNameParts[0];
      name = typeNameParts[1];
    }

    if (name === 'main') {
      moduleName = `${prefix}/${type}`;
    } else if (type === 'engine') {
      moduleName = `${name}/engine`;
    } else if (type === 'route-map') {
      moduleName = `${name}/routes`;
    } else {
      moduleName = `${prefix}/${type}s/${name.replace(/\./g, '/')}`;
    }

    return moduleName;
  }

  resolve(fullName) {
    let moduleName = this.moduleNameForFullName(fullName);

    if (require.has(moduleName)) {
      // hit
      return require(moduleName)['default'];
    }
    // miss
  }

  normalize(fullName) {
    return fullName;
  }
}
