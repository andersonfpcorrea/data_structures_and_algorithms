class QueueObject {
  #items = {};
  #count = 0;
  #lowestCount = 0;

  enqueue(element) {
    this.#items[this.#count] = element;
    this.#count++;
  }

  dequeue(element) {
    if (this.isEmpty()) return undefined;
    const result = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#lowestCount];
  }

  isEmpty() {
    return this.#count - this.#lowestCount === 0;
  }

  size() {
    return this.#count - this.#lowestCount;
  }

  clear() {
    this.#items = {};
    this.#count = 0;
    this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) return '';
    let objString = `${this.#items[this.#lowestCount]}`;
    for (let i = this.#lowestCount + 1; i < this.#count; i++) {
      objString = `${objString}, ${this.#items[i]}`;
    }
  }
}

export default QueueObject;
