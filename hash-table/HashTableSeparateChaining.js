import ValuePair from './ValuePair.js';
import LinkedList2 from '../linked-list/LinkedList2.js';
import { defaultToString } from '../utils.js';
import HashTable from './HashTable.js';

export default class HashTableSeparateChaining extends HashTable {
  _table;

  constructor(toStrFn = defaultToString) {
    super(toStrFn);
    this._table = {};
  }

  put(key, value) {
    // If any 'nullish' value is passed into 'put' return 'false':
    if (!key ?? !value) return false;
    // Hash the key
    const position = this._hashCode(key);
    if (this._table[position] === null) {
      this._table[position] = new LinkedList2();
    }
    //! continuar daqui
  }
}
