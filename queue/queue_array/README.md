# Implementação da classe _Queue_ com array

Implementar uma classe _Queue_ usando arrays é simples com JavaScript, por esta linguagem ter funções nativas para adicionar dados no fim do array (_push()_) e remover do começo da lista (_shift()_).

Assim como feito na classe Stack, iremos usar _private fields_ nas propriedades que não devem ser diretamente alteradas, e deixaremos os métodos públicos. Para declarar uma propriedade privada (ou seja, que é acessível apenas dentro da classe, e não nas instâncias), basta usar o símbolo _#_ antes do nome da propriedade, seguido do operador de atribuição e valor, ou apenas ponto e vírgurla para não iniciar a propriedade.

```javascript
class QueueArray {
  #items;

  constructor(items = []) {
    this.#items = items;
  }

  enqueue(element) {
    return this.#items.push(element);
  }

  dequeue() {
    return this.#items.shift();
  }

  peek() {
    return this.#items[0];
  }

  back() {
    return this.#items.at(-1);
  }

  toString() {
    return this.#items.join(' ');
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }
}
```
