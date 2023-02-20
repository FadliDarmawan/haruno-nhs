import { facebookDl } from './scrape.js'
import { savefrom } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Masukkan URL facebook yang ingin didownload.\n\n${usedPrefix + command} https://www.facebook.com/KassBook/videos/3403431609714277/`
	let res = await facebookDl(args[0]).catch(async _ => await savefrom(args[0])).catch(_ => null)
	if (!res) throw 'Can\'t download the post'
	let url = res?.url?.[0]?.url || res?.url?.[1]?.url || res?.['720p'] || res?.['360p']
	await m.reply(wait)
	conn.sendMessage(m.chat, { video: { url }, caption: watermark }, { quoted: m })
}
handler.help = ['facebook']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(dl)?)$/i

export default handler

// CREDIT: https://github.com/Rlxfly/re-md