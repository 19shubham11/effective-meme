import { GET } from '../helpers/httpHelper'
import { GIPHYResponse } from './model'
import { GiphyConfig } from '../config'

export interface API {
    getRandomGIF(tag: string): Promise<string>
}

export function initAPI(config: GiphyConfig): API {
    async function getRandomGIF(tag: string): Promise<string> {
        const query = new URLSearchParams({
            api_key: config?.apiKey,
            rating: 'pg',
            tag,
        })

        try {
            const resp = await GET(`${config.baseURL}${config.randomGIFPath}`, query)
            const giphyResp = resp.body as GIPHYResponse

            return giphyResp?.data?.images?.original?.url
        } catch (err) {
            throw new Error('Giphy Error!')
        }
    }

    return { getRandomGIF }
}
