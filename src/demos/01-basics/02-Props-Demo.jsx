/**
 * DEMONSTRATION: Props in React
 * 
 * This demonstrates:
 * - How to pass props to components
 * - How to receive and use props
 * - Default props
 * - Conditional rendering based on props
 */

import Pass from "../../components/Pass";
import Fail from "../../components/Fail";
import Result from "../../components/Result";

function PropsDemo() {
  // Sample student data
  const students = [
    { name: "Ahmed", marks: 60, color: "green" },
    { name: "Ali", marks: 40, color: "blue" },
    { name: "Zubair", marks: 30, color: "red" },
    { name: "Mujtaba", marks: 80, color: "green" },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        Props Demonstration
      </h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">What are Props?</h2>
        <p className="text-gray-700">
          Props (short for properties) are how we pass data from parent
          components to child components. They are read-only and help make
          components reusable.
        </p>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Student Results</h2>
        <div className="space-y-4">
          {students.map((student, index) => (
            <Result
              key={index}
              marks={student.marks}
              color={student.color}
              name={student.name}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Props are passed as attributes in JSX</li>
          <li>Props are received as function parameters</li>
          <li>Props are immutable (cannot be changed by child)</li>
          <li>Default values can be set for props</li>
        </ul>
      </section>
    </div>
  );
}

export default PropsDemo;

