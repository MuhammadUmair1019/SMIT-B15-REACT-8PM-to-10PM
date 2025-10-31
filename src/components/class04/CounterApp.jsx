// memory
// sync (memory <=> ui) => state

// let count = 1;
// count = 2;
// redraw();

// let [count, setCount] = useState(1)
// <h3>{count}</h3>
// setCount(2)

import { useState } from "react";

function CounterApp() {
  let [count, setCount] = useState(1);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  return (
    <div>
      <h3>Quantity: {count}</h3>
      <button onClick={handleIncrement} disabled={count === 5}>
        +
      </button>
      <button onClick={handleDecrement} disabled={count === 1}>
        -
      </button>
      <br />
      {count === 5 && (
        <small style={{ color: "red" }}>
          You can not order more done 5 units
        </small>
      )}
    </div>
  );
}

export default CounterApp;
