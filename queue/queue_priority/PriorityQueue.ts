import QueueArray from '../queue_array/QueueArray';

interface Patient {
  name: string;
  code: number;
}

class PriorityQueue extends QueueArray {
  #items = <Patient[]>[];

  constructor(items = []) {
    super(items);
    this.#items = items;
  }

  dequeue() {
    let priority = { index: 0, code: 99 };
    for (let i = 1; i < this.size(); ++i) {
      if (this.#items[i].code < priority.code)
        priority = { index: i, code: this.#items[i].code };
    }
    return this.#items.splice(priority.index, 1);
  }

  toString() {
    return this.#items.map((el) => `${el.name} | code: ${el.code}`).join(' \n');
  }
}

export default PriorityQueue;
