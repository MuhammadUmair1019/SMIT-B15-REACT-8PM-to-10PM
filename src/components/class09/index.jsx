import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export default function Class09() {
  const [url, setUrl] = useState("http://localhost:3000/posts");
  const { data, isLoading } = useFetch(url);

  // Form State
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [views, setViews] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Track edit mode
  const [editId, setEditId] = useState(null);

  // Reset form
  const resetForm = () => {
    setTitle("");
    setBody("");
    setViews(0);
    setCompleted(false);
    setEditId(null);
  };

  // ADD or UPDATE post
  const handleSubmit = () => {
    const postData = {
      title,
      body,
      views: Number(views),
      completed,
    };

    if (editId) {
      // UPDATE POST
      fetch(`http://localhost:3000/posts/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      }).then(() => {
        setUrl("http://localhost:3000/posts?" + Math.random());
        resetForm();
      });
    } else {
      // ADD POST
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      }).then(() => {
        setUrl("http://localhost:3000/posts?" + Math.random());
        resetForm();
      });
    }
  };

  // DELETE POST
  const deletePost = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUrl("http://localhost:3000/posts?" + Math.random());
    });
  };

  // EDIT POST (load data into the form)
  const startEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setViews(post.views);
    setCompleted(post.completed);
    setEditId(post.id);
  };

  if (isLoading) return <h1 className="text-center text-xl">Loading...</h1>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* FORM CARD */}
      <div className="p-5 rounded-lg shadow-lg bg-white border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {editId ? "Edit Post" : "Create a New Post"}
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Body</label>
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Views</label>
            <input
              type="number"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="border p-2 rounded-md w-24 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="font-medium text-gray-700">Completed</label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 text-white p-2 rounded-md 
                         hover:bg-blue-600 transition"
            >
              {editId ? "Update Post" : "Add Post"}
            </button>

            {editId && (
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-400 text-white p-2 rounded-md 
                           hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 justify-center pt-4">
        <button
          onClick={() => setUrl("http://localhost:3000/posts?completed=true")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Completed
        </button>

        <button
          onClick={() => setUrl("http://localhost:3000/posts?completed=false")}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Not Completed
        </button>
      </div>

      {/* POSTS LIST */}
      <div className="space-y-3">
        {data.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white shadow border rounded-lg hover:shadow-md transition"
          >
            <h1 className="text-xl font-semibold text-gray-800">
              {post.title}
            </h1>
            <p className="text-gray-600 mt-1">{post.body}</p>

            <div className="mt-2 text-sm text-gray-700">
              <p>Views: {post.views}</p>
              <p>
                Status:{" "}
                <span
                  className={
                    post.completed
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {post.completed ? "Completed" : "Not Completed"}
                </span>
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => startEdit(post)}
                className="flex-1 bg-yellow-500 text-white p-2 rounded-md 
                           hover:bg-yellow-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => deletePost(post.id)}
                className="flex-1 bg-red-500 text-white p-2 rounded-md 
                           hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------
// POST
// import { useState } from "react";
// import { useFetch } from "../../hooks/useFetch";
// export default function Class09() {
//   const [url, setUrl] = useState("http://localhost:3000/posts");
//   const { data, isLoading } = useFetch(url);

//   // Form state
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [views, setViews] = useState(0);
//   const [completed, setCompleted] = useState(false);

//   // Add Post Function
//   const handleAddPost = () => {
//     const newPost = {
//       title,
//       body,
//       views: Number(views),
//       completed,
//     };

//     fetch("http://localhost:3000/posts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newPost),
//     }).then(() => {
//       // refresh list by updating URL (forces useFetch to run again)
//       setUrl("http://localhost:3000/posts?" + Math.random());
//     });

//     // Reset fields
//     setTitle("");
//     setBody("");
//     setViews(0);
//     setCompleted(false);

//     alert("Post added (not really, this is just a demo)!");
//   };

//   if (isLoading) return <h1>Loading....</h1>;

//   return (
//     <div className="max-w-lg p-4 mx-auto space-y-3">
//       <h2 className="text-2xl underline">Posts Data from json-server</h2>

//       {/* FORM */}
//       <div className="space-y-2 p-3 border rounded">
//         <div>
//           <label className="mr-2">Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border-2"
//           />
//         </div>

//         <div>
//           <label className="mr-2">Body:</label>
//           <input
//             type="text"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             className="border-2"
//           />
//         </div>

//         <div>
//           <label className="mr-2">Views:</label>
//           <input
//             type="number"
//             value={views}
//             onChange={(e) => setViews(e.target.value)}
//             className="border-2 w-20"
//           />
//         </div>

//         <div>
//           <label className="mr-2">Completed:</label>
//           <input
//             type="checkbox"
//             checked={completed}
//             onChange={(e) => setCompleted(e.target.checked)}
//           />
//         </div>

//         <button
//           onClick={handleAddPost}
//           className="border-2 p-1 bg-blue-300 cursor-pointer"
//         >
//           Add Post
//         </button>
//       </div>

//       {/* FILTER BUTTONS */}
//       <h1 className="text-3xl underline">Todos</h1>
//       <button
//         onClick={() => setUrl("http://localhost:3000/posts?completed=true")}
//         className="border-2 p-1 bg-gray-300 cursor-pointer mr-2"
//       >
//         Completed
//       </button>
//       <button
//         onClick={() => setUrl("http://localhost:3000/posts?completed=false")}
//         className="border-2 p-1 bg-gray-300 cursor-pointer"
//       >
//         Not Completed
//       </button>

//       {/* POSTS LIST */}
//       {data.map((post) => (
//         <div key={post.id} className="border-2 border-green-950 p-2">
//           <h1 className="text-xl">Title: {post.title}</h1>
//           <p>Body: {post.body}</p>
//           <p>Views: {post.views}</p>
//           <p>Completed: {post.completed ? "Completed" : "Not completed"}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// ------------------------------------------------------------
// import { useState } from "react";
// import { useFetch } from "../../hooks/useFetch";

// export default function Class09() {
//   const [url, setUrl] = useState("http://localhost:3000/posts");
//   const { data, isLoading } = useFetch(url);

//   if (isLoading) {
//     return <h1>Loading....</h1>;
//   }

//   return (
//     <div className="max-w-lg p-4 mx-auto space-y-2">
//       <div>
//         <h2 className="text-2xl underline">Posts Data from json-server</h2>
//         <label htmlFor="title">Title: </label>
//         <input type="text" className="border-2" />
//         <label htmlFor="body">Body</label>
//         <input type="text" name="body" id="body" />
//         <button className="border-2 p-1 bg-blue-300 cursor-pointer ml-2"> Add Post</button>
//       </div>

//       <h1 className="text-3xl underline">Todos</h1>
//       <button
//         onClick={() => setUrl("http://localhost:3000/posts?completed=true")}
//         className="border-2 p-1 bg-gray-300 cursor-pointer mr-2"
//       >
//         Completed
//       </button>
//       <button
//         onClick={() => setUrl("http://localhost:3000/posts?completed=false")}
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
//   const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos");
//   const { data, isLoading } = useFetch(url);

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
