import StackObject from '../StackObject.js';
/*
3. Um exemplo real de pilha é um dispensador de balas Pez. 
Considere um dispenser "virtual" cheio de balas vermelhas,
amarelas e brancas, e que você não queira as amarelas. 
Escreva um programa, usando pilhas, para remover as amarelas
sem alterar a ordem das outras balas no dispenser.
*/

// ?==================================================
// ?========EXEMPLO DE RESOLUÇÕES=====================
// ?==================================================

//*************************
//* RESOLUÇÃO 1:
//*************************
const v = 'vermelha';
const a = 'amarela';
const b = 'branca';
const pez = [v, a, b, v, a, b, b, a, v, a, v, b, a, v];

const removeColor = (pezList, color) => {
  const stack = new StackObject();
  const list = pezList;
  const newList = [];
  //1. Guarda na pilha todas exceto a cor selecionada
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== color) stack.push(list[i]);
  }
  //2. Tira da pilha e guarda em newList (em ordem inversa)
  while (stack.size() > 0) {
    newList.push(stack.pop());
  }
  //3. Reverte a ordem de newList duas posições por vez:
  const div =
    newList.length % 2 === 0 ? newList.length / 2 : newList.length / 2 - 1;
  for (let i = 0; i < div; i++) {
    let front, back;
    front = newList[i];
    back = newList[newList.length - 1 - i];
    newList[i] = back;
    newList[newList.length - 1 - i] = front;
  }
  return newList;
};

console.log(removeColor(pez, a)); /* [
  'vermelha', 'branca',
  'vermelha', 'branca',
  'branca',   'vermelha',
  'vermelha', 'branca',
  'vermelha'
]
*/
