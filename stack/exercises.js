import Stack from './Stack.js';

/*
1. Uma stack pode ser usada para garantir que uma expressão matemática não tem erros em parênteses
(ou seja, que não haja parênteses faltantes: "1 + (2 / 2 * 3" é uma expressão falha).
Escreva uma função que receba como argumento uma expressão aritmética e retorne a posição do parêntese
não balanceado.
*/

/*
2. Implemente uma função JavaScript que converta expressões aritiméticas infixas em expressões posfixas, 
usando duas pilhas - uma para os operandos e outra para os opeardores, e então use as pilhas para avaliar
as e expressão.
*/

/*
3. Um exemplo real de pilha é um dispensador de balas Pez. Considere um dispenser "virtual" cheio de balas vermelhas,
amarelas e brancas, e que você não queira as amarelas. Escreva um programa, usando pilhas, para remover as amarelas
sem alterar a ordem das outras balas no dispenser.
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
  const stack = new Stack();
  for (let i = 0; i < expression.length; i++) {
    if (expression[i].match(/[\(\)]/)) {
      // se a pilha está vazia, guarda o valor/índice com push:
      if (stack.top === 0) {
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
