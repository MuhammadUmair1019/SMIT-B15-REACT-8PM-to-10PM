// import CounterApp from "./components/class04/CounterApp";
// import Calculator from "./components/Calculator";
// import Class05 from "./components/class05";
// import CLass06 from "./components/class06";
// import Class08 from "./components/class08";
import { useState } from "react";
import Class09 from "./components/class09";

function App() {
  const [hide, setHide] = useState(false);

  return (
    <>
      <button onClick={() => setHide(!hide)}> Hide</button>
      {hide ? <h1>Hidden</h1> : <Class09 />}
      {/* <Class09 /> */}
      {/* <Class08 /> */}
      {/* <CLass06 /> */}
      {/* <Class05 /> */}
      {/* <Calculator /> */}
      {/* <CounterApp /> */}
    </>
  );
}

export default App;
