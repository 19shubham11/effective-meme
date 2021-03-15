import addresses from './addresses.json'
import config from '../config'
import { MailjetEmailBody, MailjetRequest } from './model'
import { v4 as uuid } from 'uuid'
import { POST } from '../helpers/httpHelper'

async function sendEmail(gifURL: string): Promise<'OK'> {
    const auth = `Basic ${Buffer.from(config.email.user + ':' + config.email.key).toString('base64')}`
    const headers = {
        Authorization: auth,
        'Content-Type': 'application/json',
    }
    const emailBody = getGIFEmailBody(gifURL)
    try {
        await POST(config.email.url, emailBody, headers)
        return 'OK'
    } catch (err) {
        throw new Error('Mailjet Error!')
    }
}

function getGIFEmailBody(gifURL: string): MailjetRequest {
    const messages = addresses.emails.map((mail) => {
        const req: MailjetEmailBody = {
            From: {
                Email: config.email.email,
                Name: 'GIF Of The Day',
            },
            To: [
                {
                    Email: mail,
                },
            ],
            Subject: 'Have a great day today!',
            HTMLPart: `<img src='${gifURL}' width=500/>`,
            CustomId: uuid(),
        }
        return req
    })

    const body: MailjetRequest = {
        Messages: messages,
    }
    return body
}

export { sendEmail }
