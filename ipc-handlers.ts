import { ipcMain } from 'electron'
import * as db from './db'

ipcMain.handle('clientes:listar', () => {
  return db.listarClientes()
})

ipcMain.handle('clientes:criar', (event, cliente) => {
  return db.criarCliente(cliente)
})

ipcMain.handle('encomendas:criar', (event, dto) => {
  return db.criarEncomenda(dto)
})

ipcMain.handle('encomendas:listar', () => {
  return db.listarEncomendas()
})

ipcMain.handle('itens:adicionar', (event, item) => {
  return db.adicionarItem(item)
})
