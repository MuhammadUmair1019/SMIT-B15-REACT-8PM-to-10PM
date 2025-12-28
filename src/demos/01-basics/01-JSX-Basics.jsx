/**
 * DEMONSTRATION: JSX Basics
 * 
 * This component demonstrates the fundamentals of JSX (JavaScript XML):
 * - How to return JSX from a component
 * - Using expressions in JSX
 * - Conditional rendering
 * - Styling in JSX
 */

function JSXBasics() {
  // Variables can be used in JSX
  const name = "React Student";
  const age = 25;
  const isActive = true;

  // Functions can be called in JSX
  const calculateSum = (a, b) => a + b;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        JSX Basics Demonstration
      </h1>

      {/* Using variables in JSX */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">1. Using Variables</h2>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Sum of 10 + 20 = {calculateSum(10, 20)}</p>
      </section>

      {/* Conditional rendering */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">2. Conditional Rendering</h2>
        {isActive ? (
          <p className="text-green-600">Status: Active</p>
        ) : (
          <p className="text-red-600">Status: Inactive</p>
        )}
      </section>

      {/* Inline styles */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">3. Inline Styles</h2>
        <p style={{ color: "blue", backgroundColor: "yellow", padding: "10px" }}>
          This text has inline styles
        </p>
      </section>

      {/* JSX expressions */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">4. JSX Expressions</h2>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
        <p>Is even number? {age % 2 === 0 ? "Yes" : "No"}</p>
      </section>
    </div>
  );
}

export default JSXBasics;

