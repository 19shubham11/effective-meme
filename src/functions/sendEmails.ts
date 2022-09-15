import { Handler } from '@netlify/functions'

import * as email from '../emails/mailjet'
import * as gif from '..//gif/giphy'
import { config } from '../config'

const giphyAPI = gif.initAPI(config.gif)
const mailjetAPI = email.initAPI(config.email)

//to-do remove basic auth
const checkAuth = () => (handler: Handler) => async (event: any, _: any) => {
    const headers = event.headers
    const apiKey = headers['x-api-key']

    if (apiKey !== `Bearer: ${config.apiKey}`) {
        return { statusCode: 401, body: 'unauthorized!' }
    } else {
        return handler(event, _, _)
    }
}

const emailHandlr: Handler = async (event, _) => {
    try {
        const url = await giphyAPI.getRandomGIF('excited')
        await mailjetAPI.sendEmail(url)

        return {
            statusCode: 200,
            body: 'Email sent!',
        }
    } catch (err) {
        console.log('errr!', err)
        return { statusCode: 500, body: 'Internal Error' }
    }
}

const handler = checkAuth()(emailHandlr)

export { handler }
