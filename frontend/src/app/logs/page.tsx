// app/logs/page.tsx
"use client"

import React from 'react'
import { useLogs } from '@/hooks/useLogs'
import LogFilterForm from '@/components/LogFilterForm'
import LogList from '@/components/LogList'
import LogCreationForm from '@/components/LogCreationForm'

export default function LogsPage() {
  const { logs, search, fetchAll, createLog } = useLogs()

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Logs</h1>

      <div className="flex items-center space-x-4">
        <LogFilterForm onSearch={search} />
        <button
          onClick={fetchAll}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Get All Logs
        </button>
      </div>

      <LogCreationForm onSubmit={createLog} />

      <LogList logs={logs} />
    </div>
  )
}
