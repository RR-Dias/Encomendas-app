import { ipcMain } from 'electron'
import * as auth from './auth'

ipcMain.handle('auth:criar', (event, username: string, senha: string) => {
  try {
    const id = auth.criarUsuario(username, senha)
    return { success: true, id }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('auth:login', (event, username: string, senha: string) => {
  const user = auth.verificarUsuario(username, senha)
  if (user) return { success: true, user }
  return { success: false, error: 'Credenciais inválidas' }
})
