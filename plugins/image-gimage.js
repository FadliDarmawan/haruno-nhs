import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan query yang ingin dicari!\n\nContoh: ${ usedPrefix + command } Shinao Hiiragi`
    const res = await googleImage(text)
    conn.sendFile(m.chat, res.getRandom(), 'gimage.jpg', watermark, m)
}
handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet', 'tools']
handler.command = /^(gimage|image)$/i

export default handler