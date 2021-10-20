import { GET } from '../helpers/httpHelper'
import { GIPHYResponse } from './model'
import { Config } from '../config'

export interface API {
    getRandomGIF(tag: string): Promise<string>
}

export function initAPI(config: Config): API {
    async function getRandomGIF(tag: string): Promise<string> {
        const query = new URLSearchParams({
            api_key: config.gif?.apiKey,
            rating: 'pg',
            tag,
        })

        try {
            const resp = await GET(`${config.gif.baseURL}${config.gif.randomGIFPath}`, query)
            const giphyResp = resp.body as GIPHYResponse

            return giphyResp?.data?.image_original_url
        } catch (err) {
            throw new Error('Giphy Error!')
        }
    }

    return { getRandomGIF }
}
