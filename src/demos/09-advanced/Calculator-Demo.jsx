/**
 * DEMONSTRATION: Advanced Calculator
 * 
 * This demonstrates:
 * - Complex state management
 * - useMemo for performance
 * - Advanced component logic
 */

import { useState, useMemo } from "react";
import Calculator from "../../components/Calculator";

function CalculatorDemo() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        Advanced Calculator Demonstration
      </h1>
      <p className="mb-6 text-gray-700">
        This calculator demonstrates complex state management, useMemo for
        performance optimization, and advanced React patterns.
      </p>
      <Calculator />
    </div>
  );
}

export default CalculatorDemo;

