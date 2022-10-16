# Implementação da classe _Queue_ com objeto

Usar um objeto para a implementação da fila é geralmente mais eficiente para acessar os elementos.

As propriedades `count` e `lowestCount` servem para guardar, respectivamente, o tamanho da fila e o elemento na frente da fila.

```javascript
class QueueObject {
  #items = {};
  #count = 0;
  #lowestCount = 0;

  enqueue(element) {
    this.#items[this.#count] = element;
    this.#count++;
  }

  dequeue(element) {
    if (this.isEmpty()) return undefined;
    const result = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#lowestCount];
  }

  isEmpty() {
    return this.#count - this.#lowestCount === 0;
  }

  size() {
    return this.#count - this.#lowestCount;
  }

  clear() {
    this.#items = {};
    this.#count = 0;
    this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) return '';
    let objString = `${this.#items[this.#lowestCount]}`;
    for (let i = this.#lowestCount + 1; i < this.#count; i++) {
      objString = `${objString}, ${this.#items[i]}`;
    }
  }
}
```

Consideremos o seguinte cenário para simular um _dequeue_:

```
items = { 0: 5, 1: 8 };
count = 2;
lowestCount = 0;
```

Para acessar o elemento da frente da fila (o primeiro elemento adicionado: _5_), precisamos acessar a chave com valor _0_. Podemos acessar _items[0]_, deletá-la e retornar seu valor. Após remover essa entrada, a propriedade _items_ conterá um único elemento (_1: 8_), que será o próximo removido ao chamarmos o método _dequeue_. Então, incrementamos _lowestCount_ de _0_ para _1_.

Sendo _enqueue_ e _dequeue_ os únicos métodos disponíveis para adicionar e remover elementos da fila, garantimos que o princícpio _FIFO_ (first-in, first-out) esteja corretamente implementado.
