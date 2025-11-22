import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)

const dbPath = path.join(dataDir, 'encomendas.db')
const db = new Database(dbPath)

export function initDb() {
  db.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf_cnpj TEXT,
      telefone TEXT,
      email TEXT,
      endereco TEXT,
      cidade TEXT,
      estado TEXT,
      cep TEXT,
      observacoes TEXT,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS encomendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT UNIQUE NOT NULL,
      cliente_id INTEGER,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT,
      peso_total REAL DEFAULT 0,
      valor_total REAL DEFAULT 0,
      tipo_envio TEXT,
      observacoes TEXT,
      FOREIGN KEY(cliente_id) REFERENCES clientes(id)
    );
    CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      encomenda_id INTEGER,
      descricao TEXT,
      quantidade INTEGER DEFAULT 1,
      peso_unitario REAL DEFAULT 0,
      valor_unitario REAL DEFAULT 0,
      FOREIGN KEY(encomenda_id) REFERENCES encomendas(id)
    );
    CREATE TABLE IF NOT EXISTS encomenda_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      encomenda_id INTEGER,
      status TEXT,
      data_status DATETIME DEFAULT CURRENT_TIMESTAMP,
      nota TEXT,
      FOREIGN KEY(encomenda_id) REFERENCES encomendas(id)
    );
    CREATE TABLE IF NOT EXISTS empresas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      cnpj TEXT,
      endereco TEXT,
      telefone TEXT,
      parametros TEXT
    );
  `)
}

export function criarCliente(cliente: any) {
  const stmt = db.prepare(`INSERT INTO clientes (nome, cpf_cnpj, telefone, email, endereco, cidade, estado, cep, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const info = stmt.run(cliente.nome, cliente.cpf_cnpj, cliente.telefone, cliente.email, cliente.endereco, cliente.cidade, cliente.estado, cliente.cep, cliente.observacoes)
  return info.lastInsertRowid
}

export function listarClientes() {
  const stmt = db.prepare(`SELECT * FROM clientes ORDER BY nome`)
  return stmt.all()
}

export function criarEncomenda(dto: any) {
  const insert = db.prepare(`INSERT INTO encomendas (numero, cliente_id, status, tipo_envio, peso_total, valor_total, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?)`)
  const info = insert.run(dto.numero, dto.cliente_id, dto.status, dto.tipo_envio, dto.peso_total, dto.valor_total, dto.observacoes)
  return info.lastInsertRowid
}

export function listarEncomendas() {
  const stmt = db.prepare(`SELECT e.*, c.nome as cliente_nome FROM encomendas e LEFT JOIN clientes c ON e.cliente_id = c.id ORDER BY e.data_criacao DESC`)
  return stmt.all()
}

export function adicionarItem(item: any) {
  const stmt = db.prepare(`INSERT INTO itens (encomenda_id, descricao, quantidade, peso_unitario, valor_unitario) VALUES (?, ?, ?, ?, ?)`)
  const info = stmt.run(item.encomenda_id, item.descricao, item.quantidade, item.peso_unitario, item.valor_unitario)
  return info.lastInsertRowid
}

export default db


import { initAuthTable } from './auth'
initAuthTable()
