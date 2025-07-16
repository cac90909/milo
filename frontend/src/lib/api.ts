// src/lib/api.ts
const BASE_URL = "http://localhost:8000/logs"

export async function fetchAllLogs() {
  const res = await fetch(BASE_URL, {
    method: "GET",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch all logs: ${res.status}`)
  }
  return res.json()
}

export async function fetchFilteredLogs(filters: Record<string, any>) {
  const res = await fetch(`${BASE_URL}/filter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch filtered logs: ${res.status}`)
  }
  return res.json()
}

export async function createLog(payload: Record<string, any>) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`Failed to create log: ${res.status}`)
  }
  return res.json()
}
