/**
 * DEMONSTRATION: useMemo Hook
 * 
 * This demonstrates:
 * - Memoizing expensive calculations
 * - Preventing unnecessary recalculations
 * - Performance optimization
 */

import { useMemo, useState } from "react";

function UseMemoDemo() {
  const [val, setVal] = useState("");
  const [count, setCount] = useState(0);

  // Expensive calculation WITHOUT useMemo
  // This runs on EVERY render, even when val changes
  const expensiveCalculationWithoutMemo = () => {
    console.log("Expensive calculation running (without memo)...");
    let total = 0;
    // Simulate expensive operation
    for (let i = 0; i < 1000000; i++) {
      total += i;
    }
    return total;
  };

  // Expensive calculation WITH useMemo
  // This only runs when dependencies change (empty array = runs once)
  const expensiveCalculationWithMemo = useMemo(() => {
    console.log("Expensive calculation running (with memo)...");
    let total = 0;
    // Simulate expensive operation
    for (let i = 0; i < 1000000; i++) {
      total += i;
    }
    return total;
  }, []); // Empty array means it calculates once

  // Memoized value that depends on count
  const doubledCount = useMemo(() => {
    console.log("Doubling count...");
    return count * 2;
  }, [count]); // Recalculates when count changes

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        useMemo Hook Demonstration
      </h1>

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          💡 Open browser console to see when calculations run
        </p>
      </div>

      {/* Input that triggers re-renders */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">1. Input Field</h2>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Type here to trigger re-renders"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <p className="text-sm text-gray-600 mt-2">Input value: {val}</p>
      </section>

      {/* Counter */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">2. Counter</h2>
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold">Count: {count}</p>
          <p className="text-lg font-semibold">Doubled: {doubledCount}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Increment
          </button>
        </div>
      </section>

      {/* Expensive Calculations */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">3. Expensive Calculations</h2>
        <div className="space-y-3">
          <div className="p-3 bg-white border border-gray-200 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Without useMemo (runs every render):
            </p>
            <p className="text-lg font-bold">
              {expensiveCalculationWithoutMemo()}
            </p>
            <p className="text-xs text-red-600 mt-1">
              ⚠️ Check console - runs on every keystroke!
            </p>
          </div>

          <div className="p-3 bg-white border border-green-200 rounded-lg bg-green-50">
            <p className="text-sm font-medium text-gray-700 mb-1">
              With useMemo (runs once):
            </p>
            <p className="text-lg font-bold">
              {expensiveCalculationWithMemo}
            </p>
            <p className="text-xs text-green-600 mt-1">
              ✅ Check console - only runs once!
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">When to use useMemo:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Expensive calculations that don't need to run every render</li>
          <li>When you want to prevent unnecessary recalculations</li>
          <li>When a value depends on specific props/state</li>
          <li>
            <strong>Note:</strong> Don't overuse - memoization has its own cost
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UseMemoDemo;

