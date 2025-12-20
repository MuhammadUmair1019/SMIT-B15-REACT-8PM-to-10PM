import { useEffect, useRef, useState } from "react";

function UseRefHook() {
  const inputRef = useRef(null);

  const [count, setCount] = useState(0);
  let x = 10;

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
      console.log(inputRef);
    }
  }, []);

  //   console.log("x -->", x);

  return (
    <div>
      <input
        ref={inputRef}
        className="border-2 outline-0   focus:border-red-500 ring-2"
        type="text"
        onChange={(e) => console.dir(e.target)}
      />
      <div>{count}</div>

      <button
        onClick={() => {
          x = x + 1;
          //   console.log('x =>', x)
          setCount(count + 1);
        }}
      >
        Click me{" "}
      </button>
    </div>
  );
}

export default UseRefHook;
