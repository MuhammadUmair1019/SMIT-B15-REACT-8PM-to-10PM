/**
 * DEMONSTRATION: useState Hook - Counter Example
 * 
 * This demonstrates:
 * - Basic useState usage
 * - Updating state with setState
 * - State triggers re-renders
 * - Conditional state updates
 */

import { useState } from "react";

function UseStateCounter() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(1);

  // Handler functions that update state
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    // Only decrement if count is greater than 1
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleReset = () => {
    setCount(1);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        useState Hook - Counter
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        {/* Display current state */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-2">Current Quantity</p>
          <h2 className="text-5xl font-bold text-indigo-600">{count}</h2>
        </div>

        {/* Control buttons */}
        <div className="flex gap-3 justify-center mb-4">
          <button
            onClick={handleDecrement}
            disabled={count === 1}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            -
          </button>
          <button
            onClick={handleIncrement}
            disabled={count === 5}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            +
          </button>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Reset
        </button>

        {/* Conditional message */}
        {count === 5 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              ⚠️ You cannot order more than 5 units
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">How useState Works:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>Call useState with initial value: useState(1)</li>
          <li>Get current value and setter: [count, setCount]</li>
          <li>Call setCount(newValue) to update state</li>
          <li>Component re-renders with new state value</li>
        </ol>
      </div>
    </div>
  );
}

export default UseStateCounter;

