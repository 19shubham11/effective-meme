import assert from 'assert'
import nock from 'nock'

import { config } from '../../src/config'
import * as gif from '../../src/gif/giphy'
import { GIPHYResponse } from '../../src/gif/model'

describe('GIPHY', () => {
    afterAll(nock.restore)
    afterEach(nock.cleanAll)

    const giphyAPI = gif.initAPI(config)

    describe('getRandomGIF', () => {
        it('Should return a url when GIPHY returns 200', async () => {
            const mockURL = 'https://mocked-gif-url'
            const mockResp: GIPHYResponse = {
                data: {
                    type: 'gif',
                    image_original_url: mockURL,
                    id: 'fdfdd',
                    title: 'Mock Gif!',
                },
            }

            nock(config.gif.baseURL).persist().get(config.gif.randomGIFPath).query(true).reply(200, mockResp)

            const url = await giphyAPI.getRandomGIF('fun')
            assert.strictEqual(url, mockURL)
        })

        it('Should throw an error when GIPHY does not return 200', async () => {
            nock(config.gif.baseURL).persist().get(config.gif.randomGIFPath).query(true).reply(400)

            await assert.rejects(giphyAPI.getRandomGIF('fun'), (err: Error) => {
                assert.match(err.message, /Giphy Error/)
                return true
            })
        })
    })
})
