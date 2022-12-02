import ValuePair from './ValuePair.js';
import LinkedList from '../linked-list/LinkedList.js';
import { defaultToString } from '../utils.js';

export default class HashTableSeparateChaining {
  #table;
  constructor(toStrFn = defaultToString) {
    this.#toStrFn = toStrFn;
    this.#table = {};
  }
}