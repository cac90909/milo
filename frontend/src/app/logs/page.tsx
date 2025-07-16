// app/logs/page.tsx
"use client"

import { useState } from "react"
import { fetchFilteredLogs } from "@/lib/api"
import LogFilterForm from "@/components/LogFilterForm"
import LogList from "@/components/LogList"

export default function LogsPage() {
  const [logs, setLogs] = useState([])

  const handleSearch = async (filters: any) => {
    const data = await fetchFilteredLogs(filters)
    setLogs(data)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Log Search</h1>
      <LogFilterForm onSearch={handleSearch} />
      <LogList logs={logs} />
    </div>
  )
}
