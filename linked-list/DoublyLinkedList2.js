import LinkedList2 from './LinkedList2.js';
import Node from './Node.js';
import { defaultEquals } from '../utils.js';

export default class DoublyLinkedList2 extends LinkedList2 {
  _head;
  _tail;
  _count;

  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this._tail = null;
    this._head = null;
    this._count = 0;
  }

  push(element) {
    const node = new Node(element);
    let current;
    // Se a lista está vazia:
    if (this._head === null) {
      this._head = node;
      this._tail = node;
    }
    // Se a lista não está vazia
    else {
      current = this._tail;
      current.next = node;
      node.previous = current;
      this._tail = node;
    }
    this._count++;
  }

  insert(element, index) {
    console.log(index < 0);
    console.log('index = ' + index);
    console.log('this._count = ' + this._count);
    console.log(index >= this._count);
    if (index < 0 || index >= this._count) return false;

    const node = new Node(element);
    let current = this._head;
    // Adição ao 'head' da fila
    if (index === 0) {
      // Se index é 0, adiciona o 'node' ao 'head' - caso ele seja null
      // ou define 'node' como head:
      if (this._head === null) {
        this._head = node;
        this._tail = node;
      } else {
        node.next = this._head;
        current.previous = node;
        this._head = node;
      }
    }
    // Adição ao fim da lista:
    else if (index === this._count) {
      current = this._tail;
      current.next = node;
      node.previous = current;
      this._tail = node;
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
    this._count++;
    return true;
  }

  removeAt(index) {
    // Se 'index' não é válido retorna 'null'
    if (index < 0 || index >= this._count) return null;

    let current = this._head;

    // Removendo do início da fila
    if (index === 0) {
      this._head = current.next;
      // Se há apenas um element, atualizamos o 'tail':
      if (this._count === 1) {
        this._tail = null;
      } else {
        this._head.previous = null;
      }
    }

    // Removendo do fim da fila
    else if (index === this._count - 1) {
      current = this._tail;
      this._tail = current.previous;
      this._tail.next = null;
    }

    // Removendo do meio da fila
    else {
      current = this.getElementAt(index);
      const previous = current.previous;
      // Associa 'previous.next' com 'current.next', removendo o elemento:
      previous.next = current.next;
      current.next.previous = previous;
    }

    // Atualiza o contador e retorna o elemento removido
    this._count--;
    return current.element;
  }
}
