# Dicionários

## Índice

- [Map](#es6-map-class)
- [WeakMap e WeakSet](#es6-weakmapweakset-classes)

## ES6 Map Class

ECMAScript 2016 introduziu na linguagem a classe `Map`. Mais detalhes sobre a implementação `Map` pode ser encontrada na [documentação da MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

## ES6 WeakMap/WeakSet Classes

Basicamente as únicas diferenças entre as classes `Map` e `Set` e suas versões `weak` são:

- `WeakSet` e `WeakMap` não têm os métodos `entries`, `keys` e `values`;
- Somente é possível usar objetos como chaves, nas versões `weak`

A razão para criar e usar essas classes `weak` é relacionada a performance. Por serem fracamanete tipadas (usando objetos como chaves), não há uma forte referência às chaves, o que permite ao `JavaScript garbage collector` limpar completamente uma entrada do _map_ ou do _set_.

Outra vantagem das versões _fracas_ é podermos extrair um valor apenas se tivermos a chave. Como essas classes não possuem métodos de iteração (`entrie`, `keys`, `values`), não há como extrair um valor senão sabendo a chave.

```javascript
const map = new WeakMap();

const obj1 = { name: 'Matthew' };
const obj1 = { name: 'Mark' };
const obj1 = { name: 'Luke' };

map.set(obj1, 'First');
map.set(obj1, 'Second');
map.set(obj1, 'Third');

console.log(map.has(obj1)); // true
console.log(map.get(obj3)); // 'Third'

map.delete(obj2);
```
