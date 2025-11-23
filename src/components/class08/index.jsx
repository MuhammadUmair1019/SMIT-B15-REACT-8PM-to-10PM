import { useEffect, useState } from "react";

export default function Class08() {
  const [post, setPost] = useState({});
  const [id, setId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // mount
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      });
  }, [id]);

  const handleNextPost = () => {
    setId(id + 1);
    setIsLoading(true);
    console.log("next post");
  };

  if (isLoading) {
    return <h1>Loading .....</h1>;
  }

  //   console.log("post", post);
  console.log("id", id);

  return (
    <div className="p-4">
      <h3 className="border-b-2 border-amber-400">Post Data</h3>
      <div key={post.id} className=" border-b-2 border-zinc-950">
        <h3>Title: {post.title}</h3>
        <h3>Body: {post.body}</h3>
      </div>
      {/* {posts.map((post) => (
        <div key={post.id} className=" border-b-2 border-zinc-950">
          <h3>Title: {post.title}</h3>
          <h3>Body: {post.body}</h3>
        </div>
      ))} */}

      <button
        className="mt-5 p-2 bg-blue-500 cursor-pointer"
        onClick={handleNextPost}
      >
        Get next post
      </button>
    </div>
  );
}

// export default function Class08() {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // mount
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setPosts(data.slice(0, 5));
//         setIsLoading(false);
//       });
//   }, []);

//   console.log("posts", posts);

//   if (isLoading) {
//     return <h1>Loading .....</h1>;
//   }

//   return (
//     <div>
//       <h3>Posts Data</h3>
//       {posts.map((post) => (
//         <div key={post.id} className=" border-b-2 border-zinc-950">
//           <h3>Title: {post.title}</h3>
//           <h3>Body: {post.body}</h3>
//         </div>
//       ))}
//     </div>
//   );
// }

// ----------------------------------------------
// export default function Class08() {
//   const [counter, setCounter] = useState(0);

//   // mount
//   useEffect(() => {
//       console.log('render')
//   }, [])

//   // update
//   useEffect(() => {
//       console.log('counter')
//   }, [counter])

//   return (
//     <div className="p-4">
//       <h1>Hello, React</h1>
//       <div className="flex space-x-3">
//         <button
//           onClick={() => setCounter(counter + 1)}
//           className="border-2 px-3 bg-amber-500"
//         >
//           +
//         </button>
//         <p>{counter}</p>
//         <button
//           onClick={() => setCounter(counter - 1)}
//           className="border-2 px-3 bg-amber-500"
//         >
//           -
//         </button>
//       </div>
//     </div>
//   );
// }
