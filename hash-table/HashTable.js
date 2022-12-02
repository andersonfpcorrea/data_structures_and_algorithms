import ValuePair from './ValuePair.js';
import { defaultToString } from '../utils.js';

export default class HashTable {
  #table;
  #toStrFn;

  constructor(toStrFn = defaultToString) {
    this.#toStrFn = toStrFn;
    this.#table = {};
  }

  #loseloseHashCode(key) {
    if (typeof key === 'number') return key;
  
    const tableKey = this.#toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
  
    return hash % 37
  }
  
  #hashCode(key) {
    return this.#loseloseHashCode(key);
  }

  size() {
    return Object.keys(this.#table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.#table = {};
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const position = this.#hashCode(key);
      this.#table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.#table[this.#hashCode(key)];
    return valuePair === null ? undefined : valuePair.value
  }

  remove(key) {
    const hash = this.#hashCode(key);
    const valuePair = this.#table[hash];
    if (valuePair !== null) {
      delete this.#table[hash];
      return true;
    }
    return false;
  }

  toString() {
    if (this.isEmpty()) return '';
  
    const keys = Object.keys(this.#table);
    let objString = `{${keys[0]} => ${this.#table[keys[0]].toString()}}`;
  
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString}\n{${keys[i]} => ${this.#table[keys[i]].toString()}}`
    }
  
    return objString;
  }
}

const hash = new HashTable();
hash.put('Jonathan', 'jon@email.com') // loseloseHashCode('Jonathan') retorna 5 
hash.put('Jamie', 'jamie@email.com') // loseloseHashCode('Jamie') retorna 5
hash.put('Sue', 'sue@email.com') // loseloseHashCode('Sue') retorna 5

console.log(hash.toString());