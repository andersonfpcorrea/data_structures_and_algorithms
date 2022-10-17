# Palíndromo

O seguinte algoritmo usa uma _deque_ para resolver se uma _string_ é um palíndromo:

```javascript
function palindromeChecker(aString) {
  if (!aString) return false;
  const deque = new Deque();
  const lowerStr = sString.toLowerCase().split(' ').join('');
  let isEqual = true;
  let firstChar, lastChar;

  for (let i = 0; i < lowerStr.length; i++) {
    deque.addBack(lowerStr[i]);
  }

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) isEqual = false;
    return isEqual;
  }
}
```

1. Se a _string_ passada como argumento é inválida (_undefined, null,_ ou _vazia_), a função retorna imediatamente `false`.

2. Criamos uma _deque_;

3. Removemos espaços vazios e deixamos todas as letras em caixa baixa;

4. Enfileiramos todos os caracteres da _string_ na _deque_;

5. Enquanto há elementos na _deque_, removemos da _deque_ o primeiro e o último elemento, comparamos um com o outro e caso sejam iguais o processo se repete, caso contrário a _string_ não é palíndroma, o loop _while_ é terminado e a função retorna `false`. Caso a _string_ seja um palíndromo, a variável `isEqual` permanece `true` e é retornada pela função.

Examplo:

```javascript
console.log(palindromeChecker('a')); // true
console.log(palindromeChecker('aa')); // true
console.log(palindromeChecker('kayak')); // true
console.log(palindromeChecker('level')); // true
console.log(palindromeChecker('Was it a car or a cat I saw')); // true
console.log(palindromeChecker('Step on no pets')); // true
```
