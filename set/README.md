## Índice:
  - [Implementação](#implementação)
  - [Operações](#operações)
  - [ES6 Set](#ecmascript-2015-es6-set-class)

# Implementação

## O método _has(element)_

```javascript
has(element) {
  return Object.prototype.hasOwnProperty.call(this.items, element);
}
```

## O método _add(element)_

```javascript
add(element) {
  if (!this.has(element)) {
    this.items[element] = element;
    return true
  }
  return false;
}
```

Dado certo element, verificamos se ele existe no conjunto. Caso não exista, nós o adicionamos ao _set_ e retornamos `true`. Caso contrário, a função retorna `false`.

## O método _delete(element)_

```javascript
delete(element) {
  if (this.has(element)) {
    delete this.items[element];
    return true;
  }
  return false;
}
```

## O método _clear()_

```javascript
clear() [
  this.items = {};
]
```

## O método _size()_

```javascript
size() {
  return Object.keys(this.items).length;
}
```

Ou então, para evitar qualquer incompatibilidade com browsers antigos:
```javascript
sizeLegacy() {
  let count = 0;
  for (let key in this.items) {
    if (this.items.hasOwnProperty(key)) count += 1;
  }
  return count;
}
```
Não podemso simplemeste adicionar à `count` a cada iteração porque o operador `in` pode considerar não somente as propriedades intrínsecas ao objetos mas também as disponíveis na _cadeia prototípica_ (prototypal chain).

## O método _values()_
```javascript
values() {
  return Object.values(this.items);
}
```
Ou então:
```javascript
valuesLegacy() {
  let values = [];
  for (let key in this.items) {
    if (this.items.hasOwnProperty(key)) values.push(key)
  }
}
```

# Operações

**Banco de dados** são uma das principais aplicações de _sets_. Para extrair um conjunto de dados de uma banco de dados relacional (_Oracle, Microsoft SQL Server, MySQL etc_), escrevemos uma _query_ usando a notações de _conjuntos_ e o banco de dados retornará um _conjunto_ de dados. 

Nas _queries_ SQL podemos especificar a quantidade de dados requerida - toda a tabela ou parte dela -, podemos ainda extrair dados comuns a várias tabelas, ou dados pertencentes a uma única tabela, dentro outras operações possíveis. Essas operações são conhecidas como **SQL joins**, e a base dessas operações são as operações de conjuntos.

Podemos realizar as seguintes operações em _sets_:
 - `União`: Dados dois conjuntos, esta operação retorna um novo conjunto composto dos dois primeiros;
 - `Interceção`: Dados dois conjuntos, esta operação retorna um novo conjunto composto dos elementos existentes em ambos;
 - `Diferença`: Dados dois conjuntos, esta operação retorna um novo conjunto composto dos elementos existentes somente no primeiro;
 - `Subconjunto`: Dados dois conjuntos, esta operação se um é subconjunto do outro;

 ## União de conjuntos

 ```javascript
 union(otherSet) {
  const unionSet = new Set();
  this.values().forEach(value => unionSet.add(value));
  otherSet.values().forEach(value => unionSet.add(value));
  return unionSet;
 }
 ```

 ## Interceção de conjuntos

 ```javascript
 intersection(otherSet) {
  const intersectionSet = new Set();
  
  const values = this.values();
  for (let i = 0; i < values.length; i++) {
    if (otherSet.has(values[i])) {
      intersectionSet.add(values[i]);
    }
  }

  return intersectionSet;
 }
 ```

 Podemos ainda melhorar o código acima para que a iteração ocorra no conjunto com menos elementos:

 ```javascript
 intersection(otherSet) {
  const intersectionSet = new Set();
  const values = this.values();
  const otherValues = otherSet.values();
  let biggerSet = values;
  let smallerSet = otherValues;

  if (otherValues.length - values.length > 0) {
    biggerSet = otherValues;
    smallerSet = values;
  }

  smallerSet.forEach(value => {
    if (biggerSet.includes(value)) interserctionSet.add(value);
  })

  return intersectionSet;
 }
 ```

 ## Diferença de conjuntos

 ```javascript
 difference(otherSet) {
  const differenceSet = new Set();

  this.values().forEach(value => {
    if (!otherSet.has(value)) differenceSet.add(value);
  })

  return differenceSet;
 }
 ```

 ## Subconjunto

 ```javascript
 isSubsetOf(otherSet) {
  if (this.size() > otherSet.size()) return false;

  let isSubset = true;

  this.values().every(value => {
    if (!otherSet.has(value)) {
      isSubset = false;
      return false;
    }
    return true;
  })

  return isSubset;
 }
 ```

 # ECMAScript 2015 (ES6) Set class

 ECMAScript 2015 apresentou a classe `Set` como parte da API JavaScript.

 Há algumas diferenças entre a classe implementada acima e a classe `Set` nativa da linguagem:
  - O método `values()` da classe `Set` ECMAScript retorna [`Iterator`*](#iterators) em vez de um array com valores.
  - A classe nativa tem uma propriedade chamada `size`, em vez de um método `size`.

### Iterators

Em JavaScript, um **iterator** é um objeto que define uma sequence e, potencialmente, um valor a ser retornado ao término da sequência.

Especificamente, **iterator** é qualquer objeto que implementa o _Iterator protocol_, possuindo um método `next()` que retorna um objeto com duas propriedades:

 - `value`: O próximo valor da sequência;
 - `done`: Tem valor igual a `true` se o último valor da sequência foi consumido.

 Uma vez criado, um objeto _iterator_ pode ser repetidamente iterado através da função `next()`. 

 O iterador mais comum em JavaScript é o _Array iterator_, que retorna em sequeência cada um dos valores do array.

 Mais sobre iteradores [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#iterators)
