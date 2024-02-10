![](https://velog.velcdn.com/images/jihyun517/post/c9b1f7e0-25f6-4cc4-9bb1-099bc7cc5223/image.png)

## react-hook-form을 공부하기에 앞서...<br>🙄 왜 Form 태그를 사용하는가?

> 굳이 Form 태그가 아니어도 input 안에 있는 value를 가져와서 onSubmit까지의 과정이 충분히 가능한데, 왜 굳이 form 태그를 사용해야 하지? 라는 의문점이 든 적이 있었기에... 이번 기회에 이것부터 정리해보았다.

<br>

### ✔ 우리가 간과했던 엔터의 소중함

우리는 로그인화면의 코드를 짤 때, 로그인버튼에 onClick 이벤트를 적용시켜서 로그인 기능을 수행하게 만들 것이다.
여기서 문제가 생긴다. 우리의 경험을 떠올려보면, id와 password를 입력한 후 로그인 버튼을 마우스로 클릭하는 것이 아닌, 엔터키를 누르는 경우가 대부분이다. 허나, 로그인 버튼에 onClick 이벤트만을 적용한 이상, 엔터키를 통한 로그인은 불가능하다. 이 기능을 추가하기 위해 우리는 엔터키를 눌렀을 때에도 로그인 기능이 수행되도록 코드를 추가해주어야 한다.

하지만 **Form 태그를 사용한다면 사용자가 엔터 키를 누를 때 자동으로 폼이 제출**된다. 이는 사용자에게 너무나도 익숙한 경험이기에 그만큼 매우 중요한 기능이다.

### ✔ 자동완성 및 기타 편의 기능

브라우저는 form 태그를 통해 제출되는 양식에 대해 자동 완성 및 기타 편의 기능을 제공한다. 사용자 브라우저의 자동완성 기능이나, 브라우저에 설치된 자동완성 관련 플러그인이 form 태그를 인식해서 양식을 알맞게 잘
채워줄 확률을 올릴 수 있다.

### ✔ 코드의 가독성

나 혼자 짜는 코드가 아니기에, 나만 아는 div 태그가 남발되어 있는 페이지보다는, Form 태그로 감싸둠으로써 **'여기가 Form 제출 부분이구나~'** 파악하기 용이하다😊

<br>

### ❗❗ 단, Form 태그에도 주의사항이 있다 ❗❗

onSubmit 이벤트는 페이지 이동 또는 페이지 새로고침을 발생시킨다. 그러나, SPA에선 이게 도움이 안되는 행동이기 때문에 preventDefault 를 해줘야한다.

또한, form 태그 안에 있는 모든 버튼 태그는, 타입이 명시되지 않는다면 항상 타입이 submit이 된다. 따라서 button 태그를 사용하는 경우 type을 button 으로 명시해주어야 한다.

> 종합해보면, 입력 양식의 인터페이스를 구현할 땐 아무래도 Form 태그를 활용하는게 좋을 것 같다.
> _+) 아래에 소개할 react-hook-form 을 사용하여 보다 더 효율적으로 코드를 짤 수도 있다!_

<br>

## react-hook-form을 알아보자

### 🤔 왜 사용하는거지?

기존에 우리가 사용했던 Form의 형식은 모든 input 값을 state로 관리하는 방식이었다.
이러한 방식은 **상태를 기반으로 입력값을 관리하는 것** 즉, **제어 컴포넌트** 이다. 이러한 제어 컴포넌트는 사용자 입력에 따라 리액트 애플리케이션의 다른 부분과 상호작용할 수 있으며, 폼의 유효성 검사, 제출 처리 등의 작업을 쉽게 구현할 수 있다. 입력을 관리하는 방법으로 제어 컴포넌트는 매우 적합한 방법이긴 하다!
허나, **state가 바뀔 때 마다**( ex. 아이디를 한 글자씩 입력할때마다 ) **렌더링이 수행**되기 때문에 **불필요한 렌더링이 발생하여 성능저하**가 생기게 된다.

이를 해결하고자 등장한게 react-hook-form 이다. **react-hook-form은 비제어 컴포넌트로서, 내부적으로 변경된 필드만 다시 렌더링하여 최적화된 성능을 제공**한다. 따라서, **필드가 변경되더라도 전체 폼이 리렌더링되지 않는다.**

이처럼 react-hook-form은 React 애플리케이션에서 양식(form)을 효과적으로 관리하기 위한 라이브러리이다.

주요 특징은 다음과 같다.

