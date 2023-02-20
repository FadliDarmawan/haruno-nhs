import { kbbi } from '@bochilteam/scraper'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Masukkan kata yang mau dicari.\n\nContoh: ${usedPrefix + command} Arunika`
    const res = await kbbi(text)
    m.reply(`
${res.map(v => `
Subjek: ${v.title}

${v.means.map(v => '- ' + v).join('\n`')}
`).join('\n').trim()}

Note:
p = Partikel: kelas kata yang meliputi kata depan, kata sambung, kata seru, kata sandang, ucapan salam
n = Nomina: kata benda
`.trim())
}
handler.help = ['kbbi <teks>']
handler.tags = ['internet']
handler.command = /^kbbi$/i

export default handler