import { GET } from '../helpers/httpHelper'
import { GIPHYResponse } from './model'
import config from '../config'

async function getRandomGIF(tag: string): Promise<string> {
    const query = new URLSearchParams({
        api_key: config.gif.apiKey,
        rating: 'pg',
        tag,
    })

    try {
        const resp = await GET(`${config.gif.baseURL}${config.gif.path}`, query)
        const giphyRes = resp.body as GIPHYResponse
        return giphyRes.data.image_original_url
    } catch (err) {
        throw new Error('Giphy Error!')
    }
}

export { getRandomGIF }
