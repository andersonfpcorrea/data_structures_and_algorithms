class Node {
  element;
  next;
  previous;
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}

export default Node;
