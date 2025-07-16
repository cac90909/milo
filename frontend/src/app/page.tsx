// frontend/src/app/page.tsx
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome to Log Explorer</h1>
      <p className="mt-2 text-gray-700">Navigate to view and create logs.</p>

      <Link href="/logs">
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          View Logs
        </button>
      </Link>
    </main>
  );
}
