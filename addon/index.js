import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';

import require from 'require';

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
    assert(`Attempted to lookup "${fullName}". Use "${dasherize(fullName)}" instead.`, !fullName.match(/[a-z]+[A-Z]+/));

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
    } else if (type === 'config') {
      moduleName = `${prefix}/${type}/${name.replace(/\./g, '/')}`;
    } else {
      moduleName = `${prefix}/${type}s/${name.replace(/\./g, '/')}`;
    }

    return moduleName;
  }

  resolve(fullName) {
    const moduleName = this.moduleNameForFullName(fullName);

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
