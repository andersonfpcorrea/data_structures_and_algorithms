export default class ValuePair {
  #key;
  #value;
  constructor(key, value) {
    this.#key = key;
    this.#value = value;
  }
  toString() {
    return `[#${this.#key}: ${this.#value}]`;
  }

  get key() {
    return this.#key;
  }

  get value() {
    return this.#value;
  }
}
