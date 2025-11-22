import { BrowserWindow } from 'electron'
import fs from 'fs'

export async function gerarPdfHtml(htmlContent: string, outputPath: string) {
  const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } as any })
  await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`)
  const pdf = await win.webContents.printToPDF({ printBackground: true })
  fs.writeFileSync(outputPath, pdf)
  win.close()
  return outputPath
}
