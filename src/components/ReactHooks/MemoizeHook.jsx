import React, { useEffect, useMemo, useState } from "react";

function MemoizeHook() {
    const [val, setVal] = useState("");
  function total() {
    let total = 0;

    for (let i = 0; i < 1000000000; i++) {
      total += i;
    }

    return total;
  }

  console.count("render");
  const totalVal = useMemo(() => total(), []);

  return (
    <div>
      {/* <Input /> */}
      <input
        className="border-2"
        type="text"
        onChange={(e) => setVal(e.target.value)}
      />
      <h1>Total: {totalVal}</h1>
      <h1>Input val: {val}</h1>
    </div>
  );
}

function Input() {
  const [val, setVal] = useState("");
  return (
    <>
      <input
        className="border-2"
        type="text"
        onChange={(e) => setVal(e.target.value)}
      />
      <h1>Input val: {val}</h1>
    </>
  );
}


const Greeting = React.memo(({ name }) => {
  console.log(`Greeting was rendered for ${name}`);
  return <h3>Hello, {name}!</h3>;
});

export default MemoizeHook;
