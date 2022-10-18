import Node from './Node.js';
class LinkedList {
  #head;

  constructor() {
    this.#head = new Node('head');
  }

  find(node) {
    let currNode = this.#head;
    while (currNode.element !== node) {
      currNode = currNode.next;
    }
    return currNode;
  }

  findPrevious(node) {
    let prevNode = this.#head;
    while (prevNode.next && prevNode.next.element !== node) {
      prevNode = prevNode.next;
    }
    return prevNode;
  }

  insert(newElement, prevItem) {
    const newNode = new Node(newElement);
    const prevNode = this.find(prevItem);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
  }

  remove(node) {
    let prevNode = this.findPrevious(node);
    if (prevNode.next) {
      prevNode.next = prevNode.next.next;
    }
  }

  display() {
    const currNode = this.#head;
    while (currNode.next) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }
}

export default LinkedList;
