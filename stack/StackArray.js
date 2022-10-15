class StackArray {
  #dataStore;

  push(element) {
    this.#dataStore.push(element);
  }

  pop() {
    return this.#dataStore.pop();
  }

  peek() {
    return this.#dataStore[this.#dataStore.length - 1];
  }

  size() {
    return this.#dataStore.length;
  }

  isEmpty() {
    return this.#dataStore.length === 0;
  }

  clear() {
    this.#dataStore = [];
  }
}

export default StackArray;
