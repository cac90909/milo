// components/LogList.tsx

export default function LogList({ logs }: { logs: any[] }) {
  if (logs.length === 0) {
    return <p className="text-gray-500">No logs yet</p>
  }

  return (
    <ul className="space-y-2 mt-4">
      {logs.map((log) => (
        <li key={log.id} className="border p-4 rounded bg-white shadow-sm">
          <p className="text-sm text-gray-500">{log.log_type}</p>
          <h2 className="text-lg font-semibold">{log.title}</h2>
          <p className="text-gray-700">{log.text}</p>
          <pre className="text-xs mt-2 bg-gray-100 p-2 rounded">
            {JSON.stringify(log.data, null, 2)}
          </pre>
        </li>
      ))}
    </ul>
  )
}
