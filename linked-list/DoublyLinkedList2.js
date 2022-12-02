import LinkedList2 from './LinkedList2.js';
import Node from './Node.js';
import { defaultEquals } from '../utils.js';

export default class DoublyLinkedList2 extends LinkedList2 {
  #head;
  #tail;
  #count;

  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.#tail = null;
    this.#head = null;
    this.#count = 0;
  }

  insert(element, index) {
    if (index < 0 || index > this.#count) return false;

    const node = new Node(element);
    let current = this.#head;
    // Adição ao 'head' da fila
    if (index === 0) {
      // Se index é 0, adiciona o 'node' ao 'head' - caso ele seja null
      // ou define 'node' como head:
      if (this.#head === null) {
        this.#head = node;
        this.#tail = node;
      } else {
        node.next = this.#head;
        current.prev = node;
        this.#head = node;
      }
    }
    // Adição ao fim da lista:
    else if (index === this.#count) {
      current = this.#tail;
      current.next = node;
      node.previous = current;
      this.#tail = node;
    }
    // Adição em qualquer outra posição:
    else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      node.next = current;
      previous.next = node;
      current.previous = node;
      node.previous = previous;
    }
    // Após a inserção, atualiza o contador e retorna 'true':
    this.#count++;
    return true;
  }

  // * Continuar da implementação de removeAt(index)
}
