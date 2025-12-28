/**
 * DEMONSTRATION: useRef Hook
 * 
 * This demonstrates:
 * - Accessing DOM elements directly
 * - useRef vs useState (refs don't trigger re-renders)
 * - Storing mutable values that persist across renders
 */

import { useEffect, useRef, useState } from "react";

function UseRefDemo() {
  // useRef for DOM element reference
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  // useState for comparison
  const [count, setCount] = useState(0);

  // useRef for storing a mutable value (doesn't cause re-render)
  const renderCount = useRef(0);
  const previousCount = useRef(0);

  // Increment render count on every render
  renderCount.current = renderCount.current + 1;

  // Store previous count value
  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      console.log("Input focused automatically");
    }
  }, []);

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  const handleScrollToButton = () => {
    buttonRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        useRef Hook Demonstration
      </h1>

      {/* DOM Element Reference */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          1. Accessing DOM Elements
        </h2>
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            placeholder="This input is auto-focused"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-3">
            <button
              onClick={handleFocusInput}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Focus Input
            </button>
            <button
              onClick={() => inputRef.current?.select()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Select All Text
            </button>
          </div>
        </div>
      </section>

      {/* Mutable Value Storage */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          2. Storing Mutable Values (No Re-render)
        </h2>
        <div className="space-y-3">
          <div className="p-3 bg-white border border-gray-200 rounded-lg">
            <p className="text-lg font-semibold">Current Count: {count}</p>
            <p className="text-sm text-gray-600">
              Previous Count: {previousCount.current}
            </p>
            <p className="text-sm text-gray-600">
              Component Rendered: {renderCount.current} times
            </p>
          </div>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Increment Count
          </button>
          <p className="text-sm text-gray-600">
            Note: renderCount updates without causing re-render
          </p>
        </div>
      </section>

      {/* Scroll Example */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">3. Scroll to Element</h2>
        <button
          onClick={handleScrollToButton}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Scroll to Button Below
        </button>
        <div className="h-96"></div> {/* Spacer */}
        <button
          ref={buttonRef}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          Target Button (Scrolls here)
        </button>
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">useRef vs useState:</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <div>
            <strong>useRef:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Doesn't trigger re-render when value changes</li>
              <li>Persists across renders</li>
              <li>Mutable (can change .current directly)</li>
              <li>Use for DOM references or storing previous values</li>
            </ul>
          </div>
          <div>
            <strong>useState:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Triggers re-render when value changes</li>
              <li>Use for values that affect UI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseRefDemo;

