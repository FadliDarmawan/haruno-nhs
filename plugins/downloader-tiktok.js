import fetch from 'node-fetch'
import { tiktok } from './scrape.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Masukkan URL tiktok yang ingin didownload!\n\nContoh: ${usedPrefix + command} https://vt.tiktok.com/ZSe5pocWX/` 
	if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw 'Invalid URL!\nPastikan URL merupakan URL tiktok.'
	let result = await tiktok(text)
	await conn.sendFile(m.chat, result.nowm, 'tiktok.mp4', watermark, m)
}
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.alias = ['tiktok', 'tikdl', 'tiktokdl', 'tiktoknowm']
handler.command = /^(tt|tiktok)(dl|nowm)?$/i

export default handler