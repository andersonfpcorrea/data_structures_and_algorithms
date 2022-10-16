class QueueArray {
  #items;

  constructor(items = []) {
    this.#items = items;
  }

  enqueue(element) {
    return this.#items.push(element);
  }

  dequeue() {
    return this.#items.shift();
  }

  peek() {
    return this.#items[0];
  }

  back() {
    return this.#items.at(-1);
  }

  toString() {
    return this.#items.join(' ');
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }
}

export default QueueArray;
