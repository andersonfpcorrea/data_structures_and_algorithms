## Índice
  - [Criando a classe HashTable](#criando-a-classe-hashtable)
  - [Lidando com colisões](#lidando-com-colisões)

</br>

# Criando a classe HashTable

Usaremos um _objeto_ para representar a estrutura de dados.

```javascript
import { defaultCompare } from '../utils.js';

class HashTable {
  #table
  #toStrFn() {}
  constructor(toStrFn = defaultToString) {
    this.#toStrFn = toStrFn;
    this.#table = {};
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
}
```

Também criaremos uma classe para gerar um para chave/valor, que será o valor salvo na tabela. Esta classe também terá um método toString:

```javascript
class ValuePair {
  #key;
  #value;
  constructor(key, value) {
    this.#key = key;
    this.#value = value;
  }
  toString() {
    return `[#${this.#key}: ${this.#value}]`
  }
}
```

A seguir, precisamos implementar três métodos básicos na classe HashTable:
  - `put(key, value)`: adiciona um novo item à _hash table_ (ou atualiza item existente);
  - `remove(key, value)`: remove o _valor_ da tabela cuja chave é _key_;
  - `get(key)`: retorna o _valor_ associado à _key_;


## Criando a função _hash_

Antes de implementar os três métodos mencionados acima, precisamos criar a função _hash_:

```javascript
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
```

No método `loseloseHashCode` verificamos se `key` é um número; caso seja, a função retorna esse número. Em seguida, é gerado um número através da soma dos valores ASCII de todas os caracteres da _key_. Por fim, a função retorna o valor _hash_. Para trabalharmos com números baixos, usamos o resto da divisão do _hash_ por um número arbitrário - isso previne trabalharmos com números muito grandes.

OBS: mais sobre a tabela ASCII  [aqui](https://www.asciitable.com/)

Com a função _hash_ concluída, podemos implementar os outros métodos.

## Inserindo uma chave e um valor na _hash table_

```javascript
put(key, value) {
  if (key !== null && value !== null) {
    const position = this.#hashCode(key);
    this.#table[position] = new ValuePair(key, value);
    return true;
  }
  return false;
}
```

Primeiramente é verificado se _key_ e _value_ são válidos; caso não sejam, a função retorna `false`, indicando que o dado não foi inserido (ou atualizado) na _hash table_.

Para um par chave/valor válido, a função define uma posição na tabela usando `hashCode(key)`. É criada, então, uma instância de `ValuePair` com a _chave_ e o _valor_ e na tabela uma nova instância de `ValuePair é armazenada.

## Extraindo valor da tabela _hash_

```javascript
get(key) {
  const valuePair = this.#table[this.#hashCode(key)];
  return valuePair === null ? undefined : valuePair.value
}
```
Primeiro achamos a posição da _key_ com a função _hashCode_, então acessamos a tabela nessa posição. Por fim a função retorna o valor associado à chave.

## Removendo valores da tabela _hash_

```javascript
remove(key) {
  const hash = this.#hashCode(key);
  const valuePair = this.#table[hash];
  if (valuePair !== null) {
    delete this.#table[hash];
    return true;
  }
  return false;
}
```

Para remover um valor da _hash table_, primeiro identificamos sua posição com a função `hashCode`. Caso o _valor_ seja diferente de `null` (pois _hash tables_ não aceitam `null` como uma chave válida), deletamos esse valor com o operador `delete`. A função retornar `true` se a remoção aconteceu, ou `false` caso a remoção não tenha ocorrido.

<hr>

# Lidando com colisões

Às vezes chaves diferentes podem ter o mesmo _hash_. Chamamos essa situação **colisão** porque diferentes pares _chave/valor_ nessa situação são atribuidos à mesma posição de uma _hash table_.

Suponha a seguinte situação:

```javascript
const hash = new HashTable();
hash.put('Jonathan', 'jon@email.com') // loseloseHashCode('Jonathan') retorna 5 
hash.put('Jamie', 'jamie@email.com') // loseloseHashCode('Jamie') retorna 5
hash.put('Sue', 'sue@email.com') // loseloseHashCode('Sue') retorna 5
```

Podemos implementar a seguinte função `toString` na classe `HashTable` para verificar como ficaria a tabela após as inserções acima.

```javascript
toString() {
  if (this.isEmpty()) return '';

  const keys = Object.keys(this.#table);
  let objString = `{${keys[0]} => ${this.#table[keys[0]].toString()}}`;

  for (let i = 1; i < keys.length; i++) {
    objString = `${objString},{${keys[i]}} => ${this.#table[keys[i]].toString()}}`
  }

  return objString;
}
```