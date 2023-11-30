# Array

> 미루고 미루던 배열을 정리해보자❗❗❗ <br> 새로운 배움이 생기면 그 때 그때 추가할 것 ( 미루지 말자😂 )

<br>

## 🔷 선언

## 🔷 초기화

## 🔷 속성

### - **`length`**

- **`length`** : 배열의 길이(**item의 개수**)

<br>

## 🔷 메소드

### - **`concat()`**

- **`concat(arr)`** : 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 **새 배열을 반환**
  **-> 기존 배열은 변경되지 않음 ❗**

```javascript
const num1 = [1, 2, 3, 4, 5];
const num2 = [10, 20, 30];

const num3 = num1.concat(num2);
const num4 = num2.concat(num1);

console.log(num3);
console.log(num4);

// [ 1, 2, 3, 4, 5, 10, 20, 30 ]
// [ 10, 20, 30, 1, 2, 3, 4, 5 ]
```

<br>

### - **`forEach()`**

- **`forEach(callback(currentvalue[, index[, array]]))`** : 주어진 함수를 **배열 요소 각각에 대해 실행**(item의 개수만큼 반복적으로 실행)
  -> callback 함수의 매개변수 : **요소 값 , 요소 인덱스** , 순회 중인 배열(forEach 호출한 배열데이터 이므로 사실상 잘 쓰지 않음)

```javascript
const number = [1, 2, 3, 4];
const fruits = ["apple", "banana", "cherry"];

fruits.forEach(function (element, index, array) {
  console.log(element);
  console.log(index);
  console.log(array);
});

// apple
// 0
// ['apple', 'banana', 'cherry']

// banana
// 1
// ['apple', 'banana', 'cherry']

// cherry
// 2
// ['apple', 'banana', 'cherry']
```

<br>

### - **`map()`**

- **`map(callback(currentvalue[, index[, array]]))`** : 배열 내의 모든 요소 각각에 대하여 **주어진 함수를 호출한 결과를 모아 새로운 배열을 반환**
  > ⭐ **forEach는 반환값 ❌, map은 새로운 배열 반환 ❗**

```javascript
const number = [1, 2, 3, 4];
const fruits = ["apple", "banana", "cherry"];

// const a = fruits.map(function(fruit, index){
//   return {
//     id : index,
//     name : fruit
//   }
// })

// ⭐ 화살표 함수 쓰는 습관 들이기
const a = fruits.map((fruit, index) => ({
  id: index,
  name: fruit,
}));

console.log(a);

// [
//   { id: 0, name: 'apple' },
//   { id: 1, name: 'banana' },
//   { id: 2, name: 'cherry' }
// ]
```

<br>

### - **`filter()`**

- **`filter(callback(element[, index[, array]])`** : 주어진 함수의 **테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환**
  > ⭐ **map은 callback 호출 결과들의 배열 , filter는 callback 호출 결과가 true인 요소들의 배열 반환 ❗**

```javascript
const numbers = [1, 2, 3, 4];

const a = numbers.map((number) => number < 3);
const b = numbers.filter((number) => number < 3);

console.log(a); // [true, true, false, false]
console.log(b); // [1,2]

// (추가설명)동일한 함수임
// const a = numbers.map(number => number < 3)
// const a = numbers.map(function(number){
//	 return number < 3
// })
```

<br>

### - **`find()`**

- **`find(callback)`** : 주어진 **판별 함수를 만족하는 첫 번째 요소의 값을 반환**
  -> 판별 함수(callback)의 결과가 true가 되는 순간 함수는 종료되며 그 때의 요소의 값을 반환!
  > 요소의 값이 아닌 인덱스를 알고싶으면 findIndex 사용

```javascript
const numbers = [1, 2, 5, 9, 14];

const a = numbers.find((number) => number > 6);
const b = numbers.findIndex((number) => number > 6);

console.log(a); // 9 -> 6보다 큰 첫 번째 number 반환
console.log(b); // 3 -> 6보다 큰 첫 번째 number의 index반환
```

<br>

### - **`includes()`**

- **`includes(valueToFind[, fromIndex])`** : 배열이 특정 요소를 포함하고 있는지 판별

```javascript
const numbers = [1, 2, 5, 9, 14];
console.log(numbers.includes(10)); // false
```

<br>

