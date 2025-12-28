/**
 * DEMONSTRATION: Custom Hooks
 * 
 * This demonstrates:
 * - Creating reusable custom hooks
 * - Using the useFetch custom hook
 * - Sharing logic between components
 */

import { useFetch } from "../../hooks/useFetch";

function CustomHookDemo() {
  const { data, isLoading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        Custom Hook Demonstration
      </h1>
      <p className="mb-4 text-gray-700">
        This component uses the <code className="bg-gray-200 px-2 py-1 rounded">useFetch</code> custom hook
        to fetch and display data.
      </p>
      <div className="space-y-3">
        {data && data.slice(0, 5).map((post) => (
          <div key={post.id} className="p-4 bg-white border rounded-lg">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomHookDemo;

