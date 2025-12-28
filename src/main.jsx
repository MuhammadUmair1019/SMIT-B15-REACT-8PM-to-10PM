/**
 * MAIN ENTRY POINT
 * 
 * This file sets up the React application with:
 * - React Query for data fetching and caching
 * - React Router for navigation
 * - React Query DevTools (in development mode)
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Create a QueryClient instance for React Query
// This manages caching, background updates, and more
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      retry: 1, // Retry failed requests once
    },
  },
});

// Check if we're in development mode
// Set VITE_IS_DEV=true in .env file to enable React Query DevTools
const isDev = import.meta.env.VITE_IS_DEV;

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* QueryClientProvider enables React Query throughout the app */}
    <QueryClientProvider client={queryClient}>
      {/* BrowserRouter enables client-side routing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* React Query DevTools - only shown in development */}
      {isDev === "true" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>
);
