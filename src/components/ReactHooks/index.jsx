import React, { useReducer, useState } from "react";
import MemoizeHook from "./MemoizeHook";

const postReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "FETCH_START":
      return { loading: true, error: false, post: {} };
    case "FETCH_SUCCESS":
      return { loading: false, error: false, post: action.payload };
    case "FETCH_ERROR":
      return { loading: false, error: true, post: {} };

    default:
      return state;
  }

  //   if (action.type === "FETCH_START") {
  //     return { loading: true, error: false, post: {} };
  //   } else if (action.type === "FETCH_SUCCESS") {
  //     return { loading: false, error: false, post: action.payload };
  //   } else if (action.type === "FETCH_ERROR") {
  //     return { loading: false, error: true, post: {} };
  //   }

  //   return state;
};

function ReactHooks() {
  const [state, dispatch] = useReducer(postReducer, {
    loading: false,
    post: {},
    error: false,
  });

  const handleFetch = () => {
    dispatch({ type: "FETCH_START" });
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(data);
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR" });
        console.log(err);
      });
  };

  console.log("state -->", state);

  return (
    <div>
      <h1>Hello, React</h1>

      <h1>{state.post.title}</h1>
      <p>{state.post.body}</p>

      {state.error && (
        <h1 className="text-4xl text-red-600">Something went wrong!</h1>
      )}
      <button
        className=" border-2 border-blue-600 bg-black text-white p-2 rounded cursor-pointer"
        onClick={handleFetch}
      >
        Fetch Data
      </button>

      <MemoizeHook />
    </div>
  );
}

// -----------------------
// function ReactHooks() {
//   const [state, dispatch] = useReducer(postReducer, {
//     loading: false,
//     post: {},
//     error: false,
//   });

//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const handleFetch = () => {
//     setLoading(true);
//     dispatch({ type: "FETCH_START" });
//     fetch("https://jsonplaceholder.typicode.com/posts/1")
//       .then((resp) => resp.json())
//       .then((data) => {
//         setData(data);
//         console.log(data);
//         setLoading(false);
//         setError(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//         setError(true);
//         console.log(err);
//       });
//   };

//   console.log("state -->", state);

//   return (
//     <div>
//       <h1>Hello, React</h1>

//       <h1>{data.title}</h1>
//       <p>{data.body}</p>

//       {error && (
//         <h1 className="text-4xl text-red-600">Something went wrong!</h1>
//       )}
//       <button
//         className=" border-2 border-blue-600 bg-black text-white p-2 rounded cursor-pointer"
//         onClick={handleFetch}
//       >
//         Fetch Data
//       </button>
//     </div>
//   );
// }

export default ReactHooks;
