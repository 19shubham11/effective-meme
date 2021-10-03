import * as email from './emails/mailjet'
import * as gif from './gif/giphy'

async function main() {
    try {
        const url = await gif.getRandomGIF('excited')
        await email.sendEmail(url)

        console.log('Email sent!')
    } catch (err) {
        console.log(err)
    }
}

main()
