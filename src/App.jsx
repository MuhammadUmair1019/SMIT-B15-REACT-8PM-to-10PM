import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabase";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Demo Navigation
import DemoNavigation from "./demos/DemoNavigation";

// Demo Components - Basics
import JSXBasics from "./demos/01-basics/01-JSX-Basics";
import PropsDemo from "./demos/01-basics/02-Props-Demo";
import ListRendering from "./demos/01-basics/03-List-Rendering";

// Demo Components - State Management
import UseStateCounter from "./demos/02-state-management/01-UseState-Counter";

// Demo Components - Forms
import ControlledInputs from "./demos/03-forms/01-Controlled-Inputs";

// Demo Components - Hooks
import UseEffectDemo from "./demos/04-hooks/01-UseEffect-Demo";
import UseRefDemo from "./demos/04-hooks/02-UseRef-Demo";
import UseMemoDemo from "./demos/04-hooks/03-UseMemo-Demo";
import UseReducerDemo from "./demos/04-hooks/04-UseReducer-Demo";

// Demo Components - API Integration
import FetchAPIDemo from "./demos/05-api-integration/01-Fetch-API";
import AxiosDemo from "./demos/05-api-integration/02-Axios-Demo";
import ReactQueryDemo from "./demos/05-api-integration/03-React-Query-Demo";

// Demo Components - Applications
import TodoApp from "./demos/06-routing/01-Todo-App";

// Demo Components - Authentication
import SupabaseTodos from "./demos/07-authentication/Supabase-Todos";

// Demo Components - Custom Hooks
import CustomHookDemo from "./demos/08-custom-hooks/Custom-Hook-Demo";

// Demo Components - Advanced
import CalculatorDemo from "./demos/09-advanced/Calculator-Demo";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(false);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<DemoNavigation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Route */}
      <Route
        path="/todos"
        element={
          <PrivateRoute user={user}>
            <SupabaseTodos user={user} />
          </PrivateRoute>
        }
      />

      {/* Demo Routes - Basics */}
      <Route path="/demo" element={<DemoNavigation />} />
      <Route path="/demo/jsx-basics" element={<JSXBasics />} />
      <Route path="/demo/props" element={<PropsDemo />} />
      <Route path="/demo/list-rendering" element={<ListRendering />} />

      {/* Demo Routes - State Management */}
      <Route path="/demo/counter" element={<UseStateCounter />} />

      {/* Demo Routes - Forms */}
      <Route path="/demo/controlled-inputs" element={<ControlledInputs />} />

      {/* Demo Routes - Hooks */}
      <Route path="/demo/use-effect" element={<UseEffectDemo />} />
      <Route path="/demo/use-ref" element={<UseRefDemo />} />
      <Route path="/demo/use-memo" element={<UseMemoDemo />} />
      <Route path="/demo/use-reducer" element={<UseReducerDemo />} />

      {/* Demo Routes - API Integration */}
      <Route path="/demo/fetch-api" element={<FetchAPIDemo />} />
      <Route path="/demo/axios" element={<AxiosDemo />} />
      <Route path="/demo/react-query" element={<ReactQueryDemo />} />

      {/* Demo Routes - Applications */}
      <Route path="/demo/todo-app" element={<TodoApp />} />

      {/* Demo Routes - Custom Hooks */}
      <Route path="/demo/custom-hook" element={<CustomHookDemo />} />

      {/* Demo Routes - Advanced */}
      <Route path="/demo/calculator" element={<CalculatorDemo />} />
    </Routes>
  );
}

export default App;
