![](https://velog.velcdn.com/images/jihyun517/post/edc66273-ae40-49eb-962d-1ac722c33588/image.png)

> `<Link />` `<a />` `navigate()` 등등,, 수많은 라우팅 방법들이 있는데 한 번쯤 정리해보면 좋을 것 같아서 작성하게 된 글이다.
> _+) 중첩라우팅 제대로 몰라서 매번 children으로 넘겨줬던거 나야나...🤦‍♀️_

<br>

## ✔ 왜 react-router를 사용하는가🤔

> HTML을 배워보면 라우팅 기능을 가지고 있는 태그를 배우게 된다. 바로 `<a>` ❕
> 이처럼 라우팅 기능을 가진 태그가 이미 존재하는데 **왜 react-router이어야 하는지**에 대해 알아보자.

일반적으로 react 애플리케이션에서 a 태그를 사용하여 페이지 전환을 수행하면 전통적인 웹 애플리케이션처럼 **전체 페이지를 새로고침**해야 한다. 전체 페이지를 새로고침 한다는 것은 사용자로 하여금 상당히 고전적인(?) 웹 애플리케이션으로 보여지게 한다. 흔히 말하는 화면깜빡임이 매 화면전환 마다 수행된다는 것이다.
react-router를 사용하면 이러한 새로고침 없이 **SPA(싱글 페이지 애플리케이션)을 구현할 수 있다.**

이를 통한 이점을 더 자세히 알아보자.

**1. 싱글 페이지 애플리케이션(SPA) 지원**
앞서 말했듯, react-router를 사용하면 페이지를 새로고침하지 않고도 URL을 변경하고 새로운 컴포넌트를 로드할 수 있도록 도와준다. 전통적인 웹 애플리케이션에서는 페이지 이동 시마다 전체 페이지를 다시 로드해야 했지만, react-router를 사용하면 페이지 간 전환 시에는 필요한 데이터만 가져와서 화면을 업데이트할 수 있다. 이는 사용자 경험을 향상시키는 데 몹시 중요하다.

**2. 중첩된 라우팅 구현**
react-router는 중첩된 라우팅을 쉽게 구현할 수 있도록 해준다. 이는 복잡한 애플리케이션에서 여러 레벨의 중첩된 라우트를 효과적으로 관리할 수 있도록 도와준다.

**3. 프로그래밍 방식의 네비게이션**
Link 컴포넌트와 useNavigate를 적절히 사용하여 프로그래밍 방식으로 페이지를 전환할 수 있다. 이는 특정 이벤트나 조건에 따라 동적으로 페이지를 전환할 때 유용하다.

**4. 브라우저 히스토리 관리**
react-router는 브라우저 히스토리를 관리하는 기능을 제공한다. 이를 통해 브라우저의 뒤로 가기, 앞으로 가기 등의 기능을 쉽게 활용할 수 있다.

<br>

## ✔ react-router 시작하기

### - 설치

`npm install react-router-dom`

### - 주요 모듈 소개

`import { BrowserRouter, Routes, Route } from 'react-router-dom'`

> **1. BrowserRouter**
> 브라우저의 히스토리 API를 사용하여 라우팅을 처리한다. 주로 웹 애플리케이션의 최상위 컴포넌트로 사용된다.
> 라우팅을 진행할 컴포넌트 상위에 BrowserRouter 컴포넌트를 생성하고 감싸주어야 한다. <br> > **2. Routes**
> 라우터의 일부로서 여러 개의 Route 컴포넌트를 감싸고, 각 경로에 대한 매칭을 위한 라우팅 로직을 정의한다. 이 컴포넌트는 중첩된 라우트를 구성할 때 사용된다. <br> > **3. Route**
> 특정 URL 경로에 대한 매칭을 수행하고, 해당 경로에 대응되는 컴포넌트를 렌더링한다.
>
> > Route의 속성은 다음과 같다.

- **path** : URL 경로에 대한 문자열 또는 패턴을 지정한다.
- **element** : 해당 경로에 매칭되었을 때 렌더링될 컴포넌트를 지정한다.
- **index** : Routes 컴포넌트 내에서 해당 경로에 대한 기본 컴포넌트를 지정한다.

<br>

## ✔ 본격적으로 사용해보자

### - 중첩 라우팅과 Outlet

라우터 내부에 자식 요소로 Route를 설정하면, 라우터는 해당 경로의 하위에 존재하는 라우팅을 인식한다. 아래 코드를 보면, **/ 경로의 하위에 /login 이라는 하위 라우팅**이 있으므로, /login으로 주소를 이동하면 라우터는 이를 감지하고 설정된 라우트에 따라 **/ 경로에 해당하는 Layout컴포넌트와 /login에 해당하는 LoginPage컴포넌트를 렌더링**하는 것이다.

```javaScript
// App
function App() {
  return (
    <BrowserRouter> // ⭐ 애플리케이션 최상위 컴포넌트로 BrowserRouter 사용
      <Routes> // ⭐ 여러 개의 Route 감싸주기
        <Route path="/" element={<Layout />}>	// ⭐ 중첩 라우팅
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="order-request" element={<OrderRequestPage />} />
          <Route path="order-completed" element={<OrderCompletedPage />} />
          <Route path="delivery-completed" element={<DeliveryCompletedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

허나, 상단의 App 컴포넌트에서는 렌더링만 해줄 뿐 화면에서는 아직까지 아무런 일이 일어나지 않는다. 우리는 **중첩라우팅이 진행되는 Layout 컴포넌트안에 중첩라우팅 되는 컴포넌트들이 불렸을 경우 렌더링 할 위치를 명시**해주어야 한다. 이 부분이 그게 하단의 Layout 컴포넌트의 **`Outlet`** 컴포넌트이다. Outlet은 중첩된 라우트의 내용을 표시하기 위해 사용되는 컴포넌트로, 하위 경로 요소를 렌더링하기 위해 상위 경로 요소에서 사용해야 한다.

(기존에 중첩라우팅을 사용할 때 props에 children을 받아와서 화면에 보여주었던 그 children의 역할을 Outlet이 하고있다고 받아들이면 이해하기 쉬울 것 같다.)

```javaScript
// Layout
const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />	// ⭐ Outlet 태그를 사용하여 중첩라우팅
      <Footer />
    </div>
  );
};

export default Layout;


```

<br>

### - Outlet 없는 중첩 라우팅

Outlet 없이도 `*` (와일드카드)를 통해 중첩라우팅이 가능하다.

```javaScript
// App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>	// ⭐ * 를 통해 중첩 라우팅이 진행될 컴포넌트임을 명시
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

위 코드처럼 와일드카드를 사용하여 / 주소 뒤에 무언가 더 올 수 있음을 명시해준다.

```javaScript
// Layout
const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
    	<Routes>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default Layout;

```

이후 해당 컴포넌트 (Layout)으로 가서 서브 페이지로 렌더링할 Routes와 Route를 작성해주면 된다.

<br>

---

출처

https://reactrouter.com/en/main