- 간결한 API : React Hook Form은 간결하고 직관적인 API를 제공하여 복잡한 양식을 간편하게 다룰 수 있다.
- 성능 최적화 : 렌더링 성능에 중점을 두어 **불필요한 리렌더링을 최소화**하고 빠른 양식 처리를 지원한다.
- 상태 관리 : 각 **입력 필드의 상태를 자동으로 관리**하며, 양식 데이터를 효과적으로 저장한다.
- 유효성 검증 : 간단한 객체 리터럴을 사용하여 **유효성 검증 규칙을 정의**하고, **자동으로 에러 메시지를 처리**할 수 있다.
- HTML 표준 준수 : 기본 HTML 표준과 양식 이벤트를 준수하여 기존의 HTML 폼과 쉽게 통합할 수 있다.
- 다양한 입력 필드 지원 : 텍스트, 비밀번호, 체크박스, 라디오, 선택 옵션, 파일 업로드 등 **다양한 입력 필드를 지원**한다.
- React Hooks와의 통합: React Hook Form은 기본적으로 React Hooks와 통합되어 있어, **useForm, useFieldArray, useWatch 등의 훅을 활용**할 수 있다.
- 유연한 사용: 라이브러리를 사용하면서 필요한 부분만 활용하거나, 기존의 코드와 쉽게 통합할 수 있다.

<br>

### 예시 코드

아래는 직접 react-hook-form 을 사용하여 구현해본 간단한 로그인 기능의 예시 코드이다.

```javascript
import React from "react";
import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";

const Form = ({ title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = ({ email, password }) => {
    console.log(email, password);
  };

  const emailRules = {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      message: "올바르지 않은 이메일 형식입니다.",
    },
  };

  const passwordRules = {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 4,
      message: "4자 이상 입력해주세요.",
    },
    maxLength: {
      value: 15,
      message: " 16자 이하로 입력해주세요.",
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <input type="email" placeholder="E-mail" {...register("email", emailRules)} />
        {errors?.email && (
          <div>
            <span className={styles.form_error}>{errors.email.message}</span>
          </div>
        )}
      </div>

      <div>
        <input type="password" placeholder="Password" {...register("password", passwordRules)} />

        {errors?.password && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>

      <button type="submit">{title}</button>

      <span className={styles.form_error}></span>
    </form>
  );
};

export default Form;
```

> ⭐ 위 코드를 작성하며 대강 정리해본 react-hook-form 사용하는 기본 방법 ⭐
> _(지금 모든 기능을 다 공부해봤자 어차피 쓸 때 되면 다 잊어버리니...😂 사용하는 상황에 맞춰 공식문서를 참조해보도록 하자.)_

1. Form 객체 생성

2. handleSubmit에 들어갈 함수 생성 -> onSubmit()
   - 위 코드에선 간단하게 console.log() 만 실행
3. register 함수를 사용하여 각 입력 필드를 등록하고, 유효성 검사 규칙을 설정
   - register 함수의 첫 번째 매개변수로는 name 을 넣어준다. 해당 필드를 다루게 될 key 값으로써 반드시 들어가야 하는 값이다.
   - 두 번째 값으론 options 객체가 들어가는데, 해당 객체에는 유효성 검사를 위한 프로퍼티들이 들어갈 수 있다. (required, min, max, minLength, maxLength, pattern 등..)
   - 유효성 검사를 위해 value 만을 줄수도 있지만, value, message 로 구성된 객체를 줌으로써 해당 에러에 대한 구체적인 메세지를 제공할 수도 있다. 위 코드에서는 가독성 및 유지보수의 용이함을 고려해 rules 객체를 따로 빼서 관리해주었다.
   - 이 부분이 제어 컴포넌트를 사용할 때에는 onChange 함수 실행시켜서 setState 했던 부분이라고 생각하면 될 것 같다.
4. errors 를 통해 로그인 조건 생성

   - 에러에 대한 정보는 formState 객체의 errors 에 들어있다.
   - formState에서 제공하는 다양한 기능 중 하나로 기존 방식보다 가독성 좋아진다.
   - formState에는 errors 외에도 다양한 기능이 존재! 공식문서를 참조하자.

5. useForm() 에 옵션추가 useForm({ mode: "onChange" })

   - 버튼 눌렀을 때 유효성 체크가 실행되는 것이 아닌, 입력이 될 때 바로 유효성 체크가 실행되도록

6. 이메일 유효성 체크 정규식 : `/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i`

---

출처 <br>
[react-hook-form](https://react-hook-form.com/)
