/**
 * DEMONSTRATION: useReducer Hook
 * 
 * This demonstrates:
 * - Managing complex state with useReducer
 * - Actions and reducers pattern
 * - When to use useReducer vs useState
 */

import { useReducer } from "react";

// Reducer function - handles state updates based on actions
const postReducer = (state, action) => {
  console.log("Action dispatched:", action.type);

  switch (action.type) {
    case "FETCH_START":
      return { loading: true, error: false, post: {} };
    case "FETCH_SUCCESS":
      return { loading: false, error: false, post: action.payload };
    case "FETCH_ERROR":
      return { loading: false, error: true, post: {} };
    case "RESET":
      return { loading: false, error: false, post: {} };
    default:
      return state;
  }
};

function UseReducerDemo() {
  // useReducer takes reducer function and initial state
  const [state, dispatch] = useReducer(postReducer, {
    loading: false,
    post: {},
    error: false,
  });

  const handleFetch = async () => {
    // Dispatch action to start loading
    dispatch({ type: "FETCH_START" });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();

      // Dispatch success action with data
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      // Dispatch error action
      dispatch({ type: "FETCH_ERROR" });
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        useReducer Hook Demonstration
      </h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>useReducer</strong> is useful when you have complex state
          logic that involves multiple sub-values or when the next state depends
          on the previous one.
        </p>
      </div>

      {/* Controls */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Actions</h2>
        <div className="flex gap-3">
          <button
            onClick={handleFetch}
            disabled={state.loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {state.loading ? "Loading..." : "Fetch Post"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold"
          >
            Reset
          </button>
        </div>
      </section>

      {/* State Display */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Current State</h2>
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="space-y-2 text-sm">
            <p>
              <strong>Loading:</strong>{" "}
              <span className={state.loading ? "text-blue-600" : "text-gray-600"}>
                {state.loading ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong>Error:</strong>{" "}
              <span className={state.error ? "text-red-600" : "text-gray-600"}>
                {state.error ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong>Has Post:</strong>{" "}
              <span className={Object.keys(state.post).length > 0 ? "text-green-600" : "text-gray-600"}>
                {Object.keys(state.post).length > 0 ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Post Display */}
      {state.loading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-600 font-semibold">Loading post...</p>
        </div>
      )}

      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-semibold">
            ⚠️ Something went wrong! Please try again.
          </p>
        </div>
      )}

      {state.post && Object.keys(state.post).length > 0 && (
        <section className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Fetched Post</h2>
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 border-b pb-2">
              {state.post.title}
            </h3>
            <p className="text-gray-700">{state.post.body}</p>
            <p className="text-sm text-gray-500 mt-2">Post ID: {state.post.id}</p>
          </div>
        </section>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">useReducer vs useState:</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <div>
            <strong>useReducer:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Better for complex state logic</li>
              <li>Multiple related state values</li>
              <li>State updates depend on previous state</li>
              <li>Follows Redux pattern</li>
            </ul>
          </div>
          <div>
            <strong>useState:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Simple state values</li>
              <li>Independent state updates</li>
              <li>Easier to understand for beginners</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseReducerDemo;

