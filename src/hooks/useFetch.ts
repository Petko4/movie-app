import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(url, {
          signal: abortController.signal,
        });

        const data = await res.json();
        setData(data);
      } catch (e) {
        if (!abortController.signal.aborted) {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (url && url !== "") {
      fetchData();
    } else {
      setData(null);
    }

    return () => abortController.abort();
  }, [url]);

  return { data, isLoading, error };
}
