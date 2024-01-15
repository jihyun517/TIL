![](https://velog.velcdn.com/images/jihyun517/post/8a4e46e9-e560-4a0d-94c4-e15eb74a1d41/image.png)

> 프로젝트에서 어영부영 사용해오던 scss...😂 이번 기회에 제대로 정리하고 넘어가야 겠다고 생각해서 정리해보았다.
> ( 사실 sass 공식 홈페이지에 너무 잘 설명되어 있어서 홈페이지 번역이나 다름없다🙄 )

<br>

## SCSS란 무엇인가

SCSS는 CSS의 전처리기 중 하나이다.
CSS는 프로젝트 규모가 커질수록 불편한 점이 많다. 따라서 우리에게는 전처리기가 등장한 것!
전처리기는 CSS 문법과 유사하지만 CSS에는 없는 선택자의 중첩이나 조건문, 반복문 등등 다양한 기능이 제공되어 편리하게 작성할 수 있다.
허나, 웹에서는 직접 동작하지 않으니 우리가 전처리기로 코딩을 했다면 웹에서 동작 가능한 표준 CSS로 컴파일하는 과정이 필요하다.

즉, 전처리기로 작성하고 CSS로 컴파일해서 동작시키는 것이다.

<br>

## SCSS vs Sass

SCSS와 Sass 둘 사이에서 혼동이 많았는데 이번 기회로 정확히 알게 되었다.
Sass(Syntactically Awesome Style Sheets)가 먼저 나온 것이며, Sass의 3버전에서 새롭게 등장한 SCSS는 CSS 구문과 완전히 호환되도록 새로운 구문을 도입해 만든 Sass의 모든 기능을 지원하는 CSS의 상위집합(Superset) 이다.
즉, SCSS는 CSS와 거의 같은 문법으로 Sass 기능을 지원한다는 말이다.

더 쉽고 간단한 차이는 {}(중괄호)와 ;(세미콜론)의 유무이다.

**Sass**

```scss
.list
  width: 100px
  float: left
  li
    color: red
    background: url("./image.jpg")
    &:last-child
      margin-right: -10px
```

**SCSS**

```scss
.list {
  width: 100px;
  float: left;
  li {
    color: red;
    background: url("./image.jpg");
    &:last-child {
      margin-right: -10px;
    }
  }
}
```

Sass는 선택자의 유효범위를 ‘들여쓰기’로 구분하고, SCSS는 {}로 범위를 구분한다.

> 보통의 경우 SCSS를 추천한다.

<br>

## SCSS가 제공하는 기능

> scss에 대해 알아보았으니 그래서 왜 scss를 사용하는지! scss가 제공해주는 기능을 알아보자

### ✔ **변수(Variables)**

- 변수는 스타일시트 전체에서 재사용할 정보를 저장하는 방법으로 생각할 수 있다. 색상, 글꼴 스택 등을 저장할 수 있으며, Sass에서는 $ 기호를 사용하여 변수를 만든다.

- 변수는 선언된 블록( { } ) 내에서만 유효범위를 가진다.

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

<br>

#### **!global (전역 설정)**

- !global 플래그를 사용하면 변수의 유효범위를 전역(Global)로 설정할 수 있다.

```scss
.box1 {
  $color: #111 !global;
  background: $color;
}
.box2 {
  background: $color;
}
```

<br>

#### **!default (초깃값 설정)**

- !default 플래그는 할당되지 않은 변수의 초깃값을 설정한다.
  즉, 할당되어있는 변수가 있다면 변수가 기존 할당 값을 사용한다.

```scss
$color-primary: red;

.box {
  $color-primary: blue !default;
  background: $color-primary;
}
compiledto: .box {
  background: red;
}
```

> 좀 더 유용하게, ‘변수와 값을 설정하겠지만, 혹시 기존 변수가 있을 경우는 현재 설정하는 변수의 값은 사용하지 않겠다’는 의미로 쓸 수 있다.

<br>

### ✔ **중첩(Nesting)**

- Sass를 사용하면 CSS 선택기를 HTML의 시각적 계층과 동일한 방식으로 중첩할 수 있다. 단, 지나치게 중첩된 규칙은 유지보수가 어려울 수 있으므로 주의가 필요하다.

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

<br>

#### **상위 선택자 참조(Ampersand)**

- 중첩 안에서 & 키워드는 상위(부모) 선택자를 참조하여 치환한다.

```scss
.btn {
  position: absolute;
  &.active {
    color: red;
  }
}

.list {
  li {
    &:last-child {
      margin-right: 0;
    }
  }
}
```

<br>

#### **중첩된 속성**

- font-, margin- 등과 같이 동일한 네임 스페이스를 가지는 속성들을 다음과 같이 사용할 수 있다.

```scss
.box {
  font: {
    weight: bold;
    size: 10px;
    family: sans-serif;
  }
  margin: {
    top: 10px;
    left: 20px;
  }
  padding: {
    bottom: 40px;
    right: 30px;
  }
}
```

<br>

#### **@at-root (중첩 벗어나기)**

- 중첩에서 벗어나고 싶을 때 @at-root 키워드를 사용한다.
- 중첩 안에서 생성하되 중첩 밖에서 사용해야 경우에 유용하다.

```scss
.list {
  $w: 100px;
  $h: 50px;
  li {
    width: $w;
    height: $h;
  }
  @at-root .box {
    width: $w;
    height: $h;
  }
}
```

<br>

### ✔ **파일 분할(Partials)**

- 파셜 Sass 파일을 만들어 다른 Sass 파일에서 포함시킬 수 있다. 이는 CSS를 모듈화하고 유지하기 쉽게 도와준다. 파셜은 언더스코어(\_)로 시작하는 Sass 파일이다. 예를 들면 \_partial.scss와 같이 이름을 지정할 수 있는데, 언더스코어는 Sass에게 해당 파일이 단일 파일로 생성되지 말아야 하며 CSS 파일로 변환해서도 안 된다는 것을 알려준다.

- 즉, `main.scss`, `_header.scss`, `_footer.scss` 세 scss 파일을 만든 후, `main.scss`에서 `_header.scss`와 `_footer.scss`를 import 해오는 구조라면, 컴파일 할 때 세 scss 파일이 모두 포함된 `main.css` 하나만 생성된다.

<br>

### ✔ **모듈(Modules)**

모든 Sass를 단일 파일에 작성할 필요는 없습니다. @use 규칙을 사용하여 필요에 따라 나눌 수 있습니다. 이 규칙은 다른 Sass 파일을 모듈로 로드하며, 이는 파일 이름을 기반으로 한 네임스페이스를 사용하여 해당 파일의 변수, 믹스인 및 함수를 Sass 파일에서 참조할 수 있음을 의미합니다. 파일을 사용하면 생성된 출력에 해당 파일이 생성한 CSS가 포함됩니다. 예시:

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
// styles.scss
@use "base";

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

<br>

### ✔ **재활용(Mixins)**

- Sass Mixins는 스타일 시트 전체에서 재사용 할 CSS 선언 그룹 을 정의하는 아주 훌륭한 기능이다.
  약간의 Mixin(믹스인)으로 다양한 스타일을 만들어낼 수 있습니다.

- 믹스인은 `선언하기(@mixin)`와 `포함하기(@include)` 두 가지만 알면 된다.
  만들어서(선언), 사용(포함)하는 것!

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

<br>

### ✔ **확장/상속(Extend/Inheritance)**

- `@extend`를 사용하면 한 선택기에서 다른 선택기로 CSS 속성 세트를 공유할 수 있다. 아래 예시에서는 @extend와 함께 사용되는 다른 기능인 플레이스홀더 클래스(placeholder classes)를 사용하여 간단한 메시징 시스템을 만든다. 플레이스홀더 클래스는 확장될 때만 출력되는 특수한 클래스 유형이다.

```scss
/* 이 CSS는 %message-shared가 확장되므로 출력된다. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// 이 CSS는 %equal-heights가 확장되지 않으므로 출력되지 않는다.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

<br>

### ✔ **연산자(Operators)**

- Sass에는 +, -, \*, math.div(), %와 같은 일반 수학 연산자가 몇 가지 있다. 아래의 예시에서는 단순한 수학을 사용하여 article 및 aside의 너비를 계산하는 방법을 보여준다.

```scss
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```

이는 960px를 기반으로 한 매우 간단한 유동 그리드를 만든다. Sass에서는 픽셀 값을 백분율로 변환하는 등의 작업을 할 수 있도록 해주는 연산자들이 있다.

<br>

---

출처
https://sass-lang.com/
https://heropy.blog/2018/01/31/sass/
