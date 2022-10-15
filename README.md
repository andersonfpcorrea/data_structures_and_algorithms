# Estruturas de dados e algorítimos

Este repositório consiste num resumo sobre principais estruturas de dados e algorítimos, implementados na linguagem de programação JavaScript.

O conteúdo aqui presente foi cotejado de diversas fontes e tem objetivo apenas educacional.

## INTRODUÇÃO: Objetos e programação orientada a objetos

Objectos, na linguagem JavaScript, são criados por uma função construtora que inclui declarações para os atributos e métodos do objeto, por exemplo:

```javascript
function Account(amount) {
  this.balance = amount; // atributo
  this.deposit = deposit; // método
  this.withdraw = withdraw; // método
  this.toString = toString; // método
}

function deposit(amount) {
  this.balance += amount;
}

function withdraw(amount) {
  if (amount <= this.balance) {
    this.balance -= amount;
  }
  if (amount > this.balance) {
    console.log('Insufficient funds');
  }
}

function toString() {
  return 'Balance: ' + this.balance;
}

var account = new Account(100); // objeto criado
```

A palavra `this` (_this keyword_) é usada para criar o laço entre métodos/atributos e os objetos criados a partir da funcção construtora **Account**.

Por "baixo dos panos", usar o operador `{}` para criar um novo objeto, é o mesmo que criar uma função contrutora e chamá-la logo em seguida para gerar um objeto.

Numa das atualizações recentes da linguagem, foram implementadas _classes_. Assim a mesma função construtora **Account** pode ser implementada desta forma:

```javascript
class Account {
  constructor(amount) {
    this.balance = amount;
  }
  deposit(value) {
    this.balance = value;
  }
  withdraw(value) {
    if (this.balance >= value) this.balance -= value;
  }
  toString() {
    return `Balance: ${this.balance}`;
  }
}

const account = new Account(100);
```

Classes, portanto, são moldes (ou templates) de objetos.

# Implementações das estruturas de dados

## Listas

Listas são especialmente úteis, se não temos de fazer pesquisas pelos itens ou ordená-los de alguma forma. Como as estruturas de dados serão criadas aqui com objetos, devemos definir os atributos (características) e métodos (ações) da classe **List**.

### List ADT (abstract data type)

- Lista é uma sequência ordenada de dados
- Cada item da lista é chamado _elemento_. Em JavScript, elementos podem ser de qualquer tipo (string, number, boolean etc).
- O tamanho da lista não é pre-determinado
- Uma lista sem elementos é _empty_
- O número de elementos da lista é chamado _length_
- O número de elementos é guardado internamente na propriedade _listSize_
- Podemos acrescentar (_append_) um elemento ao final da lista
- Podemos inserir (_insert_) um elemento no começo ou em qualquer posição da lista
- Elementos são excluídos através de um método _remove_
- Há um método para limpar a lista (_clear_)
- Os elementos são mostrados através do método _toString()_ ou _getElement()_
- Listas tem propriedades para descrever posição
- O começo da lista é o _front_
- O término da lista é o _end_
- Podemos iterar pelos elementos da lista através de um método _next()_ ou _prev()_
- Podemos acessar um elemento específico através de um método _moveTo(n)_, em que _n_ especifica a posição
- A propriedade _curPos_ indica a posição atual
- A especificalçao abstrata de lista não define uma função de armazenamento. Nesta implementação será usado um array chamado _dataStore_

_[Clique aqui para ver a implementação da lista](./list/List.js)_.

<hr>

## Stacks

Stack (_pilha_) é uma lista de elementos acessíveis somente desde um ponto da lista, o qual é chamado topo. A _stack_ é conhecida como _last-in, first-out_ (LIFO) - último a chegar, primeiro a sair.

Para pegar um elemento do fundo da _stack_, todos os outros elementos devem ser removidos primeiro.

### Stack ADT

- Elementos são adicionados através da operação _push_
- Elementos são removidos através da operação _pop_
- A operação _peek_ retorna o valor do topo da lista, sem removê-lo
- A propriedade _top_ é incrementada a cada _push_ e subtraída a cada _pop_
- A operação _clear_ remove todos os elementos da pilha
- A propriedade _length_ guarda o número de elementos da pilha
- A propriedade _empty_ (boolean) indica se a pilha está vazia

_[Clique aqui para ver exemplos de uso e a implementação da stack](./stack)_.

<hr>

## Queues

continua...
