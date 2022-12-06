import { defaultToString } from '../utils.js';
import ValuePair from './ValuePair.js';
import HashTable from './HashTable.js';

export default class HashTableLinearProbing1 extends HashTable {
  _table;

  constructor(toStrFn = defaultToString) {
    super(toStrFn);
    this._table = {};
  }

  put(key, value) {
    // If a nullish value entry is entered, return 'false'
    if (
      key === null ||
      key === undefined ||
      value === null ||
      value === undefined
    )
      return false;

    // Get hashed key:
    const position = this._hashCode(key);

    // If there is no key in 'position', create a new ValuePair object
    if (this._table[position] === null || this._table[position] === undefined) {
      this._table[position] = new ValuePair(key, value);
    }
    // Iterate over the table to find an empty space to place the new entry
    else {
      let index = position + 1;
      while (this._table[index] !== undefined && this._table[index] !== null) {
        index++;
      }
      // Once an empty space is found, the loop is break and the new
      // ValuePair instance is stored into the table
      this._table[index] = new ValuePair(key, value);
    }
    // Return 'true' to confirm success of operation
    return true;
  }

  get(key) {
    // Get hashed position
    const position = this._hashCode(key);

    // If there is no entry in 'position' return 'undefined'
    if (this._table[position] === null || this._table[position] === undefined)
      return undefined;

    // If the element on 'position' has a 'key' equal to the 'key' argument, return
    // right away this element's value
    if (this._table[position].key === key) {
      return this._table[position].value;
    }

    // Iterate over the table to find the desired element. At each iteration, skip nullish
    // values and elements whose 'key' is different from the 'key' argument
    let index = position + 1;
    while (
      this._table[index] !== null &&
      this._table[index] !== undefined &&
      this._table[index]?.key !== key
    ) {
      index++;
    }

    // After breaking the loop, we check if the table[index].key is equal to key
    // If this is true, we return the found element's value
    // Otherwise we return undefined
    if (this._table[index]?.key === key) {
      console.log(`key: ${key}`);
      console.log(`index: ${index}`);
      console.log(`Table key: ${this._table[index].key}`);
      console.log(`Table value: ${this._table[index].value}`);
      return this._table[index].value;
    }

    return undefined;
  }
}

const a = new HashTableLinearProbing1();
a.put('Jonathan', 'first');
a.put('Jamie', 'second');
a.put('Aethelwulf', 'third');

console.log(a.toString());

console.log(a.get('Aethelwulf'));
