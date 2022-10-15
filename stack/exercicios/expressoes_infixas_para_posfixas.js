import StackObject from '../StackObject.js';
/*
2. Implemente uma função JavaScript que converta expressões aritiméticas
infixas em expressões posfixas, usando duas pilhas - uma para os operandos
e outra para os operadores, e então use as pilhas para avaliar as e expressão.
*/

// Exemplo de operação posfixa: AB+
// Exemplo de operação infixa: A + B

// Precedência de operadores:
// 1. Agrupamentos: ()
// 2. Exponênciação: **
// 3. Multiplicação/divisão/módulo: * / %
// 4. Adição/subtração: + -
