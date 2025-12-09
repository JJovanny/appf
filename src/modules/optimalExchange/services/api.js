export async function fetchOptimalExchange(tests) {
  const response = await fetch(`${process.env.REACT_APP_URL_BACK}/optimal-exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tests })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error en la API");
  }

  return data.results;
}
