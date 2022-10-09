# Usando a classe Stack

## Conversão de base

Uma stack pode ser usada para converter um número de base 10 para uma outra base. Dado um número _n_, que deve ser convertido para uma base _b_, este é o algoritimo da conversão:

  1 - Faça a operação _push_ de _n % b_ para a pilha;

  2 - Substitua _n_ por _n / b_;

  3 - Repita dos passos 1 e 2 até _n_ ser _0_;

  4 - Crie a string do número convertido fazendo a operação _pop_ até a pilha ser esvaziada.

**Obs:** Este algoritimo funcionará somente com bases de 2 a 9.

**Exemplo**: Converter _12_ para a base _2_.

  _Primeira iteração_

    8 % 2 = 0 | pilha = [0];

    8 / 2 = 4

  _Segunda iteração_

    4 % 2 = 0 | pilha = [0, 0];
    4 / 2 = 2
  
  _Terceira iteração_

    2 % 2 = 0 | pilha = [0, 0, 0];
    2 / 2 = 1

  _Quarta iteração_

    1 % 2 = 1 | pilha = [0, 0, 0, 1];
    1 / 2 = 0.5

  _Conversão_:

    pilha = [0, 0, 0, 1] | número 8 na base 2 é 1000

### Implementação com JavaScript

```javascript
function changeBase(num, base) {
  const stack = new Stack();
  do {
    stack.push(num % base);
    num = Math.floor(num /= base);
  } while (num > 0);
  let converted = "";
  while (stack.length() > 0) {
    converted += stack.pop();
  }
  return converted;
}
```

### Mais exemplos

```javascript
const newNum = changeBase(32, 2);
const anotherNewNum = changeBase(125, 8);
console.log(newNum) // 100000
console.log(newNum) // 175
```
<hr>

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
  const reverseWord = "";
  while (stack.length() > 0) {
    reverseWord += stack.pop();
  }
  return word === reverseWord
}
```
```javascript
console.log(isPalindrome("hello")) // false
console.log(isPalindrome("racecar")) // true
```

## Recursividade

Stacks podem ser usadas para implementar algoritimos recursivos. Para demonstrar como isso pode ser feito, consideremos a seguinte função recursiva que calcula o fatorial um número:

      5! = 5 * 4 * 3 * 2 * 1 = 120

```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n -1);
}
```
Para simular _5!_ usando uma _stack_, primeiramente _push_ os números 5, 4, 3 e 2 para a pilha. Então, num loop, remova (_pop_) os números do topo, mutiplicando-os por um contador de valor inicial igual a 1.
```javascript
function fact(n) {
  const stack = new Stack();
  while (n > 1) {
    stack.push(n--);
  }
  let product = 1;
  while (stack.length() > 0) {
    product *= stack.pop();
  }
  return product;
}

console.log(factorial(5)); // 120
console.log(fact(5)); // 120
```
