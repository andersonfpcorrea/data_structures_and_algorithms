import ValuePair from './ValuePair.js';
import { defaultToString } from '../utils.js';

export default class HashTable {
  _table;
  _toStrFn;

  constructor(toStrFn = defaultToString) {
    this._toStrFn = toStrFn;
    this._table = {};
  }

  _loseloseHashCode(key) {
    if (typeof key === 'number') return key;

    const tableKey = this._toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }

    return hash % 37;
  }

  _hashCode(key) {
    return this._loseloseHashCode(key);
  }

  size() {
    return Object.keys(this._table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this._table = {};
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const position = this._hashCode(key);
      this._table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this._table[this._hashCode(key)];
    return valuePair === null ? undefined : valuePair.value;
  }

  remove(key) {
    const hash = this._hashCode(key);
    const valuePair = this._table[hash];
    if (valuePair !== null) {
      delete this._table[hash];
      return true;
    }
    return false;
  }

  toString() {
    if (this.isEmpty()) return '';

    const keys = Object.keys(this._table);
    let objString = `{${keys[0]} => ${this._table[keys[0]].toString()}}`;

    for (let i = 1; i < keys.length; i++) {
      objString = `${objString}\n{${keys[i]} => ${this._table[
        keys[i]
      ].toString()}}`;
    }

    return objString;
  }
}

const hash = new HashTable();
hash.put('Jonathan', 'jon@email.com'); // loseloseHashCode('Jonathan') retorna 5
hash.put('Jamie', 'jamie@email.com'); // loseloseHashCode('Jamie') retorna 5
hash.put('Sue', 'sue@email.com'); // loseloseHashCode('Sue') retorna 5

console.log(hash.toString());
