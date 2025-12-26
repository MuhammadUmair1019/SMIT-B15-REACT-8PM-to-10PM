import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const getTodos = async () => {
  const { data } = await supabase.from("todos").select("*");

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
    .update({
      ...dataPayload,
    })
    .eq("id", id);
};

function Supabase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState("");

  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      handleReset();
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      handleReset();
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setEditingId("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      content: description,
    };

    console.log("editingId", editingId);
    if (editingId) {
      updateTodoMutation.mutate(
        {
          ...payload,
          id: editingId,
        },
        editingId
      );
    } else {
      createTodoMutation.mutate(payload);
    }
  };

  if (isLoading) {
    return <h1> Loading... </h1>;
  }

  return (
    <div>
      <h1>Hello, React</h1>

      <form onSubmit={handleSubmit} className="max-w-6xl p-4" action="">
        <label className="block text-lg font-semibold text-gray-700">
          Title
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block text-lg font-semibold text-gray-700">
          Description
        </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full mt-4 py-3 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-700 transition duration-300"
        >
          {editingId ? "Update todo" : "Create Todo"}
        </button>
      </form>

      <h1 className="text-3xl font-bold mt-10 mb-6 text-gray-800">Todos</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* {editingId === todo.id ? (
        <>
          <input
            className="w-full mb-2 p-2 border rounded"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            className="w-full mb-3 p-2 border rounded"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                updateTodoMutation.mutate({
                  id: todo.id,
                  title: editTitle,
                  content: editContent,
                });
                setEditingId(null);
              }}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save
            </button>

            <button
              onClick={() => setEditingId(null)}
              className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : ( */}
            <>
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {todo.title}
              </h3>

              <p className="text-gray-600 mb-4">{todo.content}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    console.log("edit", todo);
                    setEditingId(todo.id);
                    setTitle(todo.title);
                    setDescription(todo.content);
                  }}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodoMutation.mutate(todo.id)}
                  disabled={deleteTodoMutation.isPending}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </>
            {/* )} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Supabase;
