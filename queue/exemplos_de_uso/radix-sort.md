# Ordenando dados com _Queues_

Filas podem ser usadas para ordenação de dados. A técnica a seguir chama-se _radix sort_. Apesar de não o algoritmo de ordenação mais rápido, é uma demonstração interessante do uso de filas.

A _radix sort_ percorre duas vezes o conjunto de dados - suponha um conjunto de inteiros de 0 a 99 -; a primeira passagem ordena os números em _bins_ com base nas casa das unidades, e a segunda com base na casa das dezenas.

Por exemplo, dados os seguintes números:

    91, 46, 85, 15, 92, 35, 31, 22

A primeira ordenação resulta na seguinte configuração

    Bin 0:
    Bin 1: 91, 31
    Bin 2: 92, 22
    Bin 3:
    Bin 4:
    Bin 5: 85, 15, 35
    Bin 6: 46
    Bin 7:
    Bin 8:
    Bin 9:

Agora os números são ordenados conforme a configuração nas _bins_:

    91, 31, 92, 22, 85, 15, 35, 46

Em seguinda, o processo se repete pela casa das dezenas:

    Bin 0:
    Bin 1: 15
    Bin 2: 22
    Bin 3: 31, 35
    Bin 4: 46
    Bin 5:
    Bin 6:
    Bin 7:
    Bin 8: 85
    Bin 9: 91, 92

Finalmente os números são colocados numa lista conforme a configuração das _bins_:

    15, 22, 31, 35, 46, 85, 91, 92

Podemos implementar esse algoritmo usando _queues_ para representar as _bins_. Precisamos de nove filas, uma para cada dígito. Armazenaremos as filas num array. Usaremos as operações de módulo ou de divisão para determinar a localização (_bin_) de cada número.

Primeiramente, criamos a função que distribui os números de um array nas filas corretas (cada fila representando um _bin_):

```javascript
/**
 * @param {number[]} nums
 * @param {Queue[]} queues
 * @param {number} n número de filas a serem usadas para simular as bins
 * @param {1 | 10} digit 1 é usado para a primeira varredura, em que são distribuídos os números de acordo com a casa da unidades; 10 é usada na segunda varredura.
 */
function distribute(nums, queues, n, digit) {
  for (let i = 0; i < n; i++) {
    if (digit === 1) queues[nums[i] % 10].enqueue(nums[i]);
    else queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
  }
}
```

Em seguinda, criamos a função para coletar os números das _queues_:

```javascript
function collect(queues, nums) {
  let i = 0;
  for (let digit = 0; digit < 10; ++digit) {
    while (!queues[digit].isEmpty()) {
      nums[i++] = queues[digit].dequeue();
    }
  }
}
```

### Exemplo de programa com _radix sort_

```javascript
import QueueArray from '../queue_array/QueueArray.js';

const queues = [];
// Preenchendo o array "queues" com 10 filas (representando 10 bins):
for (let i = 0; i < 10; i++) {
  queues[i] = new QueueArray();
}

const nums = [];
// Gerando 10 números aleatórios inteiros dentro do array "nums":
for (let i = 0; i < 10; ++i) {
  nums[i] = Math.floor(Math.floor(Math.random() * 101));
}

console.log('Antes da radix sort');
console.log(nums.join(' ')); // 45 72 93 51 21 16 70 41 27 31
distribute(nums, queues, 10, 1);
collect(queues, nums);
distribute(nums, queues, 10, 10);
collect(queues, nums);
console.log('Depois da radix sort');
console.log(nums.join(' ')); // 16 21 27 31 41 45 51 70 72 93
```
