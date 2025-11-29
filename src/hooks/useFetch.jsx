import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const controller = new AbortController();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setData(data);
      setIsLoading(false);
    };

    try {
      fetchTodos();
    } catch (error) {
      console.log("error", error);
    }

    return () => {
      controller.abort();
    }
  }, [url]);

  return { data, isLoading };
};
