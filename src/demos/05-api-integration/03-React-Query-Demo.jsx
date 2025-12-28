/**
 * DEMONSTRATION: TanStack React Query
 * 
 * This demonstrates:
 * - useQuery for fetching data
 * - useMutation for creating/updating/deleting
 * - Automatic caching and refetching
 * - Loading and error states
 * - Query invalidation
 */

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser, updateUser, deleteUser } from "../../api/users";

function ReactQueryDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  const queryClient = useQueryClient();

  // useQuery automatically handles loading, error, and caching
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Mutation for creating user
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setName("");
      setEmail("");
      alert("User created successfully!");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      alert("Error creating user");
    },
  });

  // Mutation for updating user
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setName("");
      setEmail("");
      setUserId(null);
      alert("User updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      alert("Error updating user");
    },
  });

  // Mutation for deleting user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("User deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    },
  });

  const handleEdit = (user) => {
    setUserId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleSubmit = () => {
    if (!name || !email) {
      alert("Please fill in all fields");
      return;
    }

    if (userId) {
      updateMutation.mutate({ id: userId, name, email });
    } else {
      createMutation.mutate({ name, email });
    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setUserId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        TanStack React Query Demonstration
      </h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>React Query</strong> provides powerful data synchronization
          for React. It handles caching, background updates, and stale data
          automatically.
        </p>
      </div>

      {/* Form */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {userId ? "Edit User" : "Create New User"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={
                createMutation.isPending ||
                updateMutation.isPending ||
                !name ||
                !email
              }
              className="flex-1 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Processing..."
                : userId
                ? "Update User"
                : "Create User"}
            </button>
            {userId && (
              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Users List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Users List</h2>

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading users...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-red-600">
              Error loading users. Make sure json-server is running on port 3001
            </p>
          </div>
        )}

        {!isLoading && !error && users && users.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found</p>
          </div>
        )}

        {!isLoading && !error && users && users.length > 0 && (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={deleteMutation.isPending}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">React Query Benefits:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Automatic Caching:</strong> Data is cached and reused
          </li>
          <li>
            <strong>Background Updates:</strong> Keeps data fresh automatically
          </li>
          <li>
            <strong>Loading States:</strong> Built-in loading and error states
          </li>
          <li>
            <strong>Query Invalidation:</strong> Easy cache invalidation after
            mutations
          </li>
          <li>
            <strong>Optimistic Updates:</strong> Update UI before server
            responds
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReactQueryDemo;

