// src/modules/optimalExchange/components/OptimalExchangeForm.js
import React, { useState } from "react";
import { useOptimalExchange } from "../hooks/useOptimalExchange";
import 'bootstrap/dist/css/bootstrap.min.css';

export function OptimalExchangeForm() {
  const [N, setN] = useState(100);
  const [denominations, setDenominations] = useState("1,2,5,10,20,50");

  const { results, loading, error, calculate } = useOptimalExchange();

  const handleSubmit = (e) => {
    e.preventDefault();
    calculate(N, denominations);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Optimal Exchange Simulator</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">N (valor máximo)</label>
          <input
            type="number"
            className="form-control"
            value={N}
            onChange={(e) => setN(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Denominations (separadas por coma)</label>
          <input
            type="text"
            className="form-control"
            value={denominations}
            onChange={(e) => setDenominations(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Calculando..." : "Calcular"}
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {results.length > 0 && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Resultados:</h5>
            <ul className="list-group list-group-flush">
              {results.map((r, idx) => (
                <li key={idx} className="list-group-item">
                  <strong>Average:</strong> {r.average}, <strong>Max:</strong> {r.max}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
