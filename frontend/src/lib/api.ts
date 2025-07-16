// frontend/lib/api.ts
export async function fetchFilteredLogs(filters: any) {
  const res = await fetch("http://localhost:8000/logs/filter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch logs: ${res.status}`);
  }

  return await res.json();
}
