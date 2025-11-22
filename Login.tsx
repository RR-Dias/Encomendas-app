import React, { useState } from 'react'

export default function Login({ onLogin }: { onLogin?: (user: any) => void }) {
  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin() {
    const res = await (window as any).api.invoke('auth:login', username, senha)
    if (res.success) {
      alert('Login OK: ' + res.user.username)
      if (onLogin) onLogin(res.user)
    } else {
      alert('Erro: ' + res.error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <div className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="w-full border rounded p-2" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        <div className="flex justify-between">
          <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={handleLogin}>Entrar</button>
          <button className="px-3 py-2 border rounded" onClick={async () => {
            if (!username || !senha) return alert('Informe usuário e senha')
            const r = await (window as any).api.invoke('auth:criar', username, senha)
            if (r.success) alert('Usuário criado: ' + username); else alert('Erro: ' + r.error)
          }}>Criar conta</button>
        </div>
      </div>
    </div>
  )
}
