# EncomendasApp - Scaffold completo

Tecnologias: Electron (Main) + React + TypeScript (Renderer) + Vite + TailwindCSS + SQLite (better-sqlite3)

## Como usar (desenvolvimento)

1. Instale dependências:
   ```bash
   npm install
   ```

2. Iniciar o renderer (Vite):
   ```bash
   npm run dev:renderer
   ```

3. Compilar o main em modo watch (em outro terminal):
   ```bash
   npx tsc -p tsconfig.electron.json --watch
   ```

4. Inicie o Electron (após o vite estar no ar):
   ```bash
   npm start
   ```

> Alternativamente, use `npm run dev` que combina tarefas (requer `wait-on` e `concurrently`).

## Build produção (gerar instalador .exe)

1. Ajuste `package.json` > `build` > `appId` e `productName`.
2. Rode:
   ```bash
   npm run build
   npm run dist
   ```
   Isso usa `electron-builder` e gera instalador NSIS no diretório `dist` criado pelo builder.

## Notas importantes sobre dependências nativas (better-sqlite3)

- `better-sqlite3` é um binário nativo. No Windows, você precisa do Visual Studio Build Tools e do runtime do Visual C++ para compilar/adquirir binários corretos.
- Alternativas: `sqlite3` (também nativo), ou `sql.js` (wasm — funciona sem binários nativos, mas diferente no uso).
- Para empacotar, `electron-builder` tentará empacotar os binários corretos; se houver problemas, veja a seção "Recompilar módulos nativos para Electron" na docs do `electron-builder`.

## Impressão / Geração de PDF / PRN

- O projeto tem `src-electron/printer.ts` com função `gerarPdfHtml(html, path)` que gera PDF usando `printToPDF`.
- Para gerar PRN direto para impressoras térmicas pode-se:
  - Converter para ESC/POS e enviar via biblioteca (ex: escpos) ou
  - Gerar PDF e usar utilitários do sistema para enviar ao spooler.

## Próximos passos que posso fazer por você (opcionais)

- Adicionar autenticação/usuários.
- Migrar para servidor + API (Postgres + Express) para multi-PC.
- Implementar exportação de relatórios em Excel/PDF.
- Conectar templates de etiqueta a impressora térmica ESC/POS.
- Gerar o ZIP pronto para baixar (já incluído aqui).



## Atualizações adicionadas pelo assistente

- Implementação de autenticação local (usuários) com hashing (bcryptjs). Arquivo: `src-electron/auth.ts`.
- Página de Login no front-end: `src-renderer/pages/Login.tsx`.
- Handlers IPC para login/criação de usuário: `src-electron/ipc-auth.ts`.
- Prisma schema (SQLite) em `prisma/schema.prisma` — se preferir usar Prisma, siga as instruções abaixo.
- Exemplo de integração ESC/POS com fallback para PDF: `src-electron/escpos.ts`.
- Workflow GitHub Actions para build do instalador (Windows): `.github/workflows/build-electron.yml`.

### Usar Prisma (opcional)
Se quiser migrar para Prisma (mantendo SQLite):

1. Instale as dependências:
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma generate
```
2. Ajuste `package.json` scripts para incluir:
```json
"prisma:migrate": "npx prisma migrate dev --name init",
"prisma:generate": "npx prisma generate"
```
3. Rode `npm run prisma:migrate` para criar o arquivo `prisma/dev.db` e as tabelas.

> Obs: O scaffold atual usa `better-sqlite3`. Se migrar para Prisma, substitua as chamadas diretas ao DB por `@prisma/client` no `src-electron`.

### CI / Build automatizado
- Workflow para Windows está em `.github/workflows/build-electron.yml`. Ele faz `npm ci`, build e `electron-builder` e envia o instalador como artefato.

### Impressoras térmicas / PRN
- O arquivo `src-electron/escpos.ts` mostra um caminho com `escpos`. Para impressão direta em impressoras térmicas, instale e configure a biblioteca adequada à sua impressora (USB/Serial/Network), e adapte o código do dispositivo.
- Alternativa: Gere PDF com `gerarPdfHtml` e use utilitários do SO para enviar ao spooler/convert to PRN.
