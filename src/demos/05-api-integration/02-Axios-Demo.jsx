/**
 * DEMONSTRATION: Axios Library
 * 
 * This demonstrates:
 * - Using Axios for HTTP requests
 * - GET, POST, PUT, DELETE operations
 * - Error handling with Axios
 * - Axios vs Fetch API
 */

import { useState, useEffect } from "react";
import axios from "axios";

function AxiosDemo() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = "http://localhost:3001/users";

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // GET - Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users. Make sure json-server is running on port 3001");
    } finally {
      setLoading(false);
    }
  };

  // POST - Create new user
  const createUser = async () => {
    if (!name || !email) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(apiUrl, { name, email });
      setUsers([...users, response.data]);
      setName("");
      setEmail("");
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user");
    } finally {
      setLoading(false);
    }
  };

  // PUT - Update existing user
  const updateUser = async () => {
    if (userId === null) return;
    if (!name || !email) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${apiUrl}/${userId}`, { name, email });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, name, email } : user
        )
      );
      setName("");
      setEmail("");
      setUserId(null);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  // Set user data for editing
  const handleEdit = (user) => {
    setUserId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setUserId(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        Axios Library Demonstration
      </h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Make sure json-server is running on port 3001.
          Run: <code className="bg-gray-200 px-2 py-1 rounded">npm run server</code>
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
              onClick={userId ? updateUser : createUser}
              disabled={loading}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
            >
              {loading
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Users List</h2>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>

        {loading && users.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
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
                    onClick={() => deleteUser(user.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Axios vs Fetch:</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <div>
            <strong>Axios Advantages:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Automatic JSON data transformation</li>
              <li>Better error handling</li>
              <li>Request/response interceptors</li>
              <li>Built-in support for request cancellation</li>
              <li>More concise syntax</li>
            </ul>
          </div>
          <div>
            <strong>Fetch Advantages:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Native browser API (no library needed)</li>
              <li>Smaller bundle size</li>
              <li>More control over requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AxiosDemo;

