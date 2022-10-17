# A fila circular

Um exemplo de _circular queue_ é o jogo **batata quente**. Nesse jogo, crianças são organizadas em círculo, e elas tem de passar a batata quente para a criança ao lado rapidamente. Em certo momento, a batata quente não é mais repassada, e a criança que estiver com ela nesse momento sai do jogo. A última criança que restar é a vencedora.

Para esse jogo, vamos implementar uma simulação do jogo:

```typescript
function hotPotato(element: string[], num: number) {
  const queue = new QueueObject(); // {1}
  const eliminatedList = [];

  for (let i = 0; i < elementsList.lenght; i++) {
    queue.enqueue(elementsList[i]); // {2}
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // {3}
    }
    eliminateList.push(queue.dequeue()); // {4}
  }

  return {
    elminated: elimatedList,
    winner: queue.dequeue(); // {5}
  };
}
```

A função `hotPorato` recebe como argumentos uma lista de nomes e um número qualquer. Criamos um objeto `queue` da classe `QueueObject` (_{1}_). Enfileiramos a lista recebida como argumento (_{2}_); o número `num` é a quantida de iterações para a batata "queime" alguém. Removemos um elemento do começo da fila e o adicionamos ao fim da fila (_{3}_) para simular a batata quente. Quando o loop for concluído, a pessoa que estiver com a batata (ou seja, o primeiro da fila) é eliminado do jogo (removido da fila). Quando houver apenas um jogador restante, este é declarado vencedor (_{5}_).

Podemos usar o seguinte código para testar o algorítmo _batata quente_:

```javascript
const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
result.eliminated.forEach((name) => {
  console.log(`${name} was eliminated from the Hot Potato game.`);
});
console.log(`The winner is: ${result.winner}`);
```

O resultado será:

```
Camila was eliminated from the Hot Potato game.
Jack was eliminated from the Hot Potato game.
Carl was eliminated from the Hot Potato game.
Ingrid was eliminated from the Hot Potato game.
The winner is: John
```
