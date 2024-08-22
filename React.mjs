// 복수개의 state 를 다루기 위해 배열 선언
let hooks = [];

// 지금 훅이 어디인지에 대한 인덱스 저장하는...
let currentHook = 0;

const MyReact = {
  render: (Component) => {
    // Component 는 render 함수를 가지고있는 객체를 반환하는 함수형 컴포넌트이다.
    const instance = Component();
    instance.render();

    // 다시 첫 번째 훅부터 실행될 수 있게
    currentHook = 0;
    return instance;
  },
};

// useState
const useState = (initialValue) => {
  // 값이 초기화되지 않았다면 ,초기값을 할당
  hooks[currentHook] = hooks[currentHook] || initialValue;

  // 지금 실행하려는 훅의 인덱스를 받아오기
  // currentHook 에 영향 받지 않기 위해서
  const hookIndex = currentHook;

  // 업데이트 해준다.
  const setState = (newState) => {
    if (typeof newState === "function") {
      hooks[hookIndex] = newState(hooks[hookIndex]);
    } else {
      hooks[hookIndex] = newState;
    }
  };

  // 다음 인덱스로 넘어가야지..
  return [hooks[currentHook++], setState];
};

// useEffect
// 콜백과 , 의존성 배열을 받는다.
const useEffect = (callback, depArray) => {
  // 의존성 배열이 없다는 의미
  const hasNoDeps = !depArray;

  // 현재 위치에 훅이 있다면 그 훅의 의존성 배열을 가져오고 아니면 undefined
  const prevDeps = hooks[currentHook] ? hooks[currentHook].deps : undefined;
  const prevCleanup = hooks[currentHook]
    ? hooks[currentHook].cleanup
    : undefined;

  // 변경 됐는지 이전 뎁스에서 비교?
  const hasChangedDeps = prevDeps
    ? !depArray.every((el, i) => el === prevDeps[i]) // 모두 비교..?
    : true; // 의존성 배열이 없거나 비어있으면 그냥 true

  if (hasNoDeps || hasChangedDeps) {
    if (prevCleanup) prevCleanup();
    const cleanup = callback(); // 지금 콜백의 반환값을 다음에 쓸 수 있도록 넣어주어야한다.
    hooks[currentHook] = { deps: depArray, cleanup };
  }
  currentHook++;
};

// 이거는 호출할 때 MyReact.useState() 이런식으로도 사용할 수 있음
// 근데 이게 왜 필요하지?
MyReact.useState = useState;
MyReact.useState = useEffect;

export { useState, useEffect };
export default MyReact;
