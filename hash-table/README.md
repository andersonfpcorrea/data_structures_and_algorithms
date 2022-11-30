## Criando a classe HashTable

```javascript
import { defaultCompare } from '../utils.js';

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
}
```

A seguir, precisamos implementar três métodos básicos na classe:
  - `put(key, value)`: adiciona um novo item à _hash table_ (ou atualiza item existente);
  - `remove(key, value)`: remove o _valor_ da tabela cuja chave é _key_;
  - `get(key)`: retorna o _valor_ associado à _key_;


## Criando a função _hash_

Antes de implementar os três métodos mencionados acima, precisamos criar a função _hash_:

```javascript
loseloseHashCode(key) {
  if (typeof key === 'number') return key;

  const tableKey = this.toStrFn(key);
  let hash = 0;
  for (let i = 0; i < tableKey.length; i++) {
    hash += tableKey.charCodeAt(i);
  }

  return hash % 37
}

hashCode(key) {
  return this.loseloseHashCode(key);
}
```

No método `loseloseHashCode` verificamos se `key` é um número; caso seja, a função retorna esse número. Em seguida, é gerado um número através da soma dos valores ASCII de todas os caracteres da _key_. Por fim, a função retorna o valor _hash_. Para trabalharmos com números baixos, usamos o resto da divisão do _hash_ por um número arbitrário - isso previne trabalharmos com números muito grandes.

OBS: mais sobre a tabela ASCII  [aqui](https://www.asciitable.com/)

Com a função _hash_ concluída, podemos implementar os outros métodos.

## Inserindo uma chave e um valor na _hash table_

```javascript
put(key, value) {
  if (key !== null && value !== null) {
    const position = this.hashCode(key);
    this.table[position] = new ValuePair(key, value);
    return true;
  }
  return false;
}
```

Primeiramente é verificado se _key_ e _value_ são válidos; caso não sejam, a função retorna `null`, indicando que o dado não foi inserido (ou atualizado) na _hash table_.

Para uma chave válida, a função encontra uma posição na tabela usando `hashCode(key)`. Então, é criada uma instância de `ValuePair` com a _chave_ e o _valor_ e salvo na tabela uma nova instância de `ValuePair.

## Extraindo valor da tabela _hash_

```javascript
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

get(key) {
  const valuePair = this.table[this.hashCode(key)];
  return valuePair === null ? undefined : valuePair.value
}
```
Primeiro achamos a posição da _key_ com a função _hashCode_, então acessamos a tabela nessa posição. Por fim a função retorna o valor associado à chave.

## Removendo valores da tablea _hash_

```javascript
remove(key) {
  const hash = this.hashCode(key);
  const valuePair = this.table[hash];
  if (valuePair !== null) {
    delete this.table[hash];
    return true;
  }
  return false;
}
```

Para remover um valor da _hash table_, primeiro identificamo  a posição a acesssar com a função `hashCode`. Depois de encontrar _value_, caso ele não seja `null`, deletamos esse valor com o operador `delete`. A função retornar `true` ou `false` denpendendo do resultado da operação de remoção.