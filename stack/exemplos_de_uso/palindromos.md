## Palíndromos

Podemos usar _stacks_ para determinar se dada _string_ é um palíndromo. Tomamos a string original e fazemos _push_ de cada caractere - da esquerda para a direita - para a pilha. Ao final da operação, a pilha contém a string em ordem reversa - o último caracter no topo da pilha.

Então criamos uma nova string com operações _pop_. Assim teremos a string original em order reversa, bastando-nos compará-la com a string original; caso sejam iguais, a string é um palíndromo.

### Implementação com JavaScript

```javascript
function isPalindrome(word) {
  const stack = new Stack();
  for (let i = 0; i < word.length; ++i) {
    stack.push(word[i]);
  }
  const reverseWord = '';
  while (stack.size() > 0) {
    reverseWord += stack.pop();
  }
  return word === reverseWord;
}
```

```javascript
console.log(isPalindrome('hello')); // false
console.log(isPalindrome('racecar')); // true
```
