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

console.log(originalMatrix);
// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(transposedMatrix);
// [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]
