import * as email from './emails/mailjet'
import * as gif from './gif/giphy'
import { config } from './config'

const giphyAPI = gif.initAPI(config)
const mailjetAPI = email.initAPI(config)

async function main() {
    try {
        const url = await giphyAPI.getRandomGIF('excited')
        await mailjetAPI.sendEmail(url)

        console.log('Email sent!')
    } catch (err) {
        console.log(err)
    }
}

main()
