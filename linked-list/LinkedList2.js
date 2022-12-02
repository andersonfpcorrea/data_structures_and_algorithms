import Node from './Node.js';
import { defaultEquals } from '../utils';

export default class LinkedList2 {
  constructor(equalsFn = defaultEquals) {
    this.#count = 0;
    this.#head = null;
    this.#equalsFn = equalsFn;
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this.#head === null) {
      this.#head = node;
    } else {
      current = this.#head;
      while (current.next !== null) {
        // Adquire o último element
        current = current.next;
      }
      // Atribui 'next' do 'current' à 'node'
      current.next = node;
    }
    this.#count++;
  }

  getElementAt(index) {
    // Retorna 'null' caso 'index' esteja fora dos limites da lista
    if (index < 0 || index >= this.#count) return null;

    let node = this.head;
    // Itera pela lista até o indice desejado, quando 'node' será o elemento buscado
    for (let i = 0; i < index && node !== null; i++) {
      node = node.next;
    }
    return node;
  }

  removeAt(index) {
    // Retorna 'null' caso 'index' esteja fora dos limites da lista
    if (index < 0 || index >= this.#count) return null;

    // Caso index seja válido, acha o elemento e o desassocia da lista:
    let current = this.#head;

    if (index === 0) {
      this.#head = current.next;
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      // Associa 'previous' com 'current.next': o elemento a ser removido é 'pulado'
      previous.next = current.next;
    }
    // Atualiza o contador:
    this.count--;
    // Retorna o elemento 'removido' (ou desassociado da lista):
    return current.element;
  }

  insert(element, index) {
    // Retorna 'false' caso 'index' esteja fora dos limites da lista
    if (index < 0 || index >= this.#count) return false;

    const node = new Node(element);

    if (index === 0) {
      const current = this.#head;
      node.next = current;
      this.#head = node;
    } else {
      const previous = this.getElementAt(index - 1);
      const current = previous.next;
      node.next = current;
      previous.next = node;
    }
    this.#count++;
    return true;
  }

  indexOf(element) {
    let current = this.#head;
    for (let i = 0; i < this.#count && current !== null; i++) {
      // Se 'current' e 'element' são iguais, retorna o índice de 'current':
      if (this.#equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }

    // Se o elemento não for encontrado, retorna -1
    return -1;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  size() {
    return this.#count;
  }

  isEmpty() {
    return this.size === 0;
  }

  toString() {
    if (this.isEmpty()) return '';

    let objString = `${this.#head.element}`;
    let current = this.#head.next;
    for (let i = 1; i < this.size() && current !== null; i++) {
      objString = `${objString}\n${current.element}`;
      current = current.next;
    }
    return objString;
  }

  get head() {
    return this.#head;
  }
}
