// frontend/src/app/page.tsx
'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("...");

  useEffect(() => {
    fetch("http://localhost:8000/ping")
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(err => setMsg("Error"));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">FastAPI says:</h1>
      <p className="mt-2 text-gray-700">{msg}</p>
    </main>
  );
}
