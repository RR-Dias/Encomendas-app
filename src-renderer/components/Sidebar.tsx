import React from 'react'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <div className="text-lg font-bold mb-6">Menu</div>
      <nav className="space-y-2">
        <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">Dashboard</div>
        <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">Nova Encomenda</div>
        <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">Clientes</div>
        <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">Relatórios</div>
      </nav>
    </aside>
  )
}
