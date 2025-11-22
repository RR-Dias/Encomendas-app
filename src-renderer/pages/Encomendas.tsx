import React, { useEffect, useState } from 'react'

export default function Encomendas() {
  const [rows, setRows] = useState<any[]>([])
  useEffect(() => {
    window.api.invoke('encomendas:listar').then((r:any[]) => setRows(r))
  }, [])
  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Lista de Encomendas</h2>
      <div className="overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left"><th>Número</th><th>Cliente</th><th>Data</th><th>Status</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.numero}</td>
                <td>{r.cliente_nome}</td>
                <td>{r.data_criacao}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
