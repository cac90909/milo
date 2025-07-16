// components/LogFilterForm.tsx
"use client"

import { useState } from "react"

export default function LogFilterForm({ onSearch }: { onSearch: (filters: any) => void }) {
  const [logType, setLogType] = useState("")
  const [rating, setRating] = useState("")

  const handleSubmit = () => {
    const filters: any = {
      log_type: logType,
      filters: {}
    }

    if (rating) filters.filters.rating = { gt: parseInt(rating) }
    onSearch(filters)
  }

  return (
    <div className="flex space-x-4">
      <input
        className="border p-2 rounded"
        placeholder="Log Type"
        value={logType}
        onChange={(e) => setLogType(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        placeholder="Rating >"
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  )
}
