import React, { useEffect, useState } from 'react'

export default function NovaEncomenda() {
  const [clientes, setClientes] = useState<any[]>([])
  const [form, setForm] = useState({ cliente_id: 0, tipo_envio: 'PAC', observacoes: '' })
  const [itens, setItens] = useState<any[]>([])

  useEffect(() => {
    window.api.invoke('clientes:listar').then((rows: any[]) => setClientes(rows))
  }, [])

  async function salvarEncomenda() {
    const numero = `EN${Date.now()}`
    const id = await window.api.invoke('encomendas:criar', { ...form, numero, status: 'Aberta', peso_total: 0, valor_total: 0 })
    for (const it of itens) {
      await window.api.invoke('itens:adicionar', { encomenda_id: id, ...it })
    }
    alert('Encomenda criada: ' + numero)
  }

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Nova Encomenda</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm">Cliente</label>
          <select className="mt-1 block w-full border rounded p-2" onChange={e => setForm({ ...form, cliente_id: Number(e.target.value) })}>
            <option value={0}>-- selecione --</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm">Tipo de envio</label>
          <select className="mt-1 block w-full border rounded p-2" value={form.tipo_envio} onChange={e => setForm({ ...form, tipo_envio: e.target.value })}>
            <option>PAC</option>
            <option>SEDEX</option>
            <option>Transportadora</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Observações</label>
          <input className="mt-1 block w-full border rounded p-2" value={form.observacoes} onChange={e => setForm({ ...form, observacoes: e.target.value })} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium">Itens</h3>
        <div className="space-y-2 mt-2">
          {itens.map((it, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-2">
              <input className="border rounded p-2" placeholder="Descrição" value={it.descricao} onChange={e => { const arr = [...itens]; arr[idx].descricao = e.target.value; setItens(arr) }} />
              <input type="number" className="border rounded p-2" value={it.quantidade} onChange={e => { const arr = [...itens]; arr[idx].quantidade = Number(e.target.value); setItens(arr) }} />
              <input className="border rounded p-2" placeholder="Peso (kg)" value={it.peso_unitario} onChange={e => { const arr = [...itens]; arr[idx].peso_unitario = Number(e.target.value); setItens(arr) }} />
              <input className="border rounded p-2" placeholder="Valor" value={it.valor_unitario} onChange={e => { const arr = [...itens]; arr[idx].valor_unitario = Number(e.target.value); setItens(arr) }} />
            </div>
          ))}
        </div>
        <div className="mt-2">
          <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setItens([...itens, { descricao: '', quantidade: 1, peso_unitario: 0, valor_unitario: 0 }])}>Adicionar Item</button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={salvarEncomenda}>Salvar Encomenda</button>
      </div>
    </section>
  )
}
