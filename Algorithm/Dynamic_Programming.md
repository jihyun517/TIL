# 🔍 Dynamic Programming

## 0. 쉽게 풀어서 정리해보자

### DP가 무엇일까

다이나믹 프로그래밍, 즉 동적계획법❕ 이란 하나의 큰 문제를 작은 문제들로 나누어서 생각하고, 작은 문제의 결과를 저장하여 큰 문제 해결에 사용하는 것 <br>

👉 쉽게 말해 문제를 작게 쪼개서 결과 기억해놨다가 재사용 한다고 생각하면 됨❕

<br>

### 🤔 그거 재귀 아니야?

큰 문제를 풀기 위해 작은 문제로 쪼개서 해결해간다는 점이 재귀와 유사하다고 생각되지만 재귀에 비해 DP 방식이 훨씬 효율적이다. <br>

재귀의 가장 대표적인 예시인 피보나치 수열을 살펴보자.

> 피보나치 수열 : 1, 1, 2, 3, 5, 8, 13 ... <br>
> 👉 피보나치 수열을 재귀로 해결하기 위한 함수 : `fibo(n) = fibo(n-1) + fibo(n-2)`

fibo(10)을 구한다고 가정하면 fibo(9) 와 fibo(8) 의 값을 각각 구해서 더해야 한다. <br>
fibo(9)를 구하는 과정에서 fibo(8)은 이미 구해졌을 것이다!<br>
하지만 재귀는 이러한 점을 하나도 고려하지 않은 채 묵묵히 fibo(9)와 fibo(8)을 열심히 구하고 있을 것이다...🥱
<br>
매우매우 비효율적임을 알 수 있다.

<br>

### 그래서 DP는 뭐가 다른데?

DP는 fibo(n) 값을 각각 기억하고 있다가 필요할 때 꺼내서 쓴다! 재사용 굳👍
<br>

👀 DP의 핵심은 `기억했다가 꺼내서 쓰기!!!` [기억하는 방법](https://github.com/jihyun517/TIL/blob/main/Algorithm/Dynamic_Programming.md#3-%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98memoization)은 아래에서 설명한다.

<br>

## 1. 정의

> 📝 Dynamic Programming (DP, 동적 계획법)이란 ❔

- 복잡한 문제를 간단한 여러 개의 문제로 나누어 푸는 방법
- 부분 문제 반복과 최적 부분 구조를 가지고 있는 알고리즘을 일반적인 방법에 비해 더욱 적은 시간 내에 풀 때 사용

<br>

## 2. 동적 계획법의 조건

> 💡 문제를 풀 때 다음 두 가지 조건을 만족시켜야 동적계획법을 적용할 수 있다

### ✔ 부분 반복 문제(Overlapping Subproblem)

- 어떤 문제가 여러개의 부분 문제(Subproblem)으로 쪼개질 수 있는 경우
- 이 때, 부분 문제가 여러 번 재사용되거나 재귀 알고리즘으로 해결되는 경우

### ✔ 최적 부분 구조(Optimal Substructure)

- 전체 문제의 최적의 값이 부분 문제의 최적의 값으로 구성될 수 있는 경우
- 피보나치 수열로 예를 들면, fibo(n) 이 최적이 되려면 fibo(n-1)과 fibo(n-2)가 최적이어야 함

 <br>

## 3. 메모이제이션(Memoization)

> 💡 아니 그래서 작은 문제 결과들을 어떻게 기억하는데 ❔❕ 👉 이 때 필요한게 메모이제이션

- 메모이제이션 : 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술로, 동적 계획법의 핵심이 되는 기술이다.

```js
// input 으로 N 이 주어질 때 fibo(N)을 구하는 solution

function solution(input) {
  const dp = Array.from({ length: input }, () => 0); // ⭐메모이제이션을 위한 배열 생성

  dp[0] = 1;
  dp[1] = 1;

  dp.forEach((n, i) => {
    if (i >= 2) {
      dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]); // ⭐점화식
    }
  });

  console.log(String(dp[input - 1]));
}

solution(+input);
```

<br>

## 3. 단계

#### 1️⃣ DP로 풀 수 있는 문제인지 확인 <br>

: 동적계획법의 조건이 충족되는 문제인지 확인

> 보통 특정 데이터 내 최대화 / 최소화 계산을 하는 경우, 특정 조건 내 데이터를 세야 하는 경우 등이 있다.

<br>

#### 2️⃣ 관계식(점화식) 만들기 <br>

> 피보나치 수열의 예 ) 점화식 : fibo(n) = fibo(n-1) + fibo(n-2)

<br>

#### 3️⃣ 메모이제이션 <br>

: 결과를 저장할 공간(배열 등)을 미리 생성해둔 후, 결과가 나올 때마다 배열에 저장한다. <br>
-> 필요할 때마다 재사용!

<br>

#### 4️⃣ 기저 상태 파악<br>

: 가장 작은 문제의 상태를 파악하여 배열에 미리 저장해두기

> 피보나치 수열의 예 ) fibo(0) = 0, fibo(1) = 1

<br>

#### 5️⃣ 구현하기