# Filas com prioridades (_priority queues_)

Há certas aplicações de filas que requerem remover um elemento que não seja o primeiro da fila. Para implementar isso, precisamos criar uma estrutura de dados chamada _prioruty queue_.

Uma _priority queue_ pode, portanto, retirar um elemento da fila com base numa prioridade. Um exemplo de _priority queue_ no mundo real é a triagem inicial de pacientes num hospital: pacientes com alta prioridade são atendidos primeiro, e pacientes com a mesma prioridade são ordenados com base na ordem de chagada (first-in, first-out).

Vamos começar a construir um sistema de _priority queue_ definindo a classe Patient, que irá gerar os objetos a serem armazenados na fila:

```javascript
class Patient {
  #name;
  #code;
  constructor(name, code) {
    this.#name = name;
    this.#code = code;
  }

  getName() {
    return this.#name;
  }

  getCode() {
    return this.#code;
  }
}
```

O valor de ```code```` será um inteiro, representando a prioridade do paciente.

Agora criaremos uma nova classe, `PriorityQueue`, que extende `QueueArray`, sobrescrevendo o método `dequeue()` para que remova da fila o primeiro paciente com a maior prioridade. Definiremos que o elemento com máima prioridade será o possuidor do menor `code`. O novo método `queue()` passará pelos elementos da fila para achar o com menor `code`. Então, o método usará `splice()` para remover o elemento com prioridade:

```javascript
class PriorityQueue extends QueueArray {
  #items;

  constructor(items = []) {
    super(items);
    this.#items = items;
  }

  dequeue() {
    let priority = { index: 0, code: 99 };
    for (let i = 1; i < this.size(); ++i) {
      if (this.#items[i].code < priority.code)
        priority = { index: i, code: this.#items[i].code };
    }
    return this.#items.splice(priority.index, 1);
  }
}
```

O novo método `dequeue()` usa uma simples busca sequencial para achar o elemento com a maior prioridade (ou seja, o menor `code`). O método, então, retorna um array com o elemento removido da fila.

Finalmente, sobrescreveremos também o método `toString()`:

```javascript
class PriorityQueue extends QueueArray {
  #items;

  constructor(items = []) {
    super(items);
    this.#items = items;
  }

  dequeue() {
    let priority = { index: 0, code: 99 };
    for (let i = 1; i < this.size(); ++i) {
      if (this.#items[i].code < priority.code)
        priority = { index: i, code: this.#items[i].code };
    }
    return this.#items.splice(priority.index, 1);
  }

  toString() {
    return this.#items.map((el) => `${el.name} | code: ${el.code}`).join(' \n');
  }
}
```

Exemplo:

```javascript
const emergency = new PriorityQueue();

emergency.enqueue({ name: 'Jhon', code: 5 });
emergency.enqueue({ name: 'Mary', code: 4 });
emergency.enqueue({ name: 'Antony', code: 0 });
emergency.enqueue({ name: 'Paul', code: 1 });
emergency.enqueue({ name: 'Luke', code: 2 });
emergency.enqueue({ name: 'Mark', code: 3 });

console.log(emergency.dequeue()); // [ { name: 'Antony', code: 0 } ]
```
