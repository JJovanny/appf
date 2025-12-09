import React, { useState } from "react";
import { useOptimalExchange } from "../hooks/useOptimalExchange";

export function OptimalExchangeForm() {
  const [tests, setTests] = useState([
    { N: 100, denominations: "1,2,5,10,20,50" },
  ]);

  const { results, loading, error, calculate } = useOptimalExchange();

  const handleAddTest = () => {
    setTests([...tests, { N: 100, denominations: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...tests];
    updated[index][field] = value;
    setTests(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTests = tests.map((t) => ({
      N: Number(t.N),
      denominations: t.denominations.split(",").map(Number),
    }));
    calculate(formattedTests);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Optimal Exchange Simulator</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        {tests.map((test, idx) => (
          <div key={idx} className="mb-3 border p-3 rounded">
            <h6>Input #{idx + 1}</h6>
            <div className="mb-2">
              <label className="form-label">N (valor máximo)</label>
              <input
                type="number"
                className="form-control"
                value={test.N}
                onChange={(e) => handleChange(idx, "N", e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">
                Denominations (separadas por coma)
              </label>
              <input
                type="text"
                className="form-control"
                value={test.denominations}
                onChange={(e) =>
                  handleChange(idx, "denominations", e.target.value)
                }
                required
              />
            </div>
          </div>
        ))}

        <div className="d-flex align-items-center justify-content-start mt-3 gap-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddTest}
          >
            + Añadir entrada
          </button>

          <br />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Calculando..." : "Calcular"}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {results.length > 0 && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Resultados:</h5>
            <ul className="list-group list-group-flush">
              {results.map((r, idx) => (
                <li key={idx} className="list-group-item">
                  <strong>Test #{idx + 1}:</strong> Average: {r.average}, Max:{" "}
                  {r.max}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
