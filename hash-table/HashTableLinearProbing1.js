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

  /**
   * @param {string | number} key Representa a 'key' removida pelo método 'remove'
   * @param {number} removedPosition Posição em que 'key' foi removida
   */
  _verifyRemoveSideEffect(key, removedPosition) {
    // Adquire novamente a 'hash' da 'key' removida:
    const hash = this._hashCode(key);
    // A tabela é iterada até ser encontrado um espaço vazio:
    let index = removedPosition + 1;
    // Encontrar um espaço vazio significa que todos os elementos estão em seu devido
    // lugar - devido a estratégio de sondagem linear:
    while (this._table[index] !== null && this._table[index] !== undefined) {
      // Enquanto a tabela é iterada, é calculado o 'hash' do elemento atual:
      const posHash = this._hashCode(this._table[index].key);

      // Se o hash do elemento atual é menor ou igual ao hash da 'removedPosition'
      // precisamos movê-lo para ocupar 'removedPosition'. Então o elemento movido é
      // deletado, 'removedPosition' é atualizado e o loop continua até não haver mais
      // posições ocupadas:
      if (posHash <= removedPosition) {
        this._table[removedPosition] = this._table[index];
        delete this._table[index];
        removedPosition = index;
      }
      index++;
    }
  }

  remove(key) {
    const position = this._hashCode(key);

    // Returna imediatamente 'false' se _key_ não é uma chave válida na tabela
    if (this._table[position] === null || this._table === undefined) {
      return false;
    }
    // Se o elemento é encontrado com 'position', ele é deletado
    // E são verificados quaisquer efeitos colaterais resultantes da remoção
    if (this._table[position].key === key) {
      delete this._table[position];
      this._verifyRemoveSideEffect(key, position);
      return true;
    }

    // Caso o elemento não seja encontrado através de 'position',
    // A tabela é iterada atrás desse elemento
    let index = position + 1;
    while (
      this._table[index] !== null &&
      this._table[index] === undefined &&
      this._table[index] !== key
    ) {
      index++;
    }

    // Ao ser encontrado, o elemento é deletado e os efeitos
    // colaterais dessa operação são verificados
    if (this._table[index]?.key === key) {
      delete this._table[index];
      this._verifyRemoveSideEffect(key, index);
      return true;
    }

    // Se nada é removido, a função retorna 'false'
    return false;
  }
}
