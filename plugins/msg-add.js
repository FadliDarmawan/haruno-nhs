const { proto } = (await import('@adiwajshing/baileys')).default
// import db from '../lib/database.js'

let handler = async (m, { conn, command, usedPrefix, text }) => {
    let M = proto.WebMessageInfo
    if (!m.quoted) throw `Reply pesan dengan perintah *${usedPrefix + command}`
    if (!text) throw `Masukkan nama untuk pesan.\n\nContoh: ${usedPrefix + command} Tes`
    let msgs = db.data.msgs
    if (text in msgs) throw `'${text}' telah terdaftar!\nGunakan nama lain.`
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    m.reply(`Berhasil menambahkan pesan '${text}'\n\nAkses dengan mengetik namanya`.trim())
}
handler.help = ['msg'].map(v => 'add' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^addmsg$/

export default handler
