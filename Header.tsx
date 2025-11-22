import React from 'react'

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="text-xl font-semibold">EncomendasApp</div>
      <div>
        <button className="px-3 py-1 rounded border">Configurações</button>
      </div>
    </header>
  )
}
