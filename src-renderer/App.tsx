import Login from './pages/Login'
import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import NovaEncomenda from './pages/NovaEncomenda'
import Encomendas from './pages/Encomendas'

export default function App() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-50 flex-1 overflow-auto">\n          <Login />
          <div className="max-w-6xl mx-auto space-y-6">
            <NovaEncomenda />
            <Dashboard />
            <Encomendas />
          </div>
        </main>
      </div>
    </div>
  )
}
