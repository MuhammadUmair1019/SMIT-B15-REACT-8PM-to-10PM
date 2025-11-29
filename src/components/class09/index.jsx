import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export default function Class09() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos");
  const { data, isLoading } = useFetch(url);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="max-w-lg p-4 mx-auto space-y-2">
      <h1 className="text-3xl underline">Todos</h1>
      <button
        onClick={() =>
          setUrl("https://jsonplaceholder.typicode.com/todos?completed=true")
        }
        className="border-2 p-1 bg-gray-300 cursor-pointer mr-2"
      >
        Completed
      </button>
      <button
        onClick={() =>
          setUrl("https://jsonplaceholder.typicode.com/todos?completed=false")
        }
        className="border-2 p-1 bg-gray-300 cursor-pointer"
      >
        Not Completed
      </button>
      {data.map((post) => (
        <div key={post.id} className="   border-2 border-green-950">
          <h1 className="text-xl">Title: {post.title}</h1>
          <p>Completed: {post.completed ? "Completed" : "Not completed"}</p>
        </div>
      ))}
    </div>
  );
}

// export default function Class09() {
//   const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos");
//   const { data, isLoading } = useFetch(url);

  // const [posts, setPosts] = useState([]);
  //   function fetchTodos(url) {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => setPosts(data.slice(0, 20)));
  //   }

  //   const fetchTodos = useCallback((url) => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => setPosts(data.slice(0, 20)));
  //   }, [url]);

  //   useEffect(() => {
  //     fetchTodos(url);
  //   }, [fetchTodos]);

//   if (isLoading) {
//     return <h1>Loading....</h1>;
//   }

//   return (
//     <div className="max-w-lg p-4 mx-auto space-y-2">
//       <h1 className="text-3xl underline">Todos</h1>
//       <button
//         onClick={() =>
//           setUrl("https://jsonplaceholder.typicode.com/todos?completed=true")
//         }
//         className="border-2 p-1 bg-gray-300 cursor-pointer mr-2"
//       >
//         Completed
//       </button>
//       <button
//         onClick={() =>
//           setUrl("https://jsonplaceholder.typicode.com/todos?completed=false")
//         }
//         className="border-2 p-1 bg-gray-300 cursor-pointer"
//       >
//         Not Completed
//       </button>
//       {data.map((post) => (
//         <div key={post.id} className="   border-2 border-green-950">
//           <h1 className="text-xl">Title: {post.title}</h1>
//           <p>Completed: {post.completed ? "Completed" : "Not completed"}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function Class09() {
//  const [count, setCount] = useState(0);

//   useEffect(() => {
//     // This is the setup code for the effect
//     const intervalId = setInterval(() => {
//       setCount((prevCount) => prevCount + 1);
//     }, 1000);

//     // This is the cleanup function
//     return () => {
//       clearInterval(intervalId); // Clear the interval when the component unmounts or dependencies change
//     };
//   }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

//   return (
//     <div>
//       <p>Count: {count}</p>
//     </div>
//   );
// }
