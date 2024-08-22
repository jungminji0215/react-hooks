import MyReact, { useState, useEffect } from "./React.mjs";

function ExampleComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("foo");

  return {
    click: () => setCount((prev) => prev + 1),
    type: (text) => setText(text),
    noop: () => setCount(count),
    render: () => console.log("render", { count, text }),
  };
}

let App = MyReact.render(ExampleComponent);
App.click();
App = MyReact.render(ExampleComponent);
App.type("bar");
App = MyReact.render(ExampleComponent);
