import QueueArray from '../queue_array/QueueArray.js';

class PriorityQueue extends QueueArray {
  #items;

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

const emergency = new PriorityQueue();

emergency.enqueue({ name: 'Jhon', code: 5 });
emergency.enqueue({ name: 'Mary', code: 4 });
emergency.enqueue({ name: 'Antony', code: 0 });
emergency.enqueue({ name: 'Paul', code: 1 });
emergency.enqueue({ name: 'Luke', code: 2 });
emergency.enqueue({ name: 'Mark', code: 3 });

console.log(emergency.dequeue());
