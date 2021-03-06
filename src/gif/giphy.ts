import { GET } from '../helpers/httpHelper'
import { GIPHYResponse } from './model'
import config from '../config'

async function getRandomGIF(tag: string): Promise<string> {
    const query = new URLSearchParams({
        api_key: config.giphy.apiKey,
        rating: 'pg',
        tag,
    })

    try {
        const resp = await GET(`${config.giphy.baseURL}${config.giphy.path}?`, query) //url also from config
        if (resp.statusCode === 200) {
            const giphyRes = resp.body as GIPHYResponse
            return giphyRes.data.url
        } else {
            throw new Error('Giphy Error!')
        }
    } catch (err) {
        throw new Error('Giphy Error!')
    }
}

export { getRandomGIF }
