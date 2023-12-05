# Exploring Array Method Utilization

> 배열 메소드를 활용한 다양한 새로운 기능을 탐구해보자👀

<br>

### ✔ 배열 내에서 특정 조건을 만족하는 요소의 개수 구하기

- `filter()` : 주어진 함수의 조건을 만족하는 모든 요소로 이루어진 새로운 배열을 반환한다. 그 후, 이 배열의 길이를 구하면 조건을 만족하는 요소의 개수를 얻을 수 있다.

  ```javascript
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const count = numbers.filter((number) => number >= 7).length;

  console.log(`조건을 만족하는 요소의 개수: ${count}`);
  ```

<br>

- `reduce()` : 배열의 각 요소에 대해 주어진 콜백 함수를 실행하면서 하나의 누적된 결과 값을 구한다. 조건을 만족할 때마다 누적값을 증가시키는 방식으로 구현할 수 있다.

  ```javascript
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const count = numbers.reduce((accumulator, currentValue) => (currentValue >= 7 ? accumulator + 1 : accumulator), 0);

  console.log(`조건을 만족하는 요소의 개수: ${count}`);
  ```

<br>

### ✔ 전치행렬 만들기

- 이중 for 문으로 만들기

  ```javascript
  const originalMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const rows = originalMatrix.length;
  const cols = originalMatrix[0].length;

  const transposedMatrix = [];

  for (let i = 0; i < cols; i++) {
    transposedMatrix[i] = [];
    for (let j = 0; j < rows; j++) {
      transposedMatrix[i][j] = originalMatrix[j][i];
    }
  }

  console.log(transposedMatrix);
  // [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]
  ```

  <br>

- `map()` : 각 열에 대해 특정 작업을 수행하여 새로운 배열을 만들 수 있다. 본 예시에서는 각 열의 동일한 인덱스에 위치한 요소들을 새로운 배열로 매핑하여 전치행렬을 생성한다.

  ```javascript
  const originalMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const transposedMatrix = originalMatrix.map((_, i) => originalMatrix.map((row) => row[i]));

  console.log(transposedMatrix);
  // [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]
  ```
