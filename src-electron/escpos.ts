/*
Example ESC/POS printing. This uses the 'escpos' library which may require native adapters.
If your printer is USB/Serial, configure the device accordingly.

This file provides a function `imprimirEtiquetaEscPos(text)` that attempts to print raw ESC/POS.
If the 'escpos' module is not installed or not compatible, fallback to generating PDF via printer.ts.
*/

import fs from 'fs'
import path from 'path'
import { gerarPdfHtml } from './printer'

export async function imprimirEtiquetaEscPos(htmlContent: string) {
  try {
    // Try to require escpos dynamically
    const escpos = require('escpos')
    // choose adapter: USB, Serial, Network, etc.
    // const device  = new escpos.USB()
    // const printer = new escpos.Printer(device)
    // device.open(function() {
    //   printer.text('Teste ESC/POS')
    //   printer.cut()
    //   printer.close()
    // })
    // For safety, if escpos is available but device unknown, write PDF as fallback
    const out = path.join(process.cwd(), 'data', 'etiqueta_fallback.pdf')
    await gerarPdfHtml(htmlContent, out)
    return { success: true, path: out, note: 'escpos not configured; PDF fallback generated' }
  } catch (err: any) {
    // escpos not installed or failed -> fallback to PDF
    const out = path.join(process.cwd(), 'data', 'etiqueta_fallback.pdf')
    await gerarPdfHtml(htmlContent, out)
    return { success: true, path: out, error: err.message }
  }
}
