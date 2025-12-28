/**
 * DEMONSTRATION: List Rendering in React
 * 
 * This demonstrates:
 * - Rendering arrays using map()
 * - Using keys in lists
 * - Filtering arrays
 * - Transforming data before rendering
 */

import ProductInfo from "../../components/ProductInfo";

function ListRendering() {
  const products = [
    { name: "Laptop", price: 80000, status: true },
    { name: "Mobile", price: 50000, status: false },
    { name: "AirPods", price: 15000, status: true },
    { name: "Tablet", price: 45000, status: true },
  ];

  // Calculate average price
  const averagePrice =
    products.reduce((sum, product) => sum + product.price, 0) /
    products.length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        List Rendering Demonstration
      </h1>

      {/* All Products */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">1. All Products</h2>
        <div className="space-y-2">
          {products.map((product, index) => (
            <ProductInfo
              key={index}
              product={product}
              isAboveAvg={product.price > averagePrice}
            />
          ))}
        </div>
      </section>

      {/* Available Products Only */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          2. Available Products Only (Filtered)
        </h2>
        <div className="space-y-2">
          {products
            .filter((product) => product.status)
            .map((product, index) => (
              <ProductInfo
                key={index}
                product={product}
                isAboveAvg={product.price > averagePrice}
              />
            ))}
        </div>
      </section>

      {/* Products with 10% Price Increase */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          3. Products with 10% Price Increase (Transformed)
        </h2>
        <div className="space-y-2">
          {products.map((product, index) => (
            <ProductInfo
              key={index}
              product={{ ...product, price: product.price * 1.1 }}
              isAboveAvg={product.price * 1.1 > averagePrice}
            />
          ))}
        </div>
      </section>

      {/* Sorted by Price (Low to High) */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          4. Sorted by Price (Low to High)
        </h2>
        <div className="space-y-2">
          {[...products]
            .sort((a, b) => a.price - b.price)
            .map((product, index) => (
              <ProductInfo
                key={index}
                product={product}
                isAboveAvg={product.price > averagePrice}
              />
            ))}
        </div>
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Key Concepts:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            <strong>map()</strong>: Transforms each item in array to JSX
          </li>
          <li>
            <strong>filter()</strong>: Selects items that meet a condition
          </li>
          <li>
            <strong>sort()</strong>: Arranges items in a specific order
          </li>
          <li>
            <strong>key prop</strong>: Helps React identify which items changed
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ListRendering;

