import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  const apiUrl = "http://localhost:3001/users"; // Example API

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Create new user
  const createUser = async () => {
    try {
      const response = await axios.post(apiUrl, {
        name,
        email,
      });
      setUsers([...users, response.data]);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Update existing user
  const updateUser = async () => {
    if (userId === null) return;

    try {
      const response = await axios.put(`${apiUrl}/${userId}`, {
        name,
        email,
      });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, name, email } : user
        )
      );
      setName("");
      setEmail("");
      setUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    console.log('id', id)
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Set user data for updating
  const handleEdit = (user) => {
    setUserId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-5">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          CRUD App with Axios
        </h1>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label
              className="block text-lg font-semibold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              className="block text-lg font-semibold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={userId ? updateUser : createUser}
            className="w-full py-3 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-700 transition duration-300"
          >
            {userId ? "Update User" : "Create User"}
          </button>
        </div>

        {/* User List */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
          User List
        </h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="space-x-3">
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
      </div>
    </div>
  );
};

export default App;

// import axios from "axios";
// import React, { useEffect } from "react";

// function Axios() {
//   const getData = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://jsonplaceholder.typicode.com/posts/1"
//       );

//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return <div></div>;
// }

// export default Axios;
