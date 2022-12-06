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
    if (
      key === undefined ||
      key === null ||
      value === undefined ||
      value === null
    )
      return false;
    // Hash the key
    const position = this._hashCode(key);

    // If there the position is empty, create a new linked list into it
    if (this._table[position] === null || this._table[position] === undefined) {
      this._table[position] = new LinkedList2();
    }

    // Insert the key/value into the linked list
    this._table[position].push(new ValuePair(key, value));

    // Return 'true' if the addition is successfull
    return true;
  }

  get(key) {
    const position = this._hashCode(key);
    const linkedList = this._table[position];

    // If there is no such key, return 'undefined'
    if (
      linkedList === null ||
      linkedList === undefined ||
      linkedList?.isEmpty()
    ) {
      return undefined;
    }
    // Get the 'head' reference of the list
    let current = linkedList.head;
    // Find the wanted element based on the 'key'
    while (current !== null) {
      if (current.element.key === key) {
        return current.element.value;
      }
      current = current.next;
    }
  }

  remove(key) {
    const position = this._hashCode(key);
    const linkedList = this._table[position];

    //If there is no such key, return 'false'
    if (
      linkedList === null ||
      linkedList === undefined ||
      linkedList?.isEmpty()
    ) {
      return false;
    }
    // Get the head reference of the list:
    let current = linkedList.head;
    // Find the element to be deleted:
    while (current !== null) {
      if (current.element.key === key) {
        // When found, remove the element
        linkedList.remove(current.element);
        // If the list becomes empty, it is removed from the table
        if (linkedList.isEmpty()) {
          delete this._table[position];
        }
        // Retur 'true' to confirm the deletion
        return true;
      }
      current = current.next;
    }
  }
}
