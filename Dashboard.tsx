import React from 'react'

export default function Dashboard() {
  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded">Encomendas hoje: <strong>12</strong></div>
        <div className="p-4 border rounded">Em transporte: <strong>5</strong></div>
        <div className="p-4 border rounded">Entregues: <strong>7</strong></div>
      </div>
    </section>
  )
}
