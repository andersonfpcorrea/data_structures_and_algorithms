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
    num = Math.floor((num /= base));
  } while (num > 0);
  let converted = '';
  while (stack.size() > 0) {
    converted += stack.pop();
  }
  return converted;
}
```

### Mais exemplos

```javascript
const newNum = changeBase(32, 2);
const anotherNewNum = changeBase(125, 8);
console.log(newNum); // 100000
console.log(newNum); // 175
```

<hr>
