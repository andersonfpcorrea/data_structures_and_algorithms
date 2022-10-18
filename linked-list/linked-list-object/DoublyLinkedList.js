import Node from './Node.js';

class DoublyLinkedList {
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

  insert(newElement, prevNode) {
    let newNode = new Node(newElement);
    const prevNode = this.find(prevNode);
    newNode.next = prevNode.next;
    newNode.previous = prevNode;
    prevNode.next = newNode;
  }

  remove(element) {
    let nodeToDelete = this.find(element);
    nodeToDelete.previous.next = nodeToDelete.next;
    if (nodeToDelete.next) nodeToDelete.next.previous = nodeToDelete.previous;
    nodeToDelete.next = null;
    nodeToDelete.previous = null;
  }

  display() {
    const currNode = this.#head;
    while (currNode.next) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }

  dispReverse() {
    let currNode = this.findLast();
    while (currNode.previous) {
      console.log(currNode.element);
      currNode = currNode.previous;
    }
  }

  findLast() {
    let currNode = this.#head;
    while (currNode.next) {
      currNode = currNode.next;
    }
    return currNode;
  }
}

export default DoublyLinkedList;
