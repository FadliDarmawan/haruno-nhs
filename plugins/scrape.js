import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'

async function sekaikomikDl(url) {
	let res = await fetch(url)
	let $ = cheerio.load(await res.text())
	let data = $('script').map((idx, el) => $(el).html()).toArray()
	data = data.filter(v => /wp-content/i.test(v))
	data = eval(data[0].split('"images":')[1].split('}],')[0])
	return data.map(v => encodeURI(v))
}

async function facebookDl(url) {
	let res = await fetch('https://fdownloader.net/')
	let $ = cheerio.load(await res.text())
	let token = $('input[name="__RequestVerificationToken"]').attr('value')
	let json = await (await fetch('https://fdownloader.net/api/ajaxSearch', {
		method: 'post',
		headers: {
			cookie: res.headers.get('set-cookie'),
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			referer: 'https://fdownloader.net/'
		},
		body: new URLSearchParams(Object.entries({ __RequestVerificationToken: token, q: url }))
	})).json()
	let $$ = cheerio.load(json.data)
	let result = {}
	$$('.button.is-success.is-small.download-link-fb').each(function () {
		let quality = $$(this).attr('title').split(' ')[1]
		let link = $$(this).attr('href')
		if (link) result[quality] = link
	})
	return result
}

async function tiktok(url) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://ttdownloader.com/', {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
            }
        })
            .then(({ data }) => {
                const $ = cheerio.load(data)
                let token = $('#token').attr('value')
                let config = {
                    'url': url,
                    'format': '',
                    'token': token
                }
                axios('https://ttdownloader.com/req/', {
                    method: 'POST',
                    data: new URLSearchParams(Object.entries(config)),
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
                    }
                })
                    .then(({ data }) => {
                        const $ = cheerio.load(data)
                        resolve({
                            nowm: $('div:nth-child(2) > div.download > a').attr('href'),
                            wm: $('div:nth-child(3) > div.download > a').attr('href'),
                            audio: $('div:nth-child(4) > div.download > a').attr('href')
                        })
                    })
            })
            .catch(reject)
    })
}

export {
	sekaikomikDl,
	facebookDl,
	tiktok
}

// CREDIT: https://github.com/Rlxfly/re-md