import LinkedList2 from './LinkedList2';
import Node from './Node';
import { defaultEquals } from '../utils';

export default class DoublyLinkedList extends LinkedList2 {
  #tail;

  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.#tail = null;
  }
}
