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

// 이거는 호출할 때 MyReact.useState() 이런식으로도 사용할 수 있음
// 근데 이게 왜 필요하지?
MyReact.useState = useState;

export { useState };
export default MyReact;
