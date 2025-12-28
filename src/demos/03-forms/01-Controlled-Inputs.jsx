/**
 * DEMONSTRATION: Controlled Inputs (Form Handling)
 * 
 * This demonstrates:
 * - Single input controlled component
 * - Multiple inputs with object state
 * - Using name attribute for dynamic updates
 * - Form submission handling
 */

import { useState } from "react";

function ControlledInputs() {
  // Single input state
  const [city, setCity] = useState("Karachi");

  // Multiple inputs using object state
  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
  });

  // Handle single input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Handle multiple inputs using name attribute
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    // Update specific property using spread operator
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", user);
    alert(`Hello ${user.name}! Your email is ${user.email}`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        Controlled Inputs Demonstration
      </h1>

      {/* Single Input Example */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">1. Single Input</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City:
          </label>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter city name"
          />
          <p className="text-sm text-gray-600">Current value: {city}</p>
        </div>
      </section>

      {/* Multiple Inputs Example */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">2. Multiple Inputs</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleUserChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City:
            </label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleUserChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your city"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-semibold"
          >
            Submit Form
          </button>
        </form>

        {/* Display current state */}
        {user.name && user.city && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm">
              <strong>Preview:</strong> {user.name} from {user.city} ({user.email})
            </p>
          </div>
        )}
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Key Concepts:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Controlled Component:</strong> Input value is controlled by
            React state
          </li>
          <li>
            <strong>onChange:</strong> Updates state when user types
          </li>
          <li>
            <strong>name attribute:</strong> Helps identify which input changed
          </li>
          <li>
            <strong>Spread operator (...):</strong> Preserves other properties
            when updating one
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ControlledInputs;

