## Algorítimo conversor de base

Podemos modificar o algorítimo [2-9](./conversao_de_base_2_a_9.md) para converter números de base 10 para qualquer base entre 2 e 36:

```javascript
function baseConverter(decimalNum, base) {
  const remainderStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decimalNum;
  let remainder;
  let baseString = '';

  if (!(base >= 2 && base <= 36>)) return '';

  while (number > 0) {
    remainder = Math.floor(number % base);
    remainderStack.push(remainder);
    number = Math.floor(number / base);
  }

  while (!remainderStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }

  return baseString;
}
```

Na conversão de decimais para binários, os restos (_remainder_) serão 0 ou 1; na conversão de decimal para octogonal os restos serão de 0 a 8; na conversão de decimal para hexadecimal, os restos podem ser de 0 a 9 e de A a F (valores 10 a 15). Por essa razão, precisamos converter esses valores: a partir da base 11, cada letra do alfabeto representará uma base. A letra A representa a base 11, B a base 12 etc.

```javascript
console.log(baseConverter(100345, 2)); // 11000011111111001
console.log(baseConverter(100345, 8)); // 303771
console.log(baseConverter(100345, 16)); // 187F9
console.log(baseConverter(100345, 35)); // 2BW0
```
