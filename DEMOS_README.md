# React Learning Demos - Student Guide

This repository contains organized React demonstrations for web development students. All examples are structured by topic with clear explanations and demonstrations.

## 📁 Project Structure

```
src/
├── demos/                    # All demonstration components
│   ├── 01-basics/           # React fundamentals
│   ├── 02-state-management/ # useState hook
│   ├── 03-forms/            # Form handling
│   ├── 04-hooks/           # React hooks (useEffect, useRef, etc.)
│   ├── 05-api-integration/  # API calls (Fetch, Axios, React Query)
│   ├── 06-routing/          # Applications & routing
│   ├── 07-authentication/   # Supabase auth & database
│   ├── 08-custom-hooks/    # Custom hooks
│   └── 09-advanced/        # Advanced topics
├── components/              # Reusable components
├── pages/                   # Page components (Login, Signup)
├── hooks/                   # Custom hooks
├── api/                     # API configuration
└── config/                  # Configuration files
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Start JSON Server** (for API demos)
   ```bash
   npm run server
   ```

4. **Access the Demo Navigation**
   - Open your browser to `http://localhost:5173`
   - You'll see the demo navigation page with all available demonstrations

## 📚 Learning Path

### 01. React Basics
Start here if you're new to React:
- **JSX Basics** (`/demo/jsx-basics`) - Learn JSX syntax and expressions
- **Props Demo** (`/demo/props`) - Understand component props
- **List Rendering** (`/demo/list-rendering`) - Render arrays and lists

### 02. State Management
Learn how to manage component state:
- **Counter App** (`/demo/counter`) - Basic useState hook

### 03. Forms
Handle user input:
- **Controlled Inputs** (`/demo/controlled-inputs`) - Form handling patterns

### 04. React Hooks
Master React hooks:
- **useEffect** (`/demo/use-effect`) - Side effects and data fetching
- **useRef** (`/demo/use-ref`) - DOM references and mutable values
- **useMemo** (`/demo/use-memo`) - Performance optimization
- **useReducer** (`/demo/use-reducer`) - Complex state management

### 05. API Integration
Connect to backend APIs:
- **Fetch API** (`/demo/fetch-api`) - Native browser API
- **Axios** (`/demo/axios`) - Popular HTTP client library
- **React Query** (`/demo/react-query`) - Powerful data synchronization

### 06. Applications
Complete applications:
- **Todo App** (`/demo/todo-app`) - Full CRUD application

### 07. Authentication
User authentication:
- **Supabase Todos** (`/todos`) - Protected route with authentication

### 08. Custom Hooks
Reusable logic:
- **Custom Hook Demo** (`/demo/custom-hook`) - Creating custom hooks

### 09. Advanced Topics
Advanced patterns:
- **Calculator** (`/demo/calculator`) - Complex state management

## 🎯 How to Use This Repository

1. **Start with Basics**: Begin with `01-basics` if you're new to React
2. **Follow the Order**: Topics are numbered in learning order
3. **Read the Comments**: Each demo file has detailed comments explaining concepts
4. **Experiment**: Modify the code to see how changes affect the output
5. **Check Console**: Many demos log information to the browser console

## 🔑 Key Features

- ✅ **Organized by Topic**: Easy to find what you're looking for
- ✅ **Self-Explanatory Names**: Component names describe their purpose
- ✅ **Detailed Comments**: Every demo includes explanations
- ✅ **Consistent Design**: All demos use Tailwind CSS for styling
- ✅ **Interactive Examples**: Hands-on learning with working code

## 📝 Notes

- Make sure `json-server` is running for API demos (port 3000 and 3001)
- Supabase authentication requires proper configuration in `src/config/supabase.js`
- All demos are accessible through the navigation page at the root route (`/`)

## 🛠️ Technologies Used

- **React 19** - UI library
- **React Router** - Routing
- **TanStack React Query** - Data fetching
- **Axios** - HTTP client
- **Supabase** - Authentication & Database
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Happy Learning! 🎉**

