import bcrypt from 'bcryptjs'
import db from './db'

export function criarUsuario(username: string, senha: string) {
  const hash = bcrypt.hashSync(senha, 10)
  const stmt = db.prepare(`INSERT INTO usuarios (username, senha_hash, criado_em) VALUES (?, ?, datetime('now'))`)
  const info = stmt.run(username, hash)
  return info.lastInsertRowid
}

export function verificarUsuario(username: string, senha: string) {
  const stmt = db.prepare(`SELECT id, senha_hash FROM usuarios WHERE username = ?`)
  const row = stmt.get(username)
  if (!row) return null
  const ok = bcrypt.compareSync(senha, row.senha_hash)
  return ok ? { id: row.id, username } : null
}

// Ensure table exists on init
export function initAuthTable() {
  db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  );`)
}
