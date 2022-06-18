import assert from 'assert'
import nock from 'nock'

import { GiphyConfig } from '../../src/config'
import * as gif from '../../src/gif/giphy'
import { GIPHYResponse } from '../../src/gif/model'

describe('GIPHY', () => {
    afterAll(nock.restore)
    afterEach(nock.cleanAll)

    const config: GiphyConfig = {
        baseURL: 'http://mocked-gif-url',
        randomGIFPath: '/random',
        apiKey: 'fsdfs',
    }

    const giphyAPI = gif.initAPI(config)

    describe('getRandomGIF', () => {
        it('Should return a url when GIPHY returns 200', async () => {
            const mockURL = config.baseURL
            const mockResp: GIPHYResponse = {
                data: {
                    type: 'gif',
                    images: {
                        original: {
                            url: mockURL,
                        },
                    },
                    id: 'fdfdd',
                    title: 'Mock Gif!',
                },
            }

            nock(config.baseURL).persist().get(config.randomGIFPath).query(true).reply(200, mockResp)

            const url = await giphyAPI.getRandomGIF('fun')
            assert.strictEqual(url, mockURL)
        })

        it('Should throw an error when GIPHY does not return 200', async () => {
            nock(config.baseURL).persist().get(config.randomGIFPath).query(true).reply(400)

            await assert.rejects(giphyAPI.getRandomGIF('fun'), (err: Error) => {
                assert.match(err.message, /Giphy Error/)
                return true
            })
        })
    })
})
