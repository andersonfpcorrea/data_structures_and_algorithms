import QueueObject from '../queue/queue_object/QueueObject.js';

class Deque extends QueueObject {
  #items;
  #count;
  #lowestCount;

  constructor() {
    super();
    this.#items = {};
    this.#count = 0;
    this.#lowestCount = 0;
  }

  addFront(element) {
    if (this.isEmpty()) this.addBack(element);
    else {
      this.#lowestCount--;
      this.#count++;
      this.#items[this.lowestCount] = element;
    }
  }

  addBack(element) {
    return this.enqueue(element);
  }

  removeFront() {
    return this.dequeue();
  }

  removeBack() {
    if (this.isEmpty()) return undefined;
    this.#count--;
    const result = this.#items[this.#count];
    delete this.#items[this.#count];
    return result;
  }

  peekFront() {
    return this.peek();
  }

  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#count - 1];
  }

  size() {
    return Math.abs(this.#count - this.#lowestCount);
  }
}
