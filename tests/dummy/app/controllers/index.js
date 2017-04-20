export default class Index {
  static create(attrs) {
    return new this(attrs);
  }

  setProperties(properties) {
    Object.assign(this, properties);
  }

  static proto() {
    return {
      queryParams: []
    };
  }
}
