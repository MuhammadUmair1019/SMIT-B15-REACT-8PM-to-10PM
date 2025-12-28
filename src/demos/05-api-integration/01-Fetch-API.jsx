/**
 * DEMONSTRATION: Fetch API
 * 
 * This demonstrates:
 * - Basic fetch API usage
 * - GET requests
 * - POST requests
 * - Error handling
 * - Loading states
 */

import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

function FetchAPIDemo() {
  const [url, setUrl] = useState("http://localhost:3000/posts");
  const { data, isLoading } = useFetch(url);

  // Form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [views, setViews] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [editId, setEditId] = useState(null);

  // Reset form
  const resetForm = () => {
    setTitle("");
    setBody("");
    setViews(0);
    setCompleted(false);
    setEditId(null);
  };

  // CREATE POST
  const handleCreatePost = () => {
    const postData = {
      title,
      body,
      views: Number(views),
      completed,
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh list by updating URL
        setUrl("http://localhost:3000/posts?" + Math.random());
        resetForm();
        alert("Post created successfully!");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Error creating post");
      });
  };

  // UPDATE POST
  const handleUpdatePost = () => {
    const postData = {
      title,
      body,
      views: Number(views),
      completed,
    };

    fetch(`http://localhost:3000/posts/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then(() => {
        setUrl("http://localhost:3000/posts?" + Math.random());
        resetForm();
        alert("Post updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        alert("Error updating post");
      });
  };

  // DELETE POST
  const handleDeletePost = (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUrl("http://localhost:3000/posts?" + Math.random());
        alert("Post deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      });
  };

  // EDIT POST (load data into form)
  const handleEditPost = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setViews(post.views);
    setCompleted(post.completed);
    setEditId(post.id);
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mt-4"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        Fetch API Demonstration
      </h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Make sure json-server is running on port 3000.
          Run: <code className="bg-gray-200 px-2 py-1 rounded">npm run server</code>
        </p>
      </div>

      {/* Form */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Post" : "Create New Post"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body
            </label>
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Views
            </label>
            <input
              type="number"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="w-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Completed
            </label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={editId ? handleUpdatePost : handleCreatePost}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold"
            >
              {editId ? "Update Post" : "Create Post"}
            </button>
            {editId && (
              <button
                onClick={resetForm}
                className="flex-1 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="mb-6">
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setUrl("http://localhost:3000/posts?completed=true")}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Completed
          </button>
          <button
            onClick={() => setUrl("http://localhost:3000/posts?completed=false")}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Not Completed
          </button>
          <button
            onClick={() => setUrl("http://localhost:3000/posts")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            All Posts
          </button>
        </div>
      </section>

      {/* Posts List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Posts List</h2>
        <div className="space-y-3">
          {data && data.length > 0 ? (
            data.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-2">{post.body}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found</p>
          )}
        </div>
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Fetch API Methods:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>GET:</strong> fetch(url) - Retrieve data
          </li>
          <li>
            <strong>POST:</strong> fetch(url, {"{ method: 'POST', body: data }"}) - Create data
          </li>
          <li>
            <strong>PUT:</strong> fetch(url, {"{ method: 'PUT', body: data }"}) - Update data
          </li>
          <li>
            <strong>DELETE:</strong> fetch(url, {"{ method: 'DELETE' }"}) - Delete data
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FetchAPIDemo;

