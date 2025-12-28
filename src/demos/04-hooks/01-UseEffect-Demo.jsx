/**
 * DEMONSTRATION: useEffect Hook
 * 
 * This demonstrates:
 * - useEffect on component mount
 * - useEffect with dependencies
 * - Fetching data with useEffect
 * - Loading states
 */

import { useEffect, useState } from "react";

function UseEffectDemo() {
  const [post, setPost] = useState({});
  const [postId, setPostId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  // useEffect runs after every render
  // Empty dependency array [] means it runs only once (on mount)
  useEffect(() => {
    console.log("Component mounted - This runs only once");
  }, []);

  // useEffect with dependency - runs when counter changes
  useEffect(() => {
    console.log("Counter changed:", counter);
  }, [counter]);

  // useEffect to fetch data when postId changes
  useEffect(() => {
    setIsLoading(true);
    console.log("Fetching post with id:", postId);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setIsLoading(false);
      });
  }, [postId]); // Runs when postId changes

  const handleNextPost = () => {
    setPostId(postId + 1);
  };

  const handlePreviousPost = () => {
    if (postId > 1) {
      setPostId(postId - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        useEffect Hook Demonstration
      </h1>

      {/* Counter Example */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">1. useEffect with Dependencies</h2>
        <div className="text-center">
          <p className="text-2xl font-bold mb-3">Counter: {counter}</p>
          <button
            onClick={() => setCounter(counter + 1)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Increment Counter
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Check console to see useEffect running
          </p>
        </div>
      </section>

      {/* Fetch Data Example */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">2. Fetching Data with useEffect</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Current Post ID: {postId}</p>
          <div className="flex gap-3">
            <button
              onClick={handlePreviousPost}
              disabled={postId === 1}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous Post
            </button>
            <button
              onClick={handleNextPost}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Next Post
            </button>
          </div>
        </div>

        {post && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 border-b pb-2">
              {post.title}
            </h3>
            <p className="text-gray-700">{post.body}</p>
            <p className="text-sm text-gray-500 mt-2">Post ID: {post.id}</p>
          </div>
        )}
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">useEffect Use Cases:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Empty array []:</strong> Run once on component mount
          </li>
          <li>
            <strong>With dependencies [value]:</strong> Run when value changes
          </li>
          <li>
            <strong>No array:</strong> Run after every render (use carefully!)
          </li>
          <li>
            <strong>Cleanup function:</strong> Return a function to clean up
            (e.g., clear timers, cancel requests)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UseEffectDemo;