### - **`join()`**

- **`join([separator])`** : 배열의 모든 요소를 연결한 하나의 문자열을 반환

  - 구분자(seperator) 생략 시 쉼표로 구분

```javascript
const num = [1, 2, 3, 4, 5];

console.log(num.join());
console.log(num.join(""));
console.log(num.join("@"));

// 1,2,3,4,5
// 12345
// 1@2@3@4@5
```

<br>

### - **`split()`**

- **`split([separator])`** : 배열의 모든 요소를 연결한 하나의 문자열을 반환

---

### 👇 원본 수정됨 👇

> ⭐⭐ 여기서부터는 원본이 수정됨!!! ⭐⭐

### - **`push() & pop()`**

- **`push(element1[, ...[, elementN]])`** : 새로운 요소를 배열의 **맨 끝**에 추가하고, 배열의 **새로운 길이**를 반환

```javascript
const num = [1, 2, 3, 4, 5];

console.log(num.push(6, 7, 8));
console.log(num);

// 8
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

<br>

- **`pop()`** : 배열의 **마지막**요소를 삭제하고, **삭제한 요소**를 반환

```javascript
const num = [1, 2, 3, 4, 5, 10, 20];

console.log(num.pop());
console.log(num);

// 20
// [ 1, 2, 3, 4, 5, 10 ]
```

<br>

### - **`unshift()`**

- **`unshift(element1[, ...[, elementN]])`** : 새로운 요소를 배열의 **맨 앞**에 추가하고, 배열의 새로운 길이를 반환

<br>

### - **`reverse()`**

- **`reverse()`** : 배열의 순서를 반전

```javascript
const numbers = [1, 2, 5, 9, 14];

console.log(numbers.push(100)); // 6

numbers.unshift(0);
console.log(numbers); // (7) [0,1,2,5,9,14,100]

numbers.reverse();
console.log(numbers); // (7) [100,14,9,5,2,1,0]
```

<br>

### - **`splice()`**

- **`splice(start[, deleteCount[, item1[, item2[, ...]]]])`** : 배열의 기존 요소를 제거 하거나 새 요소를 추가하여 배열의 내용을 변경
  - `start` : 변경 시작할 요소의 인덱스
  - `deleteCount` : 제거할 개수
  - `item` : 배열에 추가할 요소(여러 개 가능 & 지정하지 않으면 제거만 함)
  - 제거한 요소를 담은 배열 반환함

```javascript
const numbers = ["a", "b", "c", "d", "e"];

const deleteNumbers = numbers.splice(1, 2); // deleteNumbers : 제거한 요소 담은 배열

console.log(numbers);
console.log(deleteNumbers);

numbers.splice(1, 0, "jihyun", "mong"); // 1번 인덱스부터 0개의 요소 제거 'jihyun', 'mong' 추가
console.log(numbers);

// [ 'a', 'd', 'e' ]
// [ 'b', 'c' ]
// [ 'a', 'jihyun', 'mong', 'd', 'e' ]
```

<br>

### - **`sort()`**

- **`sort([compareFunction])`** : 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환
  - 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따른다. 즉, 숫자 정렬에서 우리가 원하는 정렬이 아닐 수 있음! ( 유니 코드 코드 포인트 순서로는 80이 9보다 앞에 있음 )
  - 상황에 맞게 정렬 순서를 정의하는 함수를 compareFunction으로 지정해주면 된다.

```javascript
// 유니 코드 코드 포인트 값에 따른 정렬
const string = ["가위", "사과", "바나나"];
const string_res = string.sort();

// 유니 코드 코드 포인트 값에 따른 정렬
let num = [10, 20, 1, 2, 30, 3];
const num_res1 = num.sort();

// 오름차순 정렬
num = [10, 20, 1, 2, 30, 3];
const num_res2 = num.sort((a, b) => a - b);

// 내림차순 정렬
num = [10, 20, 1, 2, 30, 3];
const num_res3 = num.sort((a, b) => b - a);

console.log(string_res, "\n", num_res1, "\n", num_res2, "\n", num_res3);

// [ '가위', '바나나', '사과' ]
// [ 1, 10, 2, 20, 3, 30 ]
// [ 1, 2, 3, 10, 20, 30 ]
// [ 30, 20, 10, 3, 2, 1 ]
```
