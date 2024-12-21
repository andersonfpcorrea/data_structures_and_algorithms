import { swap } from "../utils.js";

export class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLeftIndex(index) {
    return 2 * index + 1;
  }

  getRightIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    if (index === 0) return;
    return Math.floor((index - 1) / 2);
  }

  insert(value) {
    if (value != null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  siftUp(index) {
    let parentIndex = this.getParentIndex(index);
    while (index > 0 && this.heap[parentIndex] > this.heap[index]) {
      swap(this.heap, parentIndex, index);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  extract() {
    if (this.isEmpty()) return;
    if (this.size() === 1) return this.heap.shift();
    const removedValue = this.heap.shift();
    this.siftDown(0);
    return removedValue;
  }

  siftDown(index) {
    let elementIndex = index;
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    const size = this.size();
    if (leftIndex < size && this.heap[elementIndex] > this.heap[leftIndex])
      elementIndex = leftIndex;
    if (rightIndex < size && this.heap[elementIndex] > this.heap[rightIndex])
      elementIndex = rightIndex;
    if (index !== elementIndex) {
      swap(this.heap, index, elementIndex);
      this.siftDown(elementIndex);
    }
  }
}

let heap = new MinHeap();
heap.insert(5);
heap.insert(3);
heap.insert(4);
heap.insert(1);
heap.insert(2);
console.log(heap.heap); // [ 1, 2, 4, 5, 3 ]
console.log("Heap size: ", heap.size()); // 5
console.log("Heap is empty: ", heap.isEmpty()); // false
console.log("Heap min value: ", heap.findMinimum()); // 1

heap = new MinHeap();
for (let i = 1; i < 10; i++) {
  heap.insert(i);
}
console.log("Extract minimum: ", heap.extract()); // 1
