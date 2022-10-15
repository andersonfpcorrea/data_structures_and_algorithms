import StackArray from './StackArray.js';

/*
1. Uma stack pode ser usada para garantir que uma expressão matemática não tem erros em parênteses
(ou seja, que não haja parênteses faltantes: "1 + (2 / 2 * 3" é uma expressão falha).
Escreva uma função que receba como argumento uma expressão aritmética e retorne a posição do parêntese
não balanceado.
*/

// ?==================================================
// ?========EXEMPLO DE RESOLUÇÕES=====================
// ?==================================================

//*************************
//* EXERCÍCIO 1:
//*************************
const badExpression = '(2.3 + (23)) / (12 + ( 3.14159 * 24)';
const goodExpression = '2.3 + 23 / 12 + (3.14159 * 24)';

// OBS: de acordo com o Unicode Standard, o valor do símbolo
// '(' é 050, e do ')' é 051. Usaremos essa informação para
// a resolução do problema.
/**
 * @param {string} expression
 */
const parseExpression = (expression) => {
  const stack = new StackArray();
  for (let i = 0; i < expression.length; i++) {
    if (expression[i].match(/[\(\)]/)) {
      // se a pilha está vazia, guarda o valor/índice com push:
      if (stack.isEmpty()) {
        stack.push([expression[i], i]);
        continue;
      }
      // se a pilha não está vazia, compara o valor atual com o valor do topo:
      // se o valor atual for maior que o do topo da pilha, remove o topo,
      // caso contrário guarda na pilha o valor/índice atual:
      if (expression[i] > stack.peek()[0]) {
        stack.pop();
        continue;
      }
      stack.push([expression[i], i]);
    }
  }
  // Se a pilha está vazia, todos os parênteses estão balanceados
  if (!stack.peek()) console.log('Equação OK');
  // Se há algo no topo da pilha, a expressão está incorreta
  else {
    console.log(
      `Erro no parêntese da posição ${stack.peek()[1]}: ${expression.slice(
        0,
        stack.peek()[1]
      )}***${stack.peek()[0]}***${expression.slice(stack.peek()[1])}`
    );
  }
};

parseExpression(badExpression); // Erro no parêntese da posição 13: (2.3 + 23) / ***(***(12 + ( 3.14159 * 24)
parseExpression(goodExpression); // Equação OK
