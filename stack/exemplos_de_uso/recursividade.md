## Recursividade

Stacks podem ser usadas para implementar algoritimos recursivos. Para demonstrar como isso pode ser feito, consideremos a seguinte função recursiva que calcula o fatorial um número:

      5! = 5 * 4 * 3 * 2 * 1 = 120

```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
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
  while (stack.size() > 0) {
    product *= stack.pop();
  }
  return product;
}

console.log(factorial(5)); // 120
console.log(fact(5)); // 120
```
