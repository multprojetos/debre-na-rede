/**
 * Gera ícones PWA (192x192 e 512x512) como SVG embutido em PNG via Canvas API
 * Execute: node scripts/generate-icons.mjs
 */

import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

function drawDebreIcon(size) {
    const canvas = createCanvas(size, size)
    const ctx = canvas.getContext('2d')
    const s = size

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, s, s)
    bg.addColorStop(0, '#1E3370')
    bg.addColorStop(1, '#0D1B3E')
    ctx.fillStyle = bg
    // Rounded rect
    const r = s * 0.22
    ctx.beginPath()
    ctx.moveTo(r, 0)
    ctx.lineTo(s - r, 0)
    ctx.quadraticCurveTo(s, 0, s, r)
    ctx.lineTo(s, s - r)
    ctx.quadraticCurveTo(s, s, s - r, s)
    ctx.lineTo(r, s)
    ctx.quadraticCurveTo(0, s, 0, s - r)
    ctx.lineTo(0, r)
    ctx.quadraticCurveTo(0, 0, r, 0)
    ctx.closePath()
    ctx.fill()

    // Gold border
    ctx.strokeStyle = '#C9A227'
    ctx.lineWidth = s * 0.03
    ctx.stroke()

    // Eagle emoji / text center
    ctx.font = `${s * 0.45}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🦅', s / 2, s * 0.42)

    // Club name
    ctx.font = `bold ${s * 0.12}px sans-serif`
    ctx.fillStyle = '#C9A227'
    ctx.fillText('DEBRÊ', s / 2, s * 0.77)

    ctx.font = `${s * 0.07}px sans-serif`
    ctx.fillStyle = 'rgba(245,237,214,0.7)'
    ctx.fillText('FC', s / 2, s * 0.88)

    return canvas.toBuffer('image/png')
}

try {
    mkdirSync(publicDir, { recursive: true })

    const sizes = [192, 512]
    for (const size of sizes) {
        const buf = drawDebreIcon(size)
        const path = join(publicDir, `pwa-${size}x${size}.png`)
        writeFileSync(path, buf)
        console.log(`✅ Criado: pwa-${size}x${size}.png`)
    }

    // apple-touch-icon (180x180)
    const appleBuf = drawDebreIcon(180)
    writeFileSync(join(publicDir, 'apple-touch-icon.png'), appleBuf)
    console.log('✅ Criado: apple-touch-icon.png')

    // favicon
    const faviconBuf = drawDebreIcon(64)
    writeFileSync(join(publicDir, 'favicon.ico'), faviconBuf)
    console.log('✅ Criado: favicon.ico')

    console.log('\n🦅 Todos os ícones PWA gerados com sucesso!')
} catch (e) {
    console.error('❌ Erro ao gerar ícones:', e.message)
    console.log('\n💡 Instale a dependência: npm install -D canvas')
    console.log('   Ou gere manualmente em: https://favicon.io/favicon-generator/')
}
