// import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Axios from "./components/Axios";
import Supabase from "./components/Supabase";
import TankStackQuery from "./components/TankStackQuery";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabase";
import PrivateRoute from "./components/PrivateRoute";
// import UseRefHook from "./components/UseRefHook";

// import CounterApp from "./components/class04/CounterApp";
// import Calculator from "./components/Calculator";
// import Class05 from "./components/class05";
// import CLass06 from "./components/class06";
// import Class08 from "./components/class08";
// import Class09 from "./components/class09";
// import ReactHooks from "./components/ReactHooks";
// import MemoizeHook from "./components/ReactHooks/MemoizeHook";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [hide, setHide] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session", session);
      setLoading(false);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log("user", user);
  console.log("loading", loading);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/todos"
          element={
            <PrivateRoute user={user}>
              <Supabase user={user} />
            </PrivateRoute>
          }
        />
        {/* <Signup /> */}
      </Routes>
      {/* <Supabase /> */}
      {/* <TankStackQuery /> */}
      {/* <Axios /> */}
      {/* <UseRefHook /> */}
      {/* <MemoizeHook /> */}
      {/* <ReactHooks /> */}
      {/* <button onClick={() => setHide(!hide)}> Hide</button>
      {hide ? <h1>Hidden</h1> : <Class09 />} */}
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
