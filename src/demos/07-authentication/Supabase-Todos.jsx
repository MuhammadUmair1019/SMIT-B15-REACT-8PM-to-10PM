/**
 * DEMONSTRATION: Supabase Authentication & Database
 * 
 * This demonstrates:
 * - User authentication with Supabase
 * - Protected routes
 * - CRUD operations with Supabase database
 * - React Query integration with Supabase
 */

import { useState } from "react";
import { supabase } from "../../config/supabase";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Supabase query functions
const getTodos = async (userId) => {
  const { data } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return data;
};

const createTodo = async (payload) => {
  return await supabase.from("todos").insert(payload);
};

const deleteTodo = async (id) => {
  return await supabase.from("todos").delete().eq("id", id);
};

const updateTodo = async (payload) => {
  const { id, ...dataPayload } = payload;
  return await supabase
    .from("todos")
    .update(dataPayload)
    .eq("id", id);
};

function SupabaseTodos({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch todos using React Query
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(user?.id),
    enabled: !!user, // Only fetch if user exists
  });

  // Create mutation
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      handleReset();
    },
  });

  // Update mutation
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      handleReset();
    },
  });

  // Delete mutation
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setEditingId("");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
      return;
    }
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      content: description,
      user_id: user?.id,
    };

    if (editingId) {
      updateTodoMutation.mutate({ ...payload, id: editingId });
    } else {
      createTodoMutation.mutate(payload);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">My Todos</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Todo" : "Create New Todo"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold"
            >
              {editingId ? "Update Todo" : "Create Todo"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Todos List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Your Todos ({todos?.length || 0})
        </h2>
        {todos && todos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  {todo.title}
                </h3>
                <p className="text-gray-600 mb-4">{todo.content}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setTitle(todo.title);
                      setDescription(todo.content);
                    }}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodoMutation.mutate(todo.id)}
                    disabled={deleteTodoMutation.isPending}
                    className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 text-sm"
                  >
                    {deleteTodoMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No todos yet. Create one above!</p>
          </div>
        )}
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Supabase Features:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Authentication:</strong> Built-in user management
          </li>
          <li>
            <strong>Database:</strong> PostgreSQL database with real-time
            capabilities
          </li>
          <li>
            <strong>Row Level Security:</strong> Secure data access per user
          </li>
          <li>
            <strong>Auto-generated APIs:</strong> RESTful and GraphQL APIs
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SupabaseTodos;

