# 자바스크립트의 동등비교

> 본 글은 **[모던 리액트 Deep Dive]** 를 읽고 정리한 내용입니다😃

## 자바스크립트의 데이터 타입

### ✔ 원시 타입

객체가 아닌 모든 타입

- undefined : 선언한 후 값을 할당하지 않은 변수 / 값이 주어지지 않은 인수에 자동으로 할당되는 값
- null : 아직 값이 없거나 비어있는 값
- Boolean : 참과 거짓(true / false) 만을 가질 수 있는 데이터 타입
  - falsy : 조건문 내부에서 false로 취급되는 값 ( false , 0, -0, 0n, 0x0n, NaN, '', "", ``, null, undefined)
  - truthy : 조건문 내부에서 true로 취급되는 값 ( falsy 제외 모두 )
    유의할 점 : 객체와 배열은 내부에 값이 존재하는지와 관계없이 모두 truthy
- Number : -(2^53-1) ~ 2^53-1
- BigInt : number의 숫자 크기 제한을 극복하고자 ES2020에서 새롭게 나온 타입
- String : 텍스트 타입
  - 백틱(`)을 사용해서 표현한 문자열 : 템플릿 리터럴
    줄바꿈이 가능하고 문자열 내부에 표현식을 쓸 수 있음
  - 문자열이 생성되면 그 문자열을 변경할 수 없음
- Symbol : ES6 에서 새롭게 추가된 타입으로 중복되지 않는 어떠한 교유한 값을 나타내기 위해 만들어짐

### ✔ 객체타입

7가지 원시타입 이외의 모든 것(배열, 함수, 정규식, 클래스 등)

- 객체 타입은 참조를 전달한다고 하여 참조 타입으로도 불림

<br>

## 값을 저장하는 방식의 차이

원시 타입은 불변 형태의 값으로 저장. 변수 할당 시점에 메머리 영역을 차지하고 저장

```javascript
let hello = 'hello';
let hi = hello;
console.log(hello === hi); // true
```

객체 타입은 변경 가능한 형태로 저장. 값을 복사할 때도 값이 아닌 참조를 전달

```javascript
var hello = {
  greet: 'hello',
};
var hi = {
  greet: 'hello',
};
console.log(hello === hi); // false
console.log(hello.greet === hi.greet); // true
```

<br>

## 자바스크립트의 또 다른 비교 공식, Object.is

두 개의 인수를 받아서 동일한지 확인하고 반환하는 메서드

### ✔ == vs. Object.is

- == 비교는 비교 전에 양쪽이 같은 타입이 아니라면 강제로 형변환(type casting) 한 후에 비교
  5 == '5' // true
- Object.is는 이러한 형변환 X ( ===와 동일하게 타입이 다르면 false )

### ✔ === vs. Object.is

- === 가 만족하지 못하는 몇 가지 특이한 케이스를 추가함

```javascript
console.log(-0 === +0); // true
console.log(Object.is(-0, +0)); //false

console.log(Number.NaN === NaN); // false
console.log(Object.is(Number.NaN, NaN)); //true
```

> 하지만 여전히 객체 비교에 있어서는 앞서 정리한 객체 비교 원리와 동등함

<br>

## 리액트에서의 동등 비교

리액트에서는 기본적으로 Object.is를 사용해 비교를 진행한다. 이 때, Object.is는 ES6에서 제공하는 기능이므로 구형 브라우저를 위한 Polyfill을 함께 사용한다.

[👇 리액트에서 값을 비교하는 함수인 objectIs](https://github.com/facebook/react/blob/main/packages/shared/objectIs.js)

```javascript
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

const objectIs: (x: any, y: any) => boolean =
  // $FlowFixMe[method-unbinding]
  typeof Object.is === 'function' ? Object.is : is;

export default objectIs;
```

리액트에서는 이 objectIs를 기반으로 동등 비교를 하는 shallowEqual이라는 함수를 만들어 사용한다. 이 함수에는 의존성 비교 등 리액트의 동등 비교가 필요한 다양한 곳에서 사용된다.

[👇 리액트에서 값을 비교하는 함수인 shallowEqual](https://github.com/facebook/react/blob/main/packages/shared/shallowEqual.js)

```javascript
import is from './objectIs';
// Object.prototype.hasOwnProperty : 객체에 특정 프로퍼티가 있는지 확인하는 메서드
import hasOwnProperty from './hasOwnProperty';

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 * ㄴ 주어진 객체의 키를 순회하며 두 값이 엄격한 동등성을 가지는지 확인
 * 	 다른 값이 있다면 false 반환. 만약 두 객체 간 모든 키의 값이 동일하다면 true 반환.
 */
function shallowEqual(objA: mixed, objB: mixed): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  // 각 키의 배열을 꺼낸다
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 배열의 길이가 다르다면 fasle
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  // A의 키를 기준으로, B에 같은 키가 있는지, 그리고 그 값이 같은지 확인
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (
      !hasOwnProperty.call(objB, currentKey) ||
      // $FlowFixMe[incompatible-use] lost refinement of `objB`
      !is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
```

> 리액트에서의 비교를 요약하면, Object.is로 먼저 비교를 수행한 후, Object.is에서 수행하지 못한 객체 간 얕은 비교를 한 번 더 수행한다는 것을 알 수 있다.
> **객체 간 얕은 비교란 ? 객체의 첫 번째 깊이에 존재하는 값만 비교한다는 것**

**객체의 얕은 비교까지만 구현한 이유는 무엇일까? **

리액트에서 사용하는 JSX props는 객체이며, props에서 꺼내온 값을 기준으로 렌더링을 수행하기 때문에 일반적인 케이스에서는 얕은 비교로도 충분하기 때문.

<br>

## 정리

> 리액트의 동등 비교를 분석한 현 시점, props가 깊어질 경우 리액트 렌더링이 예상치 못하게 작동할 수 있다는 것을 알게 되었다!
> 리액트 내부의 로직을 꼼꼼히 살펴보니 동작 원리를 확실하게 알게 되어서 너무 신기하고 유익한 경험이었다.
> 훅의 의존성 배열의 비교, useMemo와 useCallback의 필요성 및 렌더링 최적화를 위해서 꼭 필요한 React.memo를 위해 고려해야 할 것들을 좀 더 쉽게 이해하게 된 것 같다.
