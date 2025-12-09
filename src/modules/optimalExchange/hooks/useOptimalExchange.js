import { useState } from "react";
import { fetchOptimalExchange } from "../services/api";

export function useOptimalExchange() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculate = async (tests) => { 
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetchOptimalExchange(tests);
      setResults(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, calculate, setError };
}
