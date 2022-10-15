## Implementação com Array _[aqui](./StackArray.js)_

## Implementação com Objeto _[aqui](./StackObject.js)_

## Exercícios _[aqui](./exercises.js)_

## Exemplos de uso _[aqui](./exemplos_de_uso/README.md)_

# Criando um stack com objetos

O modo mais fácil de criar uma classe _stack_ é usar arrays para guardar os elementos (_[./StackArray](./StackArray.js)_). Ao trabalharmos com um grande número de dados, porém, precisamos analizar o modo mais eficiente de armazená-los.

A maior parte dos métodos de arrays tem complexidade de tem O(n), ou seja, é preciso iterar por todo o array para encontrar o elemento desejado, e no pior caso, precisaríamos iterar por todo o array (_n_ é o tamanho do array).

Quanto mais elementos tem um array, mais tempo será necessário para iterar pelos seus elementos. Além disso, um array é um conjunto de elementos ordenados, e para se manter esse elementos em ordem é necessáro consumir mais espaço na memório.

Para acessar elementos diretamente, usando menos memória e ainda tê-los organizado, em vez de arrays podeos usar objetos.

```javascript
class StackObject {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  // métodos
}
```

### Método push()

Diferentemente da implementação com arrays, aqui só é possível fazer _push()_ de um único elemento por vez:

```javascript
push(element) {
  this.items[this.count] = element;
  this.count++;
}
```

### Métodos size() e isEmpty()

A veriável _count_ indica o tamanho da stack. Logo, o método _size_ pode simplesmente retornar essa propriedade.

```javascript
size() {
  return this.count;
}
```

Para verificar se a pilha está vazia, podemos comparar _count_ com 0;

```javascript
isEmpty() {
  return this.count === 0;
}
```

### Método pop()

O método pop() remove o elemento do topo da pilha e retorna esse elemento.

```javascript
pop() {
  if (this.isEmpty()) return undefined;
  this.count--;
  const result = this.items[this.count];
  delete this.items[this.count];
  return result;
}
```

### Métodos peek() e clear()

Para acesssar o topo da pilha, precisamos reduzir de _count_ uma unidade:

```javascript
peek() {
  if (this.Empty()) return undefined;
  return this.items[this.count - 1]
};

clear() {
  while (!this.isEmpty()) {
    this.pop();
  }
}

// ou a seguinte, que simula o comportamento li-fo
// clear() {
//   this.items = { };
//   this.count = 0;
// }
```

### Método toString()

Na versão da pilha com Array, esse método não é necessário, mas com objectos precisamos nós mesmos implementá-los.

```javascript
toString() {
  if (this.Empty) return '';
  let objString = `${this.items[0]}`;
  for (let i = 1; i < this.count; i++) {
    objToString = `${objstring},${this.items[i]}`
  }
  return objString;
}
```

## Protegendo elementos internos da estrutura de dados

Ao criar estruturas de dados ou objetos acessíveis a outros desenvolvedores, precisamos protejer os elementos internos, expondo apenas alguns métodos.

No caso das _stacks_, precisamos garantir que os elementos sejam adicionados apenas no topo.

Para isso, podemos usar algumas funcionalidades recentes do JavaScript: _public fields_, _private fields_ e _static fields_.

O objetivo é deixar as propriedades _count_ e _items_ privadas, deixando públicos apenas os métodos:

```javascript
class StackObject {
  #count = 0;
  #items = {};

  push(element) {
    this.#items[this.#count] = element;
    this.#count++;
  }

  size() {
    return this.#count;
  }

  isEmpty() {
    return this.#count === 0;
  }

  pop() {
    if (this.isEmpty()) return undefined;
    this.#count--;
    const result = this.#items[this.#count];
    delete this.#items[this.#count];
    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#count - 1];
  }

  clear() {
    this.#items = {};
    this.#count = 0;
  }

  toString() {
    if (this.isEmpty()) return '';
    let objString = `${this.#items[0]}`;
    for (let i = 1; i < this.#count; i++) {
      objString = `${objString},${this.#items[i]}`;
    }
    return objString;
  }
}

const a = new StackObject();
console.log(Object.getOwnPropertyNames(a)); // []
console.log(a.push(1));
console.log(a.push(1));
console.log(a.push(1));
console.log(a.push(1));
console.log(a.toString()); // 1,1,1,1
```
