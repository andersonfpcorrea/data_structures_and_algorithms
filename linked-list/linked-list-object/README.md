# Linked list

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

  find(item) {
    let currNode = this.#head;
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insert(newElement, item) {
    const newNode = new Node(newElement);
    const predecessor = this.find(item);
    newNode.next = predecessor.next;
    predecessor.next = newNode;
  }

  remove() {}

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

Para inserir um _node_ depois um outro existente na lista, devemos achar o sucessor deste existente. O método `find()` vasculha a lista atrás de um dado específico; quando encontrado, a função retorna o _node_ em que o dado está contido, caso contrário a função retorna `null`.

Sabendo, pois, o sucessor e o antecessor do novo _node_, pode-se inserí-lo na lista. À propriedade _next_ do antecessor é atribuido o _novo node_, e à propriedade _next_ do novo node é atribuído o sucessor.

A função `display()` entra na lista pelo _head_. Ela faz, então, um loop pela lista, parando quando a propriedade _next_ do elemento atual da iteração for _null_. Não é impresso o node _head_ porque ele não tem valor nenhum.
