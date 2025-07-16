// src/hooks/useLogs.ts
import { useState } from 'react'
import { fetchFilteredLogs, fetchAllLogs, createLog as apiCreateLog } from '@/lib/api'

export function useLogs() {
  const [logs, setLogs] = useState<any[]>([])

  const search = async (filters: any) => {
    const data = await fetchFilteredLogs(filters)
    setLogs(data)
  }

  const fetchAll = async () => {
    const data = await fetchAllLogs()
    setLogs(data)
  }

  const createLog = async (input: { title: string; message: string }) => {
    const newLog = await apiCreateLog(input)
    setLogs(prev => [newLog, ...prev])
  }

  return { logs, search, fetchAll, createLog }
}