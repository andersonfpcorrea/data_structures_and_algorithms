# Estruturas de dados e algorítmos

Este repositório consiste num resumo sobre principais estruturas de dados e algorítmos, implementados na linguagem de programação JavaScript.

O conteúdo aqui presente foi cotejado de diversas fontes e tem objetivo apenas educacional.

## Índice

- [Introdução: objetos e classes em JavaScript](#introdução-objetos-e-programação-orientada-a-objetos)
- [Implementação das estruturas de dados](#implementações-das-estruturas-de-dados)
  - [Listas (Lists)](#listas)
  - [Pilhas (Stacks)](#pilhas-stacks)
  - [Filas (Queues)](#filas-queues)
  - [Filas duplamente terminadas (Deques)](#filas-duplamente-terminadas-deques)
  - [Listas encadeadas (Linked lists)](#listas-encadeadas-linked-lists)
  - [Conjuntos (Sets)](#sets-conjuntos)
  - [Dicionários (Dictionaries)](#dicionário-dictionary)
  - [Tabelas de dispersão (Hash Tables)](#tabela-de-dispersão-hash-table)

</br>

# Introdução: Objetos e classes em JavaScript

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

A palavra `this` (_this keyword_) é usada para criar o laço entre métodos/atributos e os objetos criados a partir da função construtora **Account**.

Por "baixo dos panos", usar o operador `{}` para criar um novo objeto, é o mesmo que criar uma função contrutora e chamá-la logo em seguida para gerar um objeto.

Numa das atualizações recentes da linguagem, foram implementadas _classes_. Assim, a mesma função construtora **Account** pode ser implementada desta forma:

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

</br>

# Implementações das estruturas de dados

## Listas

Listas são especialmente úteis se não temos de fazer pesquisas pelos itens ou ordená-los de alguma forma. Como as estruturas de dados serão criadas aqui com objetos, devemos definir os atributos (características) e métodos (ações) da classe **List**.

### List ADT (abstract data type)

- Lista é uma sequência ordenada de dados
- Cada item da lista é chamado _elemento_. Em JavaScript, elementos podem ser de qualquer tipo (string, number, boolean etc).
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

## Pilhas (Stacks)

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

## Filas (Queues)

Filas (_queues_) são um tipo de lista em que os dados são inseridos no fim e removidos do início. Filas são usadas para armazenar dados na ordem de ocorrência, ao contrário das pilhas (_stacks_), em que o último dado inserido é o primeiro a ser processado.

Filas são exemplos de estrutura de dados _first-in, first-out (FIFO)_ - primeiro a chegar, primeiro a sair. Filas são usadas para ordenar processos submetidos, por exemplo, a um sistema operacional, impressoras etc.

### Operações de _queues_

As duas principais operações de _queues_ são inserção e remoção de elementos. A inserção é chamada _enqueue_ (enfileirar), e a remoção _dequeue_. A operação _enqueue_ insere um novo elemento no fim da fila; a operação _dequeue_ remove um elemento da frente da fila.

A operação de checar o primeiro elemento da fila chama-se _peek_. Essa operação retorna o elemento da frente da fila sem removê-lo. Filas também têm a propriedade _length_ - ou o método _size_ -, que guarda/retorna a quantidade de elementos da fila. Por fim, a operação _clear_ remove todos os elementos da _queue_.

_[Clique aqui para ver a implementação, exemplos e exercícios relacionados a filas](./queue/)_

<hr>

## Filas Duplamente Terminadas (Deques)

A estrutura de dados _deque_ (_**d**ouble **e**nded **q**ueue_), também conhecida como _double-ended queue_, é um tipo especial de fila que permite inserir e remover elementos do fim e do início dela.

Uma aplicação comum de _deques_ é armazenar uma lista de operações desfeitas (_undo operations_). Cada vez que um usuário realiza uma operação no software, a operação é guardada numa _deque_. Quando o usuário clica num botão "desfazer", a opearção é removida da _deque_ - ou seja, a operação do fim é removida (assim como uma _stack_). Depois de uma quantidade pre-definida de operações, os dados mais antigos da _deque_ são removidos da frente da _deque_ (assim como uma _queue_). Porque esta estrutura de dados implementa os princípios FIFO e LIFO, podemos dizer que _deques_ são uma mescla entre filas e pilhas.

_[Clique aqui para ver a implementação de deques](./deque/)_

<hr>

## Listas encadeadas (Linked Lists)

### Definiências de _arrays_

_Arrays_ não são a melhor estrutura de dados em algumas situações. Em muitas linguagens de programação, _arrays_ tem tamanho fixo, tornando trabalhosa a adição de elementos quando o tamanho máximo é alcançado. Além disso, nessas mesmas linguagens, adicionar e remover elementos de um _array_ significa ter de realocar o índice de todos os outros elementos. Essas dificuldades, porém, não existem em JavaScript - podemos usar _shift()_ ou _split()_ sem a preocupação de acessar outros elementos do _array_.

O principal problema de _arrays_ em JavaScript, no entanto, é eles serem implementados como objetos, tornando-os menos eficientes que _arrays_ construídos em outras linguagem (C++ e Java, por exemplo).

### Que é um _array_?

Um _array_ é uma alocação linear (contígua) de memória em que elementos são acessados por _números inteiros_. Esses _inteiros_, por sua vez, são usados para computar _offsets_ (deslocamentos), ou seja, cada _inteiro_ é um _índice_ de um espaço da memória alocada para o array. JavaScript não possui nada parecido com isso.

Para entender melhor _arrays_, vamos supor a criação de um, na lingugem de programação _Java_. Para criar um array em Java podemos fazer o seguinte:

```java
int[] arr = {0, 1, 2, 3}; // criamos uma array de inteiros
```

Com essa linha de código, criamos um array estático contendo 4 números inteiros. O compilador vê esse código e entende que precisamos de um array de inteiros, e que ele precisa requerer memória para isso. Cada número do tipo _int_ ocupa _4 bytes_ de memória, portanto são necesários 16 bytes para aquele array.

A memória dos computadores é organizada em _células_, cada qual é capaz de armazenar _8 bits_ e possui um índice numérico. Um byte é igual a 8 bits, portanto o array acima necessita de 16 células de memória (128 bits).

![célula de memória](memory.png 'Células de memória')

O problema para adicionar novos dados em _arrays_ é que não escolhemos quais células serão usadas para guardá-lo, muito menos podemos gerenciar as células vizinhas. Não podemos, portanto, garantir que as células próximas ao array estarão disponíveis. A solução para isso é simplesmente criar um novo array com a quantidade extra de memória, copiar os valores antigos nesse novo array e adicionar os novos dados.

Remover elementos de um array é, _mutatis mutandis_, o mesmo problema.

Em vez desse tipo de arrays, JavaScript disponibiliza objetos que possuem características de arrays. O primeiro elemento de um array JavaScript tem a propriedade (_chave_) '0', o segundo a propriedade '1' etc. A diferença entre

```javascript
const obj = { 0: 'zero', 1: 'um' };
```

e

```javascript
const arr = ['zero', 'um'];
```

é que o protótipo de `obj` é `Object.prototype`, e o de `arr` é `Array.prototype`; ou seja, o array `arr` herda, por exemplo, os métodos `push`, `shift`, `pop`, `map`; já o objeto `obj` não tem acesso a nada disso.

Apesar de poder ser mais convenientemente manipulado, um arrray _JavaScript_ é significantemente mais lento que um _array de fato_.

Quando operações com arrays tornam-se lentas demais, podemos considerar listas encadeadas como um alternativa. Essas listas pode ser usadas em quase todas as situações em que arrays unidimensionais são usados, exceto se for preciso acesso a elementos aleatórios da lista; nesse caso, arrays devem ser usados.

### Definição de _listas encadeadas (linked lists)_

Listas encadeadas são uma coleção de _nodes_ (nódulos). Cada _nódulo_ é ligado ao seu sucessor por meio de uma _referência_. A referência a outro _node_ é chamada _link_.

Apesar de serem, assim como _arrays_, uma coleção sequencial de elementos, os elementos das _linked lists_ não são alocados em lugares contíguos da memória.

Enquanto os elementos de um array são referenciados pela sua posição, elementos de uma _linked list_ são referenciados por sua relação ao outros elementos da lista.

Um dos benefícios de uma lista encadeada em relação aos arrays convencionais é não precisarmos deslocar todos os elementos da lista ao adicionarmos ou removermos elementos. Precisamos, porém, usar _pointers_ (ou _links_) ao trabalharmos com listas encadeadas; se quisermos, por exemplo, acessar um certo elemento do meio da lista, precisaremos necessariamente percorrer a lista do primeiro elemento até o elemento desejado.

Dada a seguinte representação de lista encadeada

      'leite' => 'pão' => 'ovos' => 'bacon' => null

dizemos que _pão_ sucede _leite_, não que _pão_ está na segunda posição.

Mover por uma _linked list_ significa seguir os _elos_ da lista, do começo do nódulo inicial ao último. O fim da lista aponta para um nódulo _null_.

Muitas implementações de _linked lists_ incluem um tipo especial de _node_, chamado _head_, sendo ele o começo da lista.

Para inserir ou remover um elemento da lista, basta redefinir os elos entre os _nodes_. Por exemplo, para adicionar _biscoito_ depois de _ovos_, fazemos _ovos_ apontar para _biscoito_, e este apontar para _bacon_:

      'leite' => 'pão' => 'ovos' => 'biscoito' => 'bacon' => null

Para remover _bacon_ da lista, basta fazer _biscoito_ apontar para _null_.

_[Clique aqui para ver a implementação, exemplos de uso e exercícios de listas encadeadas](./linked-list/)_

<hr>

## Sets (conjuntos)

_Set_ é uma coleção de dados desordenados e únicos (valores não podem se repetir). Esta estrutura de dados usa o conceito metemático de conjuntos finitos aplicado a uma estrutura de dados computacional.

Em matemática, um _conjunto_ (ou _set_) é uma coleção de objetos distintos. Por exemplo, o conjunto dos números naturais é a coleção de números inteiros positivos `N = {0, 1, 2, 3...}`.

_Conjuntos_ matemáticos possuem, ainda, algumas operações básicas: união, intercessão e diferença. A estrutura de dados _set_ também possui essas características.

Podemos iniciar uma classe `Set` desta forma:

```javascript
class Set {
  constructor() {
    this.items = {};
  }
}
```

Precisamos então declarar os métodos disponíveis para um _set_:
 - `add(element)`: Adiciona um novo elemento ao _set_;
 - `delete(element)`: Apaga um novo elemento do _set_;
 - `has(element)`: Retorna `true` se `element` existe no conjunto e `falso` se não existir;
 - `clear()`: Remove todos os elementos do conjunto;
 - `size()`: Retorna o número de elementos do conjunto;
 - `values()`: Retorna um _array_ com todos os valores (`elements`) do conjunto;

_[Implementação da classe Set](./set/README.md)_

<hr>

## Dicionário (dictionary)

Um **dicionário** é usado para guardar pares de chave/valor, podendo a _chave_ ser usada para encontrar o _valor_. Dicionários são também chamados **mapas**, **tabela de símbolos** ou **arrays associativos**.

ECMAScript 2015 contém uma implementação de dicionário: a classe `Map`.

Mais sobre `Map` [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

<hr>

## Tabela de dispersão (Hash table)

_Hash table_ (tabela _hash_, ou tabela de espelhamento), também conhecida como _hash map_, é um tipo de _dicionário_.

**Hashing** consiste em achar um valor numa estrutura de dados no tempo mais curto possível. Enquanto outras estruturas têm de iterar seus elementos para encontrar um valor específico, a _hash table_, através de uma função _hash_, é capaz de retornar diretamente o valor, dada certa chave, sem necessidade de iterar por seus elementos.

A função _hash_ que iremos implementar a seguir chama-se **lose-lose hash**, em que são somados todos os valores ASCII dos caracteres das chaves.

[Implementação da classe _HashTable_ aqui](./hash-table/README.md)