let { downloadContentFromMessage } = (await import('@adiwajshing/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) throw await conn.reply(owner[0] + '@s.whatsapp.net', 'Direply dulu fotonya mas', m)
    if (m.quoted.mtype !== 'viewOnceMessageV2') await conn.reply(owner[0] + '@s.whatsapp.net', 'Bukan viewonce mas', m)
    const buffer = await m.quoted.download()
    const media = m.quoted.mediaMessage[m.quoted.mediaType]
    conn.sendFile(owner[0] + '@s.whatsapp.net', buffer, /video/.test(media.mimetype) ? 'video.mp4' : 'image.jpg', media.caption + `\n\n${watermark}`|| watermark, m)
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^readviewonce/i

export default handler
