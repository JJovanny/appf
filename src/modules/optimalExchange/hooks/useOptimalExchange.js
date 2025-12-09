// src/modules/optimalExchange/hooks/useOptimalExchange.js
import { useState } from "react";
import { fetchOptimalExchange } from "../services/api";

export function useOptimalExchange() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculate = async (N, denominations) => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const tests = [
        {
          N: Number(N),
          denominations: denominations.split(",").map(Number)
        }
      ];
      const res = await fetchOptimalExchange(tests);
      setResults(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, calculate };
}
