/**
 * DEMONSTRATION NAVIGATION PAGE
 * 
 * This page provides easy access to all React demonstrations
 * organized by topic for students to learn from.
 */

import { Link } from "react-router-dom";

function DemoNavigation() {
  const demoSections = [
    {
      title: "01. React Basics",
      description: "JSX, Components, Props, List Rendering",
      demos: [
        { name: "JSX Basics", path: "/demo/jsx-basics" },
        { name: "Props Demo", path: "/demo/props" },
        { name: "List Rendering", path: "/demo/list-rendering" },
      ],
    },
    {
      title: "02. State Management",
      description: "useState Hook and State Updates",
      demos: [
        { name: "Counter App", path: "/demo/counter" },
      ],
    },
    {
      title: "03. Forms",
      description: "Controlled Components and Form Handling",
      demos: [
        { name: "Controlled Inputs", path: "/demo/controlled-inputs" },
      ],
    },
    {
      title: "04. React Hooks",
      description: "useEffect, useRef, useMemo, useReducer",
      demos: [
        { name: "useEffect Demo", path: "/demo/use-effect" },
        { name: "useRef Demo", path: "/demo/use-ref" },
        { name: "useMemo Demo", path: "/demo/use-memo" },
        { name: "useReducer Demo", path: "/demo/use-reducer" },
      ],
    },
    {
      title: "05. API Integration",
      description: "Fetch API, Axios, React Query",
      demos: [
        { name: "Fetch API", path: "/demo/fetch-api" },
        { name: "Axios Demo", path: "/demo/axios" },
        { name: "React Query", path: "/demo/react-query" },
      ],
    },
    {
      title: "06. Applications",
      description: "Complete Applications",
      demos: [
        { name: "Todo App", path: "/demo/todo-app" },
      ],
    },
    {
      title: "07. Authentication",
      description: "Supabase Authentication & Database",
      demos: [
        { name: "Supabase Todos", path: "/todos" },
      ],
    },
    {
      title: "08. Custom Hooks",
      description: "Creating Reusable Custom Hooks",
      demos: [
        { name: "Custom Hook Demo", path: "/demo/custom-hook" },
      ],
    },
    {
      title: "09. Advanced Topics",
      description: "Advanced React Patterns",
      demos: [
        { name: "Calculator", path: "/demo/calculator" },
      ],
    },
    {
      title: "10. Real-time Chat App",
      description: "Complete End-to-End Application",
      demos: [
        { name: "Chat Application", path: "/chat" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            React Learning Demos
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive demonstrations organized by topic
          </p>
        </div>

        {/* Demo Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demoSections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold text-indigo-600 mb-2">
                {section.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {section.description}
              </p>
              <div className="space-y-2">
                {section.demos.map((demo, demoIndex) => (
                  <Link
                    key={demoIndex}
                    to={demo.path}
                    className="block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition text-sm font-medium"
                  >
                    → {demo.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            Quick Links
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/todos"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Protected Todos (Requires Login)
            </Link>
            <Link
              to="/chat"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Real-time Chat App (Requires Login)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoNavigation;

