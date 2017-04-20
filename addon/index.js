import require from 'require';

export default class Resolver {
  constructor(attrs) {
    this.namespace = attrs.namespace;
    this.modulePrefix = this.namespace.modulePrefix;
  }

  static create(args) {
    return new this(args);
  }

  moduleNameForFullName(fullName) {
    let index = fullName.indexOf(':');
    let type = fullName.substring(0, index)
    let name = fullName.substring(index, fullName.length);
    let moduleName = this.modulePrefix + '/';

    if (name === 'main') {
      moduleName += type;
    } else {
      moduleName += type + 's/' + name;
    }

    return moduleName;
  }

  resolve(fullName) {
    let moduleName = this.moduleNameForFullName(fullName);

    if (require.has(moduleName)) {
      return require(moduleName)['default'];
    } else {
    }
  }
}
