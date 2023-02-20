// import db from '../lib/database.js'

let handler = async (m, { command, usedPrefix, text }) => {
    if (!text) await conn.sendButton(m.chat, `Masukkan nama pesan yang ingin dihapus.\n\nContoh: ${usedPrefix + command} Tes`, watermark, false, [['Lihat daftar pesan', '.listmsg']], m)
    let msgs = db.data.msgs
    if (!(text in msgs)) await conn.sendButton(m.chat, `${text} tidak terdapat pada list.\n\nLihat daftar?`, watermark, false, [['Lihat daftar pesan', '.listmsg']], m)
    delete msgs[text]
    m.reply(`Berhasil menghapus pesan di daftar pesan dengan nama '${text}'`)
}
handler.help = ['msg'].map(v => 'del' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^delmsg$/

export default handler
