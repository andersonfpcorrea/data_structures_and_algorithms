## Índice

- [Listas encadeadas (linked lists)](#listas-encadeadas-linked-list);
- [Listas duplamente encadeadas (doubly linked lists)](#listas-duplamente-encadeadas-doubly-linked-lists)
- [Listas encadeadas circulares (circularly linked lists)](#listas-encadeadas-circulares-circularly-linked-lists)

# Listas encadeadas (Linked list)

O design da lista incluirá a criação da classe _Node_ e da classe _LinkedList_, que terá, detre outros, métodos para inserção e remoção de _nodes_.

## Classe Node

A classe _Node_ possui duas propriedades: _element_ (para os dados do _node_) e _next_ (para o _link_ com o próximo _node_ da lista).

```javascript
class Node {
  element;
  next;
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
```

## Classe LinkedList

A classe _LinkedList_ dá as funcionalidade da lista. A única propriedade dessa classe é o _head_ (o _node_ inicial da lista).

O _head_ começa com a propriedade _next_ apontando para _null_.

```javascript
class LinkedList {
  #head;

  constructor() {
    this.#head = new Node('head');
  }

  find(node) {
    let currNode = this.#head;
    while (currNode.element !== node) {
      currNode = currNode.next;
    }
    return currNode;
  }

  findPrevious(node) {
    let prevNode = this.#head;
    while (prevNode.next && prevNode.next.element !== node) {
      prevNode = prevNode.next;
    }
    return prevNode;
  }

  insert(newElement, prevItem) {
    const newNode = new Node(newElement);
    const prevNode = this.find(prevItem);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
  }

  remove(node) {
    let prevNode = this.findPrevious(node);
    if (prevNode.next) {
      prevNode.next = prevNode.next.next;
    }
  }

  display() {
    const currNode = this.#head;
    while (currNode.next) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }
}
```

### Inserindo um _node_

Para inserir um _node_, devemos definir o seu sucessor e o seu antecessor.

```javascript
insert(newElement, prevItem) {
  const newNode = new Node(newElement);
  const prevNode = this.find(prevItem);
  newNode.next = prevNode.next;
  prevNode.next = newNode;
}
```

Para inserir um _node_ depois um outro existente na lista, devemos achar o sucessor desse existente. O método `find()` vasculha a lista atrás de um dado específico; quando encontrado, a função retorna o _node_ em que o dado está contido, caso contrário a função retorna `null`.

### Achando um _node_

```javascript
find(element) {
  let currNode = this.#head;
  while (currNode.element !== element) {
    currNode = currNode.next;
  }
  return currNode;
}
```

Sabendo, pois, o sucessor e o antecessor do novo _node_, pode-se inserí-lo na lista. À propriedade _next_ do antecessor é atribuido o _novo node_, e à propriedade _next_ do novo node é atribuído o sucessor.

### Mostrando _nodes_

```javascript
display() {
  const currNode = this.#head;
  while (currNode.next) {
    console.log(currNode.next.element);
    currNode = currNode.next;
  }
}
```

A função `display()` entra na lista pelo _head_. Ela faz, então, um loop pela lista, parando quando a propriedade _next_ do elemento atual da iteração for _null_. Não é impresso o node _head_ porque ele não tem valor nenhum.

### Removendo um _node_

```javascript
findPrevious(element) {
  let prevNode = this.#head;
  while (prevNode.next && prevNode.next.element !== element) {
    prevNode = prevNode.next;
  }
  return prevNode;
}
```

Para remover um _node_, precisamos saber quem é seu antecessor. Depois de achá-lo, fazemos a sua propriedade _next_ apontar para o sucessor do _node_ a ser removido. Definimos a função `findPrevious()` para essa a tarefa de achar o antecessor. Essa função percorre a lista, checando a cada _node_ se o próximo contém o elemento a ser removido. Quando o antecessor é encontrado, a função o retorna, para que a propriedade `next` deste possa ser alterada.

```javascript
remove(element) {
  let prevNode = this.findPrevious(element);
  if (prevNode.next) {
    prevNode.next = prevNode.next.next;
  }
}
```

# Listas duplamente encadeadas (Doubly linked lists)

Apesar de ser simples percorrer uma lista encadeada do primeiro ao último _node_, não é tão simples percorrer a lista de trás para frente. Podemos simplificar esse processo adicionando ao _nodes_ uma propriedade para guardar o _link_ com o seu antecessor. Ganhamos, assim, eficiência para remover um _node_ da lista, por não precisarmos mais procurar por um _node_ anterior com `findPrevious()`.

A primeira tarefa, pois, é definir a nova propriedade na classe _Node_:

```javascript
class Node {
  element;
  next;
  previous;
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}
```

A função `insert()` de uma lista duplamente encadeada deve definir a propriedade `previous` do novo _node_:

```javascript
insert(newElement, prevNode) {
  let newNode = new Node(newElement);
  const prevNode = this.find(prevNode);
  newNode.next = prevNode.next;
  newNode.previous = prevNode;
  prevNode.next = newNode;
}
```

A função `remove()` de uma _doubly linked list_ não precisa invocar uma função `findPrevious()`. Para ser implementada, aquela deve achar o _node_ que contém o elemento a ser removido, e atribuir o sucessor deste à propriedade `next` do seu antecessor.

![Esquema de remoção de items de uma lista duplamente encadeada](../remove-doubly-linked-list.png 'Esquema de remoção de items de uma lista duplamente encadeada')

```javascript
remove(element) {
  let nodeToDelete = this.find(element);
  nodeToDelete.previous.next = nodeToDelete.next;
  if (nodeToDelete.next) nodeToDelete.next.previous = nodeToDelete.previous;
  nodeToDelete.next = null;
  nodeToDelete.previous = null;
}
```

Para realizar tarefas como mostrar no console uma _linked list_ de trás para frente, podemos, primeiramente, usar uma função utilitária para achar o último _node_ da lista:

```javascript
findLast() {
  let currNode = this.#head;
  while(currNode.next) {
    currNode = currNode.next;
  }
  return currNode;
}
```

Podemos agora escrever uma função `display()` para mostrar os elementos em order reversa:

```javascript
dispReverse() {
  let currNode = this.findLast();
  while (currNode.previous) {
    console.log(currNode.element);
    currNode = currNode.previous;
  }
}
```

## Classe _DoublyLinkedList_

A classe é fica, então, da seguinte forma:

```javascript
class DoublyLinkedList {
  #head;

  constructor() {
    this.#head = new Node('head');
  }

  find(node) {
    let currNode = this.#head;
    while (currNode.element !== node) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insert(newElement, prevNode) {
    let newNode = new Node(newElement);
    const prevNode = this.find(prevNode);
    newNode.next = prevNode.next;
    newNode.previous = prevNode;
    prevNode.next = newNode;
  }

  remove(element) {
    let nodeToDelete = this.find(element);
    nodeToDelete.previous.next = nodeToDelete.next;
    if (nodeToDelete.next) nodeToDelete.next.previous = nodeToDelete.previous;
    nodeToDelete.next = null;
    nodeToDelete.previous = null;
  }

  display() {
    const currNode = this.#head;
    while (currNode.next) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }

  dispReverse() {
    let currNode = this.findLast();
    while (currNode.previous) {
      console.log(currNode.element);
      currNode = currNode.previous;
    }
  }

  findLast() {
    let currNode = this.#head;
    while (currNode.next) {
      currNode = currNode.next;
    }
    return currNode;
  }
}
```

## Outros métodos da classe LinkedList (ou DoublyLinkedList)

Podemos também implementar nas _LinkedLists_ os seguintes métodos:

- `push(element)`: adiciona um elemento no fim da list;
- `getElementAt(index)`: retorna o elemento de uma posição específica na lista. Se o elemento é inexistente a função retorna -1;
- `indexOf(element)`: retorna o índice de uma elemento da lista. Se o elemento é inexistente, a função retorna -1;
- `removeAt(position)`: remove um item de uma posição específica da lista;
- `isEmpty()`: retorna `true` se a lista encadeada não contiver nenhum elemento, e `false` se houver algum elemento.
- `size()`: retorna o número de elementos da lista.
- `toString()`: retorna uma string representando a lista.

# Listas encadeadas circulares (Circularly Linked Lists)
